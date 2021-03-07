<template>
	<div :class="styles.template">
		<div :class="styles.sideBar">
			{{ sidebar }}
		</div>
		<main :class="styles.content">
			<slot />
		</main>
	</div>
</template>

<script>
// import styles from './style.module.sass'

export default {
	props: {
		sidebar: {
			type: Element,
		},
	},
	data: () => ({
		// styles,
	}),
}
</script>
