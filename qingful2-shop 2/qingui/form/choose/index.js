Component({
    behaviors: ['wx://form-field'],
    properties: {
        chooseData: {
            type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: {
                name: 'choose',
                config: {
                    title: '标题1', //标题
                    icon_type: 2, //样式1样式2样式3
                    icon_position: 'right', //left、right
                    select_color: 'red',
                    type: 'checkbox', //单选 radio 多选 checkbox
                },
                data: [
                    { name: '美国' },
                    { name: '中国', select: 'true' },
                    { name: '巴西' },
                ]
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
        someData: {},
    },
    methods: {
        // 这里是一个自定义方法
        radioChange: function(e) {
            const index = e.detail.value;
            let chooseData = this.data.chooseData;
            console.log('radio发生change事件，携带value值为：', chooseData.data[index].name);

            chooseData.value = [];
            for (var i = 0, len = chooseData.data.length; i < len; ++i) {
                chooseData.data[i].select = i == index;
            }
            chooseData.value.push(chooseData.data[index].name);

            this.setData({
                chooseData: chooseData
            });
            this.triggerEvent('choose-event', {
                pIndex: this.data.pIndex,
                data: chooseData
            });
        },
        checkboxChange: function(e) {
            const indexs = e.detail.value;
            console.log('checkbox发生change事件，携带value值为：', indexs);

            let chooseData = this.data.chooseData;
            chooseData.value = [];
            for (var i = 0, lenI = chooseData.data.length; i < lenI; ++i) {
                chooseData.data[i].select = false;

                for (var j = 0, lenJ = indexs.length; j < lenJ; ++j) {
                    if (i == indexs[j]) {
                        chooseData.data[i].select = true;
                        chooseData.value.push(chooseData.data[i].name);
                        break;
                    }
                }
            }

            this.setData({
                chooseData: chooseData
            });
            this.triggerEvent('choose-event', {
                pIndex: this.data.pIndex,
                data: chooseData
            });
        }
    }
})