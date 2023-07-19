import { defineStore } from "pinia";
import axios from "axios";

export const useMessageStore = defineStore("messages", {
  state: () => {
    return {
      currentLanguage: "en",
      messages: {}, // en-{},ru-{},kz-{},
      indexes: [],
    };
  },
  getters: {
    getCurrentLanguage: (state) => state.currentLanguage,
    getMessagesByCurrentLanguage: (state) =>
      state.messages[state.currentLanguage],
    getLanguages: (state) => Object.keys(state.messages),
    getIndexes: (state) => state.indexes,
  },
  actions: {
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
          console.log(data);
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

    updateKey(messages, oldIndex, newIndex) {
      const keys = Object.keys(messages);
      const newObj = {};
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = messages[key];
        const myKey = key === oldIndex ? newIndex : key;
        newObj[myKey] = value;
      }
      messages = newObj;
      console.log("NEW: ", messages);
      this.setMessagesByCurrentLanguage(this.getMessagesByCurrentLanguage);
    },
  },
});
