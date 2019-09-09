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

    var phone = this.data.userN;
    var passwd = this.data.passW;
    // var userName = this.data.userName;
    // var passWd = this.data.passWd;
    if (phone == '') {
      console.log("账户不能为空");
      toast('用户名不能为空');
      return;
    } 
    if (phone.length< 11) {
      console.log("格式不正确");
      toast('手机格式不正确');
      return;
    }
    if (passwd == '') {
      console.log("密码不能为空");
      toast('密码不能为空');
      return;
    }
    if (phone == '' & passwd == ''){
      console.log("账户和密码不能为空");
      toast('账户和密码不能为空');
      return;
    }
    console.log("phone:" + this.data.userN);
    console.log("passwd:" + this.data.passW);
    /**请求后台的数据 userN和passW*/
    wx.request({
      url: api.LoginUrl,
      method: 'POST',
      data:{
        phone: this.data.userN,
        passwd: this.data.passW
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.state == "200") {
          app.globalData.phone = phone;
          wx.setStorage({
            key: 'passwd',
            data: phone,
            //data:1234,
          })
          wx.request({
            url: api.UserInfoByphoneURL,
            method:'POST',
            data: {
              phone: phone,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(ress){
                  console.log("ress："+ress)
                  console.log(ress.data.data.userName);
              let userName = ress.data.data.userName;
              console.log(userName);
              wx.setStorage({
                key: 'userName',
                data: userName,
                //data:1234,
              })
                  console.log(ress.data.data.identity);
              let identity = ress.data.data.identity;
              wx.setStorage({
                key: 'identity',
                data: identity,
                //data:1234,
              })
              let loginUserId = ress.data.data.id;
              wx.setStorage({
                key: 'loginUserId',
                data: loginUserId,
                //data:1234,
              })
            },
            fail: function () {
              wx.showModal({
                content: '糟糕,网络信号不好',
                showCancel: false,
              })
            }
          })
          wx.switchTab({
            url: '../index/index'
          });
        }else{
          console.log("账户或密码不正确");
          toast('账户或密码不正确');
          return;
        }
      },
      fail:function(e){
        toast('请求服务器失败');
        return;
      }
    });
    /**验证文本框输入的内容和后台的数据是否一致 */
    // if (phone == this.data.userName && passwd == this.data.passWd){
    //   wx.switchTab({ url: "../index/index" });
    // }else{
    //   console.log("账户或密码不正确");
    //   toast('账户或密码不正确');
    //   return;
    // }

    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
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
