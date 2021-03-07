<template>
	<div :class="$style.template">
		<div :class="$style.formPosition">
			<div :class="$style.formWrapper">
				<img src="" alt="" @click="onCloseModal" v-if="isCrossIcon" />
				<slot />
			</div>
		</div>
	</div>
</template>

<script>
import { toRefs } from 'vue'
export default {
	data: () => ({}),
	setup(props) {
		const { isCrossIcon, onCloseModal } = toRefs(props)
		return {
			isCrossIcon,
			onCloseModal,
		}
	},
	methods: {},
}
</script>

<style module lang="scss">
.template {
}

.formPosition {
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
}

.formWrapper {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 44px 40px 40px;
	background: #ffffff;
	border-radius: 8px;
	z-index: 10000;
}

.icon {
	position: absolute;
	right: 18px;
	top: 18px;
	cursor: pointer;
}
</style>
