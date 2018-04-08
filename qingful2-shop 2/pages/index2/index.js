//获取应用实例
const app = getApp();
const util = require("../../utils/util.js");
const template = require("../../utils/template/001");
Page({
    data: {
        page_id: 0, //默认页面
        reload_page_id: 0, //页面下拉刷新
        start_page: 1, //是否有启动页面
        pages: [], //存放页面
        appProject: {}, //应用信息
        tabbar: [] //底部导航
    },
    onLoad: function(options) {
        console.log('options',options);
        // 页面初始化 options.id为页面跳转所带来的参数
        this.getAppProject(options.id);
    },
    onShow: function() {},
    //获取应用项目信息
    getAppProject: function(new_id) {
        wx.BaaS.fetch(`/2.0/class/api/function/project`).then(res => {
            if (res && res.data.code && res.data.data) {
                let DATA = res.data.data;
                console.log('项目信息:', DATA);
                let page_id = 0;
                if (DATA.pageList.length) {
                    for (const row of DATA.pageList) {
                        if (row.is_home) {
                            page_id = row.id;
                        }
                    }
                    //如果未设置首页，取第一个页面为首页
                    page_id = page_id ? page_id : DATA.pageList[0].id;
                } else {
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '您的项目还没有创建页面哦 ^_^',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
                // 设置页面标题
                wx.setNavigationBarTitle({
                    title: DATA.name
                });
                let tabbar = DATA.tabbar;
                let pages = [];
                page_id = new_id ? new_id : page_id;
                pages.push(page_id);
                pages = util.array_remove_repeat(pages);
                if (tabbar) {
                    tabbar.is_show = 0;
                    tabbar.data = tabbar.data ? JSON.parse(tabbar.data) : [];
                    for (let row of tabbar.data) {
                        if (row.target_url == page_id) {
                            tabbar.is_show = 1;
                        }
                    //     if (row.target_type == 'page') {
                    //         pages.push(row.target_url);
                    //     }
                    }
                }
                

                this.setData({
                    page_id: page_id,
                    pages: pages,
                    tabbar: tabbar,
                    appProject: DATA
                });
            }
        });
    },
    //底部导航切换
    tabbarEvent: function(e) {
        const index = e.detail.index;
        const tabbar = this.data.tabbar.data[index];
        console.log('点击底部导航：', tabbar);

        wx.setNavigationBarTitle({
            title: tabbar.text
        });

        if (tabbar.target_type == 'page') {
            const page_id = tabbar.target_url;
            let pages = this.data.pages;
            pages.push(page_id);
            pages = util.array_remove_repeat(pages);
            this.setData({
                pages: pages,
                page_id: page_id
            })
        }
    },
    //启动页
    startEvent: function(e) {
        const start_page = e.detail.start_page;
        this.setData({
            start_page: start_page
        })
    },
    //下拉刷新
    onPullDownRefresh: function() {
        const page_id = this.data.page_id;
        const reload_page_id = page_id + '-' + util.randomNum(100,999);

        this.setData({
            reload_page_id: reload_page_id
        })
        wx.stopPullDownRefresh()
    }
})