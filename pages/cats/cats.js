// pages/cats/cats.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
        id: 'hot',
        name: '热门'
      },
      {
        id: 'new',
        name: '新书'
      },
      {
        id: 'reputation',
        name: '好评'
      },
      {
        id: 'over',
        name: '完结'
      },
      {
        id: 'monthly',
        name: 'VIP'
      }
    ],
    name: "", //大类
    mins: [],
    category: "",
    type: "hot", //排行类型
    limit: 20, //每页条数
    start: 0,
    list: [], //图书列表
    type: "hot", //排行类型
    minor: "", //小类
    // all:false,
    length: 20, //获取数据长度
  },
  choiceType(e) {
    this.setData({
      type: e.currentTarget.dataset.item,
      minor: "",
      list: [],
      start: 0,
    })
    this.getList(this.data.type, this.data.minor)
  },
  choiceMinor(e) {
    this.setData({
      minor: e.currentTarget.dataset.item,
      list: [],
      start: 0,
    })
    this.getList(this.data.type, this.data.minor)
  },
  //获取小类
  getMins() {
    app.globalData.fly.get(`/cats/lv2`).then(res => {
      res.data[this.data.category].map(item => {
        if (item.major === this.data.name) {
          this.setData({
            mins: item.mins
          })
        }
      })
    }).catch(err => {
      console.log(err)
    })
  },
  //获取books列表
  getList(type, minor) {
    wx.showLoading({
      title: '加载中',
    })
    if (minor) {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.category}&type=${type}&major=${this.data.name}&minor=${minor}&start=${this.data.start}&limit=${this.data.limit}`).then(res => {
        this.setData({
          list: this.data.list.concat(res.data.books),
          length: res.data.books.length
        })
        wx.hideLoading()
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    } else {
      app.globalData.fly.get(`/book/by-categories?gender=${this.data.category}&type=${type}&major=${this.data.name}&start=${this.data.start}&limit=${this.data.limit}`).then(res => {
        this.setData({
          list: this.data.list.concat(res.data.books),
          length: res.data.books.length
        })
        console.log(this.data.list)
        wx.hideLoading()
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
      })
    }
  },
  goBook(e) {
    wx.navigateTo({
      url: `/pages/book/book?id=${e.currentTarget.dataset.id._id}&title=${e.currentTarget.dataset.id.title}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      name: options.name,
      category: options.category,
    })
    this.getMins()
    this.getList(this.data.type, this.data.minor)
    //动态绑定标题
    wx.setNavigationBarTitle({
      title: options.name,
    })
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
    if (this.data.length = this.data.limit) {
      this.setData({
        start: this.data.limit * 1 + this.data.start * 1
      })
      this.getList(this.data.type, this.data.minor)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})