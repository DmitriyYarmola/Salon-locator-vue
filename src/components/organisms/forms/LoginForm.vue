<template>
	<form>
		<h2 :class="$style.title">Sign In</h2>
		<div :class="$style.fields">
			<div>
				<TextField :on-change="onChangeValue" />
			</div>
		</div>
	</form>
</template>

<script>
import { TextField } from '@/components'
export default {
	components: {
		TextField,
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
	setup() {
		// const { onSubmit, onSubmitGoogleCode, isShow2FAForm, error } = toRefs(props)
		// const onSubmitForm = () => {
		//
		// }
		const onChangeValue = value => {
			console.log('value', value)
		}

		return {
			onChangeValue,
		}
	},
}
</script>

<style module lang="scss">
.title {
	color: red;
}
</style>
