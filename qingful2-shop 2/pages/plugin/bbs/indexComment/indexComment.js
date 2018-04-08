const util = require("../../../../utils/util.js");
const moment = require("../../../../utils/moment.min.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        comment: "",
        input_focus: false,
        commentList: []
    },
    onLoad: function(options) {
        this.setData({ id: options.id });
        this.getLocation(); //定位
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    //绑定输入框
    bindinput: function(e) {
        const value = e.detail.value;
        this.setData({
            comment: value
        });
    },
    //定位
    getLocation: function() {
        const that = this;
        wx.getLocation({
            type: "wgs84",
            success: function(res) {
                console.log("定位信息：", res);
                that.setData({
                    lng: res.longitude,
                    lat: res.latitude
                });
                that.getBbsPost(); //获取帖子列表
            },
            fail: function(err) {
                console.log(err);
            }
        });
    },
    //获取帖子信息
    getBbsPost: function() {
        const id = this.data.id;
        const lng = this.data.lng;
        const lat = this.data.lat;
        const url = `/2.0/class/auth_api/function/getBbsPost?id=${id}`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                let Data = res.data.data;
                moment.locale("zh-cn");
                Data.len = util.GetDistance(Data.lng, Data.lat, lng, lat); //得到米
                Data.created_at = moment(Data.created_at).fromNow();
                Data.img = Data.img ? JSON.parse(Data.img) : [];
                this.setData({
                    bbs: Data
                });
                this.getBbsStatus();
                this.getCommentList();
            }
        });
    },
    // 获取帖子状态
    getBbsStatus() {
        const id = this.data.id;
        const bbs = this.data.bbs;
        wx.BaaS
            .fetch(`/2.0/class/auth_api/function/checkPostMe?post_id=${id}`)
            .then(res => {
                if (res && res.data.code && res.data.data) {
                    const myStatus = res.data.data;
                    bbs.zan_status = myStatus.is_zan;
                    bbs.is_my = myStatus.is_my;
                    this.setData({
                        bbs: bbs
                    });
                }
            });
    },
    //获取评论列表
    getCommentList: function() {
        let page = this.data.page;
        const post_id = this.data.id;
        let url = "/2.0/class/auth_api/table/diy_bbs_comment/fetchAll";
        url += `?limit=20&where=post_id,${post_id}`;
        if (page > 1) {
            url += "&offset=" + (page - 1) * 20;
        }
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                const DATA = res.data.data;
                for (let row of DATA) {
                    // row.created_at = moment(row.created_at).format('YYYY-MM-DD HH:mm');
                    moment.locale("zh-cn");
                    row.created_at = moment(row.created_at).fromNow();
                    // console.log(row.created_at);
                }
                page++;
                this.setData({
                    page: page,
                    commentList: this.data.commentList.concat(DATA)
                });
            }
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
    //提交评论
    formSubmit: function(e) {
        const is_replay = this.data.is_replay;
        const content = this.data.comment;
        const comment_id = this.data.comment_id;
        if (!content) {
            wx.showModal({
                title: "提示",
                content: "评论不能为空",
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        console.log("用户点击确定");
                    } else if (res.cancel) {
                        console.log("用户点击取消");
                    }
                }
            });
            return;
        }
        if (is_replay) {
            wx.BaaS
                .fetch("/2.0/class/auth_api/table/diy_bbs_comment/save", {
                    method: "post",
                    data: {
                        id: comment_id, //评论id
                        reply_content: content //贴主回复评论
                    }
                })
                .then(res => {
                    console.log(res);
                });
        } else {
            this.addBbsComment(content);
        }
    },
    //添加文章评论
    addBbsComment: function(content) {
        const bbs = this.data.bbs;
        const commentList = this.data.commentList;
        wx.BaaS
            .fetch(`/2.0/class/auth_api/function/addBbsComment`, {
                method: "post",
                data: {
                    post_id: bbs.id,
                    comment: content
                }
            })
            .then(res => {
                if (res && res.data.code && res.data.data) {
                    wx.showToast({
                        title: "评论成功"
                    });
                    bbs.num_reply++;
                    this.setData({
                        page: 1,
                        bbs: bbs,
                        comment: "",
                        commentList: []
                    });
                    this.getCommentList();
                }
            });
    },
    // 帖子点赞
    bbsZan(e) {
        const bbs = this.data.bbs;
        const id = e.currentTarget.dataset.id;
        wx.BaaS
            .fetch(`/2.0/class/auth_api/function/bbsPostZan?post_id=${id}`)
            .then(res => {
                if (res && res.data.code && res.data.data) {
                    wx.showToast({
                        title: "点赞成功"
                    });
                    bbs.zan_status = bbs.zan_status ? 0 : 1;
                    bbs.zan_status ? bbs.num_zan++ : bbs.num_zan--;
                    this.setData({
                        bbs: bbs
                    });
                }
            });
    },
    // 跳转到用户
    navigatorToSelf: function(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `../self/self?id=${id}`
        });
    },
    // 聚焦到input框
    input_focus(e) {
        const comment_id = e.currentTarget.dataset.id;
        this.setData({
            is_replay: 1,
            comment_id: comment_id,
            input_focus: true
        });
    },
    onReachBottom: function() {
        this.getCommentList();
    }
});
