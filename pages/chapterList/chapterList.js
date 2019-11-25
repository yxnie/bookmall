// pages/chapterList/chapterList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    showList:[],
    lock:true,
    book:"",
  },
  smaller() {
    if(this.data.lock){
      this.setData({
        showList: this.data.list.reverse(),
        lock: false
      })
    }
  },
  bigger() {
    if(!this.data.lock){
      this.setData({
        showList: this.data.list.reverse(),
        lock: true
      })
    }
  },
  goContent(e){
    app.globalData.fly.get(`/book/${this.data.book}`).then(res => {
      // console.log(res.data.title, this.data.book, e.currentTarget.dataset.index)
      if (this.data.lock){
        e.currentTarget.dataset.item.index = e.currentTarget.dataset.index
        wx.setStorageSync(this.data.book, e.currentTarget.dataset.item)
        wx.navigateTo({
          url: `/pages/content/content?id=${this.data.book}&title=${res.data.title}&index=${e.currentTarget.dataset.index}`
        })
      }else{
        let index = this.data.list.length - 1 - e.currentTarget.dataset.index
        // console.log(index)
        e.currentTarget.dataset.item.index = index
        wx.setStorageSync(this.data.book, e.currentTarget.dataset.item)
        wx.navigateTo({
          url: `/pages/content/content?id=${this.data.book}&title=${res.data.title}`
        })
      }
      
    }).catch(err => {
      console.log(err)
    })
  },
  getList(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/mix-atoc/${id}?view=chapters`).then(res => {
      this.setData({
        list: res.data.mixToc.chapters,
        showList: res.data.mixToc.chapters,
        book: res.data.mixToc.book
      })
      console.log(res.data)
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})