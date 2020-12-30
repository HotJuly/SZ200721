<template>
	<view id="indexContainer">
		<!-- 头部搜索区域 -->
		<view class="header">
			<image class="logo" src="../../static/images/logo.png"></image>
			<view class="searchContainer">
				<view class="iconfont icon-sousuo"></view>
				<input class="search" type="text" value="" placeholder="搜索商品" placeholder-class="placeholder"/>
			</view>
			<button class="nickname">七月</button>
		</view>
		
		<!-- 导航条区域 -->
		<scroll-view class="navScroll" enable-flex scroll-x v-if="indexData.kingKongModule">
			<view class="navItem " :class="currentIndex===-1?'active':''">
				推荐
			</view>
			<view class="navItem" :class="currentIndex===index?'active':''" v-for="(item,index) in indexData.kingKongModule.kingKongList" :key="item.L1Id">
				{{item.text}}
			</view>
		</scroll-view>
		
		<!-- 内容区域 -->
		<Recommend />
	</view>
</template>

<script>
	import ajax from '../../utils/ajax.js';
	import Recommend from '../../components/Recommend/Recommend.vue';
	export default {
		data() {
			return {
				indexData:{},
				currentIndex:-1
			}
		},
		/*
			1.在哪发
				Vue -> mounted和created
				小程序->onLoad
				uniapp中,可以使用小程序和Vue的生命周期
				uniapp兼容:1.小程序的组件 2.小程序的生命周期
				无论是uniapp还是mpvue(美团推出的小程序框架),都推荐使用Vue的生命周期,尽量少用小程序的生命周期
			2.怎么发
				小程序->wx.request
				uniapp->uni.request
			3.往哪发
				往自家服务器发送
		*/
		// onLoad() {
		// 	console.log('onLoad')
		// },
		async mounted(){
			// console.log('mounted')
			
			let indexData = await ajax('/getIndexData');
			//专门用于小程序请求
			// let indexData = await ajax('http://localhost:3000/getIndexData');
			//专门用于h5端请求
			// let indexData = await ajax('/api/getIndexData');
			this.indexData = indexData;
			// console.log('indexData',indexData)
		},
		methods: {

		},
		components:{
			Recommend
		}
	}
</script>

<style lang="stylus">
	#indexContainer
		.header
			display flex
			align-items center
			padding-top 20upx
			.logo
				width 140upx
				height 40upx
				flex-shrink 0
				margin 0 20upx
			.searchContainer
				position  relative
				background #ededed
				width 100%
				height 60upx
				border-radius 10upx
				.iconfont
					position absolute
					left 20upx
					top 50%
					transform translateY(-50%)
				.search
					margin-left 60upx
					height 100%
					.placeholder
						text-align center
						font-size 24upx
						text-indent -40upx
			.nickname
				width 144upx
				height 60upx
				font-size 24upx
				color red
				flex-shrink 0
				margin 0 20upx
		.navScroll
			// display flex
			white-space nowrap
			.navItem
				position relative
				display inline-block
				width 140upx
				height 80upx
				text-align center
				font-size 28upx
				line-height 80upx
				&.active::after
					position absolute
					content ""
					display block
					height 2upx
					width 100%
					background red
					left 0
					bottom 2upx
</style>