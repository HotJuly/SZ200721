// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance:0,
    moveTransition:""
  },

  handleTouchStart(event){
    /*
      event.touches -> 收集屏幕上所有的手指
      event.changedTouches -> 收集屏幕上刚刚发生变化的手指
     */
    this.startY = event.touches[0].clientY;
    this.setData({
      moveTransition:""
    })
    // console.log(event.touches[0].clientY)
    // console.log('handleTouchStart')
  },

  handleTouchMove(event) {
    let moveY = event.touches[0].clientY;
    let moveDistance = Math.floor(moveY - this.startY);
    /*
      当移动距离为负数(就是向上移动)时,不做处理
      当移动距离超过80rpx(就是向下移动)时,不做处理
    */
    if(moveDistance<0||moveDistance>80)return;
    this.setData({
      moveDistance
    })
    // console.log(moveDistance)
    // console.log(event.touches[0].clientY)
    // console.log('handleTouchMove')
  },

  handleTouchEnd(){
    // console.log('handleTouchEnd')
    this.setData({
      moveDistance:0,
      moveTransition:"transform 400ms"
    })
  },

  toLogin(){
    /*
      wx.navigateTo
        保留当前页面实例,相当于自带keep-alive
      wx.redirectTo
        卸载当前页面实例
    */
    wx.navigateTo({
      url:"/pages/login/login"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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