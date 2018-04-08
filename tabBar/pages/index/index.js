// index.js
// 获取应用实例
// index.js
// 获取应用实例


 /*Page({
    /!**
     * 生命周期函数--监听页面初次渲染完成
     *!/
    onReady: function () {
        //获得dialog组件
        // this.dialog = this.selectComponent("#dialog");

    //    获得myTab组件
        this.myTab=this.selectComponent("#myTab");
    },

    showDialog(){
        console.log(this.dialog);
        this.dialog.showDialog();
    },

    //取消事件
    _cancelEvent(){
        console.log('你点击了取消');
         this.dialog.hideDialog();
    },
    //确认事件
    _confirmEvent(){
        console.log('你点击了确定');
         this.dialog.hideDialog();
    }

//     组件事件


});*/







Page({
    data: {
        selectedIndex: '0',
        tabData: {
            color: 'blue', //颜色
            borderStyle: 'red', //上边框颜色
            backgroundColor: '#F7F7FA', //背景颜色
            selectedColor: '#09BB07', //选中颜色
            data:[
                {
                    text: '首页',
                    index: '0',
                    iconPath: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2816843564,1684136908&fm=27&gp=0.jpg', //不选中图片
                    selectedIconPath: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1446722265,2131902470&fm=27&gp=0.jpg', //选中图片
                },
                {
                    text: '微信',
                    index: '1',
                    iconPath: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2816843564,1684136908&fm=27&gp=0.jpg', //不选中图片
                    selectedIconPath: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1446722265,2131902470&fm=27&gp=0.jpg', //选中图片
                },
                {
                    text: '淘宝',
                    index: '2',
                    iconPath: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2816843564,1684136908&fm=27&gp=0.jpg', //不选中图片
                    selectedIconPath: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1446722265,2131902470&fm=27&gp=0.jpg', //选中图片
                },
                {
                    text: '信息',
                    index: '3',
                    iconPath: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2816843564,1684136908&fm=27&gp=0.jpg', //不选中图片
                    selectedIconPath: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1446722265,2131902470&fm=27&gp=0.jpg', //选中图片
                },
                {
                    text: '支付',
                    index: '4',
                    iconPath: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2816843564,1684136908&fm=27&gp=0.jpg', //不选中图片
                    selectedIconPath: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1446722265,2131902470&fm=27&gp=0.jpg', //选中图片
                }

            ]}

    },
    onLoad: function () {


    },
    selectTab: function (e) {
        console.log(e.currentTarget);
        this.setData({
            selectedIndex: e.currentTarget.dataset.index
        })


    }

});