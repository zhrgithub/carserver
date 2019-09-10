var api = require('../../config/api.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personList: ['张三', '李思思', '王五', '赵六', '钱七',],
    departmentName:"部门名称",
    age: ['12', '55', '30', '32', '45',],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var department = options.department;
    app.about={
      department:department,
    };
    let that  = this;
    wx.request({
      url: api.ListUserURL,
      method: 'POST',
      data: {
        department: department,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let datas = res.data.data;
        var id = [];
        var name = [];
        var age = [];
        for(var i=0; i<datas.length;i++){
          id[i] = datas[i].id;
          name[i] = datas[i].userName;
          age[i] = datas[i].age;
        }
        that.setData({
          id:id,
          name:name,
          age:age,
          department:department,
        });
      }
      , fail: function () {
        wx.showModal({
          content: '糟糕,网络信号不好',
          showCancel: false,
        })
      }
    })
   
  },

  onShow(){
    var department = app.about.department;
    let that = this;
    wx.request({
      url: api.ListUserURL,
      method: 'POST',
      data: {
        department: department,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        let datas = res.data.data;
        var id = [];
        var name = [];
        var age = [];
        for (var i = 0; i < datas.length; i++) {
          id[i] = datas[i].id;
          name[i] = datas[i].userName;
          age[i] = datas[i].age;
        }
        that.setData({
          id: id,
          name: name,
          age: age,
          department: department,
        });
      },
      fail: function () {
        wx.showModal({
          content: '糟糕,网络信号不好',
          showCancel: false,
        })
      }
    })
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    setTimeout(() => {
      //this.getData = '数据拿到了'
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      this.onShow();
    }, 500)
  }



})