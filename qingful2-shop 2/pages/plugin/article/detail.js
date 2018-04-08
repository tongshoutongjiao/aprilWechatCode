const WxParse = require("../../../utils/wxParse/wxParse.js");
const moment = require("../../../utils/moment.min.js");
Page({
    data: {
        page: 1,
        article: '',
        comment: [],
        input: '',
        input_status: 0,
        focus: false,
        replayFlag: false, // 是否要执行回复的功能
    },
    onLoad: function (options) {
        this.addArticleLook(options.id);
        this.getArticleDetail(options.id);
    },
    onShow: function () {

    },
    //绑定输入框
    bindinput: function (e) {
        const value = e.detail.value;
        let input_status = 0;
        if (value) {
            input_status = 1;
        }
        this.setData({
            input: value,
            input_status: input_status
        });
    },
    //提交评论
    formSubmit: function (e) {
        const content = this.data.input;
        if (!content) {
            wx.showModal({
                title: '提示',
                content: '评论不能为空',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            });
            return;
        }
        this.addArticleComment(content);
    },
    //获取文章详情
    getArticleDetail: function (id) {
        let url = `/2.0/class/api/table/diy_article_data/fetch?where=id,${id}`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                const DATA = res.data.data;
                DATA.created_at = moment(DATA.created_at).format('YYYY-MM-DD HH:mm:ss');
                console.log('文章详情：', DATA);
                WxParse.wxParse(
                    "articleDetail",
                    "html",
                    DATA.content,
                    this
                );
                this.setData({
                    article: DATA
                });
                this.getArticleZan(DATA.id);
                this.getCommentList();
            }
        });
    },
    //获取评论列表
    getCommentList: function () {
        let page = this.data.page;
        const article_id = this.data.article.id;
        let url = "/2.0/class/auth_api/table/diy_article_comment/fetchAll";
        url += `?limit=20&where=article_id,${article_id}`;
        if (page > 1) {
            url += "&offset=" + (page - 1) * 20;
        }
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                const DATA = res.data.data;
                console.log(DATA);


                for (let [index, row] of DATA.entries()) {
                    console.log(index);
                    console.log(row);
                    // row.created_at = moment(row.created_at).format('YYYY-MM-DD HH:mm');
                    moment.locale('zh-cn');
                    row.created_at = moment(row.created_at).fromNow();
                    row.clicked = false;
                    row.index = index;
                    // console.log(row.created_at);
                }
                page++;
                this.setData({
                    page: page,
                    comment: this.data.comment.concat(DATA)
                });
            }
        });
    },
    //添加文章评论
    addArticleComment: function (content) {
        const url = '/2.0/class/auth_api/function/addArticleComment';
        wx.BaaS.fetch(url, {
            method: "post",
            data: {
                article_id: this.data.article.id,
                content: content
            }
        }).then(res => {
            if (res && res.data.code && res.data.data) {
                wx.showToast({
                    title: '评论成功',
                    icon: 'success',
                    duration: 2000
                })
                let article = this.data.article;
                article.num_comment++;
                this.setData({
                    page: 1,
                    comment: [],
                    article: article
                });
                this.getCommentList();
            }
        });
    },
    //文章点赞、取消赞
    articleZan: function (e) {
        const article_id = e.currentTarget.dataset.id;
        const url = `/2.0/class/auth_api/function/articleZan?article_id=${article_id}`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000
                })
                const article = this.data.article;
                article.zan_status = article.zan_status ? 0 : 1;
                if (article.zan_status) {
                    article.num_like++
                } else {
                    article.num_like--
                }
                this.setData({
                    article: article
                });
            }
        });
    },
    //查看文章是否点赞
    getArticleZan: function (article_id) {
        const url = `/2.0/class/auth_api/function/getArticleZan?article_id=${article_id}`;
        wx.BaaS.fetch(url).then(res => {
            let article = this.data.article;
            article.zan_status = 0;
            if (res && res.data.code && res.data.data) {
                article.zan_status = 1;
            }
            this.setData({
                article: article
            });
        });
    },
    //浏览量加1
    addArticleLook: function (article_id) {
        const url = `/2.0/class/api/function/addArticleLook?article_id=${article_id}`;
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
            }
        });
    },

    // 回复评论
    replayComment: function (e) {
        // 获取到input框的焦点
        let index = e.currentTarget.dataset.index,
            data = this.data.comment[index],
            {focus, replayFlag} = this.data;
        data.clicked = !data.clicked;
        this.setData({
            focus: !focus,
            replayFlag: true,
            [`comment[${index}]`]: data,
        });
    },

    // 失去焦点时触发，修改focus的状态以及点击回复的样式
    bindBlur: function () {
        let {focus, replayFlag, comment} = this.data;
        for (let row of comment) {
            row.clicked = false;
        }
        this.setData({
            focus: false,
            replayFlag: false,
            comment
        })
    },
    onReachBottom: function () {
        this.getCommentList();
    }
});