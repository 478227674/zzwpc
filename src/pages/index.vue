<template>
  <div class="hello" style="background: #f5f5f5">
    <!--轮播图以及个人信息-->
    <div class="backfff-box">
      <div class="pc-center swiper-box-all">
        <div>
          <div class="swiper-box-postion" style="position: relative;">
            <div style="height: 345px;">
              <slider :options="sliderinit" :sliderinit="sliderinit">
                <slideritem v-for="(item,index) in bannerList" :key="dir_index" @tap="openBannerDetail(item)">
                  <img style="width: 100%;height: 345px" :src="item.attachment.fileUrl" alt="">
                </slideritem>
                <!-- slot  -->
              </slider>
            </div>
          </div>
          <div class="person-nav">
            <ul>
              <li>
                <img src="../assets/img/dis/helpcenter.png" alt="">
                <div>
                  <p>问题中心</p>
                  <span>一分钟了解分销时长</span>
                </div>
              </li>
              <li>
                <img src="../assets/img/dis/newperson.png" alt="">
                <div>
                  <p>新手专区</p>
                  <span>让新进驻的更容易上手</span>
                </div>
              </li>
              <li>
                <img src="../assets/img/dis/questionall.png" alt="">
                <div>
                  <p>问题汇总</p>
                  <span>你想知道的都在这里</span>
                </div>
              </li>
              <li>
                <img src="../assets/img/dis/livepark.png" alt="">
                <div>
                  <p>直播广场</p>
                  <span>名师限时免费直播</span>
                </div>
              </li>
              <li>
                <img src="../assets/img/dis/newproduct.png" alt="">
                <div>
                  <p>最新商品</p>
                  <span>每周都有大咖新课</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="person-box">
          <div class="person-box-head">
            <img src="http://wk.xhcedu.com/2020/202005/a_835f873c4b4d4de5a5e175ebb341a4f1.jpg" alt="">
          </div>
          <div v-if="isLogin">
            <div class="say-hello">
              <span>Hi,{{userphone}}的店铺</span>
              <span>欢迎加入我们，快赚取佣金吧!</span>
            </div>
            <div class="see-myproduct linear-btn" @click="loginOut">
              退出
            </div>
          </div>
          <div v-else>
            <div class="say-hello">
              <span>您还没有登录</span>
              <span>登录后可分销全场产品</span>
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
                <li>企业学院包名开始！</li>
                <li>企业学院包名开始！</li>
                <li>企业学院包名开始！</li>
                <li>企业学院包名开始！</li>
                <li>企业学院包名开始！</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="join-dis pc-center">
      <img src="../assets/img/dis/join-dis.png" alt="">
    </div>
    <!--机构店铺-->
    <div class="five-subject">
      <!--机构店铺-->
      <div id="ir45" class="pc-center">
        <div class="indexscan-box title-noborder index-goodpro indexfree-list">
          <div>
            机构店铺 <span class="title-ps">他们已入驻，全网分销产品</span>
          </div>
          <span @click="openGroup()">MORE >></span>
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
    <div class="five-subject" v-for="(items,indexs) in orgProList">
      <div id="ir12" class="pc-center">
        <div class="indexscan-box title-noborder">
          <div class="store-title-top">
            <div class="index-store-headleft"><img class="" src="../assets/img/teststoreicon.png" alt=""></div>启智教育的店铺 <span class="title-ps">5000w用户的共同选择，您的掌上老师！</span>
          </div>
          <span @click="openGroup()">MORE >></span>
        </div>
        <div class="free-product-list">
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
                <div class="share-can-get linear-btn">
                  推广赚￥{{item.commissionRebate}}
                </div>
              </li>
              <li >
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
                    售价￥450
                  </div>
                  <span>15456人已报名</span>
                </div>
              </li>
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
    <div class="five-subject">
      <!--大咖好课-->
      <div id="ir1" class="pc-center">
        <div class="indexscan-box index-goodpro indexfree-list">
          <div>
            大咖好课 <span class="title-ps">不可错过的精品好课</span>
          </div>
          <span @click="openGroup()">MORE >></span>
        </div>
        <div class="free-product-list">
          <div class="fpl-list">
            <ul>
              <li @click="openProductDetail(item)" v-for="item in goodsList">
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
                <div class="share-can-get linear-btn">
                  推广赚￥{{item.commissionRebate}}
                </div>
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
    <div style="background: #fff;padding-bottom: 30px;">
      <div id="ir3" class="pc-center">
        <div class="indexscan-box index-timec index-goodpro ">
          <div>
            限时折扣 <span class="title-ps">诸多好课让利60%起！</span>
          </div>
          <span @click="openGroup()">MORE >></span>
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
                <div class="share-can-get linear-btn">
                  推广赚￥{{item.commissionRebate}}
                </div>
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
    <tryvideos ref="seevideos" :visible.sync="videoFlag"></tryvideos>
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
        userHead:''
      }
    },
    mounted(){},
    components:{
      slider,
      slideritem,
      tryvideos
    },
    created(){
      var str = this.$store.state.user.user.userPhone.toString();
      this.userphone = str[0]+str[1]+str[2]+"****"+str[7]+str[8]+str[9]+str[10]
      this.userHead = this.$store.state.user.user.imageUrl;

      this.$emit('header_two',false);
      this.$emit('header',true);
      this.initPageData();
      this.getMonthAndWeekList(1);
    },
    methods:{
      loginOut(){
        localStorage.removeItem('diruserinfo')
        this.stoast('已退出')
        setTimeout(()=>{
          this.$router.push('/');
          location.reload()
        },1000)
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
            this.getProListByOgrId(0)
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
                this.getProListByOgrId(index+1)
              }
            }
          });
        }

      },
      //试听课时
      tryVideos(data){
        this.$refs.seevideos.$emit('seeVideosByComments',data)
      },

      //锚点事件
      goToAnchor(data){
        this.activeAnchor = data.text;
        document.querySelector("#"+data.id).scrollIntoView(true);
      },
      openOrgDetail(data){
        this.openNewPage('/pages/orgdetail',{orgId:data.id})
      },
      chooseThisWordSearch(w){
        if(!w){
          this.toast('请输入关键字后查询')
          return;
        }
        this.openNewPage('/pages/search',{word:w})
      },
      //分类的class
      gernerateClass(index){
        return 'item-list-'+(dir_index+1);
      },
      //打开详细详情
      openNewsDetail(data){
        this.$router.push({path:'/pages/newsdetail',query:{id:data.messageId}})
      },

      //点击轮播图事件
      openBannerDetail(data){
        window.location.href = data.cycleValue;

      },
      //打开产品详情页
      openProductDetail(data){
        this.openProductDetailByType(data)
      },
      //打开优惠可列表
      openGroup(){
        this.openNewPage('/pages/group',{});
      },
      openIndex(){
        this.$router.push('/')
      },
      openOrganDetail(id){
        let routeUrl = this.$router.resolve({
          path: "/pages/organ_detail",
          query: {id:id}
        });
        window.open(routeUrl .href, '_blank');
      },
      openProduct(type){
        if(type){
          this.$router.push({path:'/pages/product',query:{producttype:type}})
        }else{
          this.$router.push('/pages/product')
        }
      },
      openDetail(data){
//        console.log(data)
        this.openProductDetailByType(data)
      },
      openProductIndex(){
        this.$router.push('/pages/product')
      },
      openProductByOneLevelId(data){
        this.$router.push({path:'/pages/product',query:{oid:data.id}})
      },
      openShareget(){
        this.openNewPage("/pages/shareget",{})
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
  .share-list,.fpl-list{
    height: 342px !important;
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
