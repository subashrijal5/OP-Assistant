import { useTranslation, withTranslation, Trans } from 'react-i18next';
import locales from "../data/locales";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export default function LocaleSwitcher() {
  // const t = useTranslations("LocaleSwitcher");
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { pathname, asPath, query } = router;

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    // i18n.changeLanguage(event.target.value)
    router.push({ pathname, query }, asPath, { locale: event.target.value });
  }
  return (
    <select
      onChange={onSelectChange}
      value={router.locale}
      className="select-sm select select-accent"
    >
      {locales.map((l) => (
        <option disabled={router.locale === l.code} key={l.code} value={l.code}>
          {l.name}
        </option>
      ))}
    </select>
  );
}
