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
          <strong>{{ index }}</strong
          >:
          <span
            v-if="!isObjectOpened(index) && !isEmpty(item)"
            class="ms-2 text-decoration-underline"
            >{...}</span
          >
          <!-- write here in empty case -->
        </div>
        <!-- actions -->
        <div class="actions d-flex align-item-center">
          <a class="ms-2"><i class="fa-solid fa-key"></i></a>
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
              {{ isObject ? "Object" : "String" }}
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item">{{
                  isObject ? "Object" : "String"
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- if opened display object data -->
      <div
        v-if="isObjectOpened(index)"
        v-for="(value, key) in item"
        :key="index"
      >
        <MessageItem :item="value" :index="key" />
      </div>
    </div>
    <!-- if string -->
    <div v-else>
      <!--  -->
      <div class="index d-flex align-items-center">
        <strong>{{ index }}</strong
        >:
        <span v-if="!isEmpty(item)" class="ms-2 text-decoration-underline">{{
          item
        }}</span>
        <!-- write here in empty case -->
        <div class="actions d-flex align-items-center">
          <a class="ms-2"><i class="fa-solid fa-key"></i></a>
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
              {{ isObject ? "Object" : "String" }}
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item">{{
                  isObject ? "Object" : "String"
                }}</a>
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
import { computed, ref, inject, provide, onMounted } from "vue";
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
  },
  setup(props) {
    const store = useMessageStore();

    const openNodes = ref([]);
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

    const isObject = computed(() => {
      return typeof props.item == "object";
    });
    const isEmpty = (node) => {
      return node == "" || Object.keys(node).length == 0;
    };

    const dataRemoveModal = inject("dataRemoveModal");
    const onClickOpenRemoveModal = () => {
      dataRemoveModal.opened = true;
      dataRemoveModal.data = props.index;
    };
    return {
      isObject,
      onClickToggleObject,
      isObjectOpened,
      openNodes,
      isEmpty,
      onClickOpenRemoveModal,
    };
  },
};
</script>
<style></style>
