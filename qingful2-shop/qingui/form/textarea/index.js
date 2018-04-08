Component({
    behaviors: ['wx://form-field'],
    properties: {
        textareaData:{
            type: Object,// 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: {
                name:'textarea',
                config: {
                    title: '标题',
                    placeholder: '请输入内容', 
                    height: '70'
                }
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
        bindinput: function(e) {
            const value = e.detail.value;
            let textareaData = this.data.textareaData;
            textareaData.value = value;
            this.setData({
                textareaData: textareaData
            })

            this.triggerEvent('textarea-event', {
                pIndex: this.data.pIndex,
                data: textareaData
            });
        }
    }
})