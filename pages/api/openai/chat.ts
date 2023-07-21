import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { findOrCreateChat } from "@/services/backend/chat";
import { createMessage } from "@/services/backend/message";
import { findOrCreateUser, findUser } from "@/services/backend/user";
import { OpenAIClient, AzureKeyCredential, ChatRole } from "@azure/openai";

type Data = {
    role: string;
    message: string;
    chatId?: number;
};
const endpoint =
    "https://test-003.openai.azure.com";
const apikey = process.env.AZURE_OPENAI_API_ENDPOINT;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

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
                        role: m.role as ChatRole,
                        content: m.message ?? "",
                    };
                }) ?? [];

            const request = [
                ...previousConvertations,
                {
                    role: newMessage.role as ChatRole,
                    content: newMessage?.message ?? "",
                },
            ];
            const client = new OpenAIClient(
                endpoint,
                new AzureKeyCredential(apikey!)
            );
            const deploymentId = "test-gpt001";
            const events = await client.getChatCompletions(
                deploymentId,
                request,
                { maxTokens: 800 }
            );
            const data = events.choices[0];
            console.log(data, 'message');
        
            
            const finalResult = {
                role: data.message?.role ?? "assistant",
                chatId: chat.id,
                message: data.message?.content,
            }
            await createMessage(finalResult);
            
            return res.status(200).json(finalResult as Data);
        } catch (e) {
            console.log(e);
            return res
                .status(400)
                .json({ role: "system", message: "Bad Request", chatId: 0 });
        }
    }
}
