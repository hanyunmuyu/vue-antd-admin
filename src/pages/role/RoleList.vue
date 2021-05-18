<template>
  <div>
    <a-button type="primary" @click="showAddRoleModal">添加角色</a-button>
    <add-role
        :visible="addRoleState.visible"
        @hideAddRoleModal="hideAddRoleModal"
    />
    <edit-role
        :visible="editRoleState.visible"
        @hide-edit-role-modal="hideEditRoleModal"
    />
    <a-table
        :pagination="pagination"
        :loading="tableState.loading"
        :data-source="tableState.data"
        @change="change"
        rowKey="id"
    >
      <a-table-column title="ID" data-index="id"/>
      <a-table-column title="角色名称" data-index="roleName"/>

      <a-table-column key="action" title="管理">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary">编辑</a-button>
            <delete-role :role="record"/>
          </a-space>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>
<script lang="ts">
import {defineComponent, onMounted, reactive} from "vue";
import EditRole from "@/pages/role/EditRole.vue";
import {IRole} from "@/pages/role/IRole";
import DeleteRole from "@/pages/role/DeleteRole.vue";
import AddRole from "@/pages/role/AddRole.vue";

import {getRoleList} from "@/api/role";
import {computed} from "vue";

interface IRoleList {
  data: IRole[]
  current: number
  total: number
  pageSize: number
  loading: boolean
}

export default defineComponent({
  setup() {
    const addRoleState = reactive({
      visible: false,
    });
    const tableState = reactive<IRoleList>({
      data: [],
      current: 1,
      total: 0,
      pageSize: 15,
      loading: true
    });
    onMounted(() => {
      tableState.loading = true
      getRoleList().then((response) => {
        const {data, limit, current, total} = response.data.data;
        tableState.data = data;
        tableState.current = current;
        tableState.pageSize = limit;
        tableState.loading = false
        tableState.total = total
      });
    });
    const change = (pagination: { current: number }) => {
      tableState.loading = true
      getRoleList(pagination.current).then((response) => {
        const {data, limit, current, total} = response.data.data;
        tableState.data = data;
        tableState.current = current;
        tableState.pageSize = limit;
        tableState.loading = false
        tableState.total = total
      });
    };
    const pagination = computed(() => ({
      defaultPageSize: 15,
      hideOnSinglePage: true,
      total: tableState.total,
      current: tableState.current,
      pageSize: tableState.pageSize,
    }));

    const editRoleState = reactive({
      visible: false,
      role: {} as IRole,
    });
    const showAddRoleModal = () => {
      addRoleState.visible = true;
    };
    const deleteRole = (role: IRole) => {
      tableState.data = tableState.data.filter((r) => r.id !== role.id);
    };
    const showEditRole = (role: IRole) => {
      editRoleState.visible = true;
      editRoleState.role = role;
    };
    const hideEditRoleModal = (refresh?: boolean) => {
      if (refresh) {
        console.log(refresh);
      } else {
        editRoleState.visible = false;
      }
    };
    const hideAddRoleModal = (refresh?: boolean) => {
      if (refresh) {
        console.log(refresh);
      }
      addRoleState.visible = false;
    };
    return {
      tableState,
      editRoleState,
      addRoleState,
      showAddRoleModal,
      hideAddRoleModal,
      deleteRole,
      hideEditRoleModal,
      showEditRole,
      pagination,
      change
    };
  },
  components: {
    AddRole,
    DeleteRole,
    EditRole,
  },
});
</script>

