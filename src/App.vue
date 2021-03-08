<template>
	<MainTemplate sidebar="<div>12312</div>"> <router-view></router-view></MainTemplate>
</template>

<script>
import { MainTemplate } from '@/components'

export default {
	name: 'App',
	components: {
		MainTemplate,
	},
}
</script>

<style></style>
