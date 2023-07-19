import { defineStore } from "pinia";
import axios from "axios";

import { useApp } from "@/app";

const { objectToDotNotation, dotNotationToObject } = useApp();
export const useMessageStore = defineStore("messages", {
  state: () => {
    return {
      currentLanguage: "en",
      messages: {}, // en-{},ru-{},kz-{},
      path: "",
      dotNotations: {},
    };
  },
  getters: {
    getCurrentLanguage: (state) => state.currentLanguage,
    getMessagesByCurrentLanguage: (state) =>
      state.messages[state.currentLanguage],
    getLanguages: (state) => Object.keys(state.messages),
    getPath: (state) => state.path,
    getDotNotations: (state) => state.dotNotations,
  },
  actions: {
    addPath(index) {
      this.path += index;
    },
    removePath() {
      let arr = this.path.split(".");
      arr.pop();
      this.path = arr.join(".");
    },
    setCurrentLanguage(currentLanguage) {
      this.currentLanguage = currentLanguage;
    },
    setMessages(messages) {
      // en-{},ru-{},kz-{}
      this.messages = messages;
    },
    setMessagesByCurrentLanguage(messages) {
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
    updateValue(messages, index, val) {
      messages[index] = val;
      this.setMessagesByCurrentLanguage(this.getMessagesByCurrentLanguage);
      // axios post
    },

    updateKey(path, newIndex) {
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
    setDotNotations(messages) {
      this.dotNotations = objectToDotNotation(messages);
    },
  },
});
