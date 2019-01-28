import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Echart from  './views/Echart'
import Map from './views/Map'
import Users from './views/Users'
import Picture from './views/Picture'
import Login from './views/Loign'
// 路由懒加载
const getComponent = (name) => () => import(`./views/${name}.vue`);
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/page',
            component: getComponent('Page'),
        },
        {
            path: '/',
            component: getComponent('Page'),

            children: [
                {
                    path: '/page',
                    component: Home,
                    name: 'home',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/home',
                    component: Home,
                    name: 'home',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/about',
                    name: 'about',
                    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
                    component: getComponent('About'),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/movie',
                    name: 'movie',
                    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
                    component: getComponent('Movie'),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/echart',
                    component: Echart,
                    name: 'echart',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/map',
                    component: Map,
                    name: 'map'
                },
                {
                    path: '/users',
                    component: Users,
                    name: 'users',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/picture',
                    component: Picture,
                    name: 'picture',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '*',
            name: 'notFound',
            component: getComponent('NotFound')
        }
    ]
})

router.beforeEach((to, from, next) => {
    // 合法性校验
    if (to.meta.requireAuth) {
        if (!!window.localStorage.username) {
            next()
        } else {
            next({
                path: '/login',
            })
        }
    } else {
        next()
    }
});

export default router;