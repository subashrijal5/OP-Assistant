import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import en from "@/locales/en.json";
import ja from "@/locales/ja.json";
import ne from "@/locales/ne.json";
import { flattenMessages, INestedMessages } from "../locales/flattenMessages";

// Union type
export type Locale = "en" | "de";

// a Record is an object wich we can pass union types to it as key.
const messages: Record<Locale, INestedMessages> = {
  en,
  ja,
  ne,

};

export const useLocale = () => {
  const router = useRouter();
  
  const flattenedMessages = useMemo(
    () => flattenMessages(messages[router.locale as keyof typeof messages]),
    [router]
  );

  const switchLocale = useCallback(
    (locale: Locale) => {
      // if we already have /en and we choose english for example we just return!
      if (locale === router.locale) {
        return;
      }

      // This is how we change locale in NextJS.
      const path = router.asPath;
      return router.push(path, path, { locale });
    },
    [router]
  );
  return { locale: router.locale, switchLocale, messages: flattenedMessages };
};