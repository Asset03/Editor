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
    getMessages: (state) => state.messages,
    getMessageByLanguage: (state) => state.messages[state.currentLanguage],
  },
  actions: {
    setCurrentLanguage(currentLanguage) {
      this.currentLanguage = currentLanguage;
    },
    setMessages(messages) {
      this.messages = messages;
    },
    removeItem(mess, index) {
      delete mess[index];
    },
    updateValue(key, value) {},
    updateKey(key, value) {},
  },
});
