// componets/seach/index.js
import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from "../../models/book.js"
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    dataArr: [],
    q: ''
  },
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
    },
    onConfirm(event) {
      console.log(event)
      this.setData({
        searching:true
      })
      // const word = event.detail.value 
      const q = event.detail.value || event.detail.text
      bookModel.search(0, q).then(res => {
        this.setData({
          dataArr:res.books,
          q
        })
        keywordModel.addToHistory(q)
      })
    },
    onDelete(event){
      // this.initialize()
      this.setData({
        searching: false,
        q: ''
      })
    }

  }
})
