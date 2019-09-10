// pages/chooseCar/chooseCar.js

var api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cars: ['冀A · B12345', '冀B · B12345', '冀C · B12345', '冀D · B12345', '冀F · B12345',],
    carName:""
  },
  // 选择车辆，然后填写到上一层页面的文本中
  ChooseCar: function (e) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var viewId = e.target.id;//点击的view的id
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;//点击的view的文本
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      chooseCar: viewText
    }),
    wx.navigateBack({
      url:'',
      data:{
        carName: viewText
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: api.ProvelObjectsURL,
      method: 'POST',
      data:{

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //let that= this;
        let responseBody = res.data.data
        var name = [];
        for (var i = 0; i < responseBody.length; i++) {
          name[i]=responseBody[i].name;
        }
        that.setData({
          name:name,
        })
      },
      fail: function () {
        wx.showModal({
          content: '糟糕,网络信号不好',
          showCancel: 'false',
          success: function (res) {
            if(res.confirm){
              wx.navigateBack({
                url: '',
              })
            }
           
          }
        });
      }
    })
  },

})