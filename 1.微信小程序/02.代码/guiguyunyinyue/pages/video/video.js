// pages/video/video.js
import ajax from '../../utils/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    currentId:null,
    videoList:[]
  },

  changeId(event){
    // console.log('changeId',event.target.dataset.id);
    let {id} = event.target.dataset;
    if (id) {
      this.setData({
        currentId: id
      })
    }
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
  onShow:async function () {
    let result = await ajax("/video/group/list");
    // console.log('result', result)
    let navList = result.data.slice(0,14);
    this.setData({
      navList,
      currentId: navList[0].id
    })

    let videoListData = await ajax('/video/group',{
      id:58100
    })
    let videoList = videoListData.datas.map((item)=>{
      return item.data
    })
    this.setData({
      videoList
    })
    // console.log('videoListData', videoListData)
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