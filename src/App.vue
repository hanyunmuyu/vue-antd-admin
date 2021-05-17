<template>
  <a-config-provider :locale="zhCN">
    <router-view/>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import {defineComponent} from 'vue';

moment.locale(zhCN.locale);
export default defineComponent({
  setup() {
    return {
      zhCN
    };
  },
});
</script>
