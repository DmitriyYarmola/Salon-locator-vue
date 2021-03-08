<template>
	<label class="wrapper" v-if="!withLabel">
		<input
			type="text"
			:value="inputValue"
			@input="e => onChangeValue(e.target.value)"
			class="$style.input"
			v-bind:placeholder="placeholder"
			v-bind:class="{ border: isBorder }"
			v-bind:id="`input-${name}`"
		/>
		<label
			for="`input-${name}`"
			:class="{ label_position: isValue }"
			class="label"
		></label>
	</label>
	<label v-else>
		<input
			type="text"
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
import { toRefs, ref, onMounted } from 'vue'
export default {
	setup(props) {
		const {
			onChange,
			placeholder,
			autoFocus,
			isBorder,
			onBlur,
			type,
			limitedCharacters,
			defaultValue,
			withLabel,
			name,
			maxSize,
			onlyNumbers,
		} = toRefs(props)
		let inputValue = ref('')

		onMounted(() => {
			if (defaultValue) inputValue = defaultValue
		})

		const onChangeValue = value => {
			if (limitedCharacters) {
				if (value.length <= (maxSize || 256)) {
					if (onlyNumbers) {
						inputValue = value.replace(/[^0-9+]+/g, '')
						onChange.value(value.replace(/[^0-9+]+/g, ''))
					} else {
						inputValue = value
						onChange.value(value)
					}
				}
			} else if (!limitedCharacters) {
				if (onlyNumbers) {
					inputValue = value.replace(/[^0-9+]+/g, '')
					onChange.value(value.replace(/[^0-9+]+/g, ''))
				} else {
					inputValue = value
					onChange.value(value)
				}
			}
		}

		return {
			onChangeValue,
			onBlur,
			placeholder,
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
