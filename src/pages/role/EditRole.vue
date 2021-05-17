<template>
  <a-modal
      :visible="visible"
      title="编辑管理员信息"
      @ok="handleOk"
      @cancel="hideModal"
      :footer="null"
  >
    <p>Some contents...</p>
  </a-modal>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    visible: Boolean,
    role: Object,
  },
  emits: ['hideEditRoleModal'],
  setup(props, ctx) {
    const hideModal = () => {
      ctx.emit('hideEditRoleModal', false)
    };
    const handleOk = (e: MouseEvent) => {
      console.log(e);
      ctx.emit('hideEditRoleModal', true)
    };
    return {
      hideModal,
      handleOk,
    }
  }
})
</script>

<style scoped>

</style>
