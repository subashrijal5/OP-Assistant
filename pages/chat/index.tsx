import { useUser } from "@auth0/nextjs-auth0/client";
import Master from "@/layouts/Master";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HistoryItem from "@/components/Chat/HistoryItem";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { ChatWithMessages } from "../../services/backend/chat";
import ChatBubble from "@/components/Chat/ChatBubble";
import { useTranslation } from "next-i18next";

export default function IndexPage() {
    const { user, error, isLoading } = useUser();
    const {t} = useTranslation()
    const router = useRouter();
    const {
        data: chats,
        isLoading: isChatsLoading,
        isError: isChatsError,
        error: chatsError,
    } = useQuery("chats", () =>
        fetch("/api/chat/list").then((res) => res.json())
    );

    if (isLoading || isChatsLoading) return <div>Loading...</div>;
    if (error || chatsError) return <div>Something went wrong. Please try again</div>;

    const handleStartChat = async () => {
        const response = await fetch("/api/chat/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email: user?.email ?? "" }),
        });
        const chat = await response.json();
        router.push(`/chat/${chat.id}`);
    };

    return (
        <Master>
            <div className="w-full mb-40 card ">
                <div className="card-body">
                    <h2 className="card-title">{t('chat:chatHistory')}</h2>
                    <hr />
                    <p>
                      {t('chat:checkHistory')}
                    </p>
                    <div className="flex flex-col gap-3">
                        {chats?.map((chat: ChatWithMessages) => {
                            return (
                                <HistoryItem
                                    key={chat.id}
                                    title={getTitle(chat)}
                                    id={chat.id}
                                >
                                    {chat.messages?.map((message) => {
                                        return (
                                            <ChatBubble
                                                key={message.id}
                                                isMe={message.role === "user"}
                                                sender={
                                                    message.role === "user"
                                                        ? user?.name!
                                                        : "System"
                                                }
                                                message={message.message!}
                                                time={new Date()
                                                    .getTime()
                                                    .toFixed()
                                                    .toString()}
                                            ></ChatBubble>
                                        );
                                    })}
                                </HistoryItem>
                            );
                        })}
                    </div>
                    <div className="justify-end card-actions">
                        <button onClick={handleStartChat} className="btn">
                            {t('chat:startChat')}
                        </button>
                    </div>
                </div>
            </div>
        </Master>
    );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["chat"])),
        },
    };
}

const getTitle = (chat: ChatWithMessages) => {
    if (!chat.messages || chat.messages.length < 1) return chat.title;
    const lastMessage = chat.messages[0];
    return lastMessage?.message && lastMessage?.message.length > 100
        ? lastMessage.message?.substring(0, 60) + "..."
        : lastMessage.message!;
};
