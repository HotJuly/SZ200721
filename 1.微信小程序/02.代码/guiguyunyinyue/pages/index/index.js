Page({
  data:{
    recommendList:[]
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

    wx.request({
      url:'http://localhost:3000/personalized',
      success:(res)=>{
        // console.log('success', res)
        this.setData({
          recommendList: res.data.result
        })
      }
    });
    // console.log(123)
  }
})
