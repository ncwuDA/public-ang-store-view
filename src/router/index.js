import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/login/Login.vue')
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        redirect: '/index',
        children: [
            {
                path: '/index',
                name: 'index',
                component: () => import('../views/welcome/Welcome.vue'),
            },
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home'),
            },
            {
                path: '/order',
                name: 'order',
                component: () => import('../views/order')
            },
            {
                path: '/goods',
                name: 'goods',
                component: () => import('../views/goods')
            }
        ]

    },

   
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router