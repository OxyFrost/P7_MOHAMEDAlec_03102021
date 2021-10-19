import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from "@/views/Register";
import Home from "@/views/Home";
import Profile from "@/views/Profile";
import EditProfile from "@/views/EditProfile";
import Post from "@/views/Post";
import EditPost from "@/views/EditPost";
import CreatePost from "@/views/CreatePost";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => {
            if (sessionStorage.getItem('token') !== null) {
                return Home;
            } else {
                return Login;
            }
        }
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
        path: '/post/create',
        name: 'CreatePost',
        component: CreatePost
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post
    },
    {
        path: '/post/:id/edit',
        name: 'EditPost',
        component: EditPost
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/profile/:id/edit',
        name: 'EditProfile',
        component: EditProfile
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
