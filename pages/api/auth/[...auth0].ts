import { findOrCreateUser } from "@/pages/backend/user";
import { Session, handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

const afterCallback = (
    req: NextApiRequest,
    res: NextApiResponse,
    session: Session
): Session | undefined => {
    try {
        const user = findOrCreateUser({
            email: session.user.email,
            name: session.user.name,
        });
        if (!user) {
            return undefined;
        }
        return session;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export default handleAuth({
    
    async callback(req, res) {
        try {
            await handleCallback(req, res, { afterCallback });
        } catch (error) {
            res.status(401).end();
        }
    },
});
