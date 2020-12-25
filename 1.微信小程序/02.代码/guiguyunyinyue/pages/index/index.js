import ajax from '../../utils/ajax.js';
Page({
  data:{
    recommendList:[],
    bannerList:[]
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
    // console.log(123)
  }
})

// function Page(options){
//   this.data=JSON.parse(JSON.stringify(options.data));
// }
// new Vue({})