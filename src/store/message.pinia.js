import { defineStore } from "pinia";

export const useMessageStore = defineStore("messages", {
  state: () => {
    return {
      currentLanguage: "en",
      messages: {},
    };
  },
  getters: {
    getCurrentLanguage: (state) => state.currentLanguage,
    getMessages: (state) => state.messages[state.currentLanguage],
    getLanguages: (state) => Object.keys(state.messages),
  },
  actions: {
    setCurrentLanguage(currentLanguage) {
      this.currentLanguage = currentLanguage;
    },
    setMessages(messages) {
      this.messages = messages;
    },
    setMessagesByIndex(messages, index, val) {
      messages[index] = val;
      this.setMessages(this.messages);
      // axios post
    },
    removeItem(mess, index) {
      delete mess[index];
    },
    updateValue(key, value) {},
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
    setMessagesByCurrentLanguage(messages) {
      this.messages[this.currentLanguage] = messages;
    },
  },
});
