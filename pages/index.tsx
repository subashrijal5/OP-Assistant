import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import Master from "@/layouts/Master";
import { GetStaticPropsContext } from "next";

export default function IndexPage() {
  const { user, error, isLoading } = useUser();
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
            {user && (
              <h1 className="text-5xl font-bold">
                Hello {user.name}! Welcome to assist zone
              </h1>
            )}
            <h1 className="text-5xl font-bold">Your AI Assistant!</h1>
            <p className="py-6">
              It is a demonstration of simple voice conversation with the
              AI(Artificial Intelligence).
            </p>
            {user ? (
              <a href={"/chat"} className="btn btn-primary">
                Start To Talk
              </a>
            ) : (
              <Link href={"/api/auth/login"} className="btn btn-primary">
                Get Started
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
