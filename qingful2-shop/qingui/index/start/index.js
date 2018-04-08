const util = require("../../../utils/util.js");
Component({
    properties: {
        page_id: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal) {
                this.getStartPage(newVal);
            }
        }
    },
    data: {
        timerId: 0,
        start_status: 0,
        start_data: {}
    },
    attached: function(options) {
        const that = this;
        // 倒计时关闭当前页，重定向到首页
        const timer = setInterval(function() {
            const start_data = that.data.start_data;
            start_data.countdown = start_data.countdown - 1;
            that.setData({
                start_data: start_data
            });
            if (start_data.countdown == 0) {
                clearInterval(timer);
                that.triggerEvent('start-event', {
                    start_page: 0
                });
            }
        }, 1000);
        that.setData({
            timerId: timer
        })
    },
    methods: {
        //获取启动页
        getStartPage: function(page_id) {
            const that = this;
            wx.BaaS.fetch(`https://baas.qingful.com/2.0/class/api/table/diy_start/fetch?where=page_id,${page_id}`).then(res => {
                if (res && res.data.code && res.data.data) {
                    const DATA = res.data.data;
                    try {
                        const start_datas = wx.getStorageSync('start_datas');
                        if (start_datas) {
                            const indexof = start_datas.indexOf(page_id);
                            if (indexof < 0) {
                                start_datas.push(page_id);
                                wx.setStorageSync('start_datas', start_datas);
                                that.setData({
                                    start_status: 1,
                                    start_data: DATA
                                });
                            }else{
                                this.goHome();
                            }
                        } else {
                            wx.setStorageSync('start_datas', [page_id]);
                            that.setData({
                                start_status: 1,
                                start_data: DATA
                            });
                        }
                    } catch (e) {
                        // Do something when catch error
                    }
                }else{
                    this.goHome();
                }
            });
        },
        /* 触击“欢迎页面”直接重定向到首页*/
        goHome: function(e) {
            //清空计时器
            clearInterval(this.data.timerId);
            this.triggerEvent('start-event', {
                start_page: 0
            });
        }
    }
});