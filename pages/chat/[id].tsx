import { useUser } from "@auth0/nextjs-auth0/client";
import Master from "@/layouts/Master";
import ChatInput from "@/components/Chat/ChatInput";
import { MicInputProps } from "../../components/Chat/MicInput";
import { useWhisper } from "@chengsokdara/use-whisper";
import { useEffect, useRef, useState } from "react";
import ChatBubble, { ChatBubbleProps } from "@/components/Chat/ChatBubble";
import { Message } from "@prisma/client";
import { useRouter } from "next/router";
import TypingBubble from "@/components/Chat/TypingBubble";

export default function ChatIdPage() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const { id } = router.query;

    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
    const [sending, setSending] = useState<boolean>(false);

    const fetchMessages =  async () => {
        const res = await fetch(`/api/chat/${id}`);
        const messageData = await res.json();
        if (messageData) {
            const initialValue = messageData.map((message: Message) => {
                return {
                    role: message.role,
                    message: message.message,
                    isMe: message.role === "user",
                    sender:
                        message.role === "user" ? user?.name ?? "" : "Assistant",
                    time: new Date().getTime().toString(),
                };
            });
            setMessages(initialValue);
        }
    };
   
    useEffect(()=> {
        fetchMessages()
    }, [id])

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
        apiKey: "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",
        removeSilence: true,
        whisperConfig: {
            language: router.locale 
        }
        // onTranscribe,
    });

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        // @ts-ignore
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

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
        if (transcript.text) {
            handleSendMessage(transcript.text);
            transcript.text = "";
        }
    }, [transcript]);

    useEffect(() => {
        scrollToBottom()
    }, [messages, sending]);
    
    const handleSendMessage = async (message: string) => {
        setSending(true)
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
                chatId: id,
            }),
        });
        const messageObj = await response.json();
        setMessageObject(messageObj.content, messageObj.role);
        setSending(false)
    };
    return (
        <Master>
            <div className="relative h-[85vh] w-full ">
                <div className=" px-3 h-[65vh] overflow-y-scroll ">
                    {messages.map((message, i) => (
                        <ChatBubble key={i} {...message} />
                    ))}
                    {sending && <TypingBubble/>}
                    <div ref={messagesEndRef} />
                </div>
                <ChatInput
                    micInputProps={micInputProps}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </Master>
    );
}
