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
		const isAdmin =
			pathname.includes('brands') ||
			pathname.includes('admin') ||
			pathname.includes('security')
		return {
			isAdmin,
			router,
		}
	},
}
</script>

<style module></style>
