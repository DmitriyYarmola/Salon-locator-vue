<template>
	<div v-if="!isLoading">
		<ModalTemplate>
			<LoginForm
				error=""
				:on-submit="onSubmit"
				:on-submit-google-code="onSubmitGoogleCode"
			/>
		</ModalTemplate>
	</div>
</template>

<script>
import { ModalTemplate, LoginForm } from '@/components'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
	components: { LoginForm, ModalTemplate },
	data: () => ({}),
	setup() {
		const store = useStore()
		const router = useRouter()
		const getters = store.getters
		const isAuth = computed(() => getters.isAuth)
		const isRemember = computed(() => getters.isRemember)
		if (isAuth.value) {
			router.push('/admin')
			return
		}

		const onSubmit = data => {
			store.dispatch('getToken', data)
		}

		const onSubmitGoogleCode = data => {
			store.dispatch('sendGoogleCode', {
				code: data,
				isCode: true,
				isRemember: isRemember.value,
			})
		}

		return {
			isLoading: computed(() => getters.isLoading),
			isShow2FAForm: computed(() => getters.isShow2FAForm),
			error: computed(() => getters.error),
			onSubmit,
			onSubmitGoogleCode,
		}
	},
}
</script>

<style scoped></style>
