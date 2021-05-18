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
import {defineComponent, PropType} from "vue";
import {message} from "ant-design-vue";
import {deleteRoleById} from "@/api/role";
import {IRole} from "@/pages/role/IRole";

export default defineComponent({
  props: {
    role: Object as PropType<IRole>,
  },
  emits: ['deleteRole'],
  setup(props, ctx) {
    const cancelDeleteRole = () => {
      message.info('取消删除')
    }
    const deleteRole = () => {
      if (props.role) {
        deleteRoleById(props.role.id as number).then(response => {
          const {code, msg} = response.data
          if (code === 1) {
            message.error(msg)
          } else {
            message.success('删除成功')
            ctx.emit('deleteRole', props.role)
          }
        })
      }
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
