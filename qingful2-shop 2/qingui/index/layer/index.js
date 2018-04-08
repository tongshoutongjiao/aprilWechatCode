Component({
    properties: {
        page_id: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal) {
                try {
                    const layer_pages = wx.getStorageSync('layer_pages');
                    if (layer_pages) {
                        const indexof = layer_pages.indexOf(newVal);
                        if (indexof < 0) {
                            layer_pages.push(newVal);
                            wx.setStorageSync('layer_pages', layer_pages);
                            this.layer(newVal);
                        }
                    }else{
                        wx.setStorageSync('layer_pages', [newVal]);
                        this.layer(newVal);
                    }
                } catch (e) {
                    // Do something when catch error
                }
            }
        }
    },
    data: {
        layer_index: 0,
        layer_data: []
    },
    attached: function(options) {

    },
    methods: {
        layer: function(page_id) {
            wx.BaaS.fetch(`https://baas.qingful.com/2.0/class/api/function/layer?page_id=${page_id}`).then(res => {
                if (res && res.data.code && res.data.data) {
                    let DATA = res.data.data.data;
                    const layer_data = DATA ? JSON.parse(DATA) : [];
                    console.log('弹出广告列表:', layer_data);
                    this.setData({
                        layer_data: layer_data,
                        layer_index: 0
                    });
                }
            });
        },
        hongbao_hidden: function(e) {
            const index = e.currentTarget.dataset.index;
            this.setData({
                layer_index: index + 1
            });
        }
    }
});