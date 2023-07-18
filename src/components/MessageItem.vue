<template>
  <div class="mt-3 mb-3 ps-5">
    <!-- if object -->
    <div v-if="isObject">
      <div class="d-flex align-item-center">
        <!-- toggle -->
        <button
          class="toggle btn btn-sm btn-light"
          @click="onClickToggleObject(index)"
        >
          <i
            :class="[
              'fa-solid ',
              isObjectOpened(index) ? 'fa-minus' : 'fa-plus',
            ]"
          ></i>
        </button>
        <!-- index -->
        <div class="index d-flex align-items-center">
          <strong v-if="!editKey">{{ index }}</strong>
          <input v-else @blur="editKey = !editKey" :value="index" />:
          <span
            v-if="!isObjectOpened(index) && !isEmpty(item)"
            class="ms-2 text-decoration-underline"
            >{...}</span
          >
          <!-- write here in empty case -->
        </div>
        <!-- actions -->
        <div class="actions d-flex align-item-center">
          <a class="ms-2" @click="onClickEditKey"
            ><i class="fa-solid fa-key"></i
          ></a>
          <a class="ms-2"><i class="fa-solid fa-circle-plus"></i></a>
          <a class="ms-2" @click="onClickOpenRemoveModal"
            ><i class="fa-solid fa-trash"></i
          ></a>
          <!-- dropdown -->
          <div class="dropdown ms-2">
            <button
              class="btn btn-sm btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Object
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" @click="onClickChangeToObjectOrString"
                  >String</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- if opened display object data -->
      <div
        :class="isObjectOpened"
        v-if="isObjectOpened(index)"
        v-for="(value, key) in item"
        :key="index"
      >
        <MessageItem :item="value" :index="key" :messages="messages[index]" />
      </div>
    </div>
    <!-- if string -->
    <div v-else>
      <!--  -->
      <div class="index d-flex align-items-center">
        <strong v-if="!editKey">{{ index }}</strong>
        <input
          v-else
          @blur="editKey = !editKey"
          :value="index"
          @change="onChangeIndex"
        />:
        <span
          v-if="!isEmpty(item) && !editValue"
          class="ms-2 text-decoration-underline"
          >{{ item }}</span
        >
        <input
          v-else
          type="textarea"
          :value="item"
          @blur="editValue = !editValue"
          @change="onChangeValue"
        />
        <!-- write here in empty case -->
        <div class="actions d-flex align-items-center">
          <a class="ms-2" @click="onClickEditKey"
            ><i class="fa-solid fa-key"></i
          ></a>
          <a class="ms-2" @click="onClickEditValue"
            ><i class="fa-solid fa-pen-to-square"></i
          ></a>
          <a class="ms-2" @click="onClickOpenRemoveModal"
            ><i class="fa-solid fa-trash"></i
          ></a>
          <!-- dropdown -->
          <div class="dropdown ms-2">
            <button
              class="btn btn-sm btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              String
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" @click="onClickChangeToObjectOrString"
                  >Object</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MessageItem from "@/components/MessageItem.vue";
import { useMessageStore } from "@/store/message.pinia";
import { computed, ref, inject, provide, onMounted, reactive } from "vue";
export default {
  name: "MessageItem",
  components: {
    MessageItem,
  },
  props: {
    item: {
      type: [String, Object],
    },
    index: {
      type: [String, Number],
    },
    messages: {
      type: Object,
    },
  },
  setup(props) {
    const store = useMessageStore();

    const openNodes = reactive([]);
    const editKey = ref(false);
    const editValue = ref(false);

    const onClickToggleObject = computed(() => (node) => {
      if (isObjectOpened(node)) {
        openNodes = openNodes.filter((n) => n !== node);
      } else {
        openNodes.push(node);
      }
      console.log(isObjectOpened(node));
    });

    const isObjectOpened = (node) => {
      return openNodes.includes(node);
    };

    const isObject = computed(() => {
      return typeof props.item == "object";
    });
    const isEmpty = (node) => {
      return node == "" || Object.keys(node).length == 0;
    };

    const onClickChangeToObjectOrString = () => {
      console.log("ME: ", props.messages[props.index]);
      if (isObject) {
        // to String
        props.messages[props.index] = "";
      } else {
        // to Object
        props.messages[props.index] = {};
      }
    };

    const onClickEditKey = () => {
      editKey.value = !editKey.value;
    };
    const onChangeIndex = (event) => {
      console.log(event.target.value);
    };

    const onClickEditValue = () => {
      editValue.value = !editValue.value;
    };
    const onChangeValue = (event) => {
      store.setMessagesByIndex(props.messages, props.index);
      console.log("Store: ", store.getMessagesByIndex);
    };
    const dataRemoveModal = inject("dataRemoveModal");

    const onClickOpenRemoveModal = () => {
      dataRemoveModal.opened = true;
      dataRemoveModal.data = { index: props.index, messages: props.messages };
    };
    return {
      isObject,
      onClickToggleObject,
      isObjectOpened,
      openNodes,
      isEmpty,
      onClickOpenRemoveModal,
      onClickChangeToObjectOrString,
      onClickEditKey,
      editKey,
      onChangeIndex,
      onClickEditValue,
      editValue,
      onChangeValue,
    };
  },
};
</script>
<style></style>
