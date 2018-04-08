const util = require("../../../../utils/util.js");
const moment = require("../../../../utils/moment.min.js");
Page({
  data: {},
  onLoad: function(options) {
    const plate_id = options.plate_id;
    this.getPhoneInfo();
    this.selectPlate(plate_id);
  },
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh();
  },
  getPhoneInfo() {
    const systemInfo = wx.getStorageSync("systemInfo");
    const location = wx.getStorageSync("location");
    this.setData({
      lat: location.lat,
      lng: location.lng,
      windowWidth: systemInfo.windowWidth,
      windowHeight: systemInfo.windowHeight
    });
  },
  // 打call
  takePhone(e) {
    const phone = e.currentTarget.dataset.phone;
    if (!phone) {
      wx.showModal({
        title: "提示",
        content: "该用户没有留下联系方式哦",
        showCancel: false
      });
      return;
    }
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    });
  },
  // 跳转到帖子详情
  linkPost(e) {
    const post_id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: `../indexComment/indexComment?id=${post_id}` });
  },
  //    点击用户头像，到个人主页
  navigatorToSelf: function(e) {
    wx.navigateTo({
      url: "../self/self"
    });
  },
  // 分类列表
  selectPlate(plate_id) {
    const lat = this.data.lat + "";
    const lng = this.data.lng + "";
    wx.BaaS
      .fetch(
        `/2.0/class/auth_api/function/getBbsPlatePost?plate_id=${plate_id}`
      )
      .then(res => {
        if (res && res.data.code && res.data.data) {
          const plate = res.data.data.plate;
          const postList = res.data.data.data;
          for (const post of postList) {
            // 获取距当前时间
            post.created_at = post.created_at
              ? moment(post.created_at).fromNow()
              : "";
            // 获取图片列表
            post.post.img = post.post.img.substring(2);
            post.post.img = post.post.img.substring(
              0,
              post.post.img.length - 2
            );
            post.post.img = post.post.img.split('","');
            // 计算距离
            post.post.distance = post.post.lng
              ? util.GetDistance(post.post.lat, post.post.lng, lat, lng)
              : 0;
          }
          this.setData({
            postList: postList,
            plate: plate
          });
        }
      });
  }
});
