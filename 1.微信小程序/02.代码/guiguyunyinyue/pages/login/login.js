// pages/login/login.js
import ajax from '../../utils/ajax.js'
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

  async handleLogin(){
    let {phone,password} =this.data;
    if(!phone){
      /*
        6个false值
        1.Number 0 NaN
        2.String ""
        3.Boolean false
        4.Undefined
        5.Null
      */
      // this.$message({
      //   title:
      // })
      wx.showToast({
        title: '请输入用户名',
        icon:"none"
      })
      return;
    }
    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: "none"
      })
      return;
    }
    /*
      1.在哪发
      2.怎么发
      3.往哪发
    */
    let result = await ajax("/login/cellphone",{
      phone,
      password,
      isLogin:true
    });
    if(result.code===200){
      wx.showToast({
        title: '登陆成功,即将跳转个人中心,请稍等',
        icon:"none"
      })
      // console.log(result)
      // 存储storage
      wx.setStorage({
        key:"userInfo",
        data:JSON.stringify(result.profile)
      })


      wx.switchTab({
        url: '/pages/personal/personal',
      })
    }
    // console.log(result)
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