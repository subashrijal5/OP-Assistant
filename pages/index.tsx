import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import Master from "@/layouts/Master";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export default function IndexPage() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const t = useTranslations("Index");
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
                        height={500}
                        width={500}
                        alt="Stock photo"
                    />
                    <div>
                        {user ? (
                            <h1 className="text-5xl font-bold">
                                {t("loggedIn", { username: user.name })}
                            </h1>
                        ) : (
                            <h1 className="text-5xl font-bold">
                              {t("yourAssistant")}
                            </h1>
                        )}

                        <p className="py-6">
                            {t('about')}
                        </p>
                        {user ? (
                            <button
                                onClick={handleStartChat}
                                className="btn btn-primary"
                            >
                               {t('startTalk')}
                            </button>
                        ) : (
                            <Link
                                href={"/api/auth/login"}
                                className="btn btn-primary"
                            >
                               {t('login')}
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
            locales: (await import(`../locales/${locale}.json`)).default,
        },
    };
}
