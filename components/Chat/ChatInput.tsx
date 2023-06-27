import Image from "next/image";
import React from "react";

const ChatInput = () => {
    return (
        <div className="absolute bottom-0 right-0 w-full">
            <div className="border-t-2 border-gray-200 card dark:border-gray-600">
                <div className="px-2 card-body md:p-none">
                    <div className="join">
                    <button className="mr-4 btn btn-circle btn-outline">
                        <Image src='/images/microphone.svg' alt="Mic" height={25} width={25}></Image>
                    </button>
                        <textarea
                            className="w-full textarea-xs textarea textarea-bordered"
                            placeholder="Type your message ...."
                        ></textarea>
                      
                        <button className="btn join-item">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
