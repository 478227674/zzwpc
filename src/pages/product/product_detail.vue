<template>
  <div class="hello" style="background: #e7e8ec">
    <orghead></orghead>
    <div class="pro-banner">
      <div class="web-positon">
        <img src="../../assets/img/product/productpositionicon.png" alt="">
        <span>课程 > {{pobj.productName}}</span>
      </div>
      <img src="../../assets/img/zzw/probanner.png" alt="">
    </div>
    <div class="pro-detail-all">

      <div class="pro-detail-top ">
        <!--左轮播图-->
        <div class="product-d-img">
          <slider :options="sliderinit1" :sliderinit="sliderinit1">
            <slideritem  v-for="(item,index) in imageList" :key="index">
              <div style="width:380px;height:258px;">
                <img style="width:100%;height:100%;" :src="item.attachment.fileUrl" alt="">
              </div>
            </slideritem>
            <!-- slot  -->
          </slider>
          <!--<img src="../../assets/img/test2.png" alt="">-->
        </div>
        <!--右详情-->
        <div class="product-d-d">
          <div class="produt-d-title">
            {{pobj.productName}}
          </div>
          <div class="product-d-lt ">{{pobj.productIntro}}</div>
          <div class="new-pro-type">
            <div class="new-protype-item">
              <div v-for="item in pobj.allRules.classTypes" v-if="item.isHave == 1">班制：{{item.className}}</div>
              <div>开课时间：<span class="pro-start-time">{{guigeObj.createTime}}至{{guigeObj.endTime}}</span></div>
            </div>
            <div class="new-protype-item">
              <div v-for="item in pobj.allRules.teachTypes" v-if="item.isHave == 1">上课方式：{{item.teachName}}</div>
              <div>课时数：<span class="pro-classtime">{{guigeObj.classTime}}课时(45分/课时)</span></div>
            </div>
            <div class="new-protype-item">
              <div>报名人数：{{pobj.purchaseNum}}</div>
              <p class="pro-active-time">限时优惠截止至{{guigeObj.endTime}}</p>
            </div>
          </div>
          <div class="join-submit"  @click="buyNow">申请报名</div>
        </div>
        <!--左上角图标-->
        <div class="pro-handler">
          <div @click="getQrcode">
            <img  src="../../assets/img/shareicon.png" alt="">
            <div id="qrcodepro"></div>
          </div>
          <div>
            <img @click="collectThisProduct" src="../../assets/img/zzw/collectpro.png" alt="">
          </div>
        </div>
      </div>
<!--      <div class="product-ps">-->
<!--         <span>!</span>提供服务： 免费问答、资料下载、学习进度追踪、课程免费一年等-->
<!--      </div>-->
      <div  class="pro-detail-bottom" >
        <div class="product-allbox" >
          <div class="product-detail-left">
            <el-tabs v-model="activeName">
              <el-tab-pane label="课程详情" name="first">
                <div style="padding-top: 20px" v-html="pobj.productDesc">
                </div>
              </el-tab-pane>
              <el-tab-pane label="课程目录" name="second">
                <div class="subjects-btn">
                  <span @click="getStageListBySubjectId(item.subjectId)" :class="{'active-btns':subjectId==item.subjectId}" v-for="item in subjectList">{{item.subjectName}}</span>
                </div>
                <div style="display:none" class="class-list">
                  <div>
                    <div class="stagelist">
                        <span>
                           阶段1
                        </span>
                      <img src="../../assets/img/right.png" alt="">
                    </div>
                    <ul >
                      <li >
                        <div>
                          啊但是撒大所多
                        </div>
                        <span >
                          可试看
                        </span>
                      </li>
                      <li >
                        <div>
                          啊但是撒大所多
                        </div>
                        <p class="video-flag"></p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="class-list">
                  <div v-for="(item,index) in stageList">
                    <div class="stagelist" @click="getVideosListByStageId(item.stageId,index)">
                        <span>
                            {{item.stageName}}
                        </span>
                      <img :class="{'open-active':stageId==item.stageId&&item.flag}" src="../../assets/img/right.png" alt="">
                    </div>
                    <ul v-show="stageActiveIndex == index && item.flag">
                      <li v-for="(item,index) in videos">
                        <div>
                          {{index+1}}.{{item.videoName}}
                        </div>
                        <span v-show="item.isTry==1"  @click="tryThisVideo(item)">
                          可试看
                        </span>
                        <p v-show="item.isTry == 0" class="video-flag"></p>

                      </li>
                    </ul>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="product-detail-right">
            <div class="pc-product-list-bot">
              <div class="product-store" >
                <div class="store-detail">
                  <img :src="pobj.orgInfo.logoUrl" alt="">
                  <div>
                    <p>{{pobj.orgInfo.orgName}}</p>
                    <span>{{pobj.orgInfo.orgIntro}}</span>
                  </div>
                </div>
                <div class="store-in" @click="openOrgDetail">进入店铺</div>
                <div style="height: 20px;"></div>
              </div>
            </div>
            <div class="store-hot-class">
              <div class="hot-title">最热课程推荐</div>
              <div class="hot-class-list">
                <div  @click="openProductDetail(item)"  v-for="item in hotClass" class="hot-class-detail">
                  <div class="hot-class-img">
                    <img :src="item.imageUrl" alt="">
                  </div>
                  <div class="hot-class-text">
                    <div class="hot-class-top">
                      <p>{{item.productName}}</p>
                      <div class="hot-class-classtime">
                        <span>班制：{{item.className}}</span>
                        <span>授课：{{item.teachName}}</span>
                      </div>
                    </div>
                    <div class="hot-class-price">
                      <div>
                        ￥{{item.productPrice}}
<!--                        <span>返佣￥{{item.commissionRebate}}</span>-->
                      </div>
                      <p>{{item.purchaseNum}}已报名</p>
                    </div>
                  </div>
                </div>
                <div class="hot-class-detail" style="display: none">
                  <div class="hot-class-img">
                    <img src="../../assets/img/videotbg.png" alt="">
                  </div>
                  <div class="hot-class-text">
                    <div class="hot-class-top">
                      <p>2021英语系统课程班</p>
                      <div class="hot-class-classtime">
                        <span>课时：55</span>
                        <span>课时：55</span>
                      </div>
                    </div>
                    <div class="hot-class-price">
                      <div>
                        ￥450
                        <span>返佣￥200</span>
                      </div>
                      <p>123456已报名</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="试听课程" width="80%" :visible.sync="videoFlag">
        <video-player  class="video-player vjs-custom-skin"
                       ref="videoPlayer"
                       :playsinline="true"
                       :options="playerOptions"
        ></video-player>
        <!--      <video style="width:80%;margin:20px auto;display: block;"  controls="controls" :src="videoUrl"></video>-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="videoFlag = false">取 消</el-button>
        </div>
      </el-dialog>
      <tryvideos ref="seevideos" :visible.sync="videoFlag"></tryvideos>
    </div>
  </div>
</template>
<script>
  import tryvideos from "../../components/videos/tryvideos";
  import orghead from '../../components/orghead'
  import QRCode from "qrcodejs2"; //引入生成二维码插件
  import config from "../../config"; //引入生成二维码插件
  import { slider, slideritem } from 'vue-concise-slider'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        playFlag:false,
        playerOptions : {
          playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" //url地址
          }],
          poster: "../../static/images/test.jpg", //你的封面地址
          // width: document.documentElement.clientWidth, //播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        },
        activeName:'first',
        hotClass:[],
        sliderinit1: {
          currentPage: 0,//当前页码
          thresholdDistance: 500,//滑动判定距离
          thresholdTime: 100,//滑动判定时间
          autoplay:3000,//自动滚动[ms]
          loop:true,//循环滚动
//        direction:'vertical',//方向设置，垂直滚动
          infinite:1,//无限滚动前后遍历数
          slidesToScroll:1,//每次滑动项数
        },
        imageList:[],
        productId:null,
        orgId:null,
        pobj:{
          allRules:{},
          orgInfo:{},
        },
        productDetail:{},
        guigeObj:{},

        videos:[],
        subjectId:null, //查看的当前学科ID
        subjectList:[],//学科列表
        stageId:null,//查看的当前阶段ID
        stageList:[],//阶段列表
        videoFlag:false,
        stageActiveIndex:null,
      }
    },
    components:{
      slider,
      slideritem,
      tryvideos,
      orghead

    },
    created(){
      this.productId = this.$route.query.id;
      this.getProductDetai();
      this.$emit('header',false);
    },
    methods:{
      //试听课程
      tryThisVideo(data){
        this.$refs.seevideos.$emit('seeVideosByComments',data)
      },
      //根据阶段ID查看课时列表
      getVideosListByStageId(stageId,index){
        this.stageList[index].flag = !this.stageList[index].flag;
        if(!this.stageList[index].flag){
          return;
        }
        this.stageId = stageId;
        this.stageActiveIndex = index;
        this.http.post('/dir/getProductVideoList',{stageId:stageId,productId:this.productId,productType:2,subjectId:this.subjectId}).then(res=>{
          if(res.code == 0){
            this.videos = res.data;
          }
        })
      },
      openOrgDetail(data){
        this.openNewPage('/pages/orgdetail',{orgId:this.orgId})
      },
      //根据学科ID查询阶段列表
      getStageListBySubjectId(subjectId){
        this.subjectId = subjectId;
        this.stageList = [];
        this.videos = [];
        this.http.post('/dir/getProductStageList',{productId:this.productId,productType:2,subjectId:this.subjectId}).then(res=>{
          if(res.code == 0){
            for(var i=0;i<res.data.length;i++){
              res.data[i].flag = false;
            }
            this.stageList = res.data;
          }
        })
      },

      getQrcode(){
        if(!localStorage.getItem('diruserinfo')){
          this.$router.push('/pages/login');
          return;
        }
        var shareUrl = '';
        var user = JSON.parse(localStorage.getItem('diruserinfo'))
        shareUrl = config.wxUrl +  'product_detail.html?id=' + this.productId + '&uid=' + user.userId;
        if(document.getElementById('qrcodepro').innerHTML){
          document.getElementById('qrcodepro').innerHTML = "";
        }else{
          let qrcode = new QRCode('qrcodepro', {
            width:'100',
            height: '100',
            text:shareUrl, // 二维码地址
            colorDark : "#000",
            colorLight : "#FFF",
          })
        }

      },
      openActiveList(){
        this.$router.push({path:'/pages/active',query:{}})
      },
      getProductDetai(){
        this.http.post('/dir/queryOrgProductInfo',{productId:this.productId}).then(res=>{
          if(res.code == 0){
            this.imageList = res.data.imageList;
            this.productDetail = res.data.productDetail;
            this.pobj = res.data;
            this.guigeObj = res.data.rule;
            this.guigeObj.createTime = this.formatTimeToDate(this.guigeObj.createTime)
            this.guigeObj.endTime = this.formatTimeToDate(this.guigeObj.endTime)
            this.orgId = res.data.orgId;
            this.getHotClass();

            this.http.post('/dir/querySubjectListByProduct',{productId:this.productId,productType:2}).then(res=>{
              if(res.code == 0){
                this.subjectList = res.data;
                this.subjectId =  res.data[0].subjectId;
                this.getStageListBySubjectId(this.subjectId)
              }
            })
          }
        })
      },
      //报名实践
      buyNow(){
        this.http.post('/dir/createProductOrder',{productId:this.productId,ruleId:this.guigeObj.ruleId,orgId:this.pobj.orgId}).then(res=>{
          if(res.code == 0){
            this.stoast('报名成功')
            this.$router.push({path:'/pages/orderpay',query:{id:res.data.orderId}})
          }else if(res.code == 4){
            this.$confirm('订单已存在，是否去支付?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/pages/mainclass')

            }).catch(() => {

            });
          }
        })
      },
      //收藏产品
      collectThisProduct(){
        this.collectProduct(this.productId,2)
      },
      //获取热门课程
      getHotClass(){
        this.http.post('/dir/queryDirProductRecomByOrgId',{orgId:this.orgId,pageSize:3,pageNum:1}).then(res=>{
          if(res.code == 0){
            this.hotClass = res.data.list;
          }
        })
      },
      //打开产品详情页
      openProductDetail(data){
        this.openProductDetailByType(data)
      },
      chooseThisGuige(data){
        this.guigeObj = data;
        this.guigeObj.createTime = this.formatTimeToDate(this.guigeObj.createTime)
        this.guigeObj.endTime = this.formatTimeToDate(this.guigeObj.endTime)
      },
      openIndex(){
        this.$router.push('/')
      },
    },
    watch:{
      videoFlag(val,oval){
        if(!val){
          this.videoUrl = ''
          this.playerOptions.sources[0].src = ''

        }
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
  import '../../assets/css/order.css';
</script>
<style scoped>

  .pro-start-time{
    color:#e8252d;
  }
  .pro-classtime{
    color:#ef733a;
  }
  .new-pro-type{
    overflow: hidden;
  }
  .new-protype-item>div{
    margin-right: 35px;
  }
  .new-protype-item{
    margin-top:20px;
    display: flex;
    font-size: 14px;
    color:#494949;
    justify-content: flex-start;
  }



</style>
