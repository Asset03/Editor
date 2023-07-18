import { defineStore } from "pinia";

export const useMessageStore = defineStore("messages", {
  state: () => {
    return {
      currentLanguage: "en",
      messages: {},
      messagesByIndex: {},
    };
  },
  getters: {
    getCurrentLanguage: (state) => state.currentLanguage,
    getMessages: (state) => state.messages,
    getMessageByLanguage: (state) => state.messages[state.currentLanguage],
    getMessagesByIndex: (state) => state.messagesByIndex,
  },
  actions: {
    setCurrentLanguage(currentLanguage) {
      this.currentLanguage = currentLanguage;
    },
    setMessages(messages) {
      this.messages = messages;
    },
    setMessagesByIndex(messages, index) {
      this.messagesByIndex = messages[index];
    },
    removeItem(mess, index) {
      delete mess[index];
    },
    updateValue(key, value) {},
    updateKey(key, value) {},
  },
});
