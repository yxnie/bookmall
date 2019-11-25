// pages/books/books.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:"0",
    calssify: null,
    rank:null,
  },
  check(e){
    this.setData({
      tag: e.currentTarget.dataset.item
    })
  },
  getData() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("/cats/lv2/statistics").then(res => {
      this.setData({
        calssify: res.data
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  getRank(){
    app.globalData.fly.get("/ranking/gender").then(res => {
      this.setData({
        rank: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.getRank()
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