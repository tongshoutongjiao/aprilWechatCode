Component({
    behaviors: ['wx://form-field'],
    properties: {
        inputData:{
            type: Object,// 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: {
                name:'input',
                config:{
                    style_type: 4//样式1样式2样式3样式4
                },
                data:[{
                    title:'1',//标题
                    placeholder:'占位符',//占位符
                    img:'1'//小图标
                },{
                    title:'1',//标题
                    placeholder:'占位符',//占位符
                    img:'1'//小图标
                }]
            },
            observer: function(newVal, oldVal) {}
        },
        pIndex: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal) {}
        },
    },
    data: {
        // 这里是一些组件内部数据
        someData: {}
    },
    methods: {
        // 这里是一个自定义方法
        customMethod: function() {},
        bindinput: function(e) {
            const index = e.target.dataset.index;
            const value = e.detail.value;

            const inputData = this.data.inputData;
            inputData.data[index].value = value;
            this.triggerEvent('input-event', {
                pIndex: this.data.pIndex,
                data: inputData
            });
        }
    }
})