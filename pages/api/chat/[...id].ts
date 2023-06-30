import type { NextApiRequest, NextApiResponse } from "next";
import { findChatWithMessages } from "@/pages/backend/chat";
import { Message } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Message[] | undefined | null>
) {
    const { method } = req;

    if (method === "GET") {
        const { id } = req.query
        const chat = await findChatWithMessages(parseInt(id as string));
        if (!chat) throw Error("Invalid chat ");
        if (!chat?.messages) return res.status(200).json(null);
        res.status(200).json(chat.messages);
    }
}
