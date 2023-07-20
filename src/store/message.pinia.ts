import { defineStore } from "pinia";
import axios from "axios";

import { useApp } from "@/app";
const { objectToDotNotation, dotNotationToObject } = useApp();

interface MessageObject {
  [key: string]: string | object;
}
interface State {
  currentLanguage: string;
  messages: { [key: string]: MessageObject };
  path: string;
  dotNotations: Record<string, any>;
}
export const useMessageStore = defineStore("messages", {
  state: (): State => {
    return {
      currentLanguage: "en",
      messages: {},
      path: "",
      dotNotations: {},
    };
  },
  getters: {
    getCurrentLanguage: (state): string => state.currentLanguage,
    getMessagesByCurrentLanguage: (state): MessageObject =>
      state.messages[state.currentLanguage],
    getLanguages: (state): string[] => Object.keys(state.messages),
    getPath: (state): string => state.path,
    getDotNotations: (state): Record<string, any> => state.dotNotations,
  },
  actions: {
    addPath(index: string): void {
      this.path += index;
    },
    removePath(): void {
      let arr = this.path.split(".");
      arr.pop();
      this.path = arr.join(".");
    },
    setCurrentLanguage(currentLanguage: string): void {
      this.currentLanguage = currentLanguage;
    },
    setMessages(messages: { [key: string]: MessageObject }): void {
      // en-{},ru-{},kz-{}
      this.messages = messages;
    },
    setMessagesByCurrentLanguage(messages: MessageObject): void {
      // en-{},ru-{},kz-{}
      this.messages[this.currentLanguage] = messages;
      const data = this.getMessagesByCurrentLanguage;
      axios
        .post(
          `http://localhost:3000/write-file?param=${this.getCurrentLanguage}`,
          { data }
        )
        .then(() => {
          console.log("updated");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updateValue(messages: MessageObject, index: string, val: MessageObject) {
      messages[index] = val;
      this.setMessagesByCurrentLanguage(this.getMessagesByCurrentLanguage);
      // axios post
    },

    updateKey(path: string, newIndex: string): void {
      this.setDotNotations(this.getMessagesByCurrentLanguage);
      let jsonString = JSON.stringify(this.dotNotations);
      this.removePath();

      this.path != "" ? this.addPath(`.${newIndex}`) : this.addPath(newIndex);

      jsonString = jsonString.replace(
        new RegExp(`"${path}`, "g"),
        `"${this.path}`
      );
      this.setDotNotations(JSON.parse(jsonString));
      this.setMessagesByCurrentLanguage(dotNotationToObject(this.dotNotations));
    },
    setDotNotations(messages: MessageObject): void {
      this.dotNotations = objectToDotNotation(messages);
    },
  },
});
