import Image from "next/image";
import React from "react";
import ThemeSwitch from "../ThemeSwitcher";
import LocaleSwitcher from "../LocaleSwitcher";
import { useUser } from "@auth0/nextjs-auth0/client";

const Header = () => {
  const {user} = useUser()

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
          <span className="badge badge-primary badge-lg">{user?.name ?? 'OP Assistant'}</span>
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
