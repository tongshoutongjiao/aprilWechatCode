Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        //是否有启动页
        start_page: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal) {
            }
        },
        //当前页面
        page_id: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal) {
                // console.log('page_id',newVal);
                // console.log('page_id',oldVal);
                this.getDIYdata(newVal);
            }
        },
        //显示页面
        show_page_id: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal) {
                // console.log('newVal',newVal);
                // console.log('oldVal',oldVal);
            }
        },
        //重载页面
        reload_page_id: {
            type: String,// 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: 0,
            observer: function(newVal, oldVal) {
                this.reloadDIYdata(newVal.split("-")[0]);
            }
        }
    },
    data: {
        components: {}
    },
    //组件生命周期函数，在组件实例进入页面节点树时执行
    attached: function() {
        const page_id = this.data.page_id;
    },
    //组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
    moved: function() {
        console.log('组件实例被移动到节点树另一个位置');
    },
    //组件生命周期函数，在组件实例被从页面节点树移除时执行
    detached: function() {
        console.log('组件实例被从页面节点树移除');
    },
    methods: {
        //获取页面diy组件
        getDIYdata: function(id) {
            const page_data = wx.getStorageSync(`page${id}`);
            if (page_data) {
                this.setData({
                    components: page_data
                });
            } else {
                wx.BaaS.fetch(`/2.0/class/api/function/diyComponent?id=${id}`).then(res => {
                    if (res && res.data.code && res.data.data) {
                        let DATA = res.data.data;
                        console.log('页面组件:', DATA);
                        // // 设置页面标题
                        wx.setNavigationBarTitle({
                            title: DATA.name
                        });

                        wx.setStorageSync(`page${id}`, DATA);

                        this.setData({
                            components: DATA
                        });
                    }
                });
            }
        },
        reloadDIYdata: function(reload_page_id) {
            const page_id = this.data.page_id;
            if (page_id == reload_page_id) {
                wx.BaaS.fetch(`/2.0/class/api/function/diyComponent?id=${page_id}`).then(res => {
                    if (res && res.data.code && res.data.data) {
                        let DATA = res.data.data;
                        console.log('重载页面组件:', DATA);
                        // // 设置页面标题
                        wx.setNavigationBarTitle({
                            title: DATA.name
                        });

                        wx.setStorageSync(`page${page_id}`, DATA);

                        this.setData({
                            components: DATA
                        });
                    }
                });
            }
        }
    }
})