Page({
  data: {},
  onLoad: function(options) {
    this.getBbsPlate();
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  //获取帖子分类-话题
  getBbsPlate: function() {
    wx.BaaS.fetch("/2.0/class/api/function/getBbsPlate").then(res => {
      if (res && res.data.code && res.data.data) {
        const Data = res.data.data;
        console.log(Data);
        this.setData({
          topicData: res.data.data
        });
      }
    });
  },
  selectPlate: function(e) {
    const plate_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../itemIndex/itemIndex?plate_id=${plate_id}`
    });
  }
});
