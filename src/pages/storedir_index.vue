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
                <img src="../assets/img/dis/helpcenter.png" alt="">
                <div>
                  <p>直播广场</p>
                  <span>名师限时免费直播</span>
                </div>
              </li>
              <li>
                <img src="../assets/img/dis/helpcenter.png" alt="">
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
          <div class="say-hello">
            <span>Hi,135****6666的店铺</span>
            <span>欢迎加入我们，快赚取佣金吧!</span>
          </div>
          <div class="see-myproduct linear-btn">
            查看我的分销产品
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
    <!-- 新课速递-->
    <div id="ir4" class="pc-center">
      <div class="indexscan-box index-goodpro indexfree-list">
        <div>
          新课速递 <span class="title-ps">每周都有大咖新课</span>
        </div>
        <span @click="openGroup()">MORE >></span>
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
        activeTopSix:[],//报名展台右侧
        activeAnchor:'',
        searchKey:'',
        liveList:[], //直播列表
        knowledgeList:[],//知识讲授
        bannerList:[],//轮播图
        activeList:[], //报名展台
        freeList:[],//免费课程
        freeTopTen:[],//免费课程top10
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
        newsList:[],
        activeLive:{},
        videoFlag:false,

        typeList:[],

        scanObj:{},
        testCount:0
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
      this.$emit('header_two',false);
      this.$emit('header',true);
      this.initPageData();
      this.getMonthAndWeekList(1);
    },
    methods:{
      downloadFile(url){
        if(!localStorage.getItem('diruserinfo')){
          this.$router.push('/pages/login')
          return;
        }
        window.open(url, '_blank');
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
      //初始化页面数据
      initPageData(){
        // this.http.post('/home/queryOrgMessageDynamicList',{}).then(res=>{
        //   if(res.code == 0){
        //     this.newsList = res.data;
        //   }
        // })
        //扫描诊断
        // this.http.post('/al/queryTestCount',{},true).then(res=>{
        //   if(res.code == 0){
        //     this.testCount = res.scanCount + res.diagnosisCount + res.testCount;
        //     this.initPirCharts(res)
        //   }
        // });
        // this.http.post('/al/queryTargetCount',{},true).then(res=>{
        //   if(res.code == 0){
        //     var subjectData = {
        //       maths:[],
        //       english:[],
        //       logic:[],
        //     };
        //     let dateArr = [];
        //     let mathArr = res['1001'];
        //     let englishArr = res['1002'];
        //     let logicArr = res['1003'];
        //     for(var i=mathArr.length;i--;i<mathArr<=0){
        //       dateArr.push(mathArr[i].currentTime)
        //       subjectData.maths.push(mathArr[i].count);
        //       subjectData.english.push(englishArr[i].count);
        //       subjectData.logic.push(logicArr[i].count);
        //     }
        //     this.initLineCharts(dateArr,subjectData)
        //     // console.log(res)
        //   }
        // });
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
        // //直播列表
        // this.http.post('/product/getHomeProductLiveList',{}).then(res=>{
        //   if(res.code == 0){
        //     let nowTime = new Date().getTime();
        //     for(var i=0;i<res.data.length;i++){
        //       //isLiveing  1直播中 2准备中 3录播
        //       if(nowTime > res.data[i].productVideo.startTime && nowTime < res.data[i].productVideo.endTime){
        //         res.data[i].isLiveing = 1;
        //       }else if(nowTime < res.data[i].productVideo.startTime){
        //         res.data[i].isLiveing = 2;
        //       }else{
        //         res.data[i].isLiveing = 3;
        //       }
        //       res.data[i].productVideo.startTimeStr = this.formatTimeToDateAndHour(res.data[i].productVideo.startTime)
        //     }
        //     this.liveList = res.data;
        //     if(res.data[0]){
        //       this.activeLive = res.data[0];
        //     }
        //   }
        // });
        // //免费课程
        // this.http.post('/product/queryRecomProduct',{}).then(res=>{
        //   if(res.code == 0){
        //     this.freeList = res.data;
        //   }
        // });
        // //免费课程top10
        // this.http.post('/product/getTenFreeProduct',{}).then(res=>{
        //   if(res.code == 0){
        //     this.freeTopTen = res.data;
        //   }
        // });
        // this.getFileTypeList();
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
      //根据文件类型ID获取文件列表
      getFileByFileTypeId(id,index){
        this.words = '';
        this.http.post('/org/queryDatumPageList',{pageNum:1,pageSize:5,typeId:id}).then(ret=>{
          if(ret.code == 0){
            for(let i=0;i<ret.data.list.length;i++){
              ret.data.list[i].createTime = this.formatTimeToDateAndHour(ret.data.list[i].createTime)
            }
            this.typeList[index].fileList = ret.data.list;
            this.$set(this.typeList,index,this.typeList[index])
          }
        })
      },
      //试听课时
      tryVideos(data){
        this.$refs.seevideos.$emit('seeVideosByComments',data)
      },
      //直播列表鼠标移入移出事件
      mouseOver(data){
        this.activeLive = data;
      },
      mouseLeave(data){
      },
      //初始化饼状图
      initPirCharts(data){
        //饼状图配置
        var myChart = echarts.init(this.$refs.echartsbox);
        var option = {
          color:['#35b6d1','#29d9a9','#4983ec'], //颜色设置
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}'+ '条' +'({d}%)'
          },
          legend: { //解释
            orient: 'horizontal',
            bottom: 10,
            data: ['全面扫描', '分点诊断', '综合训练']
          },
          series: [
            {
              name: '诊断次数',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: false, //控制饼状图中间文字是否显示
                  fontSize: '15', //字体大小
                  fontWeight: 'bold' //是否加粗
                }
              },
              data: [ //数据结构
                {value: data.scanCount, name: '全面扫描'},
                {value: data.diagnosisCount, name: '分点诊断'},
                {value: data.testCount, name: '综合训练'},
              ]
            }
          ]
        }
        myChart.setOption(option, true);
      },
      //新版本线装图
      initLineCharts(date,subobj){
        //Echarts初始化
        let _this = this;
        this.$nextTick(function () {
          var myChartsLine = echarts.init(this.$refs.echartsboxline);
          var optionLine = {
            color:['#de57f6','#438afe','#22ac38'],
            title: {
              text: '平台训练统计(日期/次数)'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              x: 'right',
              data: [ '数学', '英语','逻辑']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            // toolbox: { //保存图片按钮
            //   feature: {
            //     saveAsImage: {}
            //   }
            // },
            xAxis: {
              axisTick:{
                lineStyle:{
                  width:0 //刻度线宽度
                },
              },
              axisLine:{       //X轴是否显示
                "show":false
              },
              color:'#fff',
              type: 'category',
              boundaryGap: false,
              data: date
            },
            yAxis: {
              axisTick:{
                lineStyle:{
                  width:0 //刻度线宽度
                },
              },
              axisLine:{       //Y轴是否显示
                "show":false
              },
              color:'#fff',
              type: 'value',
              min:0,
              max:500
            },
            series: [
              {
                name: '数学',
                type: 'line',
                data: subobj.maths,
                itemStyle: {
                  normal: {
                    lineStyle:{
                      width:3//设置线条粗细
                    }
                  }
                }
              },
              {
                name: '英语',
                type: 'line',
                data: subobj.english,
                itemStyle: {
                  normal: {
                    lineStyle:{
                      width:3//设置线条粗细
                    }
                  }
                }
              },
              {
                name: '逻辑',
                type: 'line',
                data: subobj.logic,
                itemStyle: {
                  normal: {
                    lineStyle:{
                      width:3//设置线条粗细
                    }
                  }
                }
              },
            ]
          };
          myChartsLine.setOption(optionLine, true);
        })
      },
      //锚点事件
      goToAnchor(data){
        this.activeAnchor = data.text;
        document.querySelector("#"+data.id).scrollIntoView(true);
      },
      openActive(t){
        this.openNewPage('/pages/active',{type:t})
      },
      openAiword(){
        this.openNewPage('/pages/aiword',{})

      },
      chooseThisWordSearch(w){
        if(!w){
          this.toast('请输入关键字后查询')
          return;
        }
        this.openNewPage('/pages/search',{word:w})
      },
      //打开广告推广页面
      openPush(){
        window.open(this.pushObj.pushUrl,'');
      },
      //分类的class
      gernerateClass(index){
        return 'item-list-'+(index+1);
      },
      //打开最新消息列表
      openNewsList(){
        this.$router.push({path:'/pages/newslist',query:{}})

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
      openPtProduct(){
        this.openNewPage('/pages/ptp',{});
      },
      openFree(){
        this.openNewPage('/pages/free',{});
      },
      openLive(){
        this.openNewPage('/pages/live',{});
      },
      openTarget(){
        this.openNewPage('/pages/targettingindex',{});
      },
      openDonwloadFile(){
        this.openNewPage('/pages/file',{});
      },
      openChange(){
        this.openNewPage('/pages/change',{});
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
      develop(){
        alert('下载APP进行查看')
      },
    },
  }
  import '../assets/css/common.css';
  import '../assets/css/index.css'
</script>
<style scope>

</style>
