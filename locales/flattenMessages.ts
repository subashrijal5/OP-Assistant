// This interface is using Indexed signature and Recursive type utility in TS.
// It just means our json might have key and value of type string or nested json.
export interface INestedMessages {
    [key: string]: string | INestedMessages;
  }
  export const flattenMessages = (
    nestedMessages: INestedMessages,
    prefix = ""
  ): Record<string, string> => {
    return Object.keys(nestedMessages).reduce(
      (messages: Record<string, string>, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "string") {
          messages[prefixedKey] = value;
        } else {
          Object.assign(messages, flattenMessages(value, prefixedKey));
        }
  
        return messages;
      },
      {}
    );
  };
  
  flattenMessages(en) 
  // output: key value pair
  {
    "app.title": "NextJS internalisation",
    "app.locale_switcher.en": "English",
    "app.locale_switcher.de": "German",
    "app.main.description": "This article is trying to explain how we can use react-intl with NextJS and use also Typescript to make our life easy!"
   }