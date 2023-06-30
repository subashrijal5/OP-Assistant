import { Chat, Message, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ChatData = {
    userId: number;
    chatId?: number;
    title?: string;
};

export type ChatWithMessages = Chat & {
    messages?: Message[];
};

const findOrCreate = async (
    chatData: ChatData
): Promise<ChatWithMessages | null> => {
    if (chatData.chatId) {
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatData.chatId,
            },
            include: {
                messages: true,
            },
        });
        return chat;
    }

    return await prisma.chat.create({
        data: {
            userId: chatData.userId,
            title: chatData.title ?? "Untitled",
        },
    });
};

const findChatWithMessages = async (chatId: number): Promise<ChatWithMessages | null> => {
    return await prisma.chat.findUnique({
        where: {
            id: chatId,
        },
        include: {
            messages: true,
        },
    });
};

export { findOrCreate as findOrCreateChat, findChatWithMessages };
