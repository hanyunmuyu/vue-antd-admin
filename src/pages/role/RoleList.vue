<template>
  <div>
    <a-button type="primary" @click="showAddRoleModal">添加角色</a-button>
    <add-role :visible="addRoleState.visible" @hideAddRoleModal="hideAddRoleModal"/>
    <edit-role :visible="editRoleState.visible" @hide-edit-role-modal="hideEditRoleModal"/>
    <a-table :columns="columns" :data-source="dataState.data">
      <template #name="{ text }">
        <a>{{ text }}</a>
      </template>
      <template #customTitle>
      <span>
        <smile-outlined/>
        Name
      </span>
      </template>
      <template #tags="{ text: tags }">
      <span>
        <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      </template>
      <template #action="{ record }">
        <a-space>
          <a-button type="primary" @click="showEditRole(record)">编辑</a-button>
          <delete-role :role="record" @deleteRole="deleteRole"/>
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import {defineComponent, onMounted, reactive} from 'vue';
import EditRole from "@/pages/role/EditRole.vue";
import {IRole} from "@/pages/role/IRole";
import DeleteRole from "@/pages/role/DeleteRole.vue";
import AddRole from "@/pages/role/AddRole.vue";

// import {getRoleList} from "@/api/role";


const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: {title: 'customTitle', customRender: 'name'},
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: {customRender: 'tags'},
  },
  {
    title: 'Action',
    key: 'action',
    slots: {customRender: 'action'},
  },
];

const data: IRole[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export default defineComponent({
  setup() {
    const addRoleState = reactive({
      visible: false
    })
    const dataState = reactive<{ data: IRole[] }>({data: []})
    onMounted(() => {
      // getRoleList()
      dataState.data = data
    })
    const editRoleState = reactive({
      visible: false,
      role: {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      }
    })
    const showAddRoleModal = () => {
      addRoleState.visible = true
    }
    const deleteRole = (role: IRole) => {
      console.log(role)
      dataState.data = dataState.data.filter((r) => r.key !== role.key)
    }
    const showEditRole = (role: IRole) => {
      editRoleState.visible = true
      editRoleState.role = role
    }
    const hideEditRoleModal = (refresh?: boolean) => {
      if (refresh) {
        console.log(refresh)
      } else {
        editRoleState.visible = false;
      }
    }
    const hideAddRoleModal = (refresh?:boolean) => {
      if (refresh) {
        console.log(refresh)
      }
      addRoleState.visible = false;
    }
    return {
      data,
      dataState,
      editRoleState,
      addRoleState,
      showAddRoleModal,
      hideAddRoleModal,
      deleteRole,
      hideEditRoleModal,
      showEditRole,
      columns,
    };
  },
  components: {
    AddRole,
    DeleteRole,
    EditRole,
  },
});
</script>

