import {createApp} from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import * as antIcons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/antd.css';
import router from './router';

const app = createApp(App)
Object.keys(antIcons).forEach(key => {
    // @ts-ignore
    app.component(key, antIcons[key])
})
app.config.globalProperties.$antIcons = antIcons

app.use(Antd).use(router).mount('#app')
