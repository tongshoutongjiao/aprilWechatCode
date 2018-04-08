Component({
    behaviors: ['wx://form-field'],
    properties: {
        pickerData: {
            type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: {
                name:'picker',
                data:[{
                    title: '日期', //标题
                    describe: '2018-03-12', //描述
                    type: 'date' //时间选择器time(12:01)日期选择器date(2018-03-12)
                },{
                    title: '时间', //标题
                    describe: '12:01', //描述
                    type: 'time' //时间选择器time(12:01)日期选择器date(2018-03-12)
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
    },
    methods: {
        //日期选择器
        bindDateChange: function (e) {
            const index = e.target.dataset.index;
            const value = e.detail.value;
            console.log('日期选择器', value);

            let pickerData = this.data.pickerData;
            pickerData.data[index].value = value;
            this.setData({
                pickerData: pickerData
            })
 
            this.triggerEvent('picker-event', {
                pIndex: this.data.pIndex,
                data: pickerData
            });
        },
        //时间选择器
        bindTimeChange: function (e) {
            const index = e.target.dataset.index;
            const value = e.detail.value;
            console.log('时间选择器', value);
            
            let pickerData = this.data.pickerData;
            pickerData.data[index].value = value;
            this.setData({
                pickerData: pickerData
            })

            this.triggerEvent('picker-event', {
                pIndex: this.data.pIndex,
                data: pickerData
            });
        },
    }
})