// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"",
    password:""
  },

  handlePhone(type){
    let phone = event.detail.value;
    this.setData({
      phone
    })
    // console.log('handlePhone')
    // console.log('event', event)
    // return function (event){
    //   console.log('type', type)
    // }
  },

  handlePassword(event) {
    // console.log('handlePassword')
    let password = event.detail.value;
    this.setData({
      password
    })
  },

  handleInput(event) {
    /*
      重点:区分到底是哪个组件触发的change
      实现:通过标签属性配合event中的target或者currentTarget实现传参
    */
    let type = event.currentTarget.dataset.type;
    // console.log(type)
    let value = event.detail.value;
    // {
    //   name:"xiaoming"
    // }
    this.setData({
      [type]:value
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