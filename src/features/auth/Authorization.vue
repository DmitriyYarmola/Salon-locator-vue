<template>
	<div>
		<div v-if="!isLoading">
			<ModalTemplate>
				<LoginForm
					:error="error"
					:on-submit="onSubmit"
					:on-submit-google-code="onSubmitGoogleCode"
					v-if="!isShow2FAForm"
				/>
				<GoogleAuthForm :on-submit="onSubmitGoogleCode" :error="error" v-else />
			</ModalTemplate>
		</div>
		<Preloader v-else />
	</div>
</template>

<script>
import { ModalTemplate, LoginForm, GoogleAuthForm, Preloader } from '@/components'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getFromLocalStorage } from '@/lib'
export default {
	components: { Preloader, LoginForm, ModalTemplate, GoogleAuthForm },
	setup() {
		const store = useStore()
		const router = useRouter()
		const state = store.state.authModule
		const isAuth = computed(() => state.isAuth)
		const isRemember = ref(false)

		onMounted(() => {
			const isRememberMe = getFromLocalStorage('isRemember')
			isRemember.value = Boolean(isRememberMe)
		})
		const onSubmit = data => {
			store
				.dispatch('getToken', data)
				.then(({ isAuth }) => {
					if (isAuth) router.push('/admin')
				})
				.catch(error => console.log(error))
		}

		const onSubmitGoogleCode = data => {
			store
				.dispatch('sendGoogleCode', {
					code: data,
					isCode: true,
					isRemember: isRemember.value,
				})
				.then(() => {
					router.push('/admin')
				})
				.catch(error => console.log(error))
		}

		return {
			isLoading: computed(() => state.isLoading),
			isShow2FAForm: computed(() => state.isShow2FAForm),
			error: computed(() => state.error),
			onSubmit,
			onSubmitGoogleCode,
			isAuth,
		}
	},
}
</script>

<style scoped></style>
