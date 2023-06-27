import Image from "next/image";
import React from "react";

const TypingBubble = () => {
    return (
        <div className="chat-start">
            <div className={`chat-bubble`}>
            <div className="typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            </div>
            {/* <div className="opacity-50 chat-footer">Delivered</div> */}
        </div>
    );
};

function getDefault(isMe: boolean) {
    return isMe ? "/images/user.svg" : "/images/bot.svg";
}

export default TypingBubble;
