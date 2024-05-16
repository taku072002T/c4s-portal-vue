<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'

export default {
  name: 'BootstrapModal',
  props: ['title'],
  data() {
    return {
      modal: new Modal(this.$refs.modal)
    }
  },
  methods: {
    show() {
      this.modal.show()
    },
    hide() {
      this.modal.hide()
    }
  }
}
</script>

<style></style>
