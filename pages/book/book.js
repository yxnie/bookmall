// pages/book/book.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "", //书id
    data: {},
    title: "",
    star: 0, //星数
    tag: "0",
    comment: [], //评价数组
    total: 0, //评价数量
    relatedBook: [], //相关书籍推荐
    showBook: [], //相关书籍展示
    showModal: false,
    addLock:true,//是否加入书架锁
  },
  startRead(){
    if (wx.getStorageSync(this.data.id)){
      wx.getStorageSync(this.data.id)
      wx.navigateTo({
        url: `/pages/content/content?id=${this.data.id}&title=${this.data.title}`
      })
    }else{
      app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
        res.data.mixToc.chapters[0].index=0
        wx.setStorageSync(this.data.id, res.data.mixToc.chapters[0])
        // console.log(res.data.mixToc.chapters[0])
        wx.navigateTo({
          url: `/pages/content/content?id=${this.data.id}&title=${this.data.title}`
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  addBookshelf(){
    this.setData({
      addLock:false
    })
    if(wx.getStorageSync("bookshelf")){
      let arr = wx.getStorageSync("bookshelf")
      arr.unshift(this.data.id)
      wx.setStorageSync("bookshelf", arr)
      let array = wx.getStorageSync("bookshelfContent")
      array.unshift(this.data.data)
      wx.setStorageSync("bookshelfContent", array)
    }else{
      let arr = []
      arr.unshift(this.data.id)
      wx.setStorageSync("bookshelf", arr)
      let array = []
      array.unshift(this.data.data)
      wx.setStorageSync("bookshelfContent", array)
    }
    if (!wx.getStorageSync(this.data.id)){
      app.globalData.fly.get(`/mix-atoc/${this.data.id}?view=chapters`).then(res => {
        res.data.mixToc.chapters[0].index = 0
        wx.setStorageSync(this.data.id, res.data.mixToc.chapters[0])
      }).catch(err => {
        console.log(err)
      })
    }
  },
  goBook(e){
    wx.navigateTo({
      url: `/pages/book/book?id=${e.currentTarget.dataset.id._id}&title=${e.currentTarget.dataset.id.title}`
    })
  },
  preview() {
    this.setData({
      showModal: true
    })
  },
  go() {
    this.setData({
      showModal: false
    })
  },
  goChapterList(){
    wx.navigateTo({
      url: `/pages/chapterList/chapterList?id=${this.data.id}`
    })
  },
  handleLongPress() {
    console.log(`https://statics.zhuishushenqi.com${this.data.data.cover}`)
    wx.showActionSheet({
      itemList: ["保存图片到本地"],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.downloadFile({
            url: `https://statics.zhuishushenqi.com${this.data.data.cover}`,
            success: (res)=> {
              if (res.statusCode === 200) {
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success:(res)=> {
                    wx.showToast({
                      title: '保存图片成功！',
                    })
                  },
                  fail:(res)=> {
                    wx.showToast({
                      title: '保存图片失败！',
                    })
                  }
                })
              }
            }
          })
        }
      },
    })
  },
  getBook() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/book/${this.data.id}`).then(res => {
      this.setData({
        data: res.data,
        star: Math.round(res.data.rating.score / 2)
      })
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    app.globalData.fly.get(`/post/short-review?book=${this.data.id}&total=true&sortType=newest`).then(res => {
      this.setData({
        total: res.data.total,
        comment: res.data.docs
      })
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
  },
  relatedRecommendedBooks() {
    app.globalData.fly.get(`/book/${this.data.id}/recommend`).then(res => {
      this.setData({
        relatedBook: res.data.books,
        showBook: res.data.books.slice(0, 3),
      })
    }).catch(err => {
      console.log(err)
    })
  },
  change() {
    let arr = this.data.relatedBook
    let more = arr.splice(0, 3)
    arr = arr.concat(more)
    this.setData({
      relatedBook: arr,
      showBook: arr.slice(0, 3),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      title: options.title
    })
    this.getBook()
    if (wx.getStorageSync("bookshelf")){
      if (wx.getStorageSync("bookshelf").indexOf(this.data.id)>-1){
        this.setData({
          addLock:false
        })
      }
    }
    //动态绑定标题
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
    this.relatedRecommendedBooks()
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