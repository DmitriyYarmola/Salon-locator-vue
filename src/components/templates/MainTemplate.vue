<template>
	<div>
		<div v-if="!isAdmin">
			<slot />
		</div>
		<div v-else>
			<AdminTemplate sidebar="sidebar"><slot /></AdminTemplate>
		</div>
	</div>
</template>

<script>
import { getFromLocalStorage, getFromSessionStorage } from '@/lib'
import AdminTemplate from './AdminTemplate'
import { useRoute, useRouter } from 'vue-router'

export default {
	components: { AdminTemplate },
	data: () => ({
		sidebar: {
			type: String,
		},
	}),
	setup() {
		const route = useRoute()
		const router = useRouter()
		const pathname = route.fullPath
		const isAuthorizationPage = pathname === '/auth/login'
		const token = getFromLocalStorage('token') || getFromSessionStorage('token')
		const isAuth = getFromLocalStorage('isAuth') || getFromSessionStorage('isAuth')
		const isAdmin =
			pathname.includes('brands') ||
			pathname.includes('admin') ||
			pathname.includes('security')
		if (isAuthorizationPage) {
			if (token || isAuth) {
				router.push('/admin')
				return
			}
		}

		if (!token || !isAuth) {
			router.push('/auth/login')
			return
		}
		return {
			isAdmin,
			isAuth,
			token,
			isAuthorizationPage,
			router,
		}
	},
}
</script>

<style module></style>
