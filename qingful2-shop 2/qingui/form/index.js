const util = require("../../utils/util.js");
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        formData: {
            type: Object,
            value: {
                id: 0,
                config: {
                    title: '表单标题',
                    title_color: 'red',
                    bg_color: '#f8f8f8',
                    bg_plugin_color: '#ffffff',
                    borderRadius: 0, //边框圆角
                    h_margin: '1', //上下边距
                    w_margin: '0', //左右边距
                },
                child: [{
                    name: 'picker',
                    data: [{
                        title: '日期', //标题
                        describe: '2018-03-12', //描述
                        type: 'date' //时间选择器time(12:01)日期选择器date(2018-03-12)
                    }, {
                        title: '时间', //标题
                        describe: '12:01', //描述
                        type: 'time' //时间选择器time(12:01)日期选择器date(2018-03-12)
                    }]
                }, {
                    name: 'switch',
                    config: {
                        color: 'red' //switch颜色
                    },
                    data: [{
                        title: '开关1' //标题
                    }, {
                        title: '开关2' //标题
                    }]
                }, {
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
                        { name: '中国', checked: 'true' },
                        { name: '巴西' },
                    ]
                }, {
                    name: 'upload',
                    config: {
                        style_type: 1 //样式1样式2
                    }
                }, {
                    name: 'textarea',
                    config: {
                        title: 'textarea标题',
                        placeholder: '请输入内容',
                        height: '70'
                    }
                }, {
                    name: 'input',
                    config: {
                        style_type: 1 //样式1样式2样式3样式4
                    },
                    data: [{
                        title: '123', //标题
                        placeholder: '占位符', //占位符
                        img: '', //小图标
                        required: 1 //必填项
                    }, {
                        title: '1234', //标题
                        placeholder: '占位符', //占位符
                        img: '', //小图标
                        required: 1 //必填项
                    }]
                }, {
                    name: 'button',
                    config: {
                        name: '提交', //标题
                        name_color: '#ffffff', //字体颜色
                        font_size: 18, //字体大小
                        bg_color: 'red', //按钮颜色
                        width: 40, //按钮宽度
                        height: 30, //按钮高度
                        borderRadius: 10 //边框圆角
                    }
                }]
            },
            observer: function(newVal, oldVal) {}
        }
    },
    data: {
        defaultHeight: util.getSystem().windowHeight // 微信浏览器高
    },
    attached: function() {

    },
    methods: {
        // 这里是一个自定义方法
        customMethod: function() {},
        formSubmit: function(e) {
            const that = this;
            const formData = this.data.formData;
            let form_data = [];
            let name_data = [];
            for (let row of formData.child) {
                if (row.name == 'picker') {
                    for (let row2 of row.data) {
                        row2.value = row2.value ? row2.value : row2.describe;
                        form_data.push({
                            type: 'picker',
                            name: row2.name,
                            value: row2.value
                        });
                        name_data.push(row2.name);
                    }
                }
                //开关
                if (row.name == 'switch') {
                    for (let row2 of row.data) {
                        form_data.push({
                            type: 'switch',
                            name: row2.name,
                            value: row2.value ? true : false
                        });
                        name_data.push(row2.name);
                    }
                }
                //单选、多选
                if (row.name == 'choose') {
                    row.value = row.value ? row.value : [];

                    if (!row.value.length) {
                        for (let choose of row.data) {
                            if (choose.select) {
                                row.value.push(choose.name);
                            }
                        }
                    }
                    form_data.push({
                        type: 'choose',
                        name: row.config.name,
                        value: row.value
                    });
                    name_data.push(row.config.name);
                }
                if (row.name == 'upload') {
                    row.img_list = row.img_list ? row.img_list : [];
                    form_data.push({
                        type: 'upload',
                        name: row.config.name,
                        value: row.img_list
                    });
                    name_data.push(row.config.name);
                }
                if (row.name == 'textarea') {
                    form_data.push({
                        type: 'textarea',
                        name: row.config.name,
                        value: row.value ? row.value : ''
                    });
                    name_data.push(row.config.name);
                }
                if (row.name == 'input') {
                    for (let input of row.data) {
                        input.value = input.value ? input.value : '';
                        if (!input.value) {
                            let msg = `${input.name}不能为空`;
                            wx.showModal({
                                title: '提示',
                                content: msg,
                                showCancel: false,
                                success: function(res) {
                                    console.log('用户点击确定')
                                }
                            })
                            return;
                        } else {
                            form_data.push({
                                type: 'input',
                                name: input.name,
                                value: input.value ? input.value : ''
                            });
                            name_data.push(input.name);
                        }
                    }
                }
            }

            wx.BaaS.fetch("/2.0/class/api/table/diy_form_data/add", {
                    method: "post",
                    data: {
                        form_id: formData.config.id,
                        name: JSON.stringify(name_data),
                        data: JSON.stringify(form_data)
                    }
                })
                .then(res => {
                    if (res.data.code) {
                        wx.showModal({
                            title: '提示',
                            content: '提交成功',
                            showCancel: false,
                            success: function(res) {
                                console.log('用户点击确定')
                            }
                        })
                    }
                });
        },
        onMyEvent: function(e) {
            const pIndex = e.detail.pIndex;
            const data = e.detail.data;

            const formData = this.data.formData;
            formData.child[pIndex] = data;

            this.setData({
                formData: formData
            })
        }
    }
})