<template>
	<view class="categorysContainer">
		<image class="categoryImg" src="https://yanxuan.nosdn.127.net/14318a2168c8c0b6d8e2ed60dcbed570.jpg" mode=""></image>
		<scroll-view scroll-x="true" class="categoryList">
			<view class="categoryItem">
				<image src="https://yanxuan-item.nosdn.127.net/ea324a88d74978c5a11fe99ece5734ae.png" mode=""></image>
				<view class="itemText">随时随地喝热水 3秒即热便携式迷你开水机</view>
			</view>
			<view class="categoryItem more">
				查看更多>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
	}
</script>

<style lang="stylus">
.categorysContainer
	margin-top 20upx
	.categoryImg
		width 100%
		height 370upx
	.categoryList
		white-space nowrap
		.categoryItem
			display inline-block
			width 200upx
			margin 10upx 20upx
			font-size 24upx
			&.more
				background #eee
				width 200upx
				height 200upx
				line-height 200upx
				text-align center
				vertical-align top
			image
				width 200upx
				height 200upx
				background-color #eee
			.itemText
				display -webkit-box
				-webkit-line-clamp 2
				-webkit-box-orient vertical
				overflow hidden
				height 64upx
				white-space pre-wrap
</style>
