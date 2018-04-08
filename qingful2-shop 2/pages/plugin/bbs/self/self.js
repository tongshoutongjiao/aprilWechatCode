const util = require("../../../../utils/util.js");
const moment = require("../../../../utils/moment.min.js");
Page({
  data: {
    color: wx.getExtConfigSync().color
  },
  onLoad: function(options) {
    this.getPhoneInfo();
    this.getPersonPost(options.id);
  },
  // 获取屏幕参数
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
  // 获取个人所有帖子
  getPersonPost(user_id) {
    const lat = this.data.lat + "";
    const lng = this.data.lng + "";
    wx.BaaS
      .fetch(`/2.0/class/auth_api/function/myBbsPost?bbs_user_id=${user_id}`)
      .then(res => {
        if (res && res.data.data && res.data.code) {
          const userInfo = res.data.data.bbsUser;
          const postList = res.data.data.postList;
          for (const post of postList) {
            // 格式化距现在时间
            post.created_at = moment(post.created_at).fromNow();
            // 获取距离
            post.distance = post.lat
              ? util.GetDistance(post.lat, post.lng, lat, lng)
              : 0;
            // 获取照片列表
            post.img = post.img ? JSON.parse(post.img) : [];
          }
          this.setData({
            userInfo: userInfo,
            postList: postList
          });
        }
      });
  },
  takePhone(e) {
    const phone = e.detail.value;
    wx.makePhoneCall({
      phoneNumber: phone
    });
  }
});
