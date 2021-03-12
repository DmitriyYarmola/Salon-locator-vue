<template>
	<span :class="$style.text">
		<slot />
	</span>
</template>

<script>
export default {
	data: () => ({}),
}
</script>

<style module lang="scss">
.text {
	color: $red;
}
</style>
