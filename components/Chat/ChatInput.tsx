import React, { useRef, useState } from "react";
import MicInput, { MicInputProps } from "./MicInput";
import { useTranslation } from "react-i18next";

type Props = {
    onSendMessage: (text: string) => void;
    micInputProps: MicInputProps;
};

const ChatInput = ({ micInputProps, onSendMessage }: Props) => {
    const { t } = useTranslation();

    const [message, setMessage] = useState("");
    const formRef = useRef(null);
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            message: { value: string };
        };
        const text = target.message.value;
        if (text.length < 5) return;
        onSendMessage(text);
        target.message.value = "";
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            // @ts-ignore
            formRef.current.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true })
            );
        }
    };

    return (
        <div className="absolute bottom-0 right-0 w-full">
            <div className="border-t-2 border-gray-200 card dark:border-gray-600 ">
                <form ref={formRef} onSubmit={handleSubmitForm}>
                    <div className="px-2 card-body md:p-none">
                        <div className="join bg-inherit">
                            <div className="relative flex gap-3 join-item">
                                <MicInput {...micInputProps} />
                            </div>
                            <textarea
                                onKeyUp={handleKeyPress}
                                onChange={(e) => setMessage(e.target.value)}
                                name="message"
                                className="w-full ml-4 textarea-xs textarea textarea-bordered"
                                placeholder={t("chat:typeMessage") ?? ""}
                            ></textarea>

                            <button className="btn join-item">
                                {t("chat:send")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;
