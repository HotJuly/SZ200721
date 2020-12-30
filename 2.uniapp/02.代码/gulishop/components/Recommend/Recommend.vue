<template>
	<view class="recommendContainer">
		<swiper class="bannerSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class="bannerImg" src="https://yanxuan.nosdn.127.net/70ebdfe81d169abf6e710abc8dcbff57.png?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="bannerImg" src="https://yanxuan.nosdn.127.net/b60a23f6a53f3dbf9d65b97b085223ac.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="bannerImg" src="https://yanxuan.nosdn.127.net/2b3de2aa7a63b8af652c1b560675860a.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="stylus">
	.recommendContainer
		.bannerSwiper
			.swiper-item
				.bannerImg
					width 100%
					height 350upx
</style>
