const locales : Locale[] =   [
  {
    code: "en",
    name: "English",
  },
  {
    code: "ja",
    name: "日本話",
  },
  {
    code: "ne",
    name: "नेपालि",
  },
];

export type Locale = {
  code: string;
  name: string;
};

export default locales;
