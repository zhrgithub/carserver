var api = require('../../config/api.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //顶部的箭头显示参数0,1,2；
    status:0,
    //手机号
    email:'',
    //  验证码
    authCode:"",
    //新密码
    passWd:"",
    //确认新密码
    resetPassWd:"",
    //重新获取验证码
    codeStatus:0,
    //验证码
    randCodes:"",
  },
   /**
    * 获取验证码，先校验是否存在手机号，存在则发送请求短信信息，否则提示手机号不存在
    */
  inputNumber:function(e){
    this.setData({
      email: e.detail.value,
    })
  },
    btnCode:function(e){
      var emails = this.data.email;
      if (emails==''){
         toast('邮箱号码为空');
         return;
       }
      //  if(email.length < 11){
      //    toast('号码格式不正确');
      //    return;
      //  }
       //先发判断账户是否存在
       let that = this;
      wx.request({
        url: api.FindEmailURL,
        method: 'POST',
        data: {
          email: emails,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          
          if (res.data.state == 200) {
            toast("已发送验证码");
            //从后台获取到验证码
            wx.request({
              url: api.SendCodeByEmailURL,
              method: 'POST',
              data: {
                email: emails,
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                console.log(res.data.data.randCode)
                let randCode = res.data.data.randCode;
                console.log("randcode:"+randCode)
                that.setData({
                    randCodes:randCode,
                })
              },
              fail: function () {
                wx.showModal({
                  content: '发送失败',
                  showCancel: 'false',
                });
              }
            });
          }else{
            wx.showModal({
              content: '号码未绑定或不存在',
              showCancel: 'false',
            });
          }
        },
        fail: function () {
          wx.showModal({
            content: '糟糕,网络信号不好',
            showCancel: false,
          })
        }
      });
      

       //重新发送验证码
      this.setData({
        codeStatus: 1,
      })
      this.onLoad();

      console.log(emails);
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
    var emails = this.data.email;
    var randCodes = this.data.randCodes;
    if (authCodes.length < 6) {
      toast('验证码不正确');
      return;
    }
   
    /**发送短信验证的时候，从后台获取一下验证码信息，与前台校验输入的验证码是否正确，正确则跳转到下一个页面，否则提示"验证码错误"*/
    console.log("randCode5:"+randCodes)
    if (authCodes!=randCodes){
      toast('验证码不正确');
      return;
    }
    this.setData({
      status: 1,
    })
    this.onLoad();
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
    var email = this.data.email;
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
      wx.request({
        url: api.UpDataPasswdByEmail,
        method: 'POST',
        data: {
          email: email,
          passwd: passWd,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          toast("修改成功")
        },
        fail: function () {
          wx.showModal({
            content: '糟糕,网络信号不好',
            showCancel: false,
          })
        }
      });
      //密码设置成功，跳转到登录页
      wx.navigateBack({
        url:'',
      })
    }
  },

})

function toast(toast) {
  wx.showToast({
    title: toast,
    duration: 2000,
  })
}