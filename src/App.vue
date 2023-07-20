<template>
  <div class="container">
    <ul class="nav nav-pills">
      <li class="nav-item" v-for="(item, index) in languages" :key="index">
        <a
          class="nav-link"
          :class="{ active: currentLanguage == item }"
          @click="changeLanguage(item)"
          >{{ item }}</a
        >
      </li>
    </ul>
    <div v-for="(value, key) in messages" :key="key">
      <MessageItem :item="value" :index="key" :messages="messages" />
    </div>
    <RemoveModal />
    <AddProperty />
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, computed, provide, reactive } from "vue";
import { useMessageStore } from "@/store/message.pinia";

import MessageItem from "./components/MessageItem.vue";
import RemoveModal from "./components/RemoveModal.vue";
import AddProperty from "./components/AddProperty.vue";

export default {
  name: "App",
  components: {
    MessageItem,
    RemoveModal,
    AddProperty,
  },
  setup() {
    const store = useMessageStore();

    const languages = computed(() => store.getLanguages);
    const messages = computed(() => store.getMessagesByCurrentLanguage);
    const currentLanguage = computed(() => store.getCurrentLanguage);

    const changeLanguage = computed(
      () => (val) => store.setCurrentLanguage(val)
    );

    onMounted(() => {
      fetchData();
    });
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/read-file");
        const data = response.data;
        store.setMessages(data);
      } catch (error) {
        console.error("Error while getting data: ", error);
      }
    };

    const dataRemoveModal = reactive({ opened: false, data: {} });
    const dataAddPropertyModal = reactive({ opened: false, data: {} });

    const onClickRemoveItem = () => {
      delete dataRemoveModal.data.messages[dataRemoveModal.data.index];
      dataRemoveModal.opened = false;
      store.setMessagesByCurrentLanguage(messages);
    };

    provide("onClickRemoveItem", onClickRemoveItem);

    provide("dataRemoveModal", dataRemoveModal);
    provide("dataAddPropertyModal", dataAddPropertyModal);
    return {
      languages,
      currentLanguage,
      changeLanguage,
      messages,
    };
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css");
</style>
