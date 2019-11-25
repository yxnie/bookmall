// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    hotWords:[],
    searchBooks:[],
    history:[],
    hotNum:6
  },
  //input框输入事件
  onInput(e) {
    this.setData({
      inputValue: e.detail.value,
      searchBooks: []
    })
    if (this.data.inputValue.trim()){
      app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.inputValue}`).then(res => {
        this.setData({
          searchBooks: res.data.books
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
   //input框删除事件
  cancelValue(e){
    this.setData({
      inputValue: "",
    })
  },
  //换一换
  change(){
    this.data.hotWords.map(item => {
      item.background = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    })
    let arr = this.data.hotWords.splice(0,6)
    this.setData({
      hotWords: this.data.hotWords.concat(arr),
      hotNum:Math.floor(Math.random()*4+3)
    })
  },
  //添加搜索历史
  setHistory(){
    if (wx.getStorageSync("history")){
      let arr = wx.getStorageSync("history")
      if (arr.indexOf(this.data.inputValue)>-1){
        let num = arr.indexOf(this.data.inputValue)
        arr.splice(num,1)
      }
      arr.unshift(this.data.inputValue)
      wx.setStorageSync("history", arr)
    }else{
      let arr=[]
      arr.unshift(this.data.inputValue)
      wx.setStorageSync("history", arr)
    }
    this.setData({
      history: wx.getStorageSync("history")
    })
  },
  //点击搜索历史
  searchHistory(e){
    this.setData({
      inputValue: e.currentTarget.dataset.item
    })
    if (this.data.inputValue.trim()) {
      app.globalData.fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${this.data.inputValue}`).then(res => {
        this.setData({
          searchBooks: res.data.books
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  //清空搜索历史
  removeAll(){
    this.setData({
      history: []
    })
    wx.setStorageSync("history")
  },
  getHot() {
    // wx.showLoading({
    //   title: '加载中',
    // })
    app.globalData.fly.get(`/book/hot-word`).then(res => {
      this.setData({
        hotWords: res.data.newHotWords
      })
      this.data.hotWords.map(item => {
        item.background = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
      })
      this.setData({
        hotWords: this.data.hotWords,
        history: wx.getStorageSync("history")
      })
      // wx.hideLoading()
    }).catch(err => {
      console.log(err)
      // wx.hideLoading()
    })
  },
  //前往书籍详情
  goBook(e){
    this.setHistory()
    wx.navigateTo({
      url: `/pages/book/book?id=${e.currentTarget.dataset.id._id}&title=${e.currentTarget.dataset.id.title}`
    })
  },
  hotGoBook(e) {
    app.globalData.fly.get(`/book/${e.currentTarget.dataset.id}`).then(res => {
      console.log(res)
      wx.navigateTo({
        url: `/pages/book/book?id=${e.currentTarget.dataset.id}&title=${res.data.title}`
      })
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHot()
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