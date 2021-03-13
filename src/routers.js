import { createRouter, createWebHistory } from 'vue-router'
import { AdminPage, EmptyPage, LoginPage } from '@/pages'
import { getFromLocalStorage, getFromSessionStorage } from '@/lib'

const ifAuthenticated = (to, from, next) => {
	const isAuth = getFromLocalStorage('isAuth') || getFromSessionStorage('isAuth')
	if (isAuth) {
		next()
		return
	}
	next('/auth/login')
}

const ifNotAuthenticated = (to, from, next) => {
	const isAuth = getFromLocalStorage('isAuth') || getFromSessionStorage('isAuth')
	if (!isAuth) {
		next()
		return
	}
	next('/admin')
}

const routes = [
	{ path: '/', component: EmptyPage },
	{ path: '/auth/login', component: LoginPage, beforeEnter: ifNotAuthenticated },
	{ path: '/admin', component: AdminPage, beforeEnter: ifAuthenticated },
]
export const router = createRouter({
	history: createWebHistory(),
	routes,
})
