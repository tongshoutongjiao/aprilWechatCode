Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        page_id: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal) {
                this.getDIYdata(newVal);
            }
        }
    },
    data: {
        components: {}
    },
    attached: function() {
        const page_id = this.data.page_id;
    },
    methods: {
        //获取页面diy组件
        getDIYdata: function(id) {
            wx.BaaS.fetch(`/2.0/class/api/function/diyComponent?id=${id}`).then(res => {
                if (res && res.data.code && res.data.data) {
                    let DATA = res.data.data;
                    console.log('页面组件:', DATA);
                    // // 设置页面标题
                    wx.setNavigationBarTitle({
                        title: DATA.name
                    });
                    this.setData({
                        components: DATA
                    });
                }
            });
        }
    }
})