<template>
  <a-menu
      theme="dark"
      mode="horizontal"
      v-model:selectedKeys="selectedKeys1"
      :style="{ lineHeight: '64px' }"
  >
    <a-menu-item key="1">nav 1</a-menu-item>
    <a-menu-item key="2">nav 2</a-menu-item>
    <a-menu-item key="3">nav 3</a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import {defineComponent, ref, reactive} from "vue";
import {authRoutes} from "@/router";

export default defineComponent({
  setup() {
    const routeList = reactive([])
    return {
      authRoutes,
      routeList,
      selectedKeys1: ref<string[]>(['2']),
    }
  }
})
</script>

<style scoped>

</style>
