import {createRouter, createWebHistory } from "vue-router"

// 1.创建路由规则
const routes = [
    {
        // 路径地址
        path: '/login',
        // 路由规则名称
        name: 'login',
        // 导入对应的组件
        component: () => import('../views/login/index.vue')
    }
]
// 2.创建路由实例
const router = createRouter({
    history: createWebHistory(),
    // 指定路由规则
    routes,
})
export default router
// 3.创建登录组件

// 4.指定出口