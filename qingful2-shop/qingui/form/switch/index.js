Component({
    behaviors: ['wx://form-field'],
    properties: {
        switchData:{
            type: Object,// 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: {
                name:'switch',
                config:{
                    color: 'red'//switch颜色
                },
                data:[{
                    title:'开关1'//标题
                },{
                    title:'开关2'//标题
                }]
            },
            observer: function(newVal, oldVal) {}
        },
        pIndex: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal) {}
        }
    },
    data: {
        // 这里是一些组件内部数据
        someData: {}
    },
    methods: {
        // 这里是一个自定义方法
        switchChange: function(e) {
            const index = e.target.dataset.index;
            const value = e.detail.value;

            let switchData = this.data.switchData;
            switchData.data[index].value = value;
            this.setData({
                switchData: switchData
            })

            this.triggerEvent('switch-event', {
                pIndex: this.data.pIndex,
                data: switchData
            });
        }
    }
})