const app=getApp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numLock:false,
    bookshelf:[],
    bookshelfContent:[],
    editLock:true
  },
  help(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  goContent(e){
    wx.navigateTo({
      url: `/pages/content/content?id=${e.currentTarget.dataset.item._id}&title=${e.currentTarget.dataset.item.title}`
    })
  },
  goEdit(){
    this.setData({
      editLock: !this.data.editLock
    })
  },
  edit(e) {
    this.data.bookshelfContent.splice(e.currentTarget.dataset.index,1)
    this.data.bookshelf.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      bookshelfContent: this.data.bookshelfContent,
      bookshelf: this.data.bookshelf
    })
    wx.setStorageSync("bookshelf", this.data.bookshelf)
    wx.setStorageSync("bookshelfContent", this.data.bookshelfContent)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    if (wx.getStorageSync("bookshelf")) {
      this.setData({
        numLock: true,
        bookshelf: wx.getStorageSync("bookshelf"),
        bookshelfContent: wx.getStorageSync("bookshelfContent")
      })
      wx.getStorageSync("bookshelf").map((item,index) => {
        this.data.bookshelfContent[index].index=wx.getStorageSync(item).index
      })
      this.setData({
        bookshelfContent: this.data.bookshelfContent
      })
    }
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