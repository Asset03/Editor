import { defineStore } from "pinia";

export const useMessageStore = defineStore("messages", {
  state: () => {
    return {
      currentLanguage: "en",
      messages: {},
      languages: [],
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
    updateKey(key, value) {},
  },
});
