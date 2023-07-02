import Link from "next/link";
import React from "react";
import { useTranslation } from "next-i18next";

type HistoryItemProps = {
    checked?: boolean;
    title: string;
    children: React.ReactNode;
    id: number;
};

const HistoryItem = ({ checked, title, children, id }: HistoryItemProps) => {
    const {t} = useTranslation()
    return (
        <div className="collapse collapse-arrow border-1 bg-slate-200 dark:bg-base-200 ">
            <input type="radio" name="my-accordion-2" checked={checked} />
            <div className="collapse-title">
                {title}
            </div>
            <Link
                    href={`/chat/${id}`}
                    className="ml-4 w-fit btn-sm btn btn-info btn-outline"
                >
                  {t('chat:continueConversation')} 
                </Link>

            <div className="collapse-content  max-h-[40vh] overflow-y-scroll">
                {children}
            </div>
        </div>
    );
};

export default HistoryItem;
