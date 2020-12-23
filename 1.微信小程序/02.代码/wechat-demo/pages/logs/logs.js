// pages/logs/logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toIndex(){
    wx.navigateTo({
      url: '/pages/index222/index222',
    })
    // wx.redirectTo({
    //   url: '/pages/index222/index222',
    // })
  },

  /**
   * 生命周期函数--监听页面加载created
   */
  onLoad: function (options) {
    //小程序中一般在onLoad中发送请求,Vue是created和mounted
    console.log('-------------onLoad------------')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成mounted
   */
  onReady: function () {
    console.log('-------------onReady------------')
  },

  /**
   * 生命周期函数--监听页面显示,相当于keep-alive的activated
   */
  onShow: function () {
    console.log('-------------onShow------------')
  },

  /**
   * 生命周期函数--监听页面隐藏,相当于keep-alive的deactivated
   */
  onHide: function () {
    console.log('-------------onHide------------')
  },

  /**
   * 生命周期函数--监听页面卸载destoryed
   */
  onUnload: function () {
    console.log('-------------onUnload------------')
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