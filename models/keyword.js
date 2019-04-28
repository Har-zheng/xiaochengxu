class KeywordModel {
  key = 'q'
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if(!words){
      return []
    }
    return words
  }
  getHot() {

  }
  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    if (!has) {
      // 数组末尾 删除 keyword
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}
export { KeywordModel }