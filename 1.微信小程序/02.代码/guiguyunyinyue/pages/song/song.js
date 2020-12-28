// pages/song/song.js
import ajax from '../../utils/ajax.js';
let appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songObj:{},
    songId:null,
    musicUrl:"",
    isPlay:false
  },

  async handlePlay() {
    /*
      通过isPlay属性,记录当前音频的播放状态,
      如果当前正在播放,就暂停,
      如果当前已经暂停,就自动播放
    */

    if (!this.data.musicUrl) {
      //当用户点击播放按钮时候,自动请求音频url
      let urlInfo = await ajax('/song/url', {
        id: this.data.songId
      })
      this.setData({
        musicUrl: urlInfo.data[0].url
      })
    }

    //获取全局唯一的背景音频管理器
    let backgroundAudioManager = wx.getBackgroundAudioManager();

    if(this.data.isPlay){
      backgroundAudioManager.pause();
      this.setData({
        isPlay: false
      })
      appInstance.globalData.isPlay = false;
      // 能走到这一步,说明音频正处于播放状态,audioId已经缓存过了
      // appInstance.globalData.audioId = this.data.songId;
    } else {
      //想让背景音频自动播放,给他添加一个新的src属性
      backgroundAudioManager.src = this.data.musicUrl;
      backgroundAudioManager.title = this.data.songObj.name;
      this.setData({
        isPlay: true
      })
      appInstance.globalData.isPlay = true;
      appInstance.globalData.audioId = this.data.songId;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // console.log('appInstance1', appInstance);
    // appInstance.globalData.msg="我是修改之后的数据"
    // console.log('appInstance2', appInstance);
    // console.log('isPlay', appInstance.globalData.isPlay);
    let {songId} = options;
    let songData = await ajax('/song/detail',{
      ids:songId
    });

    let songObj = songData.songs[0];
    this.setData({
      songObj,
      songId
    })
    wx.setNavigationBarTitle({
      title: songObj.name
    });

    //获取缓存好的上一首歌的播放状态和id
    let {isPlay,audioId} = appInstance.globalData;

    // 判断比较当前歌曲和上一首歌是不是同一首歌
    if (isPlay&&audioId === songId){
      this.setData({
          isPlay:true
      })
    }


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