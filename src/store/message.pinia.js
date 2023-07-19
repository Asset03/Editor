import { defineStore } from "pinia";

export const useMessageStore = defineStore("messages", {
  state: () => {
    return {
      currentLanguage: "en",
      messages: {}, // en-{},ru-{},kz-{},
    };
  },
  getters: {
    getCurrentLanguage: (state) => state.currentLanguage,
    getMessagesByCurrentLanguage: (state) =>
      state.messages[state.currentLanguage],
    getLanguages: (state) => Object.keys(state.messages),
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
      this.setMessagesByCurrentLanguage(newObj);
    },
  },
});
