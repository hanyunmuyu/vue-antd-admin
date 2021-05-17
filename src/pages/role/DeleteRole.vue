<template>
  <a-popconfirm
      title="删除管理员"
      @cancel="cancelDeleteRole"
      @confirm="deleteRole"
  >
    <a-button type="danger">删除</a-button>
  </a-popconfirm>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {message} from "ant-design-vue";

export default defineComponent({
  props: {
    role: Object,
  },
  emits: ['deleteRole'],
  setup(props, ctx) {
    const cancelDeleteRole = () => {
      message.info('取消删除')
    }
    const deleteRole = () => {
      ctx.emit('deleteRole', props.role)
      message.success('删除成功')
    }
    return {
      cancelDeleteRole,
      deleteRole
    }
  }
})
</script>

<style scoped>

</style>
