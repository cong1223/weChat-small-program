// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreCommingSoon: [],
    isShowLoading: false
  },
  openMovieDetail: function (e) {
    var movieId = e.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: '../movieDetail/movieDetail?movieId=' + movieId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMoreCommingSoon();
  },
  getMoreCommingSoon: function () {
    var _this = this;
    var start = this.data.moreCommingSoon.length;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon',
      data: {
        count: 9,
        start: start
      },
      success: function (res) {
        var tempList = _this.data.moreCommingSoon;
        for(var i=0; i<res.data.subjects.length;i++){
          tempList.push(res.data.subjects[i]);
        }
        _this.setData({
          moreCommingSoon: tempList,
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
  
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      isShowLoading: true
    })
    this.getMoreCommingSoon();
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