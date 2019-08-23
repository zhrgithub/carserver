var api = require('../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 获取账户和密码
    userN: '',
    passW: '',
    // 设置假数据账户和密码
    userName: '123',
    passWd: '123',
  },
 //用户名，密码输入框
  userNameInput: function (e) {
    this.setData({
      userN: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      passW: e.detail.value
    })
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  loginBtnClick: function () {
    console.log("点击-------------");
    var that = this;

    var userN = this.data.userN;
    var passW = this.data.passW;
    var userName = this.data.userName;
    var passWd = this.data.passWd;
    if (userN == '') {
      console.log("账户不能为空");
      toast('用户名不能为空');
      return;
    }
    if (passW == '') {
      console.log("密码不能为空");
      toast('密码不能为空');
      return;
    }
    if(userN =='' & passW == ''){
      console.log("账户和密码不能为空");
      toast('账户和密码不能为空');
      return;
    }

    /**请求后台的数据 userName和passWd*/
    var that = this;
    wx.request({
      url: api.LoginUrl,
      data: {
        userName: that.data.userName,
        passWd: that.data.passWd
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          that.setData({
            
          });
          wx.setStorage({
            key: "token",
            data: res.data.data.token,
            success: function () {
              wx.switchTab({
                url: '../index/index'
              });
            }
          });
        }
      }
    });
    /**验证文本框输入的内容和后台的数据是否一致 */
    if (userN == userName & passW == passWd){
         
         
         
      wx.switchTab({ url: "../index/index" });
    }else{
      console.log("账户或密码不正确");
      toast('账户或密码不正确');
      return;
    }

    wx.showToast({
      title: '加载中',
      icon: 'loading'
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

function toast(toast) {
  wx.showToast({
    title: toast,
    duration: 2000
  })
}
