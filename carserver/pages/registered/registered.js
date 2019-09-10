var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "请输入姓名",
    age: "请输入年龄",
    phone: "请输入手机号",
    passwd: "请输入密码",
    email: "请输入网易163邮箱号",
    authorizationCode: "请输入邮箱授权码",
    department: "请输入所在部门"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(Object.keys(options).length!=0){
      var loginUserId = options.id
      wx.request({
        url: api.SelectUserInfoByIdURL,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          id: loginUserId,
        },
        success: function (res) {
          var userName = res.data.data.userName;
          var age = res.data.data.age;
          var phone = res.data.data.phone;
          var passwd = res.data.data.passwd;
          var email = res.data.data.email;
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
            id: loginUserId,
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
    



  },
  /**点击删除人员按钮 */
  cancelModalcnt: function (e) {
    let id = e.target.id;
    wx.showModal({
      content: '确认删除人员?',
      success:function(res){
        if(res.confirm){
          wx.request({
            url: api.DeleteUserByIdURL,
            method:'POST',
            header:{
              'content-type': 'application/x-www-form-urlencoded'
            },
            data:{
              id:id,
            },
            fail:function(){
              wx.showModal({
                content: '糟糕,网络信息号不好',
              })
            }
          })
          wx.navigateBack({
            url:''
          })
        }
      }
    })
  },
  /**点击提交更改 */
  modalcnt: function (e) {
    var loginUserId = e.target.id;
    let that = this;
    var phone = that.data.phone;
    var passwd = that.data.passwd;
    var userName = that.data.userName;
    var email = that.data.email;
    var authorizationCode = that.data.authorizationCode;
    var department = that.data.department;
    var age = that.data.age;



    if (userName == '') {
      wx.showModal({
        content: '请输入姓名',
      })
      return
    }
    if (age == '') {
      wx.showModal({
        content: '请输入年龄',
      })
      return
    }
    if (phone == '') {
      wx.showModal({
        content: '请输入手机号',
      })
      return
    }
    if (passwd == '') {
      wx.showModal({
        content: '请输入密码',
      })
      return
    }

    if (email == '') {
      wx.showModal({
        content: '请输入网易163邮箱号',
      })
      return
    }
    var pattern = /^([A-Za-z0-9_\-\.])+\@(163.com)$/;
    if (!pattern.test(email)) {
      wx.showModal({
        content: '请输入网易163邮箱号',
      })
      return
    }
    if (authorizationCode == '') {
      wx.showModal({
        content: '请输入邮箱授权码',
      })
      return
    }

    if (department == '') {
      wx.showModal({
        content: '请输入所在部门',
      })
      return
    }
    if (phone.length < 11) {
      wx.showModal({
        content: '手机号格式不正确',
      })
      return
    }
    wx.showModal({
      content: '确认提交更改？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api.UpDeteByIdURL,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              id: loginUserId,
              phone: phone,
              passwd: passwd,
              userName: userName,
              email: email,
              authorizationCode: authorizationCode,
              department: department,
              age: age,
            },
            success: function (res) {
              wx.navigateBack({
                url: ''
              })
            },
            fail: function () {
              wx.showModal({
                showCancel: false,
                content: '糟糕,网络信号不好',
              })
            }
          })
        }
      },
    })
  },
  /**点击确认提交 */
  newPerson:function(){
    let that = this;
    var phone = that.data.phone;
    var passwd = that.data.passwd;
    var userName = that.data.userName;
    var email = that.data.email;
    var authorizationCode = that.data.authorizationCode;
    var department = that.data.department;
    var age = that.data.age;
    if (userName == '请输入姓名') {
      wx.showModal({
        content: '请输入姓名',
      })
      return
    }
    if (age == '请输入年龄') {
      wx.showModal({
        content: '请输入年龄',
      })
      return
    }
    if (phone =='请输入手机号'){
      wx.showModal({
        content: '请输入手机号',
      })
      return
    }
    if (passwd =='请输入密码'){
      wx.showModal({
        content: '请输入密码',
      })
      return
    }
    
    if (email == '请输入网易163邮箱号') {
      wx.showModal({
        content: '请输入网易163邮箱号',
      })
      return
    }
    var pattern = /^([A-Za-z0-9_\-\.])+\@(163.com)$/;
    if (!pattern.test(email)) {
      wx.showModal({
        content: '请输入网易163邮箱号',
      })
      return
    }
    if (authorizationCode == '请输入邮箱授权码') {
      wx.showModal({
        content: '请输入邮箱授权码',
      })
      return
    }
    
    if (department == '请输入所在部门') {
      wx.showModal({
        content: '请输入所在部门',
      })
      return
    }
    if (phone.length<11) {
      wx.showModal({
        content: '手机号格式不正确',
      })
      return
    }
    wx.showModal({
      content: '确认提交？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: api.InsertUserURL,
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              phone: phone,
              passwd: passwd,
              userName: userName,
              email: email,
              authorizationCode: authorizationCode,
              department: department,
              age: age,
            },
            success: function (res) {
              wx.navigateBack({
                url: ''
              })
              wx.request({
                url: api.SendNewPersonEmail,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                  phone: phone,
                  email: email,
                  authorizationCode: authorizationCode,
                }
              })
            },
            fail: function () {
              wx.showModal({
                showCancel: false,
                content: '糟糕,网络信号不好',
              })
            }
          })
        }
      },
    })
  },

  nameInput: function (e) {
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
  

})