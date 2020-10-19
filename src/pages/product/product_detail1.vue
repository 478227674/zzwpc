<template>
  <div class="hello" style="background: #f5f5f5">
    <div class="pc-center-padding pc-center">
      <div class="product-d-img">
        <slider :options="sliderinit1" :sliderinit="sliderinit1">
          <slideritem  v-for="(item,index) in imageList" :key="index">
            <div style="width:480px;height:320px;">
              <img style="width:100%;height:100%;" :src="item.attachment.fileUrl" alt="">
            </div>
          </slideritem>
          <!-- slot  -->
        </slider>
        <!--<img src="../../assets/img/test2.png" alt="">-->
      </div>
      <div class="product-d-d">
        <div class="produt-d-title">
          {{pobj.productName}}
        </div>
        <ul class="product-d-li">
          <li v-show="productDetail.isCoin==1">
            <div class="product-d-lt">课程优惠:</div>
            <div class="product-d-lr">
              本课程可使用元儒币抵扣{{productDetail.coinLimit/1000}}元
            </div>
          </li>
          <li>
            <div class="product-d-lt ">班&emsp;&emsp;制:</div>
            <div class="product-d-lr guige-box">
              <span @click="chooseThisGuige(item)" :class="{'guige-active':item.ruleId==guigeObj.ruleId}" v-for="item in pobj.rules">{{item.className}}</span>
              <!--<span>大班(20人)</span>-->
            </div>
          </li>
          <li>
            <div class="product-d-lt ">上课时段:</div>
            <div class="product-d-lr guige-box">
              <span class="guige-active">{{guigeObj.createTime}}至{{guigeObj.endTime}}</span>
            </div>
          </li>
          <li>
            <div class="product-d-lt">上课方式:</div>
            <div class="product-d-lr guige-box">
              <span class="guige-active">{{guigeObj.teachName}}</span>
            </div>
          </li>
          <li>
            <div class="product-d-lt">课程课时:</div>
            <div class="product-d-lr guige-box">
                <span class="guige-active">{{guigeObj.classTime}}课时(45分/课时)</span>
            </div>
          </li>
          <li>
            <div class="product-d-lt">价&emsp;&emsp;格:</div>
            <div class="product-d-lr">
              <div class="product-d-price">
                ￥<span>{{guigeObj.productPrice}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="organ-btns">
          <div class="test-linten" @click="buyNow">立即报名</div>
          <div class="share-money" @click="collectThisProduct ">收藏课程</div>
          <span class="sharegeticon" @click="getQrcode">
            精品特价
            <div id="qrcode" class="qrcode"></div>
          </span>
        </div>
      </div>
    </div>
    <div class="pc-center-padding pc-center">
      <img src="../../assets/img/dddbanner.png" style="width: 100%;cursor:pointer;" @click="openActiveList" alt="">
<!--      <div class="special-text"><span class="active-name">特别提醒：</span> 所有课程在线支付完成后去对应机构索要收据或发票！本网与各个机构真实合作，所购买课程绝对真实可靠，如有问题可按规定退款。</div>-->
    </div>
    <div  class=" pc-center" style="margin-top: 20px">
      <div class="organ-allbox" >
        <div class="organ-left">
          <el-tabs v-model="activeName">
            <el-tab-pane label="课程详情" name="first">
              <div style="padding-top: 20px" v-html="pobj.productDesc">
              </div>
            </el-tab-pane>
            <el-tab-pane label="课程目录" name="second">
              <div class="subjects-btn">
                <span @click="getStageListBySubjectId(item.subjectId)" :class="{'active-btns':subjectId==item.subjectId}" v-for="item in subjectList">{{item.subjectName}}</span>
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
                    </li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div style="width:400px;">
          <div class="pc-product-list-bot">
            <div class="special-class" style="border:none;">
              <span>热门课程</span>
            </div>
            <div class="hotclass-list">
              <div>
                <ul>
                  <li @click="openProductDetail(item)" class="product-item" v-for="item in hotClass">
                    <div class="product-img" :style="{backgroundImage: 'url(' + item.imageUrl + ')'}">
                      <!--<img :src="item.imageUrl" alt="">-->
                    </div>
                    <div class="product-detail">
                      <p class="class-title">{{item.productName}}</p>
                      <div class="class-tag">
                        <span>{{item.className}}</span>
                      </div>
                      <div class="activename">
                        <span v-show="item.isCut==1">邀请砍价</span>
                        <span v-show="item.isGroup==1">拼团优惠</span>
                        <span v-show="item.isCommission==1">邀请返佣</span>
                      </div>
                      <div class="class-num">
                        <div class="class-price">
                          <a href="javascript:;">￥</a>
                          <span>{{item.productPrice}}</span>
                          <div style="clear: both"></div>
                        </div>
                        <div class="class-person">
                          报名<span>{{item.purchaseNum}}</span>人
                        </div>
                        <div style="clear: both"></div>
                      </div>
                    </div>
                  </li>
                </ul>
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

</template>
<script>
  import tryvideos from "../../components/videos/tryvideos";

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
        pagenum:1,
        total:0,
        pagesize:5,
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
        pobj:{},
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
      tryvideos
    },
    created(){
      this.productId = this.$route.query.id;
      this.getProductDetai();
      this.$emit('header_two',true);
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
        this.$router.push('/pages/specail')
        return;
        if(!localStorage.getItem('diruserinfo')){
          this.$router.push('/pages/login');
          return;
        }
        var shareUrl = '';
        var user = JSON.parse(localStorage.getItem('diruserinfo'))
        shareUrl = config.wxUrl +  'product_detail.html?id=' + this.productId + '&inviteCode='+user.inviteCode + '&'
        if(document.getElementById('qrcode').innerHTML){
          document.getElementById('qrcode').innerHTML = "";
        }else{
          let qrcode = new QRCode('qrcode', {
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
        this.http.post('/dir/queryProductRecomList',{}).then(res=>{
          if(res.code == 0){
            this.hotClass = res.data;
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
</script>

<style scoped>
  .pc-center-padding{
    display: flex;
    justify-content: space-between;
  }
  .organ-left{
    width:740px;
  }

</style>
