<template>
	<div :class="$style.wrapper">
		<div :class="$style.position_wrapper">
			<div :class="$style.loadingio_spinner_eclipse_x21uffso6zh">
				<div :class="$style.ldio_cnjfexdquir">
					<div />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style module lang="scss">
.wrapper {
	position: fixed;
	background: rgba(0, 0, 0, 0.5);
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
}
.position_wrapper {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

@keyframes ldio-cnjfexdquir {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.ldio_cnjfexdquir div {
	position: absolute;
	animation: ldio-cnjfexdquir 1s linear infinite;
	width: 120px;
	height: 120px;
	top: 40px;
	left: 40px;
	border-radius: 50%;
	box-shadow: 0 4px 0 0 #1ece64;
	transform-origin: 60px 62px;
}
.loadingio_spinner_eclipse_x21uffso6zh {
	width: 200px;
	height: 200px;
	display: inline-block;
	overflow: hidden;
}
.ldio_cnjfexdquir {
	width: 100%;
	height: 100%;
	position: relative;
	transform: translateZ(0) scale(1);
	backface-visibility: hidden;
	transform-origin: 0 0;
}
.ldio_cnjfexdquir div {
	box-sizing: content-box;
}
</style>
