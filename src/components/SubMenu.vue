<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item v-for="route in routeList" :key="route.name">{{ route.title }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {authRoutes} from "@/router";

export default defineComponent({
  setup() {
    const routeList = ref([])
    const route = useRoute()
    // const generateSubMenu = (path: string, routes: any) => {
    //
    // }
    onMounted(() => {
      // routeList.value = generateSubMenu(route.path, authRoutes);
      // console.log(routeList.value)
    })
    watch(
        () => route.path,
        () => {
          // routeList.value = generateSubMenu(route.path, authRoutes);
        }
    )
    return {
      routeList,
      authRoutes
    }
  }
})
</script>

<style scoped>

</style>
