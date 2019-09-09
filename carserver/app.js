//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    phone:'',
    userInfo: {
      userN:'',
      passW:'',
      avatarUrl:''
    },
    token: '',
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }
})