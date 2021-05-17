<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo"/>
      <top-header/>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <left-bar/>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <sub-menu/>
        <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <router-view/>
          <slot/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import LeftBar from "@/components/LeftBar.vue";
import TopHeader from "@/components/TopHeader.vue";
import SubMenu from "@/components/SubMenu.vue";

export default defineComponent({
  components: {SubMenu, TopHeader, LeftBar},
  setup() {
    return {};
  },
})
</script>
<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
