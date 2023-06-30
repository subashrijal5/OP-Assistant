import type { NextApiRequest, NextApiResponse } from "next";
import * as openai from "openai";
import * as fs from "fs";
import { PrismaClient } from "@prisma/client";
import { findOrCreateChat } from "@/pages/backend/chat";
import { createMessage } from "@/pages/backend/message";
import { findOrCreateUser, findUser } from "@/pages/backend/user";

type Data = {
    role: string;
    message: string;
    chatId?: number;
};

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { Configuration, OpenAIApi } = openai;

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openaiApi = new OpenAIApi(configuration);

    const { method } = req;

    if (method === "POST") {
       try{
        const user  = await findUser(req.body.email)
        if (user === null) {
            throw Error("Cannot create chat");
        }
        const chat = await findOrCreateChat({
            chatId: parseInt(req.body.chatId) as number,
            userId: user.id,
        });
        if (chat === null) {
            throw Error("Cannot create chat");
        }
        const newMessage = await createMessage({
            chatId: chat.id,
            role: "user",
            message: req.body.message,
        });
        if (newMessage === null) {
            throw Error("Cannot create chat");
        }

        const previousConvertations =
            chat.messages?.map((m) => {
                return {
                    role: m.role as openai.ChatCompletionRequestMessageRoleEnum,
                    content: m.message ?? '',
                };
            }) ?? [];

        const request = [
            ...previousConvertations,
            {
                role: newMessage.role as openai.ChatCompletionRequestMessageRoleEnum,
                content: newMessage?.message ?? '',
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
            message: data?.content ?? '',
        });

        return res.status(200).json(data as Data);
       }
       catch(e){
        console.log(e)
        return res.status(400).json({ role: "system", message: "Bad Request", chatId: 0 });
       }
    }
    // return res.status(400).json({ response: "Bad Request" });
}
