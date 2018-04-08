// pages/index.js
const util = require("../../../../utils/util.js");
const moment = require("../../../../utils/moment.min.js");
Page({
    data: {
        bbsList: "",
        is_cream: 0,
        color: wx.getExtConfigSync().color,
        selectTab: true,
        selectArea: false,
        firstItem: "最新",
        searchItem: [
            {
                type: "latest",
                content: "最新"
            },
            {
                type: "hot",
                content: "最热"
            },
            {
                type: "cream",
                content: "精华"
            },
            {
                type: "distance",
                content: "距离"
            }
        ]
    },
    onPullDownRefresh: function() {
        this.getBbsPost();
        wx.stopPullDownRefresh();
    },
    onLoad: function() {
        this.getPhoneInfo();
        this.getLocation(); //定位
    },
    // 获取手机信息
    getPhoneInfo() {
        const systemInfo = wx.getStorageSync("systemInfo");
        this.setData({
            phone_size: {
                windowHeight: systemInfo.windowHeight,
                windowWidth: systemInfo.windowWidth
            }
        });
    },
    // 点击切换选择栏
    switchSelectTab: function() {
        let selectTab = this.data.selectTab;
        this.setData({
            selectArea: selectTab,
            selectTab: selectTab ? false : true
        });
    },
    //点击切换搜索项目
    mySelect: function(e) {
        const name = e.target.dataset.name;
        const type = e.target.dataset.type;
        this.setData({
            firstItem: name,
            selectTab: true,
            selectArea: false
        });
        this.bbsRank(type);
    },
    //定位
    getLocation: function() {
        const that = this;
        wx.getLocation({
            type: "wgs84",
            success: function(res) {
                wx.setStorageSync("location", {
                    lng: res.longitude,
                    lat: res.latitude
                });
                that.setData({
                    lng: res.longitude,
                    lat: res.latitude
                });
                that.getBbsPost(); //获取帖子列表
            }
        });
    },
    //获取帖子列表
    getBbsPost: function() {
        const lng = this.data.lng;
        const lat = this.data.lat;
        wx.BaaS.fetch("/2.0/class/auth_api/function/getBbsPost").then(res => {
            if (res && res.data.code && res.data.data) {
                let Data = res.data.data;
                moment.locale("zh-cn");
                for (let row of Data) {
                    row.len = util.GetDistance(row.lng, row.lat, lng, lat); //得到米
                    row.created_at = moment(row.created_at).fromNow();
                    row.img = row.img ? JSON.parse(row.img) : [];
                }
                this.setData({
                    bbsList: Data
                });
            }
        });
    },
    // 监听用户搜索内容
    heardTitle(e) {
        const keyword = e.detail.value;
        if (!keyword) {
            this.getBbsPost();
        }
        this.setData({
            keyword: keyword
        });
    },
    // 查找帖子
    searchBbs() {
        const bbsArr = Array();
        const keyword = this.data.keyword;
        const bbsList = this.data.bbsList;
        for (const bbs of bbsList) {
            if (bbs.title.indexOf(keyword) > -1) {
                bbsArr.push(bbs);
            }
        }
        this.setData({
            bbsList: bbsArr
        });
    },
    //拨打电话
    makePhoneCall: function(e) {
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
    //帖子排序
    bbsRank: function(rank) {
        let bbsList = this.data.bbsList;

        let is_cream = 0;
        if (rank == "latest") {
            bbsList = bbsList.sort(function(a, b) {
                return b.id - a.id;
            });
        }
        if (rank == "hot") {
            bbsList = bbsList.sort(function(a, b) {
                return b.num_look - a.num_look;
            });
        }
        if (rank == "cream") {
            is_cream = 1;
            bbsList = bbsList.sort(function(a, b) {
                return b.num_look - a.num_look;
            });
        }
        if (rank == "distance") {
            bbsList = bbsList.sort(function(a, b) {
                return a.len - b.len;
            });
        }
        this.setData({
            is_cream: is_cream,
            bbsList: bbsList
        });
    },
    // 跳转到帖子详情
    linkDetail(e) {
        const bbs_id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `../indexComment/indexComment?id=${bbs_id}`
        });
    },
    //    点击话题跳转到话题列表页面
    navigatorToItemList: function() {
        wx.navigateTo({
            url: "../itemList/itemList"
        });
    },
    //    点击用户头像，到个人主页
    navigatorToSelf: function(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `../self/self?id=${id}`
        });
    }
});
