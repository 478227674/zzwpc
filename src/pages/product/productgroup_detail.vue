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
      <div class="pro-detail-top">
        <div class="product-d-img">
          <slider :options="sliderinit1" :sliderinit="sliderinit1">
            <slideritem v-for="(item,index) in imageList" :key="index">
              <div style="width:480px;height:320px;">
                <img style="width:100%;height:100%;" :src="item.attachment.fileUrl" alt="">
              </div>
            </slideritem>
            <!-- slot  -->
          </slider>

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
                <span class="guige-active">{{pobj.className}}</span>
              </div>
            </li>
            <li>
              <div class="product-d-lt">开课时间:</div>
              <div class="product-d-lr guige-box">
                <span class="guige-active">{{pobj.startTime}}至{{pobj.endTime}}</span>
              </div>
            </li>
            <li>
              <div class="product-d-lt">上课方式:</div>
              <div class="product-d-lr guige-box">
                <span class="guige-active">{{pobj.teachName}}</span>
              </div>
            </li>
            <li>
              <div class="product-d-lt">课程课时:</div>
              <div class="product-d-lr guige-box">
                <span class="guige-active">{{pobj.classTime}}课时(45分/课时)</span>
              </div>
            </li>
          </ul>
          <!--单独拼团-->
          <div class="groups-box" v-show="productDetail.isGroup==1 && productDetail.isCut==0">
            <ul>
              <li v-for="item in groupsArr" :class="{'groups-active':item.groupId == groupId}"
                  @click="chooseThisGroup(item)">
                <span>{{item.groupSumNum}}人团</span>
                <div>￥{{item.groupPrice}} <s>￥{{pobj.productPrice}}</s></div>
                <p>{{item.d}}天{{item.h}}小时{{item.m}}分{{item.s}}秒</p>
                <a href="javascript:;">已拼团{{item.groupNum}}人</a>
              </li>
            </ul>
          </div>

          <div class="organ-btns">
            <div class="test-linten" @click="buyNow" v-show="productDetail.isCut==0">拼团报名</div>
            <div class="test-linten" @click="buyNowByAllPrice">原价报名</div>
          </div>
          <!--左上角图标-->
          <div class="pro-handler">
            <div>
              <img  @click="getQrcode" src="../../assets/img/shareicon.png" alt="">
              <div id="qrcodepro">
              </div>
            </div>
            <div>
              <img @click="collectThisProduct" src="../../assets/img/zzw/collectpro.png" alt="">
            </div>
          </div>
        </div>
      </div>
<!--      <div class="product-ps">-->
<!--        <span>!</span>提供服务： 免费问答、资料下载、学习进度追踪、课程免费一年等-->
<!--      </div>-->
      <div class="pro-detail-bottom">
        <div class="product-allbox">
          <div class="product-detail-left">
            <el-tabs v-model="activeName">
              <el-tab-pane label="课程详情" name="first">
                <div style="padding-top: 20px" v-html="pobj.productDesc">
                </div>
              </el-tab-pane>
              <el-tab-pane label="课程目录" name="second">
                <div class="subjects-btn">
                  <span @click="getStageListBySubjectId(item.subjectId)"
                        :class="{'active-btns':subjectId==item.subjectId}" v-for="item in subjectList">{{item.subjectName}}</span>
                </div>
                <div class="class-list">
                  <div v-for="(item,index) in stageList">
                    <div class="stagelist" @click="getVideosListByStageId(item.stageId,index)">
                        <span>
                            {{item.stageName}}
                        </span>
                      <img :class="{'open-active':stageId==item.stageId&&item.flag}" src="../../assets/img/right.png"
                           alt="">
                    </div>
                    <ul v-show="stageActiveIndex == index && item.flag">
                      <li v-for="(item,index) in videos">
                        <div>
                          {{index+1}}.{{item.videoName}}
                        </div>
                        <span v-show="item.isTry==1" @click="tryThisVideo(item)">
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
              <div class="product-store">
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
                <div @click="openProductDetail(item)" v-for="item in hotClass" class="hot-class-detail">
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
    </div>

    <tryvideos ref="seevideos" :visible.sync="videoFlag"></tryvideos>
  </div>

</template>
<script>
  import QRCode from "qrcodejs2"; //引入生成二维码插件
  import config from "../../config"; //引入生成二维码插件
  import tryvideos from "../../components/videos/tryvideos";
  import orghead from "../../components/orghead";


  import {slider, slideritem} from 'vue-concise-slider'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        activeName: 'first',
        playerOptions: {
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

        isMask: false,
        pagenum: 1,
        total: 0,
        pagesize: 5,
        hotClass: [],
        value5: 5,

        sliderinit1: {
          currentPage: 0,//当前页码
          thresholdDistance: 500,//滑动判定距离
          thresholdTime: 100,//滑动判定时间
          autoplay: 3000,//自动滚动[ms]
          loop: true,//循环滚动
//        direction:'vertical',//方向设置，垂直滚动
          infinite: 1,//无限滚动前后遍历数
          slidesToScroll: 1,//每次滑动项数
        },
        imageList: [],
        productId: null,
        orgId: null,
        pobj: {
          orgInfo:{}
        },
        productDetail: {},
        guigeObj: {},
        groupsArr: [],
        groupId: null,


        videos: [],
        subjectId: null, //查看的当前学科ID
        subjectList: [],//学科列表
        stageId: null,//查看的当前阶段ID
        stageList: [],//阶段列表
        stageActiveIndex: null,
        shareUrl: '',
        videoFlag: false,
      }
    },
    components: {
      slider,
      slideritem,
      tryvideos,
      orghead
    },
    created() {
      this.productId = this.$route.query.id;
      this.getProductDetai();
      this.$emit('header', false);
    },
    methods: {
      openOrgDetail(data){
        this.openNewPage('/pages/orgdetail',{orgId:this.orgId})
      },
      //试听课程
      tryThisVideo(data) {
        this.$refs.seevideos.$emit('seeVideosByComments', data)
      },

      //根据阶段ID查看课时列表
      getVideosListByStageId(stageId, index) {
        this.stageList[index].flag = !this.stageList[index].flag;
        if (!this.stageList[index].flag) {
          return;
        }
        this.stageId = stageId;
        this.stageActiveIndex = index;
        this.http.post('/dir/getProductVideoList', {
          stageId: stageId,
          productId: this.productId,
          productType: 4,
          subjectId: this.subjectId
        }).then(res => {
          if (res.code == 0) {
            this.videos = res.data;
          }
        })
      },
      //根据学科ID查询阶段列表
      getStageListBySubjectId(subjectId) {
        this.subjectId = subjectId;
        this.stageList = [];
        this.videos = [];
        this.http.post('/dir/getProductStageList', {
          productId: this.productId,
          productType: 4,
          subjectId: this.subjectId
        }).then(res => {
          if (res.code == 0) {
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].flag = false;
            }
            this.stageList = res.data;
          }
        })
      },
      getQrcode() {
        if (!localStorage.getItem('diruserinfo')) {
          this.$router.push('/pages/login');
          return;
        }
        var user = JSON.parse(localStorage.getItem('diruserinfo'))
        this.shareUrl = config.wxUrl + 'productgroup_detail.html?id=' + this.productId + '&uid=' + user.userId;
        if(document.getElementById('qrcodepro').innerHTML){
          document.getElementById('qrcodepro').innerHTML = "";
        }else{
          let qrcode = new QRCode('qrcodepro', {
            width:'100',
            height: '100',
            text:this.shareUrl, // 二维码地址
            colorDark : "#000",
            colorLight : "#FFF",
          })
        }

      },
      copyUrl() {
        var oInput = document.createElement('input');
        oInput.value = this.shareUrl;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        this.stoast('复制成功');
      },
      getProductDetai() {
        this.http.post('/dir/queryProductActivityInfo', {productAid: this.productId}).then(res => {
          if (res.code == 0) {
            this.imageList = res.data.imageList;
            this.productDetail = res.data.productDetail;
            this.pobj = res.data;
            this.guigeObj = res.data.rule;
            var endObj = this.MillisecondToDate(this.pobj.endTime)
            this.pobj.d = endObj.d;
            this.pobj.h = endObj.h;
            this.pobj.m = endObj.m;
            this.pobj.s = endObj.s;
            this.productDetail.endObj = endObj;
            this.pobj.startTime = this.formatTimeToDate(this.pobj.startTime)
            this.pobj.endTime = this.formatTimeToDate(this.pobj.endTime);
            var arr = Object.assign([], res.data.groups);

            if (res.data.productDetail.isGroup == 1) {
              for (var i = 0; i < arr.length; i++) {
                var obj = this.MillisecondToDate(arr[i].groupEndTime)
                arr[i].d = obj.d || '0';
                arr[i].h = obj.h || '0';
                arr[i].m = obj.m || '0';
                arr[i].s = obj.s || '0';
              }
              this.groupsArr = arr;
            }
            this.orgId = res.data.orgId;
            this.getHotClass();


            this.http.post('/dir/querySubjectListByProduct', {productId: this.productId, productType: 4}).then(res => {
              if (res.code == 0) {
                this.subjectList = res.data;
                this.subjectId = res.data[0].subjectId;
                this.getStageListBySubjectId(this.subjectId)
              }
            })
          }
        })
      },
      chooseThisGroup(data) {
        this.groupId = data.groupId
      },
      //收藏产品
      collectThisProduct() {
        this.collectProduct(this.productId, 4)
      },
      //获取热门课程
      getHotClass() {
        this.http.post('/dir/queryDirProductRecomByOrgId', {orgId: this.orgId, pageSize: 3, pageNum: 1}).then(res => {
          if (res.code == 0) {
            this.hotClass = res.data.list;
          }
        })
      },
      //打开产品详情页
      openProductDetail(data) {
        this.openProductDetailByType(data)
      },
      collectThisProduct() {
        this.collectProduct(this.productId, 4)

      },
      //立即报名
      buyNow() {
        if (!this.groupId) {
          this.toast('请选择拼团规格')
          return
        }
        this.http.post('/order/createCutGroupOrder', {productAid: this.productId, groupId: this.groupId}).then(res => {
          if (res.code == 0) {
            this.$router.push({path: '/pages/orderdetail', query: {id: res.data.orderId}})
          } else if (res.code == 4) {
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
      buyNowByAllPrice() {
        this.http.post('/order/createOriginalOrder', {productAid: this.productId}).then(res => {
          if (res.code == 0) {
            this.$router.push({path: '/pages/orderpay', query: {id: res.data.orderId}})
          } else if (res.code == 4) {
            this.toast('订单已存在')
            setTimeout(() => {
              this.$router.push('/pages/mainclass')
            }, 1500)
          }

        })

      },
      chooseThisGuige(data) {
        this.guigeObj = data;
        this.guigeObj.createTime = this.formatTimeToDate(this.guigeObj.createTime)
        this.guigeObj.endTime = this.formatTimeToDate(this.guigeObj.endTime)
      },
      openIndex() {
        this.$router.push('/')
      },
    },
    watch: {
      videoFlag(val, oval) {
        if (!val) {
          this.videoUrl = ''
          this.playerOptions.sources[0].src = ''

        }
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
  import '../../assets/css/organ.css';
</script>


<style scoped>
  .pc-center-padding {
    display: flex;
    justify-content: space-between;
  }

  .groups-active {
    background: url("../../assets/img/choosed.png") no-repeat right bottom;
    background-size: 16px 16px;
    border: 1px solid #f7260a !important;
  }

  .groups-box ul li a {
    text-decoration: none;
    color: #666;
    font-size: 12px;
  }

  .groups-box ul li p {
    color: #ff9100;
    padding-left: 24px;
    font-size: 12px;
    background: url("../../assets/img/grouptimeicon.png") no-repeat left 15px;
    background-size: 16px 16px;
  }

  .groups-box ul li div {
    font-size: 20px;
    font-weight: bold;
    color: #f7260a;
  }

  .groups-box ul li div s {
    font-size: 12px;
  }

  .groups-box ul li span {
    font-size: 18px;
    color: #f7260a;
  }

  .groups-box ul li {
    cursor: pointer;
    margin-top: 10px;
    line-height: 50px;
    width: 580px;
    padding: 0px 40px 0px 20px;
    border: 1px solid #ddd;
    height: 50px;
    display: flex;
    justify-content: space-between;
  }

</style>
