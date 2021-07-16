Page({
  data:{
    showIcon:true,
    swiperList: [],
    courses: [],
    searchList: null,
    type: 'recommend',
    tabs: [
      {name:'推荐', type: 'recommend'},
      {name:'智慧', type: 'path'},
      {name:'历史', type: 'project'},
      {name:'小说', type: 'activity'}
    ],
    activities: [],
  },
  onLoad() {
    wx.request({
      url:'https://www.fastmock.site/mock/daa7a596a2b1c90d1128e607dd62a9a8/weixin/api/getData',
      success:(res) => {
        const { data: {data} } = res;
        const { swiperList,courses,activities } = data;
        this.setData({
          swiperList,
          courses,
          activities
        })

      }
    })
  },
  handleInputChange(e) {
    const value = e.detail.value;
    let searchList = null;
    if(value) {
      searchList = this.data.courses.filter(item => item.title.indexOf(value) > -1)

    }
    this.setData({
      showIcon: value? false: true,
      searchList
    })
  },
  changeType(e) {
    // 点文字显示，点图片没反应，用currentTarget解决
    const type = e.currentTarget.dataset.type;
    this.setData({type});
  },
  handleCourseTap(e) {
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  // 写一个方法redirectTo(),会覆盖原来页面，实现点击“热门推荐”跳转到“hot”,或者写navigtor，新开的页面
  handleRecommendTap() {
    wx.redirectTo({
      url: '/pages/hot/hot',
    })
  }
})

