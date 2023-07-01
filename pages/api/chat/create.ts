import type { NextApiRequest, NextApiResponse } from "next";
import { Chat } from "@prisma/client";
import { ChatWithMessages, findOrCreateChat } from "@/services/backend/chat";
import { findUser } from "@/services/backend/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ChatWithMessages | null>
) {
    const { method } = req;

    if (method === "POST") {
        const user = await findUser(req.body.email);
        if (!user) throw Error("Invalud user ");
        const chat = await findOrCreateChat({
            userId: user.id,
        });
        return res.status(201).json(chat);

    }
}
