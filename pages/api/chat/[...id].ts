import type { NextApiRequest, NextApiResponse } from "next";
import { findChatWithMessages } from "@/services/backend/chat";
import { Message } from "@prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Message[] | undefined | null | {error: string}>
) {
    const { method } = req;

    if (method === "GET") {
        try {
            const { id } = req.query;
            const chat = await findChatWithMessages(parseInt(id as string));
            if (!chat) {
                return res.status(404).json({
                    error: "Chat not found",
                });
            }
            if (!chat?.messages) return res.status(200).json(null);
            res.status(200).json(chat.messages);
        } catch (error) {
            return res.status(500).json({
                // @ts-ignore
                error: error.message ?? "Something went wrong",
            })
        }
    }
}
