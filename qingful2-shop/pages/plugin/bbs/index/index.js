// pages/index.js
const util = require("../../../../utils/util.js");
const moment = require("../../../../utils/moment.min.js");


Page({

    /**
     * 页面的初始数据
     */
    data: {
        bbsList: '',
        is_cream: 0,
        selectTab: true,
        selectArea: false,
        firstItem: '最新',
        searchItem: [{
            type: 'latest',
            content: '最新'
        }, {
            type: 'hot',
            content: '最热'
        }, {
            type: 'cream',
            content: '精华'
        }, {
            type: 'distance',
            content: '距离'
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getLocation(); // 定位

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 点击切换选择栏

    // 状态1 selectTab为true 隐藏选择框，同时selectArea为false 按钮向下
    // 状态2 selectTab为false 展示选择框，同时selectArea为tru 按钮向上

    switchSelectTab: function () {
        let selectTab = this.data.selectTab;
        this.setData({
            selectArea: selectTab,
            selectTab: !selectTab
        });
    },

    //   点击切换搜索项目

    mySelect: function (e) {
        const name = e.target.dataset.name;
        const type = e.target.dataset.type;
        this.setData({
            firstItem: name,
            selectTab: true,
            selectArea: false,
        });
        this.bbsRank(type);
    },

    //  定位
    getLocation: function () {
        const that = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                console.log('定位信息：', res);
                that.setData({
                    lng: res.longitude,
                    lat: res.latitude
                });
                that.getBbsPost(); //获取帖子列表
            }
        })
    },


    // 获取帖子列表

    getBbsPost: function () {
        const lng = this.data.lng;
        const lat = this.data.lat;
        const url = '/2.0/class/auth_api/function/getBbsPost';
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                let Data = res.data.data;

                moment.locale('zh-cn');
                for (let row of Data) {
                    row.len = util.GetDistance(row.lng, row.lat, lng, lat); //得到米
                    row.created_at = moment(row.created_at).fromNow();
                    row.img = row.img ? JSON.parse(row.img) : [];
                }
                console.log('帖子列表', Data);
                this.setData({
                    bbsList: Data
                });
            }
        });
    },

    //  拨打电话

    makePhoneCall: function (e) {
        const phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone //仅为示例，并非真实的电话号码
        })
    },

    //  帖子排序

    bbsRank: function (rank) {
        let bbsList = this.data.bbsList;
        let is_cream = 0;

        // 使用switch 方式处理
        switch (rank) {
            case 'latest':
                bbsList = bbsList.sort(function (a, b) {
                    return b.id - a.id;
                });
                break;
            case 'hot':
                bbsList = bbsList.sort(function (a, b) {
                    return b.num_look - a.num_look;
                });
                break;
            case 'cream':
                is_cream = 1;
                bbsList = bbsList.sort(function (a, b) {
                    return b.num_look - a.num_look;
                });
                break;
            case 'distance':
                bbsList = bbsList.sort(function (a, b) {
                    return a.len - b.len;
                });
                break;
            default:
                break;
        }
        this.setData({
            is_cream: is_cream,
            bbsList: bbsList
        });

        // if (rank == 'latest') {
        //     bbsList = bbsList.sort(function (a, b) {
        //         return b.id - a.id;
        //     });
        // }
        // if (rank == 'hot') {
        //     bbsList = bbsList.sort(function (a, b) {
        //         return b.num_look - a.num_look;
        //     });
        // }
        // if (rank == 'cream') {
        //     is_cream = 1;
        //     bbsList = bbsList.sort(function (a, b) {
        //         return b.num_look - a.num_look;
        //     });
        // }
        // if (rank == 'distance') {
        //     bbsList = bbsList.sort(function (a, b) {
        //         return a.len - b.len;
        //     });
        // }
        // this.setData({
        //     is_cream: is_cream,
        //     bbsList: bbsList
        // });
    },

    // 点击图片查看大图

    reviewLargeImage: function (e) {
        wx.previewImage({
            urls: [e.currentTarget.dataset.url]
        });
    },

    // 点击话题跳转到话题列表页面

    navigatorToItemList: function () {
        wx.navigateTo({
            url: '/pages/plugin/bbs/itemList/itemList'
        })
    },

    // 点击用户头像，到个人主页

    navigatorToSelf: function () {
        wx.navigateTo({
            url: '/pages/plugin/bbs/self/self'
        })
    },

    // 点击跳转到添加话题页面


    navigateToAddTopic: function () {
        wx.navigateTo({
            url: '/pages/plugin/bbs/addTopic/addTopic'
        })()

    },

    //  点击跳转至帖子评论页面

    navigatorToComment:function(){
        wx.navigateTo({
            url: '/pages/plugin/bbs/indexComment/indexComment'
        })()
    },
});