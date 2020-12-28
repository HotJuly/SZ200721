// pages/recommendSong/recommendSong.js
import ajax from '../../utils/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:"28",
    month:"12",
    recommendList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // console.log(new Date().getDate())
    // console.log(new Date().getMonth()+1)
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    this.setData({
      day,
      month
    })

    let cookies = wx.getStorageSync('cookies');
    //如果当前用户没有登录,展示模态对话框,让用户回到首页或者去登陆
    if (!cookies) {
      wx.showModal({
        title: "请先登录",
        content: "该功能需要登录账号",
        cancelText: "回到首页",
        confirmText: "去登陆",
        success: ({ confirm }) => {
          //可以通过data中的cancel或者confirm判断当前是点击了取消还是确定
          // console.log('success', confirm)
          if (confirm) {
            //如果用户点击了去登陆,就跳转到登录页面
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
      return;
    }

    let recommendData = await ajax('/recommend/songs');
    // console.log(recommendData.recommend)
    this.setData({
      recommendList: recommendData.recommend.slice(0,14)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})