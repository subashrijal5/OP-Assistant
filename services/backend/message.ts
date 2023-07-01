import { Message, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type MessageData = {
    chatId: number;
    role: string;
    message?: string;
};

const create = async (messageData: MessageData): Promise<Message | null> => {
    const message = await prisma.message.create({
        data: {
            ...messageData,
        },
    });
    return message
};


export { create as createMessage };
