<template>
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    :class="{ ' d-block': dataAddPropertyModal.opened }"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Property</h5>
          <button
            type="button"
            class="btn-close"
            @click="dataAddPropertyModal.opened = !dataAddPropertyModal.opened"
          ></button>
        </div>
        <div class="modal-body">
          <!-- write here -->
          <div class="input-group input-group-sm mb-3">
            <span class="input-group-text" id="inputGroup-sizing-sm">Key</span>
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              v-model="newKey"
            />
          </div>
          <div class="input-group input-group-sm mb-3">
            <select
              class="form-select"
              @change="isObjectOrString"
              aria-label="Default select example"
            >
              <option selected value="Value">Value</option>
              <option value="Object">Object</option>
            </select>
          </div>
          <div v-if="isString" class="input-group input-group-sm mb-3">
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              v-model="newValue"
            />
          </div>
        </div>
        <!-- write  -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="dataAddPropertyModal.opened = !dataAddPropertyModal.opened"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="onClickAddProperty"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, ref, computed } from "vue";
import { useMessageStore } from "@/store/message.pinia";
export default {
  name: "AddProperty",
  props: {},
  setup() {
    const store = useMessageStore();
    const messages = computed(() => store.getMessages);

    const dataAddPropertyModal = inject("dataAddPropertyModal");
    const isString = ref(true);
    const newKey = ref("");
    const newValue = ref("");

    const isObjectOrString = (event) => {
      if (event.target.value == "Value") {
        isString.value = true;
      } else {
        isString.value = false;
      }
    };

    const onClickAddProperty = () => {
      dataAddPropertyModal.opened = false;
      if (isString.value) {
        dataAddPropertyModal.data.messages[dataAddPropertyModal.data.index][
          newKey.value
        ] = newValue.value;
      } else {
        const newObject = { [newKey.value]: {} };
        dataAddPropertyModal.data.messages[dataAddPropertyModal.data.index] = {
          ...dataAddPropertyModal.data.messages[
            dataAddPropertyModal.data.index
          ],
          ...newObject,
        };
        store.setMessages(messages);
      }
      console.log("EX: ", store.getMessages);
    };
    return {
      dataAddPropertyModal,
      isObjectOrString,
      isString,
      newKey,
      newValue,
      onClickAddProperty,
    };
  },
};
</script>
