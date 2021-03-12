<template>
	<label>
		<input
			type="checkbox"
			:class="$style.component"
			@change="e => onToggleChange(e.target.checked)"
			:value="isChecked"
			id="checkbox"
			:checked="isChecked"
		/>
		<label
			for="checkbox"
			:class="$style.label"
			:style="{ 'background-image': isChecked ? `url(${CheckedIcon})` : '' }"
		/>
	</label>
</template>

<script>
import { ref } from 'vue'
import { CheckedIcon } from '@/assets'
export default {
	data: () => ({}),
	props: {
		onChange: {
			type: Function,
			required: true,
		},
	},
	setup({ onChange }) {
		let isChecked = ref(false)
		const onToggleChange = value => {
			isChecked.value = value
			onChange(value)
		}
		return {
			onToggleChange,
			CheckedIcon,
			isChecked,
		}
	},
}
</script>

<style module lang="scss">
.component {
	position: absolute;
	z-index: -1;
	opacity: 0;
	cursor: pointer;
}

.label {
	width: 20px;
	height: 20px;
	display: block;
	border: 2px solid grey;
	border-radius: 4px;
	cursor: pointer;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
