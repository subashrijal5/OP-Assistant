import Image from "next/image";
import React from "react";

export type ChatBubbleProps = {
    message: string;
    time: string;
    sender: string; 
    isMe: boolean;
    image?: string;
    iconRequired?: boolean
};

const ChatBubble: React.FC<ChatBubbleProps> = ({message, time, sender, isMe, image, iconRequired=true}) => {
  return (
    <div className={isMe ? "chat chat-end " : "chat chat-start"}>
      {iconRequired &&<div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            src={image ?? getDefault(isMe)}
            fill
            alt={sender}
          />
        </div>
      </div>}
      <div className="chat-header">
        {sender}
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className={`chat-bubble`}>{message}</div>
      {/* <div className="opacity-50 chat-footer">Delivered</div> */}
    </div>
  );
};

function getDefault(isMe: boolean) {
  return isMe ? "/images/user.svg" : "/images/bot.svg";
}

export default ChatBubble;
