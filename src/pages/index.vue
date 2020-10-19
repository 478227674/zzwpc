<template>
  <div class="hello" style="background: #f5f5f5">
    <!--轮播图以及个人信息-->
    <div class="backfff-box">
      <div class="pc-center swiper-box-all">
        <div>
          <div class="swiper-box-postion" style="position: relative;">
            <div style="height: 345px;">
              <slider :options="sliderinit" :sliderinit="sliderinit">
                <slideritem v-for="(item,index) in bannerList" :key="index" @tap="openBannerDetail(item)">
                  <img style="width: 100%;height: 345px" :src="item.attachment.fileUrl" alt="">
                </slideritem>
                <!-- slot  -->
              </slider>
            </div>
          </div>
          <div class="person-nav">
            <ul>
              <li>
                <img src="../assets/img/dis/newperson.png" alt="">
                <div>
                  <p>拼团砍价</p>
                  <span>拼团课程、砍价课程</span>
                </div>
              </li>
              <li>
                <img src="../assets/img/dis/helpcenter.png" alt="">
                <div>
                  <p>免费课程</p>
                  <span>名师课程免费送</span>
                </div>
              </li>
              <li>
                <img src="../assets/img/dis/livepark.png" alt="">
                <div>
                  <p>兑换领券</p>
                  <span>兑换课程、领取优惠券</span>
                </div>
              </li>
              <li>
                <img src="../assets/img/dis/questionall.png" alt="">
                <div>
                  <p>学员保障</p>
                  <span>分批付费，随时退费</span>
                </div>

              <li>
                <img src="../assets/img/dis/newproduct.png" alt="">
                <div>
                  <p>问题汇总</p>
                  <span>带你玩转元儒网</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="person-box">
          <div class="person-box-head">
            <img :src="userHead" alt="">
<!--            <img src="../assets/img/personhead.png" alt="">-->
          </div>
          <div v-if="isLogin">
            <div class="say-hello">
              <span>Hi,{{userphone}}</span>
<!--              <span>欢迎加入我们，快赚取佣金吧!</span>-->
            </div>
            <div class="see-myproduct linear-btn" @click="loginOut">
              退出
            </div>
          </div>
          <div v-else>
            <div class="say-hello">
              <span>您还没有登录</span>
<!--              <span>登录后可分销全场产品</span>-->
            </div>
            <div class="see-myproduct linear-btn" @click="openLoginAndSignup(1)">
              登录
            </div>
          </div>
          <div class="notice-newper">
            <div class="tab-classname">
              <span class="tab-classname-active">公告</span>
              <span>新手入门</span>
            </div>
            <div class="tab-active-n">
              <ul>
                <li @click="openNewsDetail(item)" v-for="item in newList">{{item.newTitle}}！</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="join-dis pc-center">
      <a href="https://www.zz1819.com/mba/#/pages/search" target="_blank">
        <img src="https://www.zz1819.com/bg/pcpush.png" alt="">

      </a>
<!--      <span>用户消费有保障的教育培训机构服务平台</span>-->
    </div>
    <!--课程分类-->
    <div class="five-subject">
      <!--机构店铺-->
      <div id="ir43" class="pc-center">
        <div class="indexscan-box title-noborder index-goodpro indexfree-list">
          <div>
            课程分类 <span class="title-ps">每天，为上万用户找到满意课程</span>
          </div>
          <span @click="openMore()">MORE >></span>
        </div>
        <div class="pro-type-box-all">
          <div class="pro-type-box">
            <div class="pro-type-left">
              <div style="margin-bottom: 10px;" v-for="(item,index) in sortList" v-if="index < 3">
                  <div class="type-title">{{item.name}} <span @click="openMore"> 更多>></span></div>
                  <div class="type-big-class" >
                    <span :class="{'active-big-class': item.index == indexs}" @click="chooseTwoLevel(items,index,indexs)" v-for="(items,indexs) in item.children" >{{items.name}}</span>
                  </div>
                  <div class="type-small-class type-border-bottom">
                    <span @click="searchResultBySort(items)" class="three-level-span"  v-for="items in item.children[item.index].children">{{items.name}}</span>
                  </div>
                </div>
            </div>
            <div class="pro-type-left">
              <div style="margin-bottom: 10px;" v-for="(item,index) in sortList" v-if="index > 2 && index < 6">
                <div class="type-title">{{item.name}} <span @click="openMore"> 更多>></span></div>
                <div class="type-big-class" >
                  <span :class="{'active-big-class': item.index == indexs}" @click="chooseTwoLevel(items,index,indexs)" v-for="(items,indexs) in item.children" >{{items.name}}</span>
                </div>
                <div class="type-small-class type-border-bottom">
                  <span @click="searchResultBySort(items)" class="three-level-span" v-for="items in item.children[item.index].children">{{items.name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--机构店铺-->
    <div class="five-subject">
      <!--机构店铺-->
      <div id="ir45" class="pc-center">
        <div class="indexscan-box title-noborder  ">
          <div>
            最新入驻
          </div>
          <span @click="openMore()">更多机构</span>
        </div>
        <div class="organ-list">
          <ul>
            <li v-for="item in orgList" @click="openOrgDetail(item)">
              <img :src="item.logoUrl" alt="">
            </li>
            <li style="display: none">
              <img src="../assets/img/teststoreicon.png" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--某个机构的店铺-->
    <div class="five-subject" >
      <div id="ir12" class="pc-center">
<!--        <div class="indexscan-box title-noborder">-->
<!--          <div class="store-title-top">-->
<!--            <div class="index-store-headleft"><img class="" :src="items.orgInfo.logoUrl" alt=""></div>{{items.orgInfo.orgName}} <span class="title-ps">{{items.orgInfo.orgIntro}}</span>-->
<!--          </div>-->
<!--          <span @click="openOrgDetail(items.orgInfo)">MORE >></span>-->
<!--        </div>-->
        <div class="indexscan-box title-noborder  ">
          <div>
            推荐机构
          </div>
          <span @click="openMore()">更多机构</span>
        </div>
        <div class="org-logo-list">
          <div :class="{'org-active':indexs == orgIndex}" @click="orgIndex = indexs" v-for="(items,indexs) in orgProList">
            <img :src="items.orgInfo.logoUrl" alt="">
            <span>{{items.orgInfo.orgName}}</span>
          </div>
        </div>
        <div class="free-product-list" v-show="indexs == orgIndex" v-for="(items,indexs) in orgProList">
          <div class="fpl-list">
            <ul>
              <li @click="openProductDetail(item)" v-for="item in items.productList">
                <div class="fpl-cover">
                  <img :src="item.imageUrl" alt="">
                </div>
                <div style="padding: 20px">
                  <div class="fpl-title">
                    {{item.productName}}
                  </div>
                  <span class="fpl-livetime">{{item.productIntro}}</span>
                </div>
                <div class="fpl-price">
                  <div class="commise-fpl" >
                    售价:￥{{item.productPrice}}
                  </div>
                  <span>{{item.purchaseNum}}人已报名</span>
                </div>
<!--                <div class="share-can-get linear-btn">-->
<!--                  推广赚￥{{item.commissionRebate}}-->
<!--                </div>-->
              </li>
              <li style="background: none"></li>
            </ul>
          </div>
          <div class="share-list">
            <div class="share-list-tab">
              <span :class="{'share-list-active' : !items.flag}" @click="getMonthAndWeekListByOrgId(indexs,false)">周榜</span>
              <span :class="{'share-list-active' : items.flag}" @click="getMonthAndWeekListByOrgId(indexs,true)">月榜</span>
            </div>
            <div class="share-items">
              <ul>
                <li @click="openProductDetail(item)" v-for="item in items.rankList">
                  <img class="share-cover" :src="item.imageUrl" alt="">
                  <div class="share-detail">
                    <p>  {{item.productName}}</p>
                    <div>
                      推广赚<span>￥{{item.commissionRebate}}</span>
                    </div>
                  </div>
                </li>
                <li style="display: none">
                  <img class="share-cover" src="http://wk.xhcedu.com/2020/202005/a_b686e98292c54c9daac95a32cd585dad.jpg" alt="">
                  <div class="share-detail">
                    <p> 二建机电实务（钻石VIP） 二建机电实务（钻石VIP） 二建机电实务（钻石VIP）</p>
                    <div>
                      推广赚<span>￥49.67</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--课程列表-->
    <div class="five-subject" v-if="goodsList.length > 0">
      <!--大咖好课-->
      <div id="ir1" class="pc-center">
        <div class="indexscan-box index-goodpro indexfree-list">
          <div>
            大咖好课 <span class="title-ps">不可错过的精品好课</span>
          </div>
          <span @click="openMore()">MORE >></span>
        </div>
        <div class="free-product-list">
          <div class="fpl-list">
            <ul>
              <li @click="openProductDetail(item)" v-if="index < 3" v-for="(item,index) in goodsList">
                <div class="fpl-cover">
                  <img :src="item.imageUrl" alt="">
                </div>
                <div style="padding: 20px">
                  <div class="fpl-title">
                    {{item.productName}}
                  </div>
                  <span class="fpl-livetime">{{item.productIntro}}</span>
                </div>
                <div class="fpl-price">
                  <div class="commise-fpl" >
                    售价:￥{{item.productPrice}}
                  </div>
                  <span>{{item.purchaseNum}}人已报名</span>
                </div>
<!--                <div class="share-can-get linear-btn">-->
<!--                  推广赚￥{{item.commissionRebate}}-->
<!--                </div>-->
              </li>
            </ul>
          </div>
          <div class="share-list">
            <div class="share-list-tab">
              <span :class="{'share-list-active' : rankType == 1}" @click="getMonthAndWeekList(1)">周榜</span>
              <span :class="{'share-list-active' : rankType == 2}" @click="getMonthAndWeekList(2)">月榜</span>
            </div>
            <div class="share-items">
              <ul>
                <li @click="openProductDetail(item)" v-for="item in goodsRankList">
                  <img class="share-cover" :src="item.imageUrl" alt="">
                  <div class="share-detail">
                    <p>  {{item.productName}}</p>
                    <div>
                      推广赚<span>￥{{item.commissionRebate}}</span>
                    </div>
                  </div>
                </li>
                <li style="display: none">
                  <img class="share-cover" src="http://wk.xhcedu.com/2020/202005/a_b686e98292c54c9daac95a32cd585dad.jpg" alt="">
                  <div class="share-detail">
                    <p> 二建机电实务（钻石VIP） 二建机电实务（钻石VIP） 二建机电实务（钻石VIP）</p>
                    <div>
                      推广赚<span>￥49.67</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--限时好课-->
    <div style="background: #fff;padding-bottom: 30px;" v-if="timeProList.length > 0">
      <div id="ir3" class="pc-center">
        <div class="indexscan-box index-timec index-goodpro ">
          <div>
            限时折扣 <span class="title-ps">诸多好课让利60%起！</span>
          </div>
          <span @click="openMore()">MORE >></span>
        </div>
        <div class="free-product-list">
          <div class="fpl-list" style="width: 100%;">
            <ul>
              <li class="time-c" @click="openProductDetail(item)" v-for="item in timeProList">
                <div class="fpl-cover">
                  <img :src="item.imageUrl" alt="">
                </div>
                <div style="padding: 20px">
                  <div class="fpl-title">
                    {{item.productName}}
                  </div>
                  <span class="fpl-livetime">{{item.productIntro}}</span>
                </div>
                <div class="fpl-price">
                  <div class="commise-fpl" >
                    售价:￥{{item.productPrice}}
                  </div>
                  <span>{{item.purchaseNum}}人已报名</span>
                </div>
<!--                <div class="share-can-get linear-btn">-->
<!--                  推广赚￥{{item.commissionRebate}}-->
<!--                </div>-->
              </li>
              <li class="time-c" style="display: none" >
                <div class="fpl-cover">
                  <img src="../assets/img/videotbg.png" alt="">
                </div>
                <div style="padding: 20px">
                  <div class="fpl-title">
                    2021中财财经大学MBA项目宣2021中财财经大学MBA项目宣......
                  </div>
                  <span class="fpl-livetime"> 直播时间：4月16日 19:30-20:30</span>
                </div>

                <div class="fpl-price">
                  <div class="commise-fpl">
                    ￥450 <span>返佣250</span>
                  </div>
                  <span>15456人已报名</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 50px;"></div>
  </div>
</template>
<script>
  //todo 倒计时 金标 返佣列表的已报名人数icon
  import { slider, slideritem } from 'vue-concise-slider'
  import tryvideos from "../components/videos/tryvideos";

  var map;
  export default {
    name: 'HelloWorld',
    data () {
      return {
        goodsList:[],//大咖好课
        goodsRankList:[],//月榜 周榜
        rankType:1,
        timeProList:[],//限时折扣
        newProList:[],//新课速递
        activeAnchor:'',
        searchKey:'',
        bannerList:[],//轮播图
        //滑动配置[obj]
        sliderinit: {
          currentPage: 0,//当前页码
          thresholdDistance: 500,//滑动判定距离
          thresholdTime: 100,//滑动判定时间
          autoplay:3000,//自动滚动[ms]
          loop:true,//循环滚动
//        direction:'vertical',//方向设置，垂直滚动
          infinite:1,//无限滚动前后遍历数
          slidesToScroll:1,//每次滑动项数
          freeMode: true,
          observer:true,
          observeParents:true
        },
        isLogin:localStorage.getItem('diruserinfo') || '', //登录状态
        activeLive:{},
        videoFlag:false,
        orgList:[], //已入驻机构
        orgProList:[], // 机构产品
        userphone:'',
        userHead:'https://www.zz1819.com/bg/personhead.png',
        sortList:[],
        newList:[],
        orgIndex:0,
      }
    },
    mounted(){},
    components:{
      slider,
      slideritem,
      tryvideos
    },
    created(){
      if(this.$store.state.user.user.userPhone){
        var str = this.$store.state.user.user.userPhone.toString();
        this.userphone = str[0]+str[1]+str[2]+"****"+str[7]+str[8]+str[9]+str[10]
        this.userHead = this.$store.state.user.user.imageUrl;
      }

      this.$emit('header_two',false);
      this.$emit('header',true);
      this.initPageData();
      this.getMonthAndWeekList(1);
      this.getSortList();
      this.getNews();
    },
    methods:{

      //选择三级跳页
      searchResultBySort(data){
        this.openNewPage('/pages/search',{sortId:data.sid,twoSortId:data.id})
      },
      //跳转公告详情页面
      openNewsDetail(data){
        this.openNewPage('/pages/newsdetail',{id:data.newId})
      },
      //选择分类
      chooseTwoLevel(data,index,indexs){
        this.sortList[index].index = indexs;
      },
      //获取类型列表
      getSortList(){
        this.http.post('/dir/queryProductSort', {}).then(res => {
          if (res.code == 0) {
            for(var i=0;i<res.data.length;i++){
              res.data[i].index = 0;
            }
            this.sortList = res.data;
          }
        })
      },
      //退出登录
      loginOut(){
        localStorage.removeItem('diruserinfo')
        this.stoast('已退出')
        setTimeout(()=>{
          this.$router.push('/');
          location.reload()
        },1000)
      },
      //获取公告
      getNews(t){
        this.http.post('/dir/new/queryNewList',{pageNum:1,pageSize:5}).then(res=>{
          if(res.code == 0){
            this.newList = res.data.list;
          }
        });
      },
      //获取大咖好课列表 周榜 越帮
      getMonthAndWeekList(t){
        this.rankType = t;
        this.http.post('/dir/queryRandomDirProductType2',{pageNum:1,pageSize:5}).then(res=>{
          if(res.code == 0){
            this.goodsRankList = res.data.list;
          }
        });
      },
      getMonthAndWeekListByOrgId(index,type){
        this.orgProList[index].flag = type;
        this.getProListByOgrId(index,false)
      },
      //初始化页面数据
      initPageData(){
        //轮播图
        this.http.post('/dir/queryPcCycleImagePageList',{}).then(res=>{
          if(res.code == 0){
            this.bannerList = res.data.list;
          }
        });
        //机构列表
        this.http.post('/dir/queryDirOrgInfoList',{pageNum:1,pageSize:8}).then(res=>{
          if(res.code == 0){
            this.orgList = res.data.list;
          }
        });
        //新课速递
        this.http.post('/dir/queryDirProductTypeSearch',{pageSize:4,pageNum:1}).then(res=>{
          if(res.code == 0){
            this.newProList = res.data.list;
          }
        });
        //机构产品
        this.http.post('/dir/queryDirProductByOrgRecom',{}).then(res=>{
          if(res.code == 0){
            for(var i=0;i<res.data.length;i++){
              res.data[i].rankList = [];
              res.data[i].flag = false;
            }
            this.orgProList = res.data;
            this.getProListByOgrId(0,true)
          }
        });
        //大咖好课
        this.http.post('/dir/queryRandomDirProductType2',{pageNum:1,pageSize:4}).then(res=>{
          if(res.code == 0){
            this.goodsList = res.data.list;
          }
        });
        //限时折扣
        this.http.post('/dir/queryRandomDirProductType4',{pageNum:1,pageSize:4}).then(res=>{
          if(res.code == 0){
            this.timeProList = res.data.list;
          }
        });
      },
      //根据机构Id获取周月榜
      getProListByOgrId(index,isFor){ //isFor 是否循环
        if(index<this.orgProList.length){
          this.http.post('/dir/queryRandomDirProductType2',{pageNum:1,pageSize:4,orgId:this.orgProList[index].orgInfo.id}).then(res=>{
            if(res.code == 0){
              this.orgProList[index].rankList = res.data.list;
              this.$set(this.orgProList,index,this.orgProList[index])
              if(isFor){
                this.getProListByOgrId(index+1,isFor)
              }
            }
          });
        }
      },
      openOrgDetail(data){
        this.openNewPage('/pages/orgdetail',{orgId:data.id})
      },
      //点击轮播图事件
      openBannerDetail(data){
        window.location.href = data.cycleValue;
      },
      //打开产品详情页
      openProductDetail(data){
        this.openProductDetailByType(data)
      },
      openMore(){
        this.openNewPage('/pages/search',{})
      },

      openLoginAndSignup(type){
        if(type==1){
          this.$router.push('/pages/login')
        }else{
          this.$router.push('/pages/signup')
        }
      },
    },
  }
  import '../assets/css/common.css';
  import '../assets/css/index.css'
</script>
<style scope>
  .join-dis{
    position: relative;
  }
  .join-dis span{
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top:0px;
    font-size: 24px;
    color:#fff;
    line-height: 92px;
    text-align: center;
  }
  .org-active{
    background: #ec6941 !important;
    color:#fff !important;

  }
  .org-logo-list span{
    line-height: 45px;
    padding: 0 30px 0 15px;
  }
  .org-logo-list img{
    width: 55px;
    height: 41px;
    margin: 2px;
  }
  .org-logo-list div{
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    margin-right: 10px;
    height: 45px;
    background: #fff;
    border:1px solid #e5e5e5;
    font-size: 14px;
    color:#101010;
  }
  .org-logo-list{
    display: flex;
    justify-content: flex-start;
  }
  .three-level-span:hover{
    color:#ec6941;
  }
  .type-border-bottom{
    padding-bottom: 25px;
    border-bottom: 1px dashed #b5b5b5;
  }
  .type-small-class span{
    cursor: pointer;
    font-size: 14px;
    color:#939393;
    display: block;
    margin-right: 15px;
    margin-bottom: 10px;
  }
  .type-small-class{
    margin-top: 20px;
    height: 36px;
    overflow: hidden;
    flex-wrap: wrap;
    display: flex;
    justify-content: flex-start;
  }
  .active-big-class{
    background: #ec6941 !important;
    color:#fff !important;
  }
  .type-big-class span{
    font-size: 16px;
    color:#686868;
    cursor: pointer;
    font-weight: bold;
    padding: 13px 19px;
    border-radius: 4px;
    display: block;
  }
  .type-big-class{
    display: flex;
    justify-content: flex-start;
    margin-top: 20px;
  }
  .type-title span{
    color:#ec6941;
    cursor: pointer;
    font-size: 12px;
  }
  .type-title{
    font-size: 20px;
    color:#ec6941;
  }
  .pro-type-left > div{
    margin-bottom: 25px;
  }
  .pro-type-left{
    width: 529px;
    padding: 32px;
    background: #fff;
  }
  .pro-type-box {
    display: flex;
    justify-content: space-between;
  }
  .share-list,.fpl-list{
    height: 342px;
  }
  .store-title-top{
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .index-store-headleft {
    width: 60px;
    height: 60px;
    background: #fff;
    margin-right: 20px;
    overflow: hidden;
    border-radius: 50%;
  }
  .index-store-headleft img{
    width: 100%;
    height: 100%;
  }
  .title-noborder{
    border-bottom:  none;
  }
  .organ-list {
    /*margin-top: 15px;*/
  }
  .organ-list li img{
    height: 80px;
    margin:12px auto;
    display: block;
  }
  .organ-list li {
    cursor: pointer;
    background: #fff;
    margin-right: 16px;
    width: 136px;
    height: 103px;
  }
  .organ-list ul{
      display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }

</style>
