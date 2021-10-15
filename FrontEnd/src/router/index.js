import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from "@/views/Register";
import Home from "@/views/Home";
import Profile from "@/views/Profile";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path:'/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
