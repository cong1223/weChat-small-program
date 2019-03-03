var data = require('../../static/news-data.js')
// pages/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: [
      "../../images/news/timg.jpeg",
      "../../images/news/5g.jpeg",
      "../../images/news/ai.jpeg",
      "../../images/news/huawei.jpeg"
    ],
    newsList: data.newsList,
  },
  gotoNewsDetail: function(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../newsDetail/newsDetail?index='+index,
    })
  },
  onImageError: function (e) {
    var writerIndex = e.currentTarget.dataset.writerIndex;
    var newsIndex = e.currentTarget.dataset.newsIndex;
    var newsList = this.data.newsList;
    // console.log(newsIndex)
    if (newsIndex){
      var newsImageError = newsList[newsIndex];
      newsImageError.newsUrl = '../../images/error_img.jpg';
    }
    if (writerIndex){
      var writersImageError = newsList[writerIndex];
      writersImageError.writersUrl = '../../images/error_img.jpg';
    } 
    this.setData({
      newsList: newsList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.newsList)
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