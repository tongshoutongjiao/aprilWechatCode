const moment = require("../../../utils/moment.min.js");
Component({
    properties: {
        articleData: {
            type: Object,
            value: {
                config: {
                    type: 0
                }
            },
            observer: function(newVal, oldVal) {
                this.getMenu();
            }
        }
    },
    data: {
        // page: 1,
        selectedTab: 0,
        menu: [],
        articleList: []
    },
    attached: function(options) {
        
    },
    methods: {
        //切换分类
        selectTap: function(e) {
            const index = e.currentTarget.dataset.index;
            const category_id = e.currentTarget.dataset.id;

            this.getArticle(category_id);
            this.setData({
                selectedTab: index
            });
        },
        //获取文章菜单
        getMenu: function() {
            let url = "https://baas.qingful.com/2.0/class/api/table/diy_article_category/fetchAll?where=status,1&orderBy=rank,desc";
            wx.BaaS.fetch(url).then(res => {
                if (res && res.data.code && res.data.data) {
                    const DATA = res.data.data;
                    console.log('菜单列表：', DATA);
                    this.getArticle(DATA[0].id);
                    this.setData({
                        menu: DATA
                    });
                }
            });
        },
        //获取文章列表
        getArticle: function(category_id) {
            let url = "https://baas.qingful.com/2.0/class/api/table/diy_article_data/fetchAll?";
            // url += 'limit=20';
            url += '&where=status,1';
            url += `&where=category_id,${category_id}`;
            url += '&orderBy=rank,desc';

            // if (this.data.page > 1) {
            //     url += "&offset=" + (this.data.page - 1) * 20;
            // }
            wx.BaaS.fetch(url).then(res => {
                if (res && res.data.code && res.data.data) {
                    const DATA = res.data.data;
                    for (let row of DATA) {
                        row.imgs = row.imgs ? JSON.parse(row.imgs) : [];
                        moment.locale('zh-cn');
                        row.created_at = moment(row.created_at).fromNow();
                    }
                    console.log('文章列表：', DATA);
                    this.setData({
                        articleList: DATA
                    });
                }
            });
        },
        //跳转到文章详情页
        navigatorToArticle: function(e) {
            const id = e.currentTarget.dataset.id;
            wx.navigateTo({
                url: `/pages/plugin/article/detail?id=${id}`
            });
        }
    }
});