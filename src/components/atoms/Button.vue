<template>
	<button
		:class="$style.component"
		:style="styles"
		:disabled="isDisabled"
		@click="onClick"
		:type="type"
	>
		<slot />
	</button>
</template>

<script>
import { computed, toRefs } from 'vue'

export default {
	data: () => ({}),
	props: {
		mainColor: {
			required: true,
		},
		isBackground: {
			required: true,
		},
		darkColor: {
			required: false,
		},
		disabled: {
			required: false,
		},
	},
	setup(props) {
		const {
			mainColor,
			isBackground,
			darkColor,
			disabled: isDisabled,
			onClick,
			type,
		} = toRefs(props)
		const styles = computed(() => {
			let styles = { borderColor: mainColor.value }
			if (isBackground) {
				styles = {
					...styles,
					color: darkColor ? '#333333' : '#ffffff',
					background: mainColor.value,
				}
			} else {
				styles = {
					...styles,
					color: mainColor.value,
					background: '#ffffff',
				}
			}
			return styles
		})
		console.log(styles)
		return { isDisabled, onClick, type, styles }
	},
}
</script>

<style module lang="scss">
.component {
	padding: 12px 0;
	border-radius: 4px;
	border: 1px solid;
	font-size: $small-size;
	font-weight: 500;
	cursor: pointer;
	transition: 0.2s linear;
}
</style>
