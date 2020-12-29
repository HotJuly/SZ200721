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
    scrollId:"",
    videoId:""
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

  //当视频开始播放时,会执行的操作
  handlePlay(event){
    //用来获取上个视频的id
    let oldVid = this.oldVid;

    //用来获取当前视频的id
    let {id} = event.currentTarget;

    //由于第一个视频播放的时候,没有上一个视频,所以oldVid可能会是undefined
    if (oldVid&&oldVid!=id) {
      // 获得对应video标签的视频上下文对象
      let videoContext = wx.createVideoContext(oldVid);

      //调用pause方法,暂停视频播放
      videoContext.pause();
    }

    //把当前视频id存储起来,当第二个视频开始播放时候(play事件触发)
    //该id就变成上个视频的id了
    this.oldVid=id;
  },

  //专门用于测试暂停视频API是否好使
  testAPI(){
    // 获得对应video标签的视频上下文对象
    let videoContext = wx.createVideoContext("154D37C766867280A35679B4F4674F27");

    //调用pause方法,暂停视频播放
    videoContext.pause();
  },

  showVideo(event){
    // 获取被点击图片的id
    let {id} =event.currentTarget;

    //将当前id更新到data中,让页面中的image和video组件进行切换,显示出对应的video
    this.setData({
      videoId:id
    })

    //生成视频上下文对象,控制视频播放
    let videoContext = wx.createVideoContext(id);
    videoContext.play();
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
    let cookies = wx.getStorageSync('cookies');
    //如果当前用户没有登录,展示模态对话框,让用户回到首页或者去登陆
    if(!cookies){
      wx.showModal({
        title:"请先登录",
        content:"该功能需要登录账号",
        cancelText:"回到首页",
        confirmText:"去登陆",
        success: ({ confirm })=>{
          //可以通过data中的cancel或者confirm判断当前是点击了取消还是确定
          // console.log('success', confirm)
          if (confirm){
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
  onShareAppMessage: function ({ from , target }) {
    /*
      实现转发功能的方法:
        1.通过右上角的转发按钮
        2.通过button组件的open-type属性设置为share
      
      业务场景:
        1.如果是右上角的转发按钮,转发内容是当前小程序页面截图
        2.如果是视频的分享button,转发内容是当前视频截图

        实现区分的方法:通过onShareAppMessage传入的实参中的from可以判断
          如果是menu,就代表是右上角转发触发的
          如果是button,就代表是button组件触发的

        实现自定义分享内容的方法:
          通过return 一个对象来控制
    */
    if(from==="button"){
      console.log(target)
      //缺少标题跟图片
      //注意!!!自定义属性名称全小写,即便是写了大写,也会自动转为小写
      let {title,imageurl} = target.dataset;
      return {
        title,
        path:"/pages/video/video",
        imageUrl: imageurl
      }
    }else if(from==="menu"){
      return{
        title:"硅谷云音乐",
        path:"/pages/index/index",
        imageUrl:"/static/images/nvsheng.jpg"
      }
    }
    // console.log('onShareAppMessage', from)
  }
})