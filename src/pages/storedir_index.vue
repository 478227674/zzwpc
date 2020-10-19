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
            <img :src="userHead" alt="">
            <!--            <img src="../assets/img/personhead.png" alt="">-->
          </div>
          <div v-if="isLogin">
            <div class="say-hello">
              <span>Hi,{{userphone}}</span>
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
                <li @click="openNewsDetail(item)" v-for="item in newList">{{item.newTitle}}！</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="join-dis pc-center">
      <img src="../assets/img/dis/join-dis.png" alt="">
    </div>
    <!--课程列表-->
    <div class="five-subject" v-if="goodsList.length > 0" >
      <!--大咖好课-->
      <div id="ir1" class="pc-center">
        <div class="indexscan-box index-goodpro indexfree-list">
          <div>
            大咖好课 <span class="title-ps">不可错过的精品好课</span>
          </div>
          <span @click="openSearch()">MORE >></span>
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
              <li style="display: none">
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
          <div style="display: none" class="commise-box">
            <div class="commise-list">
              <ul>
                <li v-for="item in activeTopSix" @click="openProductDetail(item)">
                  <img class="commise-cover" :src="item.imageUrl" alt="">
                  <div>
                    <div>{{item.productName}}</div>
                    <p class="commise-num">
                      <a href="javascript:;">￥{{item.productPrice}}</a>
                      <span>{{item.purchaseNum}}</span>
                    </p>
                  </div>
                </li>
                <li style="display: none">
                  <img class="commise-cover" src="../assets/img/videotbg.png" alt="">
                  <div>
                    <div>2020MBA真题解析班宣讲课</div>
                    <p class="commise-num">
                      <a href="javascript:;">返佣￥200</a>
                      <span>12398</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!--限时好课-->
    <div  v-if="timeProList.length > 0"  style="background: #fff;padding-bottom: 30px;">
      <div id="ir3" class="pc-center">
        <div class="indexscan-box index-timec index-goodpro ">
          <div>
            限时折扣 <span class="title-ps">诸多好课让利60%起！</span>
          </div>
          <span @click="openSearch()">MORE >></span>
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
    <!-- 新课速递-->
    <div v-if="newProList.length > 0" id="ir4" class="pc-center">
      <div class="indexscan-box index-goodpro indexfree-list">
        <div>
          新课速递 <span class="title-ps">每周都有大咖新课</span>
        </div>
        <span @click="openSearch()">MORE >></span>
      </div>
      <div class="free-product-list">
        <div class="fpl-list" style="width: 100%;">
          <ul>
            <li class="time-c" @click="openProductDetail(item)" v-for="item in newProList">
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
        activeTopSix:[],//报名展台右侧
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
        isLogin:localStorage.getItem('diruserinfo') || '',
        newList:[],
        orgId:null,
        userphone:'',
        userHead:'',
      }
    },
    mounted(){

    },
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

      this.orgId = this.$route.query.orgId;
      this.getBannerList();
      this.$emit('header_two',false);
      this.$emit('header',true);
      this.initPageData();
      this.getMonthAndWeekList(1);
      this.getNews();
    },
    methods:{
      getBannerList(){
        this.http.post('/dir/queryPcCycleImagePageList',{}).then(res=>{
          if(res.code == 0){
            this.bannerList = res.data.list;
          }
        });
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
        this.http.post('/dir/queryRandomDirProductType2',{pageNum:1,pageSize:5,isCommission:1}).then(res=>{
          if(res.code == 0){
            this.goodsRankList = res.data.list;
          }
        });
      },
      //初始化页面数据
      initPageData(){

        //新课速递
        this.http.post('/dir/queryDirProductTypeSearch',{pageSize:4,pageNum:1}).then(res=>{
          if(res.code == 0){
            this.newProList = res.data.list;
          }
        });
        // //轮播图
        // this.http.post('/home/queryPcCycleImage',{}).then(res=>{
        //   if(res.code == 0){
        //     this.bannerList = res.data;
        //   }
        // });
        //大咖好课
        this.http.post('/dir/queryRandomDirProductType2',{pageNum:1,pageSize:4,isCommission:1}).then(res=>{
          if(res.code == 0){
            this.goodsList = res.data.list;
          }
        });
        //限时折扣
        this.http.post('/dir/queryRandomDirProductType4',{pageNum:1,pageSize:4,isCommission:1}).then(res=>{
          if(res.code == 0){
            this.timeProList = res.data.list;
          }
        });

      },
      //获取资料类型
      getFileTypeList(){
        this.http.post('/org/queryDatumTypeList',{}).then(res=>{
          if(res.code == 0){
            this.typeList = res.data;
            for(let i=0;i<res.data.length;i++){
              this.getFileByFileTypeId(res.data[i].typeId,i)
            }
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
      chooseThisWordSearch(w){
        if(!w){
          this.toast('请输入关键字后查询')
          return;
        }
        this.openNewPage('/pages/search',{word:w})
      },
      openSearch(){
        this.openNewPage('/pages/search',{})

      },
      //打开详细详情
      openNewsDetail(data){
        this.openNewPage('/pages/newsdetail',{id:data.newId})
      },

      //点击轮播图事件
      openBannerDetail(data){
        window.location.href = data.cycleValue;
        return;
        if(data.productType == 2){
          this.openNewPage('/pages/product_detail',{id:data.productId})
        }else{
          if(data.isCut == 1){
            this.openNewPage('/pages/productcut_detail',{id:data.productId})
          }
          if(data.isGroup == 1){
            this.openNewPage('/pages/productgroup_detail',{id:data.productId})
          }

        }

      },
      //打开产品详情页
      openProductDetail(data){
        this.openProductDetailByType(data)
      },
      //打开优惠可列表
      openGroup(){
        this.openNewPage('/pages/group',{});
      },
      openDetail(data){
//        console.log(data)
        this.openProductDetailByType(data)
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

</style>
