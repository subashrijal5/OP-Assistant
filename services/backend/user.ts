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
    }).then(async (user) => {
        await prisma.$disconnect()
        return user;
    }).catch(async (err) => {    console.error(err);
        await prisma.$disconnect()
        return null;
    });
};

const findUser = async (email: string) => {
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
    }).then(async (user) => {
        await prisma.$disconnect()
        return user;
    }).catch(async (err) => {    console.error(err);
        await prisma.$disconnect()
        return null;
    });
};

export { findOrCreate as findOrCreateUser, findUser };
