<template>
  <a-modal
      title="添加角色"
      :visible="visible"
      :footer="null"
      @cancel="cancel"
      @ok="ok"
  >

  </a-modal>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {message} from "ant-design-vue";

export default defineComponent({
  props: {
    visible: Boolean,
  },
  emits: ['hideAddRoleModal'],
  setup(props, ctx) {
    const cancel = () => {
      message.info('取消')
      ctx.emit('hideAddRoleModal', false)
    }
    const ok = () => {
      ctx.emit('hideAddRoleModal')
    }
    return {
      ok,
      cancel
    }
  }
})
</script>

<style scoped>

</style>
