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
			<view class="descItem" v-for="item in indexData.policyDescList" :key="item.desc">
				<image :src="item.icon" mode=""></image>
				<text>{{item.desc}}</text>
			</view>
		</view>
		
		<!-- kingKongList专区  10个小图标 -->
		<view class="kingKongList" v-if="indexData.kingKongModule">
			<view class="kingKongItem" v-for="item in indexData.kingKongModule.kingKongList" :key="item.L1Id">
				<image :src="item.picUrl" mode=""></image>
				<text>{{item.text}}</text>
			</view>
		</view>
		
		<!-- categorys专区 -->
		<block v-if="indexData.categoryModule">
			<Categorys v-for="category in indexData.categoryModule" :category="category" :key="category.titlePicUrl"/>
		</block>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import Categorys from '../categorys/categorys.vue';
	export default{
		components:{
			Categorys
		},
		computed:{
			...mapState({
				indexData:state=>state.home.indexData
			})
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
