import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import Master from "@/layouts/Master";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function IndexPage() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const { t } = useTranslation();
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
            <div className=" hero bg-base-200">
                <div className="flex-col hero-content lg:flex-row">
                    <Image
                        src="/images/img_mission.jpeg"
                        className="max-w-xs rounded-lg shadow-2xl xl:max-w-sm w-[14rem] md:w-auto"
                        height={400}
                        width={400}
                        alt="Stock photo"
                    />
                    <div>
                        {user ? (
                            <h1 className="text-5xl font-bold">
                                {t("common:hello")} {user.name}{" !! "} <br />
                                {t("home:loggedIn")}
                            </h1>
                        ) : (
                            <h1 className="text-5xl font-bold">
                                {t("home:yourAssistant")}
                            </h1>
                        )}

                        <p className="py-6">{t("home:about")}</p>
                        {user ? (
                           <div className="flex justify-start gap-4">
                             <button
                                onClick={handleStartChat}
                                className="btn btn-primary btn-outline"
                            >
                                {t("home:startTalk")}
                            </button>
                             <Link
                                href={"/chat"}
                                className="btn btn-info btn-outline"
                            >
                                {t("home:history")}
                            </Link>
                             <Link
                                href={"/api/auth/logout"}
                                className="btn btn-error btn-outline"
                            >
                                {t("home:logout")}
                            </Link>
                           </div>
                        ) : (
                            <Link
                                href={"/api/auth/login"}
                                className="btn btn-primary"
                            >
                                {t("home:login")}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </Master>
    );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["home", 'common'])),
        },
    };
}
