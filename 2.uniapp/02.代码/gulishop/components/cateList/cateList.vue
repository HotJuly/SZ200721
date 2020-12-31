<template>
	<div class='cateListContainer'>
		<swiper :indicator-dots="true" :autoplay="true" indicator-color='green' indicator-active-color='pink'>
			<swiper-item v-for="(swiperItem, index) in cateObj.category.bannerUrlList" :key='index'>
				<image :src="swiperItem" mode=""></image>
			</swiper-item>
		</swiper>
		<text class="title">{{cateObj.category.name}}</text>
		<text class="desc">{{cateObj.category.frontDesc}}</text>
		<ShopList :shopList='cateObj.itemList'></ShopList>
	</div>
</template>

<script>
	import ShopList from '../shopList/shopList.vue'
	import ajax from '../../utils/ajax.js'
	export default {
		props: ['navIndex'],
		components: {
			ShopList
		},
		data() {
			return {
				cateList: []
			}
		},
		async mounted(){
			// console.log('cateList mounted')
			wx.showLoading({
				title: '正在加载中'
			})
			let result= await ajax('/getindexCateList')
			this.cateList=result.data;
			// console.log(this.cateList)
			wx.hideLoading();
		},
		computed: {
			cateObj(){
				return this.cateList.find((item,index) => index === this.navIndex)
			}
		}
	}
</script>

<style lang="stylus">
	.cateListContainer 
		swiper 
			width 100%
			height 370upx
			image 
				width 100%
				height 100%
		.title
			display block
			text-align center
			font-size 34upx
			color #333
			line-height 70upx
		.desc
			display block
			text-align center
			font-size 24upx
			color #999
			line-height 40upx
		
				
</style>
