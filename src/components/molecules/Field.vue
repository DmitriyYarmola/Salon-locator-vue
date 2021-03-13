<template>
	<div :class="$style.field">
		<TextField
			:on-change="onChange"
			:placeholder="placeholder"
			:name="name"
			:is-border="isBorder"
			:type="type"
			:limited-characters="limitedCharacters"
		/>
		<Error v-if="error">{{ error }}</Error>
	</div>
</template>

<script>
import { TextField, Error } from '@/components'
export default {
	components: { TextField, Error },
	props: {
		onChange: {
			type: Function,
			required: true,
		},
		error: {
			type: String,
			required: false,
		},
		placeholder: {
			type: String,
			required: false,
		},
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: false,
		},
		isBorder: {
			type: Boolean,
			required: false,
		},
		limitedCharacters: {
			type: Boolean,
			required: false,
		},
	},
	setup({ onChange, placeholder, name, error, isBorder, type, limitedCharacters }) {
		return {
			onChange,
			placeholder,
			name,
			error,
			isBorder,
			type,
			limitedCharacters,
		}
	},
}
</script>

<style module lang="scss">
.field {
	text-align: left;
}
</style>
