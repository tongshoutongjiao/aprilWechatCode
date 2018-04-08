const WxParse = require("../../../utils/wxParse/wxParse.js");
const moment = require("../../../utils/moment.min.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jizan_id: 1, //活动id
        jizan_canyu_id: 2, //
        jizan: '',
        jizan_data: [],
        jizan_canyu_data: '',
        jizan_canyu_data_list: '',
        btnstate: 0,
        btnlist: [
            { btnname: '新参与' },
            { btnname: '已完成' }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const id = options.id ? options.id : 1;
        const jizan_canyu_id = options.jizan_canyu_id ? options.jizan_canyu_id : 1;
        this.setData({
            jizan_id: id,
            jizan_canyu_id: jizan_canyu_id
        });
        this.getJizan(id);
        this.jizanRenqi(id);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    //获取集赞活动配置
    getJizan: function(id) {
        let url = `/2.0/class/auth_api/table/plugin_jizan/fetch?where=id,${id}`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                const DATA = res.data.data;

                moment.locale('zh-cn');
                let days = 0;
                let hours = 0;
                let minute = 0;
                DATA.active_status = 0;
                DATA.active_time_msg = '';
                const start_status = moment().isBefore(moment(DATA.start_time));
                const end_status = moment().isBefore(moment(DATA.end_time));
                if (start_status) {
                    //活动还未开始
                    days = moment(DATA.start_time).diff(moment(), 'days');
                    hours = moment(DATA.start_time).diff(moment(), 'hours');
                    hours = hours - days * 24;
                    minute = moment(DATA.start_time).diff(moment(), 'minute');
                    minute = minute - days * 24 * 60 - hours * 60;
                    DATA.active_status = -1;
                    DATA.active_time_msg = `${days}天${hours}小时${minute}分后开始`;
                } else {
                    if (end_status) {
                        //活动进行中
                        days = moment(DATA.end_time).diff(moment(), 'days');
                        hours = moment(DATA.end_time).diff(moment(), 'hours');
                        hours = hours - days * 24;
                        minute = moment(DATA.end_time).diff(moment(), 'minute');
                        minute = minute - days * 24 * 60 - hours * 60;
                        DATA.active_time_msg = `${days}天${hours}小时${minute}分后截止`;
                    } else {
                        //活动已结束
                        DATA.active_status = 1;
                        DATA.active_time_msg = '活动已结束';
                    }
                }
                console.log('集赞活动：', DATA);
                WxParse.wxParse(
                    "jizanDetail",
                    "html",
                    DATA.detail,
                    this
                );
                this.setData({
                    jizan: DATA
                });
                if (!DATA.canyu) {
                    this.getJizanData(DATA.id);
                } else {
                    if (this.data.jizan_canyu_id) {
                        this.getCanyuJizanData(this.data.jizan_canyu_id);
                    }
                    this.getCanyuJizan(DATA.id);
                }
            }
        });
    },
    //获取集赞数据
    getJizanData: function(jizan_id) {
        let url = `/2.0/class/auth_api/table/plugin_jizan_data/fetchAll?where=jizan_id,${jizan_id}&orderBy=id,asc`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                const DATA = res.data.data;
                console.log('集赞数据：', DATA);
                this.setData({
                    jizan_data: DATA
                });
            }
        });
    },
    //获取参与集赞列表
    getCanyuJizan: function(jizan_id, status = 0) {
        let url = `/2.0/class/auth_api/table/plugin_jizan_canyu/fetchAll?where=jizan_id,${jizan_id}&where=status,${status}&orderBy=id,asc`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                const DATA = res.data.data;
                console.log('集赞参与数据：', DATA);
                this.setData({
                    jizan_canyu_data_list: DATA
                });
            }
        });
    },
    //获取参与集赞数据
    getCanyuJizanData: function(jizan_canyu_id) {
        let url = `/2.0/class/auth_api/table/plugin_jizan_canyu/fetch?where=id,${jizan_canyu_id}&related=sub`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                const DATA = res.data.data;
                DATA.code = DATA.code ? DATA.code.split('') : [];
                console.log('参与集赞数据：', DATA);
                this.setData({
                    jizan_canyu_data: DATA
                });
            }
        });
    },
    //活动点赞
    dianzan: function() {
        const jizan_canyu_id = this.data.jizan_canyu_id;
        const jizan = this.data.jizan;
        if (jizan.active_status == -1) {
            wx.showModal({
                title: '提示',
                content: '活动还未开启',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            return;
        }
        if (jizan.active_status == 1) {
            wx.showModal({
                title: '提示',
                content: '活动已结束',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
            return;
        }
        if (jizan.active_status == 0) {
            const url = `/2.0/class/auth_api/function/jizan?jizan_id=${jizan.id}&jizan_canyu_id=${jizan_canyu_id}`;
            wx.BaaS.fetch(url).then(res => {
                if (res && res.data.code) {
                    wx.showModal({
                        title: '提示',
                        content: res.data.msg,
                        showCancel: false,
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                    this.getJizan(jizan.id);
                }
            });
        }
    },
    //集赞人气加1
    jizanRenqi: function(jizan_id) {
        const url = `/2.0/class/api/function/jizanRenqi?jizan_id=${jizan_id}`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code) {}
        });
    },
    //活动参与
    jizancanyu: function() {
        const jizan_id = this.data.jizan_id;
        const url = `/2.0/class/auth_api/function/jizancanyu?jizan_id=${jizan_id}`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                const DATA = res.data.data;
                wx.navigateTo({
                    url: `/pages/plugin/jizan/index?id=${jizan_id}&jizan_canyu_id=${DATA.id}`
                })
            }
        });
    },
    //拨打电话
    makePhoneCall: function(e) {
        const phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone //仅为示例，并非真实的电话号码
        })
    },
    //打开店铺地址
    openLocation: function(e) {
        const lat = this.data.jizan.shop_lat;
        const lng = this.data.jizan.shop_lng;
        const address = this.data.jizan.shop_address;
        wx.openLocation({
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            scale: 18,
            name: address,
            success: function(res) {}
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: this.data.jizan.title,
            path: `/pages/plugin/jizan/index?id=${this.data.jizan_id}&jizan_canyu_id=${this.data.jizan_canyu_id}`,
            success: function(res) {
                // 转发成功
                console.log(res);
            },
            fail: function(res) {
                // 转发失败
            }
        }
    },
    toorder: function(e) {
        const jizan_id = this.data.jizan_id;
        const status = e.target.id;
        if (status == 0) {
            this.setData({
                btnstate: status,
            })
        } else if (status == 1) {
            this.setData({
                btnstate: status,
            })
        }
        this.getCanyuJizan(jizan_id, status);
    },
})