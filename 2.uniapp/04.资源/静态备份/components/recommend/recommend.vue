<template>
	<view class="recommendContainer">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<image src="https://yanxuan.nosdn.127.net/7c4cae8935d22db54c6f2ac076e96953.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image src="https://yanxuan.nosdn.127.net/e1d32c538a9fcf420411592746098ad2.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
			</swiper-item>
			<swiper-item>
				<image src="https://yanxuan.nosdn.127.net/7ebf37f2a54c39fc3e93aa3f03b7a875.png?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
			</swiper-item>
		</swiper>
		
		<!-- policyDescList专区  -->
		<view class="policyDescList">
			<view class="descItem">
				<image src="https://yanxuan.nosdn.127.net/a03dd909803b9ac032eba58b7253a2f6.png" mode=""></image>
				<text>网易自营品牌</text>
			</view>
			<view class="descItem">
				<image src="https://yanxuan.nosdn.127.net/a03dd909803b9ac032eba58b7253a2f6.png" mode=""></image>
				<text>网易自营品牌</text>
			</view>
			<view class="descItem">
				<image src="https://yanxuan.nosdn.127.net/a03dd909803b9ac032eba58b7253a2f6.png" mode=""></image>
				<text>网易自营品牌</text>
			</view>
		</view>
		
		<!-- kingKongList专区  10个小图标 -->
		<view class="kingKongList">
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
			<view class="kingKongItem">
				<image src="https://yanxuan.nosdn.127.net/fede8b110c502ec5799702d5ec824792.png" mode=""></image>
				<text>居家生活</text>
			</view>
		</view>
		
		<!-- categorys专区 -->
		<block v-if="indexData.categoryModule">
			<Categorys v-for="item in 3" :key="item"/>
		</block>
	</view>
</template>

<script>
	import Categorys from '../categorys/categorys.vue';
	export default{
		components:{
			Categorys
		}
	}
</script>

<style lang="stylus">
.recommendContainer
	swiper
		height 350upx
		image
			width 100%
			height 100%
	.policyDescList
		display flex
		// justify-content space-around
		.descItem
			flex-grow 1
			text-align center
			image
				width 32upx
				height 32upx
				vertical-align middle
			text
				font-size 24upx
				vertical-align middle
	.kingKongList
		display flex
		flex-wrap wrap
		margin-top 20upx
		.kingKongItem
			display flex
			flex-direction column
			align-items center
			width 20%
			image
				width 110upx
				height 110upx
			text
				font-size 24upx
</style>
