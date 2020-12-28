// pages/personal/personal.js
import ajax from '../../utils/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance:0,
    moveTransition:"",
    userInfo:{},
    playList:[]
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
    if (moveDistance < 0 || moveDistance > 80)return;
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
    console.log('onLoad')
    /*
      1.从Storage将userInfo读取出来(注意:当前数据类型是string)
      2.转译JSON.parse()
      3.动态渲染到页面上
    */
    /*
      问题:登录成功之后,回到个人中心页面,数据无法正常展示
      原因:因为跳转到login页面,使用的是wx.navigateTo,会保留当前页面实例,所以onLoad只会执行一次
      解决:
        1.换生命周期->onShow
        2.换跳转方法->wx.redirectTo
    */
    // console.log(wx.getStorageSync("userInfo"))
    // let userInfo =wx.getStorageSync("userInfo");
    // if(userInfo){
    //   this.setData({
    //     userInfo:JSON.parse(userInfo)
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      this.setData({
        userInfo
      })
      let playListData = await ajax('/user/record',{
        uid: userInfo.userId,
        type:1
      })
      /*
        forEach =>  没有返回值
        map =>  有返回值,return的结果,新产生的数组长度等于旧数组长度
        filter  =>  有返回值,return的结果为true就保留,新产生的数组长度不等于旧数组长度
        合不合适
        面试题:for循环,forEach,map性能排行榜
        for循环>forEach>map
      */
      playListData=playListData.weekData.map((item)=>{
        return item.song.al.picUrl;
      })
      this.setData({
        playList:playListData
      })
    }
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