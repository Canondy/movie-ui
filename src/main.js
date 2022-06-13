import { createApp } from 'vue'
import App from './App.vue'
// 导入Vant组件
import Vant from 'vant'
// 导入Vant的css样式
import "vant/lib/index.css"
// 导入rem适配相关
import "amfe-flexible"
// 导入路由实例
import router from "./router";
// 导入全局样式
import "./assets/styles/index.css";
// 导入store实例 vuex
import store from "./store";
createApp(App)
    .use(Vant)
    .use(router)
    .use(store)
    .mount('#app')
