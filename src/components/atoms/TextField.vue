<template>
	<label class="wrapper" v-if="!withLabel">
		<input
			:type="type"
			:value="inputValue"
			@input="e => onChangeValue(e.target.value)"
			:placeholder="label"
			:class="[$style.input, isBorder ? $style.border : '']"
			:id="`input-${name}`"
		/>
		<label
			for="`input-${name}`"
			:class="{ label_position: isValue }"
			class="label"
		></label>
	</label>
	<label v-else>
		<input
			:type="type"
			:value="inputValue"
			@input="e => onChangeValue(e.target.value)"
			class="$style.input"
			v-bind:placeholder="placeholder"
			v-bind:class="{ border: isBorder }"
			v-bind:id="`input-${name}`"
		/>
	</label>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
	props: {
		onChange: {
			type: Function,
			required: true,
		},
		placeholder: {
			type: String,
			required: true,
		},
		onBlur: Function,
		isBorder: Boolean,
		onlyNumbers: Boolean,
		maxSize: Number,
		name: String,
		withLabel: Boolean,
		defaultValue: String,
		autoFocus: Boolean,
		limitedCharacters: Boolean,
		type: String,
	},
	setup({
		onChange,
		placeholder,
		autoFocus,
		isBorder,
		onBlur,
		type = 'text',
		limitedCharacters,
		defaultValue,
		withLabel,
		name,
		maxSize,
		onlyNumbers,
	}) {
		let inputValue = ref('')

		onMounted(() => {
			if (defaultValue) inputValue = defaultValue
		})

		const onChangeValue = value => {
			if (limitedCharacters) {
				if (value.length <= (maxSize || 256)) {
					if (onlyNumbers) {
						inputValue = value.replace(/[^0-9+]+/g, '')
						onChange(value.replace(/[^0-9+]+/g, ''))
					} else {
						inputValue = value
						onChange(value)
					}
				}
			} else if (!limitedCharacters) {
				if (onlyNumbers) {
					inputValue = value.replace(/[^0-9+]+/g, '')
					onChange(value.replace(/[^0-9+]+/g, ''))
				} else {
					inputValue = value
					onChange(value)
				}
			}
		}

		return {
			onChangeValue,
			onBlur,
			label: placeholder,
			autoFocus,
			isBorder,
			type,
			limitedCharacters,
			withLabel,
			name,
			defaultValue,
			inputValue,
			isValue: Boolean(inputValue.value.length),
		}
	},
}
</script>

<style module lang="scss">
.input {
	width: 100%;
	padding: 12px 33px 12px 15px;
	border-radius: 6px;
	font-size: $small-size;
	&:focus {
		& + label {
			top: -1px;
			font-size: 12px;
		}
	}
}

.border {
	border: 1px solid #e8e8e8;
}

.label_position {
	top: -1px;
	font-size: 12px;
}

.label {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 15px;
	background: $white;
	padding: 0 3px;
	transition: 0.2s linear;
}

.wrapper {
}
</style>
