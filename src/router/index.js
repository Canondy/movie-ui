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
                path: '',
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
            {
                // 电影详情页路由
                path: '/movie/:id',
                // 路由规则名称
                name: 'movieDetail',
                // 导入对应的组件
                component: () => import('../components/movie/MovieDetail.vue'),
            },
        ]
    }
];
// 2.创建路由实例
const router = createRouter({
    history: createWebHistory(),
    // 指定路由规则
    routes,
});

export default router;
