<template>
	<view class="loginContainer">
		<image class="logo" src="http://yanxuan.nosdn.127.net/39c5e4583753d4c3cb868a64c2c109ea.png" mode=""></image>
		<p class='text'>网易自营，精品生活家居品牌</p>
		<div class="loginMethods">
			<button class="login wechatLogin">
				微信登录
			</button>
			<button class="login emailLogin">
				邮箱登录
			</button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="stylus">
	.loginContainer
		width 100%
		height 100%
		background #F8F8F8
		display flex
		align-items center
		flex-direction column
		.logo
			width 300upx
			height 100upx
			margin-top 200upx
		.text
			font-size 26upx
			color #666
		.loginMethods
			width 80%
			margin 150upx auto
			display flex
			justify-content space-around
			.login
				width 240upx
				height 80upx
				background #41A863
				color #FFFFFF
				text-align center
				line-height 80upx
				font-size 26upx
			

</style>
