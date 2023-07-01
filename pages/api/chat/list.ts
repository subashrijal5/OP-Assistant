import type { NextApiRequest, NextApiResponse } from "next";
import {
    ChatWithMessages,
    getUserChats,
} from "@/pages/backend/chat";
import { findUser } from "@/pages/backend/user";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ChatWithMessages[] | null | { error: string }>
) {
    const { method } = req;

    if (method === "GET") {
        const session = await getSession(req, res);
        if (!session?.user) {
            return res.status(401).json({ error: "You are not authencated" });
        }
        const user = await findUser(session.user.email);

        if (!user) {
            return res.status(401).json({ error: "You are not authencated" });
        }
        const userChats = await getUserChats(user.id);
        return res.status(200).json(userChats);
    }
}
