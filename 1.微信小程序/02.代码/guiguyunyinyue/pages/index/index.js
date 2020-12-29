import ajax from '../../utils/ajax.js';

Page({
  data:{
    recommendList:[],
    bannerList:[],
    topList:[]
  },
  toRecommendSong(){
    wx.navigateTo({
      url: '/songs/pages/recommendSong/recommendSong'
    })
  },
  onLoad(){
    /*
      1.在哪发
        onLoad->created
      2.怎么发
        wx.request()
      3.往哪发
        查看接口文档
    */
    let promise1 = ajax("/banner",{type:2});
    promise1.then((result) => {
      this.setData({
        bannerList: result.banners
      })
    })

    let promise2 = ajax("/personalized");
    promise2.then((result) => {
      this.setData({
        recommendList: result.result
      })
    })

    let arr = [12,5,10,6];
    let index=0;
    let topList=[]

    while (index < arr.length) {
      let promise3 = ajax("/top/list", { idx: arr[index++] });
      console.log(promise3)
      promise3.then((result) => {
        //需要排行榜的名称和对应的名次数组,需要用对象存储
        let obj = {
          name: result.playlist.name,
          list: result.playlist.tracks
        }
        // console.log(obj)
        topList.push(obj)
        this.setData({
          topList
        })
      })
    }

    
  }
})

// function Page(options){
//   this.data=JSON.parse(JSON.stringify(options.data));
// }
// new Vue({})