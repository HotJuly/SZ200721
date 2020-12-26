// pages/video/video.js
import ajax from '../../utils/ajax.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[],
    currentId:null,
    videoList:[],
    triggered:false,
    scrollId:""
  },

  async changeId(event){
    // console.log('changeId',event.target.dataset.id);
    let {id} = event.target.dataset;
    let scrollId = event.target.id;
    console.log(scrollId)
    if (id) {
      this.setData({
        currentId: id,
        scrollId
      })
      /*
        1.请求当前id最新数据
        2.弹出加载中的弹窗
        3.数据没回来期间,将列表重置为空(将videoList数组清空即可)
      */
      wx.showLoading({
        title:"加载中,请稍后"
      })
      this.setData({
        videoList:[]
      })
      await this.getVideoList();
      // console.log(1)
      wx.hideLoading();
      // console.log(this.data.currentId)
    }
  },

  // 专门用于请求videolist数据
  async getVideoList(){
    let videoListData = await ajax('/video/group', {
      id:this.data.currentId
    })
    let videoList = videoListData.datas.map((item) => {
      return item.data
    })
    // console.log(2)
    this.setData({
      videoList
    })
  },

// 当用户下拉scroll-view时,会更新当前数据
  async handlePullDown(){
    // console.log('handlePullDown')
    await this.getVideoList();
    this.setData({
      triggered:false
    })
  },

  // 当用户上拉scroll-view触底时,会加载更多数据
  handleScrollToLower(){
    if(this.flag)return;
    // 发送请求;
    this.flag=true;
    setTimeout(() => {
      let data=JSON.parse(JSON.stringify(this.data.videoList));
      // console.log('handleScrollToLower');
      this.setData({
        videoList: [...this.data.videoList, ...data]
      })
      this.flag=false
    },3000)
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

    this.getVideoList();

    // let videoListData = await ajax('/video/group',{
    //   id:navList[0].id
    // })
    // let videoList = videoListData.datas.map((item)=>{
    //   return item.data
    // })
    // this.setData({
    //   videoList
    // })
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
    console.log('onPullDownRefresh')
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