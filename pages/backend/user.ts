import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type UserData = {
    email: string;
    name?: string;
};

const findOrCreate = async (userData: UserData): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });

    if (user) {
        return user;
    }
    return await prisma.user.create({
        data: {
            email: userData.email,
            name: userData.name ?? "Unnamed",
        },
    });
};

const findUser = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
};

export { findOrCreate as findOrCreateUser, findUser };
