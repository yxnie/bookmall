// components/rank/rank.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: () => { }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  // ready(){

  // },
  /**
   * 组件的方法列表
   */
  methods: {
    goList(e){
      wx.setStorageSync("list", e.currentTarget.dataset.item)
      wx.navigateTo({
        url: "/pages/list/list"
      })
    }
  }
})
