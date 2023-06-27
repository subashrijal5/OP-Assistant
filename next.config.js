/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n: {
    locales: ["en", "ne", "ja"],
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
