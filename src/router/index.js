import {createRouter, createWebHistory } from "vue-router"

// 1.创建路由规则
const routes = [
    {
        // 路径地址
        path: '/',
        // 路由规则名称
        name: 'layout',
        // 导入对应的组件
        component: () => import('../views/layout/index.vue'),
        // 子路由
        children: [
            {
                path: '/home',
                redirect: '/'
            },
            {
                // 路径地址 空串标识默认 设置的子路由
                path: '/',
                // 路由规则名称
                name: 'home',
                // 导入对应的组件
                component: () => import('../views/home/index.vue')
            },
            {
                // 路径地址
                path: '/my',
                // 路由规则名称
                name: 'my',
                // 导入对应的组件
                component: () => import('../views/my/index.vue')
            },
            {
                // 路径地址
                path: '/order',
                // 路由规则名称
                name: 'order',
                // 导入对应的组件
                component: () => import('../views/order/index.vue')
            },
        ]
    },
    {
        // 路径地址 空串标识默认 设置的子路由
        path: '/',
        // 路由规则名称
        name: 'login',
        // 导入对应的组件
        component: () => import('../views/login/index.vue'),
    },
];
// 2.创建路由实例
const router = createRouter({
    history: createWebHistory(),
    // 指定路由规则
    routes,
});
// 在路由文件最后添加全局前置守卫
// router.beforeEach((to, from, next) => {
//
//     // 2. 检查登录状态
//     const isAuthenticated = checkAuthStatus() // 检查用户是否登录
//
//     // 3. 处理需要认证的路由
//     if (to.meta.requiresAuth && !isAuthenticated) {
//         // 如果需要登录但未登录，重定向到登录页
//         // 携带redirect参数，以便登录后跳转回原页面
//         next({
//             name: 'Login',
//             query: { redirect: to.fullPath }
//         })
//     }
//     // 4. 已登录用户禁止访问登录页
//     else if (to.name === 'Login' && isAuthenticated) {
//         next({ name: 'Home' }) // 已登录用户直接跳转到首页
//     }
//     // 5. 其他情况正常放行
//     else {
//         next()
//     }
// })

// 检查登录状态的函数
function checkAuthStatus() {
    // 实际项目中可以从Vuex/Pinia或localStorage中获取
    return !!localStorage.getItem('authToken') // 简单示例
}

export default router;
// 3.创建登录组件

// 4.指定出口
