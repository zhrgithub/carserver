var api = require('../../config/api.js'); 
var util = require('../../config/jsDateTime.js');

Page({
  data: {
    /**当datas为0时候说明没有数据，显示空数据页面 */
    datas: 1,
    phone:'',
    textInfo: '', 
    updateTime:'',
  },
  /**重新加载的时候执行该方法 */
  onShow(){
    var identity = wx.getStorageSync('identity'); 
    var IndexURL = api.IndexUrl;
    console.log("identity:" + identity)
    if (identity==1){
      IndexURL = api.SelectAllFormURL;
    }
    var value = wx.getStorageSync('passwd');
    console.log("value:" + value);
    var that = this;
    wx.request({
      url: IndexURL,
      method: 'POST',
      data: {
        phone: value,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {

        console.log(res.data);

        let responseBody = res.data.data
        console.log("重新加载的时候执行");
        console.log(responseBody);
        var reslength = responseBody.length;
        var number = 0;
        console.log("reslength="+reslength)
          console.log('enter yes')
          var updateTime = [];
          var name = [];
          var applyDepartment = [];
          var id = [];
          var textStyleInfo = [];
          var textInfo = [];
          var pages = [];
          var infos = [];
          for (var i = 0; i < responseBody.length; i++) {
            updateTime[i] = util.formatDate(responseBody[i].updateTime);
            name[i] = responseBody[i].name;
            applyDepartment[i] = responseBody[i].applyDepartment;
            id[i] = responseBody[i].id;
            textStyleInfo[i] = responseBody[i].textStyleInfo;
            textInfo[i] = responseBody[i].textInfo;
            pages[i] = responseBody[i].pages;
            infos[i] = [updateTime[i], name[i], applyDepartment[i], id[i], textStyleInfo[i], textInfo[i], pages[i]];
          }
          console.log(infos);

          that.setData({
            infos: infos,
          });
      },
      fail:function(){
        wx.showModal({
          showCancel:false,
          content: '糟糕,网络信号差',
        })
      }
    })
  },
  /**加载的时候执行该方法 */
  //  onLoad: function () {
  //    var value = wx.getStorageSync('passwd');
  //    console.log("value:" + value);
  //    var that = this;
  //    wx.request({
  //      url: api.IndexUrl,
  //      method: 'POST',
  //      data: {
  //        phone:value,
  //      }, 
  //      header: {
  //        'content-type': 'application/x-www-form-urlencoded'
  //      },
  //      success: function (res) {

  //        console.log(res.data);

  //        let responseBody = res.data.data
  //        console.log("加载的时候执行"+responseBody);
  //          var updateTime = [];
  //          var name = [];
  //          var applyDepartment = [];
  //          var id = [];
  //          var textStyleInfo = [];
  //          var textInfo = [];
  //          var pages = [];
  //          var infos = [];
  //          for (var i = 0; i < responseBody.length; i++) {
  //            updateTime[i] = util.formatDate(responseBody[i].updateTime);
  //            name[i] = responseBody[i].name;
  //            applyDepartment[i] = responseBody[i].applyDepartment;
  //            id[i] = responseBody[i].id;
  //            textStyleInfo[i] = responseBody[i].textStyleInfo;
  //            textInfo[i] = responseBody[i].textInfo;
  //            pages[i] = responseBody[i].pages;
  //            infos[i] = [updateTime[i], name[i],applyDepartment[i],id[i],textStyleInfo[i],textInfo[i],pages[i]];
  //          }
  //          console.log(infos);

  //          that.setData({
  //            infos:infos,
  //          });
           
  //      }
  //    })
     
  // },
  /**重新加载的时候执行该方法 */
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    setTimeout(() => {
      //this.getData = '数据拿到了'
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
      this.onShow()
    },500)
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }



})
