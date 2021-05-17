<template>

  <a-menu
      mode="inline"
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
      :style="{ height: '100%', borderRight: 0 }"
  >
    <template v-for="route in authRoutes" :key="route.name">
      <a-menu-item v-if="route.children===undefined" :key="route.name">
        <a-menu-item :key="route.name">
          <router-link :to="route.path">{{ route.title }}</router-link>
        </a-menu-item>
      </a-menu-item>
      <a-menu-item v-else-if="route.children.length===1&&route.redirect!==undefined" :key="route.name">
        <a-menu-item :key="route.name">
          <router-link :to="route.path">{{ route.title }}</router-link>
        </a-menu-item>
      </a-menu-item>
      <a-sub-menu v-else :key="route.name">
        <template #title>
              <span>
            <component :is="$antIcons[route.icon]"/>
                {{ route.title }}
              </span>
        </template>
        <a-menu-item v-for="r in route.children" :key="r.name">
          <router-link :to="r.path">
            <component :is="$antIcons[r.icon]"/>
            {{ r.title }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </template>
  </a-menu>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from "vue";
import {authRoutes} from "@/router";
import {useRoute} from "vue-router";

export default defineComponent({
  setup() {
    const selectedKeys = ref<string[]>(['/admin/list'])
    const openKeys = ref<string[]>(['admin'])
    const getTitle = (path: string, routes: any) => {
      for (let route of routes) {
        if (path === '/' || path === '/dashboard') {
          openKeys.value = ['dashboard']
          selectedKeys.value = ['dashboard']
          break
        }
        if (path.startsWith(route.path)) {
          openKeys.value = [...openKeys.value, route.name]
        }
        if (route.path === path) {
          openKeys.value = [...openKeys.value, route.name]
          selectedKeys.value = [route.name]
          document.title = route.title
          break
        }
        if (route.children !== undefined) {
          getTitle(path, route.children);
        }
      }
    }
    onMounted(() => {
      getTitle(route.path, authRoutes)
    })
    const route = useRoute();
    watch(
        () => route.path,
        () => {
          getTitle(route.path, authRoutes)
        }
    )

    return {
      selectedKeys,
      openKeys,
      collapsed: ref<boolean>(false),
      authRoutes
    }
  }
})
</script>

<style scoped>

</style>
