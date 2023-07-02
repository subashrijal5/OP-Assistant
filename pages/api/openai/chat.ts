import type { NextApiRequest, NextApiResponse } from "next";
import * as openai from "openai";
import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import { findOrCreateChat } from "@/services/backend/chat";
import { createMessage } from "@/services/backend/message";
import { findOrCreateUser, findUser } from "@/services/backend/user";

type Data = {
    role: string;
    message: string;
    chatId?: number;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { Configuration, OpenAIApi } = openai;

    const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    const openaiApi = new OpenAIApi(configuration);

    const { method } = req;

    if (method === "POST") {
        try {
            const user = await findUser(req.body.email);
            if (user === null) {
                return res
                    .status(401)
                    .json({
                        role: "system",
                        message: "You are not authenticated",
                        chatId: 0,
                    });
            }

            const chat = await findOrCreateChat({
                chatId: parseInt(req.body.chatId) as number,
                userId: user.id,
            });
            if (chat === null) {
                return res
                    .status(403)
                    .json({
                        role: "system",
                        message: "You are not authorised to access this chat",
                        chatId: 0,
                    });
            }
            const newMessage = await createMessage({
                chatId: chat.id,
                role: "user",
                message: req.body.message,
            });
            if (newMessage === null) {
                return res
                    .status(400)
                    .json({
                        role: "system",
                        message: "Invalid message. Please check your message and try again",
                        chatId: 0,
                    });
            }

            const previousConvertations =
                chat.messages?.map((m) => {
                    return {
                        role: m.role as openai.ChatCompletionRequestMessageRoleEnum,
                        content: m.message ?? "",
                    };
                }) ?? [];

            const request = [
                ...previousConvertations,
                {
                    role: newMessage.role as openai.ChatCompletionRequestMessageRoleEnum,
                    content: newMessage?.message ?? "",
                },
            ];
            const completion = await openaiApi.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: request,
            });
            const data = completion.data.choices[0].message;

            await createMessage({
                chatId: chat.id,
                role: "assistant",
                message: data?.content ?? "",
            });

            return res.status(200).json(data as Data);
        } catch (e) {
            console.log(e);
            return res
                .status(400)
                .json({ role: "system", message: "Bad Request", chatId: 0 });
        }
    }
    // return res.status(400).json({ response: "Bad Request" });
}
