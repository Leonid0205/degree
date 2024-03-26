import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from './Pages/Home.vue'
import Favorites from './Pages/Favorites.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
const app = createApp(App);
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')