// components/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      selectedIndex: '0',
      tabData: {
          color: '', //颜色
          borderStyle: 'red', //上边框颜色
          backgroundColor: '', //背景颜色
          selectedColor: '', //选中颜色
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
            },
            {
                text: '啦啦',
                index: '5',
                iconPath: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2816843564,1684136908&fm=27&gp=0.jpg', //不选中图片
                selectedIconPath: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1446722265,2131902470&fm=27&gp=0.jpg', //选中图片
            }
      ]}
  },

  /**
   * 组件的方法列表
   */
  methods: {
      selectTab: function (e) {
          console.log(e.currentTarget);
          this.setData({
              selectedIndex: e.currentTarget.dataset.index
          })


      }

  }
});
