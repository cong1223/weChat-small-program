// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    commingSoon: [],
    topList: [],
    isShowLoading: false,
    searchList: [],
    isSearch: false,
    isSeachEmpty: false
  },
  openMovieDetail: function(e){
    var movieId = e.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '../movieDetail/movieDetail?movieId='+movieId,
    })
  },
  getMore: function(){
    wx.navigateTo({
      url: '../more/more',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInTheatersList();
    this.getCommingSoon();
    this.getTop250();
  },
  getInTheatersList: function(){
    var _this = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters',
      data: {
        count: 5
      },
      success: function (res) {
        _this.setData({
          inTheaters: res.data.subjects
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
      }
    })
  },
  getCommingSoon: function () {
    var _this = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon',
      data: {
        count: 3
      },
      success: function (res) {
        _this.setData({
          commingSoon: res.data.subjects
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
      }
    })
  },
  getTop250: function () { 
    var _this = this;
    var start = this.data.topList.length;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250',
      data: {
        start: start,
        count: 9
      },
      success: function (res) {
        var tempList = _this.data.topList;
        for(var i=0;i<res.data.subjects.length;i++){
          tempList.push(res.data.subjects[i])
        }
        _this.setData({
          topList: tempList,
          isShowLoading: false
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
      }
    })
  },
  onImageError: function(e){
    var index = e.currentTarget.dataset.index; 
    var topList = this.data.topList;
    var errorImageItem = topList[index];
    errorImageItem.images.large = '../../images/error_img.jpg';
    topList[index] = errorImageItem;
    this.setData({
      topList: topList
    })
  },
  getSeachList: function(value){
    if(value){
      var _this = this;
      wx.request({
        url: 'http://t.yushu.im/v2/movie/search',
        data: {
          q: value
        },
        success: function (res) {
          var searchList = res.data.subjects;
          var isSeachEmpty = false;
          if (searchList.length == 0) {
            isSeachEmpty = true
          } else {
            isSeachEmpty = false
          }
          _this.setData({
            searchList: res.data.subjects,
            isSearch: true,
            isSeachEmpty: isSeachEmpty
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '网络请求失败',
            icon: 'none'
          })
        }
      })
    }else{
      this.setData({
        isSearch: false
      })
    }
    
  
  },
  onSearch: function(e){
    this.getSeachList(e.detail.value);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      isShowLoading: true
    })
    this.getTop250();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})