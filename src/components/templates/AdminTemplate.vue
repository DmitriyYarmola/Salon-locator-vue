<template>
	<div :class="$style.template">
		<div :class="$style.sideBar" v-html="sidebar" />
		<main :class="$style.content">
			<slot />
		</main>
	</div>
</template>
<script>
export default {
	props: {
		sidebar: {
			type: String,
		},
	},
	data: () => ({}),
}
</script>
<style module lang="scss">
.content {
	margin: 40px 60px 40px 0;
	background: $white;
	border-radius: 6px;
}

.template {
	display: grid;
	grid-template-columns: 300px 1fr;
	grid-column-gap: 60px;
	background: $darkWhite;
}
</style>
