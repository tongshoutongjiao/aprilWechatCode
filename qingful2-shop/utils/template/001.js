//koahub统一请求路径
module.exports = {
    plugin: [{
        name: 'slide',
        config: {
            indicator_color: 'red',
            indicator_active_color: 'red',
            indicator_position: 'left',
            autoplay: 'true',
            interval: 5000,
            height: 360,
        },
        data: [{
            img_url: 'http://www.qingful.com/public/uploads/2018-01-08/5818f1f0-f46a-11e7-a510-11eb92d83aa7.png',
            target_type: 'wxa',
            target_url: ''
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg',
            target_type: 'wxa',
            target_url: ''
        }]
    }, {
        name: 'menu',
        config: {
            show_line: 2, //显示几行
            line_num: 3, //一行显示3个4个5个
            show_scroll: 1, //0不显示，1显示滚动条
            bg_color: '#ffffff' //背景颜色
        },
        data: [{
            img_url: 'http://www.qingful.com/public/uploads/2018-01-08/5818f1f0-f46a-11e7-a510-11eb92d83aa7.png',
            name: '分类1', //名称
            name_color: '#000000', //名称颜色
            target_type: 'page', //page,wxa
            target_url: '', //跳转地址
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg',
            name: '分类2', //名称
            name_color: '#000000', //名称颜色
            target_type: 'page', //page,wxa
            target_url: '', //跳转地址
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg',
            name: '分类3', //名称
            name_color: '#000000', //名称颜色
            target_type: 'page', //page,wxa
            target_url: '', //跳转地址
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg',
            name: '分类4', //名称
            name_color: '#000000', //名称颜色
            target_type: 'page', //page,wxa
            target_url: '', //跳转地址
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg',
            name: '分类5', //名称
            name_color: '#000000', //名称颜色
            target_type: 'page', //page,wxa
            target_url: '', //跳转地址
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg',
            name: '分类6', //名称
            name_color: '#000000', //名称颜色
            target_type: 'page', //page,wxa
            target_url: '', //跳转地址
        }]
    }, {
        name: 'ads',
        config: {
            bg_color: '#ffffff', //组件背景色
            h_margin: 10, //上下边距
            w_margin: 10, //左右边距
            height: 260, //图片高度
            borderRadius: 10, //边框圆角
            img_margin: 5, //图片与图片间的距离
            style_type: 2 //0为大图，1为小图，2为横向滚动
        },
        data: [{
            img_url: 'http://www.qingful.com/public/uploads/2018-01-08/5818f1f0-f46a-11e7-a510-11eb92d83aa7.png',
            target_type: 'wxa',
            target_url: '' //跳转地址
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg',
            target_type: 'wxa',
            target_url: '' //跳转地址
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg',
            target_type: 'wxa',
            target_url: '' //跳转地址
        }]
    }, {
        name: 'line',
        config: {
            height: 10, //上下边距
            color: '#ffffff' //组件背景色
        }
    }, {
        name: 'store',
        config: {
            logo: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //店铺logo
            name: '汉堡王', //店铺名称
            summary: '好吃不贵,真美味!', //店铺简介
            address: '北三环瀚海北金B座7楼', //店铺地址
            lng: '', //经度
            lat: '', // 纬度
            phone: '18538253627', //手机号
            icon_color: 'red', //图标颜色
            style_type: 3, //样式1，样式2，样式3，样式4，样式5，样式6
        }
    }, {
        name: 'notice',
        config: {
            left_img: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //左侧图片
            bg_color: '#ffffff', //背景颜色
            style_type: 0, //样式1样式2样式3样式4
            img_type: 4, //0-4表示5种默认图片
            use_type: 0 //0默认图片1上传图片
        },
        data: [{
            title: '最新资讯，最新资讯！', //公告
            target_type: '',
            target_url: '' //跳转链接
        }, {
            title: '号外！号外！', //公告
            target_type: '',
            target_url: '' //跳转链接
        }]
    }, {
        name: 'theme',
        config: {
            style_type: 3, //橱窗0，橱窗1，橱窗2，橱窗3，橱窗4，橱窗5，橱窗6，橱窗7，橱窗8，橱窗9，橱窗10
        },
        data: [{
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }, {
            img_url: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //图片链接
            target_type: '',
            target_url: '' //跳转链接
        }]
    }, {
        name: 'wxa',
        config: {
            bg_img: 'http://img1.qingful.com/1c582a60-73b3-454c-819b-3c20c68eabe5.jpg', //背景图片
            logo: 'http://www.qingful.com/public/uploads/2017-09-22/a69a1ef0-9f5e-11e7-a2bf-0d0647c11c03.jpg', //小程序logo
            name: '汉堡王', //小程序名称
            appid: '12130120401249', //小程序appid
            introduce: '这里是介绍', //介绍
            style: 6, //样式
            h_margin: 10, //上下边距
            w_margin: 20 //左右边距
        }
    }, {
        name: 'title',
        config: {
            bg_img: 'http://img1.qingful.com/1c582a60-73b3-454c-819b-3c20c68eabe5.jpg', //背景图片
            title: '新年好', //标题
            color: 'red', //颜色
            left_icon: 'http://www.qingful.com/public/uploads/2017-09-22/a0dc4110-9f62-11e7-a2bf-0d0647c11c03.jpg', //左侧图标
            style_type: 3 //样式0，样式1，样式2，样式3
        }
    }, {
        name: 'navigation',
        config: {
            icon: 'http://img1.qingful.com/1c582a60-73b3-454c-819b-3c20c68eabe5.jpg', //左侧图标
            title: '标题', //标题
            title_color: 'red', //标题颜色
            tip: '提示', //提示
            tip_color: 'red', //提示颜色
            target_url: '', //跳转链接
            target_type: 'page',
            h_margin: 10, //上下边距
            w_margin: 0 //左右边距
        }
    }, {
        name: 'hover_button',
        data: [{
            bg_color: 'red', //背景颜色
            color: 'red', //图标颜色
            icon: 'http://img1.qingful.com/1c582a60-73b3-454c-819b-3c20c68eabe5.jpg', //图标
            target_url: '' //图标跳转地址
        },{
            bg_color: 'red', //背景颜色
            color: 'red', //图标颜色
            icon: 'http://img1.qingful.com/1c582a60-73b3-454c-819b-3c20c68eabe5.jpg', //图标
            target_url: '' //图标跳转地址
        }]
    }]
}