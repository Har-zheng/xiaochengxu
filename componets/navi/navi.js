// componets/navi/navi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first: Boolean, //  是否最新一期
    latest: Boolean //  是否最后一期
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    leftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    rightSrc: 'images/triangle@right.png'

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft:function(){
      if(!this.properties.latest){
        this.triggerEvent('left',{},{})
      }
    },
    onRight:function(){
      if(!this.properties.first){
        this.triggerEvent('right',{},{})
      }
    }
  }
})
