// pages/song/song.js
import PubSub from 'pubsub-js'
import moment from 'moment'
import ajax from '../../../utils/ajax.js';
let appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songObj:{},
    songId:null,
    musicUrl:"",
    isPlay:false,
    currentWidth:0,
    currentTime:0,
    durationTime:0
  },

  switchType(event) {
    let {id} =event.currentTarget;
    PubSub.publish('switchType', id)
  },

  // 用于处理用户点击播放按钮
  async handlePlay() {
    /*
      通过isPlay属性,记录当前音频的播放状态,
      如果当前正在播放,就暂停,
      如果当前已经暂停,就自动播放
    */

    if (!this.data.musicUrl) {
      //当用户点击播放按钮时候,自动请求音频url
      await this.getMusicUrl();
    }

    //获取全局唯一的背景音频管理器
    // let backgroundAudioManager = wx.getBackgroundAudioManager();

    if(this.data.isPlay){
      this.backgroundAudioManager.pause();
      this.setData({
        isPlay: false
      })
      appInstance.globalData.isPlay = false;
      // 能走到这一步,说明音频正处于播放状态,audioId已经缓存过了
      // appInstance.globalData.audioId = this.data.songId;
    } else {
      //想让背景音频自动播放,给他添加一个新的src属性
      this.backgroundAudioManager.src = this.data.musicUrl;
      this.backgroundAudioManager.title = this.data.songObj.name;
      this.backgroundAudioManager.startTime = 227;
      this.setData({
        isPlay: true
      })
      appInstance.globalData.isPlay = true;
      appInstance.globalData.audioId = this.data.songId;
    }
  },

  // 用于请求当前歌曲详细信息
  async getMusicDetail(songId){
    songId = songId?songId:this.data.songId;
    let songData = await ajax('/song/detail', {
      ids: songId
    });

    let songObj = songData.songs[0];
    this.setData({
      songObj,
      songId,
      // durationTime: moment(songObj.dt).format('mm:ss')
      durationTime: songObj.dt
    })

    wx.setNavigationBarTitle({
      title: songObj.name
    });
  },

  //  用于请求当前歌曲url
  async getMusicUrl(){
    let urlInfo = await ajax('/song/url', {
      id: this.data.songId
    })
    this.setData({
      musicUrl: urlInfo.data[0].url
    })
  },

  //  用于绑定背景音频的监听
  addEvent(){
    this.backgroundAudioManager.onPlay(()=>{
      // console.log('onPlay')
      this.setData({
        isPlay: true
      })
      appInstance.globalData.isPlay = true;
    })

    this.backgroundAudioManager.onPause(() => {
      // console.log('onPause')
      this.setData({
        isPlay:false
      })
      appInstance.globalData.isPlay = false;
    })

    this.backgroundAudioManager.onTimeUpdate(() => {
      let currentTime = this.backgroundAudioManager.currentTime;
      let duration = this.backgroundAudioManager.duration;
      let currentWidth = currentTime / duration * 100;
      this.setData({
        currentWidth,
        currentTime: currentTime
      })
    })

    this.backgroundAudioManager.onEnded(()=>{
      // console.log('onEnded')
      PubSub.publish('switchType', "next")
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // console.log(PubSub)

    // console.log('appInstance1', appInstance);
    // appInstance.globalData.msg="我是修改之后的数据"
    // console.log('appInstance2', appInstance);
    // console.log('isPlay', appInstance.globalData.isPlay);
    let {songId} = options;
    this.getMusicDetail(songId);
    // let songData = await ajax('/song/detail',{
    //   ids:songId
    // });

    // let songObj = songData.songs[0];
    // this.setData({
    //   songObj,
    //   songId
    // })
    // wx.setNavigationBarTitle({
    //   title: this.data.songObj.name
    // });

    //获取缓存好的上一首歌的播放状态和id
    let {isPlay,audioId} = appInstance.globalData;

    // 判断比较当前歌曲和上一首歌是不是同一首歌
    if (isPlay&&audioId === songId){
      this.setData({
          isPlay:true
      })
    }

    PubSub.subscribe("changeId",async (msg,data)=>{
      // console.log('changeId', data)
      this.setData({
        songId: data
      })

      this.getMusicDetail(data);
      await this.getMusicUrl();
      this.backgroundAudioManager.src = this.data.musicUrl;
      this.backgroundAudioManager.title = this.data.songObj.name;
    })
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.addEvent();

    // setInterval(()=>{
    //   let backgroundAudioManager = wx.getBackgroundAudioManager();
    //   let currentTime = backgroundAudioManager.currentTime;
    //   let duration = backgroundAudioManager.duration;
    //   let currentWidth = currentTime/duration *100;
    //   console.log(currentTime)
    //   this.setData({
    //     currentWidth,
    //     currentTime: moment(currentTime*1000).format("mm:ss")
    //   })
    //   // console.log(currentTime)
    // },200)


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