import { useUser } from "@auth0/nextjs-auth0/client";
import Master from "@/layouts/Master";
import ChatBubble from "@/components/Chat/ChatBubble";
import ChatInput from "@/components/Chat/ChatInput";
import TypingBubble from "@/components/Chat/TypingBubble";

export default function IndexPage() {
    return (
        <Master>
            <div className="relative h-[85vh] w-full ">
                <div className=" px-3 h-[65vh] overflow-y-scroll ">
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        isMe
                    />
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        isMe={false}
                    />
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        iconRequired={false}
                        isMe={false}
                    />
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        iconRequired={false}
                        isMe={false}
                    />
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        iconRequired={false}
                        isMe={false}
                    />
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        isMe
                    />
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        isMe={false}
                    />
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        isMe
                    />
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        isMe
                    />
                    <ChatBubble
                        sender="John Doe"
                        message="Hello there!"
                        time="10:20"
                        isMe
                    />
                    <TypingBubble/>
                </div>
                <ChatInput />
            </div>
        </Master>
    );
}
