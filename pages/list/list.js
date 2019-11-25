// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    list:[],
    title:"",
    tag: "0",
  },
  getList(id){
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/ranking/${id}`).then(res => {
      this.setData({
        list: res.data.ranking.books
      })
      console.log(this.data.list)
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  check(e) {
    this.setData({
      tag: e.currentTarget.dataset.item
    })
    this.getList(this.data.item[e.currentTarget.dataset.id])
  },
  goBook(e){
    wx.navigateTo({
      url: `/pages/book/book?id=${e.currentTarget.dataset.id._id}&title=${e.currentTarget.dataset.id.title}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      item: wx.getStorageSync("list")
    })
    this.getList(this.data.item._id)
    //动态绑定标题
    wx.setNavigationBarTitle({
      title: this.data.item.title,
    })
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