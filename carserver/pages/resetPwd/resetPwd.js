
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //顶部的箭头显示参数0,1,2；
    status:0,
    //手机号
    phone:'',
    //  验证码
    authCode:"",
    //新密码
    passWd:"",
    //确认新密码
    resetPassWd:"",
    //重新获取验证码
    codeStatus:0,
  },
   /**
    * 获取验证码，先校验是否存在手机号，存在则发送请求短信信息，否则提示手机号不存在
    */
  inputNumber:function(e){
    this.setData({
      phone: e.detail.value,
    })
  },
    btnCode:function(e){
       var phones = this.data.phone;
       if(phones==''){
         toast('手机号码为空');
         return;
       }
       if(phones.length < 11){
         toast('号码格式不正确');
         return;
       }
       toast("已发送验证码");
       //重新发送验证码
      this.setData({
        codeStatus: 1,
      })
      this.onLoad();

       //向后台发送请求查看数据库中是否存在该号码，存在则发送短信，否则提示"号码不存在"
       
       
       console.log(phones);
    },
  /**
   * 获取验证码，点击下一步与后台校验输入的验证码是否正确
   */
  inputCode:function(e){
    this.setData({
      authCode : e.detail.value,
    })
  },
  btnNext:function(e){
    var authCodes = this.data.authCode;
    var phones = this.data.phone;
    if (phones.length < 11) {
      toast('号码格式不正确');
      return;
    }
    if (authCodes.length < 6) {
      toast('验证码不正确');
      return;
    }
    this.setData({
      status:1,
    })
    this.onLoad();
    /**发送短信验证的时候，从后台获取一下验证码信息，与前台校验输入的验证码是否正确，正确则跳转到下一个页面，否则提示"验证码错误"*/
   
   
  },
  // 获取文本输入的新密码和确认新密码
  inputPwd:function(e){
    this.setData({
      passWd: e.detail.value,
    })
  },
  resetInputPwd:function(e){
    this.setData({
      resetPassWd: e.detail.value,
    })
  },
  // 点击确认按钮，判断两次输入的密码是否相同和格式是否相同
  btnOk:function(e){
    var passWd = this.data.passWd;
    var resetPassWd = this.data.resetPassWd;
    console.log(passWd);
    console.log(resetPassWd);
    if(passWd==''){
      toast('新密码为空');
      return;
    }
   
    if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/.test(passWd) == false){
      toast("格式不正确");
      return;
    }
    if (resetPassWd == '') {
      toast('确认密码为空');
      return;
    }
    if(passWd != resetPassWd){
      toast("重置密码不同");
      return;
    }else{
      // 密码重置成功以后向后台发送修改密码的请求。

      //密码设置成功，跳转到登录页
      wx.navigateBack({
        url:'',
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
    duration: 2000,
  })
}