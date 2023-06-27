import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function Master({ children }: Props) {
  return (
    <div className="max-w-3xl mx-auto bg-gray-100 rounded rounded-md xl:max-w-5xl xl:px-0 dark:bg-gray-800">
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <div className="h-full overflow-y-auto">
        <div className="flex items-center justify-center divide-y divide-gray-200 dark:divide-gray-700 ">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  </div>
  );
}
