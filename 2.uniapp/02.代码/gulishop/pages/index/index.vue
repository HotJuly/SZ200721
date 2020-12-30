<template>
	<view class="indexContainer">
		<view class="header">
			<image class="logo" src="../../static/images/logo.png"></image>
			<view class="searchContainer">
				<input class="seach" type="text" value="" />
			</view>
			<button class="nickname">七月</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="stylus">
	.indexContainer
		.header
			display flex
			.logo
				width 140upx
				height 40upx
				flex-shrink 0
				margin 0 20upx
			.searchContainer
				background #ededed
				width 100%
			.nickname
				width 144upx
				height 60upx
				font-size 24upx
				color red
				flex-shrink 0
				margin 0 20upx
</style>
