<template>
	<form @submit.prevent="onSubmit" :class="$style.component">
		<h1 :class="$style.title">Google Authentication</h1>
		<div :class="$style.fields">
			<Field
				name="email"
				:on-change="onChange"
				:is-border="true"
				placeholder="Google Authentication"
				:error="error"
				:limited-characters="true"
			/>
		</div>
		<div :class="$style.google_auth_buttons">
			<Button :mainColor="mainColor" type="submit" :is-background="true">Send</Button>
		</div>
	</form>
</template>

<script>
import { Field, Button } from '@/components'
import { ref } from 'vue'
import { getStaticColorFromName } from '@/lib'
export default {
	components: {
		Button,
		Field,
	},
	props: {
		error: {
			type: String,
			required: false,
		},
		onSubmit: {
			type: Function,
			required: true,
		},
	},
	setup({ error, onSubmit }) {
		const code = ref('')
		const onChangeValue = value => {
			code.value = value
		}

		const onSubmitCode = () => {
			onSubmit(code.value)
		}
		return {
			onChange: onChangeValue,
			error,
			onSubmit: onSubmitCode,
			mainColor: getStaticColorFromName('secondary'),
		}
	},
}
</script>

<style module lang="scss">
.component {
	text-align: center;
}

.title {
	font-size: $big-size;
	color: $dark;
	font-weight: 500;
	margin-bottom: 28px;
}
.google_auth_buttons {
	display: grid;
	grid-template-columns: repeat(2, max-content);
	align-items: center;
	justify-content: center;
	button {
		margin-top: 15px;
		padding: 10px 20px;
	}
}

.fields {
	width: 320px;
}
</style>
