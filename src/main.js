import { createApp } from 'vue'
import App from './App.vue'
// 导入Vant组件
import Vant from 'vant'
// 导入Vant的css样式
import "vant/lib/index.css"
createApp(App)
    .use(Vant)
    .mount('#app')
