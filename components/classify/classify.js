// components/classify/classify.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: () => { }
    },
    category: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    check(e) {
      wx.navigateTo({
        url: `/pages/cats/cats?name=${e.currentTarget.dataset.item}&category=${this.data.category}`
      })
    }
  }
})
