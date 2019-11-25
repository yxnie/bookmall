// pages/content/content.js
const app = getApp()
let WxParse = require('../../lib/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxParseData: '',
    title:"",
    list:[],
    index:null,
    id:""
  },
  add(){
    console.log(this.data.index)
    if (this.data.index>0){
      this.data.index--
      console.log(this.data.index)
      this.setData({
        title: this.data.list[this.data.index].title
      })
      this.getContent(this.data.list[this.data.index].link)
    }else{
      wx.showToast({
        title: '已是第一章',
        duration: 2000
      })
    }
  },
  substract(){
    if (this.data.index<this.data.list.length){
      this.data.index++
      console.log(this.data.index)
      this.setData({
        title: this.data.list[this.data.index].title
      })
      this.getContent(this.data.list[this.data.index].link)
    }else {
      wx.showToast({
        title: '已是最后一章',
        duration: 2000
      })
    }
  },
  getContent(link){
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`).then(res => {
      WxParse.wxParse('article', 'md', res.data.chapter.body, this, 5)
      this.data.list[this.data.index].index = this.data.index
      wx.setStorageSync(this.data.id, this.data.list[this.data.index])
      wx.hideLoading()
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
    })
  },
  getList(id) {
    app.globalData.fly.get(`/mix-atoc/${id}?view=chapters`).then(res => {
      this.setData({
        list: res.data.mixToc.chapters
      })
    }).catch(err => {
      console.log(err)
    })
  },
  chapter(){
    wx.navigateTo({
      url: `/pages/chapterList/chapterList?id=${this.data.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    wx.getStorageSync(options.id)
    this.getContent(wx.getStorageSync(options.id).link)
    this.setData({
      title: wx.getStorageSync(options.id).title,
      index: wx.getStorageSync(options.id).index,
      id: options.id
    })
    console.log(options)
    this.getList(options.id)
    //动态绑定标题
    wx.setNavigationBarTitle({
      title: options.title,
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
    return {
      
    }
  }
})