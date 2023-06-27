import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

type UserData = {
    email: string;
    name?: string;
};

const findOrCreate = async (userData: UserData): Promise<User | null> => {
    const user = prisma.user.findUnique({
        where: {
            email: userData.email,
        },
    });

    if (user) {
        return user;
    }
    return prisma.user.create({
        data: {
            email: userData.email,
            name: userData.name ?? "Unnamed",
        },
    });
};

export { findOrCreate as findOrCreateUser };
