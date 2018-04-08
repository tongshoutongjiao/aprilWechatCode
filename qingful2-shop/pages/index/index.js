//获取应用实例
const app = getApp();
const util = require("../../utils/util.js");
const template = require("../../utils/template/001");
Page({
    data: {
        page_id: 0, //默认页面
        start_page: 1, //是否有启动页面
        appProject: {}, //应用信息
        tabbar: [] //底部导航
    },
    onLoad: function(options) {

        // 页面初始化 options为页面跳转所带来的参数
        if (options && options.id) {

        } else {
            this.getAppProject();
        }
    },
    onShow: function() {},
    //获取应用信息
    getAppProject: function() {
        wx.BaaS.fetch(`/2.0/class/api/function/appProject`).then(res => {
            if (res && res.data.code && res.data.data) {
                let DATA = res.data.data;
                console.log('应用信息:', DATA);
                if (DATA.project) {
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
                        title: DATA.project.name
                    });
                    let tabbar = DATA.project.tabbar;
                    if (tabbar) {
                        tabbar.data = tabbar.data ? JSON.parse(tabbar.data) : [];
                    }
                    this.setData({
                        page_id: page_id,
                        tabbar: tabbar,
                        appProject: DATA
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        showCancel: false,
                        content: '您的应用还没有创建项目哦 ^_^',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
            }
        });
    },
    //底部导航切换
    tabbarEvent: function(e) {
        const index = e.detail.index;
        const tabbar = this.data.tabbar.data[index];
        console.log('点击底部导航：', tabbar);
        const page_id = tabbar.target_url.split("=")[1];

        this.setData({
            page_id: page_id
        })
    },
    //启动页
    startEvent: function(e) {
        const start_page = e.detail.start_page;
        this.setData({
            start_page: start_page
        })
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh()
    }
})