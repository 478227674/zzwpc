// import Vue from 'vue'
import Router from 'vue-router'
export default new Router({
  scrollBehavior(to,from,saveTop){
    if(saveTop){
      return saveTop;
    }else{
      return {x:0,y:0}
    }
  },
  routes: [
    {
      path: 'HelloWorld',
      component: resolve => require(['@/components/HelloWorld'], resolve),
      name: 'HelloWorld'
    },
    {
      path: '/',
      component: resolve => require(['@/pages/index'], resolve),
      name: 'index'
    },
    {
      path: '/pages/storedir_index',
      component: resolve => require(['@/pages/storedir_index'], resolve),
      name: 'storedir_index'
    },

    {
      path: '/pages/orgdetail',
      component: resolve => require(['@/pages/organ/orgdetail'], resolve),
      name: 'orgdetail'
    },
    {
      path: '/pages/organ_aboutus',
      component: resolve => require(['@/pages/organ/organ_aboutus'], resolve),
      name: 'organ_aboutus'
    },
    {
      path: '/pages/organ_comment',
      component: resolve => require(['@/pages/organ/organ_comment'], resolve),
      name: 'organ_comment'
    },
    {
      path: '/pages/organ_product',
      component: resolve => require(['@/pages/organ/organ_product'], resolve),
      name: 'organ_product'
    },
    {
      path: '/pages/organ_school',
      component: resolve => require(['@/pages/organ/organ_school'], resolve),
      name: 'organ_school'
    },
    {
      path: '/pages/organ_newsdetail',
      component: resolve => require(['@/pages/organ/organ_newsdetail'], resolve),
      name: 'organ_newsdetail'
    },
    {
      path: '/pages/maincoupon',
      component: resolve => require(['@/pages/main/maincoupon'], resolve),
      name: 'maincoupon'
    },
    {
      path: '/pages/organ_teachers',
      component: resolve => require(['@/pages/organ/organ_teachers'], resolve),
      name: 'organ_teachers'
    },
    {
      path: '/pages/organ_news',
      component: resolve => require(['@/pages/organ/organ_news'], resolve),
      name: 'organ_news'
    },
    {
      path: '/pages/safeandques',
      component: resolve => require(['@/pages/home/safeandques'], resolve),
      name: 'safeandques'
    },
    {
      path: '/pages/change',
      component: resolve => require(['@/pages/productlist/change'], resolve),
      name: 'change'
    },
    {
      path: '/pages/myproductlist',
      component: resolve => require(['@/pages/myproduct/myproductlist'], resolve),
      name: 'myproductlist'
    },
    {
      path: '/pages/myschproduct',
      component: resolve => require(['@/pages/myproduct/myschproduct'], resolve),
      name: 'myschproduct'
    },
    {
      path: '/pages/myproductdetail',
      component: resolve => require(['@/pages/myproduct/myproductdetail'], resolve),
      name: 'myproductdetail'
    },
    {
      path: '/pages/signup',
      component: resolve => require(['@/pages/signup'], resolve),
      name: 'signup'
    },
    {
      path: '/pages/product_detail',
      component: resolve => require(['@/pages/product/product_detail'], resolve),
      name: 'product_detail'
    },
    {
      path: '/pages/productcut_detail',
      component: resolve => require(['@/pages/product/productcut_detail'], resolve),
      name: 'productcut_detail'
    },
    {
      path: '/pages/productgroup_detail',
      component: resolve => require(['@/pages/product/productgroup_detail'], resolve),
      name: 'productgroup_detail'
    },
    {
      path: '/pages/productspe_detail',
      component: resolve => require(['@/pages/product/productspe_detail'], resolve),
      name: 'productspe_detail'
    },
    // {
    //   path: '/pages/video',
    //   component: resolve => require(['@/pages/myproduct/video'], resolve),
    //   name: 'video'
    // },

    // {
    //   path: '/pages/video',
    //   name: 'video',
    //   component: video
    // },
    {
      path: '/pages/mainsys',
      component: resolve => require(['@/pages/main/mainsys'], resolve),
      name: 'mainsys'
    },
    {
      path: '/pages/partner',
      component: resolve => require(['@/pages/main/partner'], resolve),
      name: 'partner'
    },

    {
      path: '/pages/maincenter',
      component: resolve => require(['@/pages/main/maincenter'], resolve),
      name: 'maincenter'
    },

    {
      path: '/pages/mainmsg',
      component: resolve => require(['@/pages/main/mainmsg'], resolve),
      name: 'mainmsg'
    },
    {
      path: '/pages/mainclass',
      component: resolve => require(['@/pages/main/mainclass'], resolve),
      name: 'mainclass'
    },
    {
      path: '/pages/history',
      component: resolve => require(['@/pages/main/history'], resolve),
      name: 'history'
    },

    {
      path: '/pages/orderdetail',
      component: resolve => require(['@/pages/main/orderdetail'], resolve),
      name: 'orderdetail'
    },

    {
      path: '/pages/product',
      component: resolve => require(['@/pages/product'], resolve),
      name: 'product'
    },

    {
      path: '/pages/search',
      component: resolve => require(['@/pages/search'], resolve),
      name: 'search'
    },

    {
      path: '/pages/mainclasscomment',
      component: resolve => require(['@/pages/main/mainclasscomment'], resolve),
      name: 'mainclasscomment'
    },
    {
      path: '/pages/maincomment',
      component: resolve => require(['@/pages/main/maincomment'], resolve),
      name: 'maincomment'
    },
    {
      path: '/pages/maincollect',
      component: resolve => require(['@/pages/main/maincollect'], resolve),
      name: 'maincollect'
    },

    {
      path: '/pages/mainmessage',
      component: resolve => require(['@/pages/main/mainmessage'], resolve),
      name: 'mainmessage'
    },
    {
      path: '/pages/rakebackhis',
      component: resolve => require(['@/pages/main/rakebackhis'], resolve),
      name: 'rakebackhis'
    },
    {
      path: '/pages/msgdetail',
      component: resolve => require(['@/pages/main/msgdetail'], resolve),
      name: 'msgdetail'
    },
    {
      path: '/pages/newsdetail',
      component: resolve => require(['@/pages/news/newsdetail'], resolve),
      name: 'newsdetail'
    },
    {
      path: '/pages/videolist',
      component: resolve => require(['@/pages/myproduct/videolist'], resolve),
      name: 'videolist'
    },
    {
      path: '/pages/newslist',
      component: resolve => require(['@/pages/news/newslist'], resolve),
      name: 'newslist'
    },

    {
      path: '/pages/orderpay',
      component: resolve => require(['@/pages/organ/orderpay'], resolve),
      name: 'orderpay'
    },
    {
      path: '/pages/pay',
      component: resolve => require(['@/pages/organ/pay'], resolve),
      name: 'pay'
    },
    {
      path: '/pages/login',
      component: resolve => require(['@/pages/login'], resolve),
      name: 'login'
    },
    {
      path: '/pages/loginbypwd',
      component: resolve => require(['@/pages/loginbypwd'], resolve),
      name: 'loginbypwd'
    },
    {
      path: '/pages/aboutus',
      component: resolve => require(['@/pages/public/aboutus'], resolve),
      name: 'aboutus'
    },
    {
      path: '/pages/qab',
      component: resolve => require(['@/pages/public/qab'], resolve),
      name: 'qab'
    },
  ]
})
