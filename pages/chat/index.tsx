import { useUser } from "@auth0/nextjs-auth0/client";
import Master from "@/layouts/Master";
import ChatInput from "@/components/Chat/ChatInput";
import { MicInputProps } from "../../components/Chat/MicInput";
import { useWhisper } from "@chengsokdara/use-whisper";
import { useEffect, useState } from "react";
import ChatBubble, { ChatBubbleProps } from "@/components/Chat/ChatBubble";
import { GetStaticPropsContext } from "next";
import { useTranslation, withTranslation, Trans } from 'react-i18next';

export default function IndexPage() {
    const { user, error, isLoading } = useUser();
    const{ t }= useTranslation();

    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);

    const setMessageObject = (message: string, role: string) => {
        setMessages((prev) => {
            return [
                ...prev,
                {
                    role: role,
                    message: message,
                    isMe: role === "user",
                    sender: role === "user" ? user?.name ?? "" : "Assistant",
                    time: new Date().getTime().toString(),
                },
            ];
        });
    };

    const {
        recording,
        speaking,
        transcribing,
        transcript,
        pauseRecording,
        startRecording,
        stopRecording,
    } = useWhisper({
        apiKey: process.env.OPENAI_API_KEY,
        removeSilence: true,
    });

    const micInputProps: MicInputProps = {
        startRecording: () => {
            startRecording();
        },
        stopRecording: () => {
            stopRecording();
        },
        pauseRecording: () => {
            pauseRecording();
        },
        recording: recording,
        speaking: speaking,
        transcribing: transcribing,
        transcript: transcript,
    };

    useEffect(() => {
        console.log("transcript.text", transcribing);
        if (transcript.text) {
            handleSendMessage(transcript.text);
        }
    }, [transcribing]);

    const handleSendMessage = async (message: string) => {
        setMessageObject(message, "user");
        const response = await fetch("/api/openai/chat", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                role: "user",
                email: user?.email,
            }),
        });
        const messageObj = await response.json();
        setMessageObject(messageObj.content, messageObj.role);
    };
   
    return (
        <Master>
            <div className="relative h-[85vh] w-full ">
                <div className=" px-3 h-[65vh] overflow-y-scroll ">
                    {messages.map((message, i) => (
                        <ChatBubble key={i} {...message} />
                    ))}
                </div>
                <ChatInput
                    micInputProps={micInputProps}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </Master>
    );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            locales: (await import(`../../locales/${locale}.json`)).default,
        },
    };
}
