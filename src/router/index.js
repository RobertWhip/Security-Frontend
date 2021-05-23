import { createRouter, createWebHistory } from 'vue-router';
import EditBypass from '../views/EditBypass';
import Login from '../views/Login';
import Home from '../views/Home';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/update-bypass',
        name: 'UpdateBypass',
        props: true,
        component: EditBypass,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
