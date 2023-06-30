import React, { useState } from "react";
import MicInput, { MicInputProps } from "./MicInput";
import { useTranslations } from "next-intl";
import { GetStaticPropsContext } from "next";

type Props = {
    onSendMessage: (text: string) => void;
    micInputProps: MicInputProps;
};

const ChatInput = ({ micInputProps, onSendMessage }: Props) => {

    const t = useTranslations("Chat")

    const [message, setMessage] = useState('')
     const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            message: { value: string };
        };
        const text = target.message.value;
        if(text.length < 5) return;
        onSendMessage(text);
        target.message.value = "";
    };

    return (
        <div className="absolute bottom-0 right-0 w-full">
            <div className="border-t-2 border-gray-200 card dark:border-gray-600 ">
                <form onSubmit={handleSubmitForm}>
                    <div className="px-2 card-body md:p-none">
                        <div className="join bg-inherit">
                            <div className="relative flex gap-3 join-item">
                                <MicInput {...micInputProps} />
                            </div>
                            <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            name="message"
                                className="w-full ml-4 textarea-xs textarea textarea-bordered"
                                placeholder={t("typeMessage")}
                            ></textarea>

                            <button className="btn join-item">{t("send")}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;