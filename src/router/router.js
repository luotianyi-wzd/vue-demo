import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
// 路由懒加载
const getComponent = (name) => () => import(`@/views/${name}.vue`)

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        {
            path: '/login',
            name: 'login',
            component: getComponent('Login'),
        },
        {
            path: '/',
            component: getComponent('Page'),
            children: [
                {
                    path: '/index',
                    component: getComponent('Index'),
                    name: 'index',
                    type: 'ios-navigate',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/home',
                    component: getComponent('Home'),
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
                    component: getComponent('Echart'),
                    name: 'echart',
                    type: 'ios-pie-outline',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/map',
                    component: getComponent('Map'),
                    name: 'map',
                    type: 'ios-paper-plane-outline',
                },
                {
                    path: '/users',
                    component: getComponent('Users'),
                    name: 'users',
                    type: 'ios-camera-outline',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/picture',
                    component: getComponent('Picture'),
                    name: 'picture',
                    type: 'ios-folder-open-outline',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: '/role',
                    component: getComponent('Role'),
                    name: 'role',
                    type: 'ios-briefcase-outline',
                    meta: {
                        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
            ]
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
