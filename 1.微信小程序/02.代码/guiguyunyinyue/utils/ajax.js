/*
  封装代码,一般要么暴露数据要么暴露方法
  封装代码核心思想:
    保留公共部分,提取动态传入部分
    封装函数:
      1)保留公共部分(重复出现的代码,比如wx.request(options对象))
      2)提取动态传入部分()
      3)谁调用谁传入
    封装组件:
      1)保留公共部分(template+style)
      2)提取动态传入部分(会变化的数据)
      3)谁使用谁传入(props)
*/

export default function (url, data={}, method="GET") {
  // let result;
  return new Promise((resolve,reject) => {
    let cookieStr = wx.getStorageSync('cookies');
    let cookies=[];
    if (cookieStr) {
      cookies = JSON.parse(cookieStr);
    }
    wx.request({
      url: 'http://localhost:3000' + url,
      // url: 'https://guiguyunyinyue.cn1.utools.club' + url,
      data,
      method,
      header:{
        cookie: Array.prototype.toString.call(cookies)
      },
      success: (res) => {
        // console.log('success', res)
        /*
          不是每个请求返回的cookie都能用,只有登录接口返回的cookie才是需要的
        */
        // console.log('cookie',arr)
        if (data.isLogin) {
          let arr = res.cookies.filter((item) => {
            return item.indexOf('MUSIC_U') === 0;
          })
          wx.setStorage({
            key: "cookies",
            data: JSON.stringify(arr)
          })
        }
        resolve(res.data);
        // this.setData({
        //   bannerList: res.data.banners
        // })
      }
    });
  })
}