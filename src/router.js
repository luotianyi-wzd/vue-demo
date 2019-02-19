import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Echart from  './views/Echart'
import Map from './views/Map'
import Users from './views/Users'
import Picture from './views/Picture'
import Login from './views/Loign'
import Role from './views/Role'
// 路由懒加载
const getComponent = (name) => () => import(`./views/${name}.vue`);
Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/',
            component: getComponent('Page'),
            children: [
                {
                    path: '/home',
                    component: Home,
                    name: 'home',
                    type: 'ios-navigate',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/about',
                    name: 'about',
                    type: 'ios-book-outline',
                    // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
                    component: getComponent('About'),
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/movie',
                    name: 'movie',
                    type: 'ios-settings',
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
                    type: 'ios-pie-outline',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/map',
                    component: Map,
                    name: 'map',
                    type: 'ios-paper-plane-outline',
                },
                {
                    path: '/users',
                    component: Users,
                    name: 'users',
                    type: 'ios-camera-outline',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/picture',
                    component: Picture,
                    name: 'picture',
                    type: 'ios-folder-open-outline',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/role',
                    component: Role,
                    name: 'role',
                    type: 'ios-briefcase-outline',
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
let list = [

]
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
