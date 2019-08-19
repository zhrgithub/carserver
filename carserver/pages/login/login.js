// pages/login/login.js
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

    // 记住密码,你也可以放到请求数据成功的里面，这样用户输错信息，就不会记住错误的密码
    // 跳转带有tab的界面使用：wx.switchTab({ url: "../home/home" });
    
    // var obj = new Object();
    // obj.name = userName;
    // obj.pswd = passWd;
    // console.log('obj', obj);
    // wx.setStorageSync(rui, obj);

    // 最后再进行MD5加密，这里假设数据请求成功直接跳转界面
    // var request = true;
    // if (request) {
    //   wx.navigateTo({
    //     url: "../index/index?" +
    //       "userName=" + userName + "&" +
    //       "passWd=" + passWd + "&" +
    //       "userPhone=" + userPhone,
    //     success: function (res) {

    //     },
    //     fail: function (res) {
    //       // fail
    //     },
    //     complete: function (res) {
    //       // complete
    //     }
    //   })
    // }
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
