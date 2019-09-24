var bmap = require('../../config/bmap-wx.min.js');
var wxMarkerData = [];
var pages = getCurrentPages();//获取页面
var prevPage = pages[pages.length - 2];  //上一个页面
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    sugData: '',
    textinfos: "请输入起始地点",
    purposeinfos: "请输入目的",
    purpose: "",
    pickUpPoint:"",
    destination:""
  },

  onLoad: function () {
   wx.showModal({
     content: '请注意打开GPS定位',
     showCancel:false,
   })

    var that = this;
    var pages = getCurrentPages();//获取页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    var textvalue = prevPage.data.pickUpPoint;
    var purpose = prevPage.data.destination;
    that.setData({
      textinfos: textvalue,
      purposeinfos: purpose,
    });
    var BMap = new bmap.BMapWX({
      ak: 'Wj5k2gCmGXwf9Zhjd8CvugtOqXhFyVdc'
    });
    var fail = function (data) {
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.search({
      "query": '美食',
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
  },
  bindKeyInput: function (e) {
    var pickUpPoint = e.detail.value;
    var pages = getCurrentPages();//获取页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      pickUpPoint: pickUpPoint,
    })


    var that = this;
    if (e.detail.value === '') {
      that.setData({
        sugData: ''
      });
      return;
    }
    var BMap = new bmap.BMapWX({
      ak: 'Wj5k2gCmGXwf9Zhjd8CvugtOqXhFyVdc'
    });
    var fail = function (data) {
    };
    var success = function (data) {
      var sugData = [];
      for (var i = 0; i < data.result.length; i++) {
        sugData[i] = data.result[i].name;
      }
      that.setData({
        sugData: sugData
      });
    }
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  suData: function (e) {
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;//点击的view的文本

    var that = this;
    var pages = getCurrentPages();//获取页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      pickUpPoint: viewText,
    }),
    that.setData({

      textvalue: viewText,
      
      //status:0,
      sugData: ''
    })
   
    //this.onReady();
  },
  purposeData: function (e) {
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;//点击的view的文本
    var that = this;
    var pages = getCurrentPages();//获取页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      destination: viewText,
    });
    that.setData({

      purpose: viewText,

      //status:0,
      purposeData: ''
    })
  },
  purposeInput: function (e) {
    var destination = e.detail.value;
    var pages = getCurrentPages();//获取页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      destination: destination,
    })
    var that = this;
    if (e.detail.value === '') {
      that.setData({
        purposeData: ''
      });
      return;
    }
    var BMap = new bmap.BMapWX({
      ak: 'Wj5k2gCmGXwf9Zhjd8CvugtOqXhFyVdc'
    });
    var fail = function (data) {
    };
    var success = function (data) {
      var purposeData = [];
      for (var i = 0; i < data.result.length; i++) {
        purposeData[i] = data.result[i].name;
      }
      that.setData({
        purposeData: purposeData
      });
    }
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: success
    });
  }

})