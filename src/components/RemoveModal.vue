<template>
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    :class="{ ' d-block': dataRemoveModal.opened }"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirmation</h5>
          <button
            type="button"
            class="btn-close"
            @click="dataRemoveModal.opened = !dataRemoveModal.opened"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            Are you sure you want to remove
            <strong>{{ dataRemoveModal.data.index }}</strong
            >?
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="dataRemoveModal.opened = !dataRemoveModal.opened"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="onClickRemoveItem"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  name: "RemoveModal",
  props: {},
  setup() {
    const dataRemoveModal = inject("dataRemoveModal");
    const onClickRemoveItem = inject("onClickRemoveItem");
    return { dataRemoveModal, onClickRemoveItem };
  },
};
</script>
