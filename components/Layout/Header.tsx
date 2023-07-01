import Image from "next/image";
import React from "react";
import ThemeSwitch from "../ThemeSwitcher";
import LocaleSwitcher from "../LocaleSwitcher";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <div className="sticky top-0 z-50">
            <div className="bg-gray-200 navbar dark:bg-gray-600">
                <div className="navbar-start">
                    <Image
                        src="/images/img_logo.png"
                        alt="TailwindBlog"
                        width={150}
                        height={100}
                    />
                </div>
                <div className="hidden navbar-center md:block">

                    <Link href="/" onClick={() => router.back()}>
                        <svg
                            width="40px"
                            height="40px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M8.57 10.7701L7 9.19012L8.57 7.62012"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </Link>
                    {/* <span className="badge badge-primary badge-lg">{user?.name ?? 'OP Assistant'}</span> */}
                </div>
                <div className="gap-4 navbar-end">
                    <LocaleSwitcher />
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    );
};

export default Header;
