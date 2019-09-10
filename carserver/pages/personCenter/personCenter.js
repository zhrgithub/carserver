var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    age:"",
    phone:"",
    passwd:"",
    email:"",
    authorizationCode:"",
    department:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginUserId = wx.getStorageSync('loginUserId')
    var identity = wx.getStorageSync('identity')
    wx.request({
      url: api.SelectUserInfoByIdURL,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        id: loginUserId,
      },
      success:function(res){
        var userName = res.data.data.userName;
        var age = res.data.data.age;
        var phone = res.data.data.phone;
        var passwd = res.data.data.passwd;
        var email  =  res.data.data.email;
        var authorizationCode = res.data.data.authorizationCode;
        var department = res.data.data.department;
         that.setData({
           userName: userName,
           age: age,
           phone: phone,
           passwd: passwd,
           email: email,
           authorizationCode: authorizationCode,
           department: department,
           identity:identity,
         })
      },
      fail: function () {
        wx.showModal({
          content: '糟糕,网络信号不好',
          showCancel: false,
        })
      }
    })



  },
/**点击取消更改按钮 */
  cancelModalcnt:function(){
    wx.navigateBack({
      url:''
    })
  },
  /**点击提交更改 */

  modalcnt:function(){
    var loginUserId = wx.getStorageSync('loginUserId');
    let that  = this;
    var phone = that.data.phone;
    var passwd = that.data.passwd;
    var userName = that.data.userName;
    var email = that.data.email;
    var authorizationCode = that.data.authorizationCode;
    var department = that.data.department;
    var age = that.data.age;
    if(phone==''){
      wx.showModal({
        content: '手机号为空',
      })
      return
    }
    if (passwd == '') {
      wx.showModal({
        content: '密码为空',
      })
      return
    }
    if (userName == '') {
      wx.showModal({
        content: '用户姓名为空',
      })
      return
    }
    if (email == '') {
      wx.showModal({
        content: '邮箱号为空',
      })
      return
    }
    if (authorizationCode == '') {
      wx.showModal({
        content: '邮箱授权码为空',
      })
      return
    }
    if (department == '') {
      wx.showModal({
        content: '所属部门为空',
      })
      return
    }
    if (phone == '') {
      wx.showModal({
        content: '手机号为空',
      })
      return
    }
    wx.showModal({
      content: '确认提交更改？',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: api.UpDeteByIdURL,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
               id: loginUserId,
               phone:phone,
               passwd :passwd,
               userName: userName,
               email :email,
               authorizationCode :authorizationCode,
               department:department,
               age :age,
            },
            success: function (res) {
              wx.navigateBack({
                url:''
              })
            },
            fail: function () {
              wx.showModal({
                showCancel:false,
                content: '糟糕,网络信号不好',
              })
            }
          })
        }
      }
    })
  }, 
  nameInput:function(e){
    this.setData({
      userName: e.detail.value,
    })
  }
  ,
  ageInput: function (e) {
    this.setData({
      age: e.detail.value,
    })
  }
  ,
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value,
    })
  }
  ,
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value,
    })
  }
  ,
  emailInput: function (e) {
    this.setData({
      email: e.detail.value,
    })
  }
  ,
  authorizationCodeInput: function (e) {
    this.setData({
      authorizationCode: e.detail.value,
    })
  }
  ,
  departmentInput: function (e) {
    this.setData({
      department: e.detail.value,
    })
  }
  ,
})