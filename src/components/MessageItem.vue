<template>
  <div class="mt-3 mb-3 ps-5">
    <!-- if object -->
    <div v-if="isObject(item)">
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
          <input
            v-else
            @blur="editKey = !editKey"
            :value="index"
            @change="onChangeIndex"
          />:
          <span
            v-if="!isObjectOpened(index)"
            class="ms-2 text-decoration-underline"
            :class="{ empty: isEmpty(item) }"
            >{{ isEmpty(item) ? "empty" : "{...}" }}</span
          >
          <!-- write here in empty case -->
          <!-- actions -->
          <div class="actions d-flex align-item-center">
            <a class="ms-2" @click="onClickEditKey"
              ><i class="fa-solid fa-key"></i
            ></a>
            <a class="ms-2" @click="onClickOpenAddPropertyModal"
              ><i class="fa-solid fa-circle-plus"></i
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
                Object
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item"
                    @click="onClickChangeToObjectOrString"
                    >String</a
                  >
                </li>
              </ul>
            </div>
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
          v-if="!editValue"
          class="ms-2 text-decoration-underline"
          :class="{ empty: isEmpty(item) }"
          >{{ isEmpty(item) ? "empty" : item }}</span
        >
        <input
          v-else
          type="text"
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

    onMounted(() => {
      // console.log("DATA: ", store.getMessages);
    });
    const openNodes = ref([]);
    const editKey = ref(false);
    const editValue = ref(false);

    const onClickToggleObject = computed(() => (node) => {
      if (isObjectOpened(node)) {
        openNodes.value = openNodes.value.filter((n) => n !== node);
      } else {
        openNodes.value.push(node);
      }
    });

    const isObjectOpened = (node) => {
      return openNodes.value.includes(node);
    };

    const isObject = (val) => {
      return typeof val === "object";
    };
    const isEmpty = (node) => {
      return node == "" || Object.keys(node).length == 0;
    };

    const onClickChangeToObjectOrString = () => {
      if (isObject(props.messages[props.index])) {
        // to String
        props.messages[props.index] = "";
      } else {
        // to Object
        props.messages[props.index] = {};
      }
      // axios post
      console.log(props.messages);
    };

    const onClickEditKey = () => {
      editKey.value = !editKey.value;
    };
    const onChangeIndex = (event) => {
      // console.log(event.target.value);
      store.updateKey(props.messages, props.index, event.target.value);
      // change
    };

    const onClickEditValue = () => {
      editValue.value = !editValue.value;
    };
    const onChangeValue = (event) => {
      store.setMessagesByIndex(props.messages, props.index, event.target.value);
    };
    const dataRemoveModal = inject("dataRemoveModal");
    const dataAddPropertyModal = inject("dataAddPropertyModal");

    const onClickOpenRemoveModal = () => {
      dataRemoveModal.opened = true;
      dataRemoveModal.data = { index: props.index, messages: props.messages };
    };

    const onClickOpenAddPropertyModal = () => {
      dataAddPropertyModal.opened = true;
      dataAddPropertyModal.data = {
        messages: props.messages,
        index: props.index,
      };
    };
    return {
      isObject,
      onClickToggleObject,
      isObjectOpened,
      openNodes,
      isEmpty,
      onClickOpenRemoveModal,
      onClickOpenAddPropertyModal,
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
<style>
.actions {
  opacity: 0;
}
.index:hover .actions {
  opacity: 1;
}

.empty {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 2px 12px;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
</style>
