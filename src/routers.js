import { createRouter, createWebHistory } from 'vue-router'
import { MainPage } from '@/pages'

const routes = [
	{ path: '/', component: MainPage },
	{ path: '/main', component: MainPage },
	{ path: '/auth/login', component: MainPage },
]
export const router = createRouter({
	history: createWebHistory(),
	routes,
})
