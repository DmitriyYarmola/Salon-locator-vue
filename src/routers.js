import { createRouter, createWebHistory } from 'vue-router'
import { LoginPage, MainPage } from '@/pages'

const routes = [
	{ path: '/', component: MainPage },
	{ path: '/main', component: MainPage },
	{ path: '/auth/login', component: LoginPage },
]
export const router = createRouter({
	history: createWebHistory(),
	routes,
})
