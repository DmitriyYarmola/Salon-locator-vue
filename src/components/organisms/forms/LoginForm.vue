<template>
	<form @submit.prevent="onSubmitForm" :class="$style.form_wrapper">
		<h1 :class="$style.title">Sign In</h1>
		<div :class="$style.fields">
			<Field
				name="email"
				:on-change="onChangeEmail"
				:is-border="true"
				placeholder="Email"
				:error="emailError"
			/>
			<Field
				name="password"
				:on-change="onChangePassword"
				:is-border="true"
				placeholder="Password"
				:error="passwordError"
				type="password"
			/>
			<Error v-if="globalError">{{ globalError }}</Error>
			<div :class="$style.actions">
				<div :class="$style.checkbox_wrapper">
					<Checkbox :on-change="onChangeIsRemember" />
					<span>Stay in</span>
				</div>
				<Button :main-color="mainColor" type="submit" :isBackground="true"
					>Sign In</Button
				>
			</div>
		</div>
	</form>
</template>

<script>
import { Error, Button, Checkbox, Field } from '@/components'
import { ref, toRefs } from 'vue'
import { validateEmail, validationErrors, getStaticColorFromName } from '@/lib'
export default {
	components: {
		Field,
		Error,
		Button,
		Checkbox,
	},
	props: {
		error: {
			type: String,
			required: true,
		},
		isShow2FAForm: {
			type: Boolean,
			required: false,
		},
		onSubmit: {
			type: Function,
			required: true,
		},
		onSubmitGoogleCode: {
			type: Function,
			required: true,
		},
	},
	data: () => ({}),
	setup(props) {
		const { onSubmit, error } = toRefs(props)
		let emailValue = ref('')
		let passwordValue = ref('')
		let isEmailFieldFocus = ref(false)
		let isRemember = ref(false)
		let emailError = ''
		let passwordError = ''
		let mainColor = getStaticColorFromName('secondary')

		const onChangeEmail = value => {
			const isMaxLength = value.length <= 255
			emailValue.value = value
			if (value) {
				if (isMaxLength) {
					if (isEmailFieldFocus.value) {
						if (!validateEmail(value)) emailError = validationErrors.wrongEmail
						else emailError = ''
					}
				} else emailError = validationErrors.maxLength
			} else {
				emailError = validationErrors.required
			}
		}

		const onChangePassword = value => {
			const isMaxLength = value.length <= 255
			if (value) {
				if (isMaxLength) {
					passwordError = ''
				} else passwordError = validationErrors.maxLength
			}
			passwordValue.value = value
		}

		const onChangeIsRemember = value => {
			isRemember.value = value
		}

		const onSubmitForm = () => {
			if (!emailValue.value) emailError = validationErrors.required
			if (!passwordValue.value) passwordError = validationErrors.required
			if (emailValue.value && passwordValue.value)
				onSubmit.value({
					email: emailValue.value,
					password: passwordValue.value,
					isRemember: isRemember.value,
				})
		}

		return {
			onChangeEmail,
			onChangePassword,
			onChangeIsRemember,
			isEmailFieldFocus,
			emailError,
			passwordError,
			onSubmitForm,
			globalError: error,
			mainColor,
		}
	},
}
</script>

<style module lang="scss">
.title {
	font-size: $big-size;
	color: $dark;
	font-weight: 500;
	margin-bottom: 28px;
}

.fields {
	display: grid;
	grid-row-gap: 20px;
	width: 320px;
}

.checkbox_wrapper {
	display: grid;
	grid-template-columns: repeat(2, max-content);
	grid-column-gap: 10px;
}

.form_wrapper {
	text-align: center;
}

.actions {
	display: grid;
	grid-template-columns: repeat(2, max-content);
	justify-content: space-between;
	align-items: center;
	button {
		padding: 10px 20px;
	}
}
</style>
