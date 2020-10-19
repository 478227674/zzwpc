<template>
  <div class="hello" style="background: #f7f7f7;overflow:hidden;">
    <orghead></orghead>
    <div class="pc-center">
      <!--机构轮播图-->
      <div class="swiper-box-organindex">
        <div style="position: relative;">
          <div style="height: 248px;">
            <slider :options="sliderinit" :sliderinit="sliderinit">
              <slideritem v-for="(item,index) in bannerList" :key="index" @tap="openBannerDetail(item)">
                <img style="width: 100%;height: 345px" :src="item.imageUrl" alt="">
              </slideritem>
              <!-- slot  -->
            </slider>
          </div>
        </div>
      </div>
      <!--机构详情-->
      <div class="organ-index-get">
        <img :src="orgObj.logoUrl" alt="">
        <div class="organ-index-detail">
          <div class="organ-index-top" v-if="orgObj.userGrade">
            <span>{{orgObj.userGrade}}</span>
            <a>很好</a>
            <div>
              <a href="javascript:;">环境 {{orgObj.envGrade}}</a>
              <a href="javascript:;">师资 {{orgObj.effectGrade}}</a>
              <a href="javascript:;">效果 {{orgObj.facultyGrade}}</a>
              <a href="javascript:;">服务 {{orgObj.serviceGrade}}</a>
            </div>
          </div>
          <div class="organ-index-items">
            <span>
              机构简介:
            </span>
            <div>
              <div>
                {{orgObj.orgIntro}}
              </div>
<!--              <a href="javasrcipt:;">查看详情</a>-->
            </div>
          </div>
          <div class="organ-index-items">
            <span>
              全部校区:
            </span>
            <div>
              <div>
                <span style="color:#888" v-for="item in schoolList">{{item.schoolname}} </span>
              </div>
<!--              <a href="javasrcipt:;">查看详情</a>-->

            </div>
          </div>
          <div class="organ-index-items">
            <span>
              咨询热线:
            </span>
            <div>
              <div>
                {{orgObj.orgTelephone}}
              </div>
            </div>
          </div>
          <div class="organ-signup-btn">
            <div class="organ-free-btn" @click="openSignupc(0)">免费预约试听</div>
            <div class="organ-getprice-btn" @click="openSignupc(1)">免费电话</div>
          </div>

        </div>
      </div>
      <!--机构课程-->
      <div class="org-index-item-list">
        <div class="org-index-title">
          <span></span>
          课程
          <p  @click="openOrgTab('/pages/organ_product')">查看更多</p>
        </div>
        <div class="org-index-content">
          <div class="free-product-list">
            <div class="fpl-list" style="width: 100%;height:auto">
              <ul>
                <li class="time-c" @click="openProductDetail(item)" v-if="index<4" v-for="(item,index) in hotClass">
                  <div class="fpl-cover">
                    <img :src="item.imageUrl" alt="">
                  </div>
                  <div style="padding: 20px">
                    <div class="fpl-title">
                      {{item.productName}}
                    </div>
                    <span class="fpl-livetime"> {{item.productIntro}}</span>
                  </div>

                  <div class="fpl-price">
                    <div class="commise-fpl">
                      售价:￥{{item.productPrice}}
                    </div>
                    <span>{{item.purchaseNum}}人已报名</span>
                  </div>
                  <div class="share-can-get linear-gray-btn">
                    推广赚￥{{item.commissionRebate || 0}}
                  </div>
                </li>
                <li class="time-c" style="background: none"></li>
                <li class="time-c" style="background: none"></li>
                <li class="time-c" style="background: none"></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      <!--机构相册-->
      <div class="org-index-item-list" v-show="orgPics.length > 0">
        <div class="org-index-title">
          <span></span>
          机构相册
        </div>
        <div class="org-index-content">
          <div class="org-pics-list">
            <a v-for="item in orgPics" target="_blank" :href="item.attachment.fileUrl">
              <img :src="item.attachment.fileUrl" alt="">
            </a>
          </div>
        </div>
      </div>
      <!--机构校区-->
      <div class="org-index-item-list">
        <div class="org-index-title">
          <span></span>
          校区
          <p  @click="openOrgTab('/pages/organ_school')">查看更多</p>
        </div>
        <div class="org-index-content">
          <div class="org-index-school">
            <div class="org-schools-list">
              <ul>
                <li v-if="index < 3" :class="{'schools-address-active':item.lat == center.lat}" v-for="(item,index) in schoolList" @click="lookDetail(item)">
                  <span class="schools-index schools-address-icon-gray">{{index+1}}</span>
                  <div class="schools-address">
                    <p>{{item.schoolname}}</p>
                    <span>{{item.schooladdress}}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="org-schools-address">
              <baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:250px"
                         :scroll-wheel-zoom='true'>
                <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>

                <bm-marker-clusterer :averageCenter="true">
                  <bm-marker v-for="marker of schoolList" :key="marker.lat" :position="{lng: marker.lng, lat: marker.lat}"
                             @click="lookDetail(marker,index)"></bm-marker>
                </bm-marker-clusterer>

                <bm-info-window :position="{lng:center.lng, lat: center.lat}" :title="center.schoolname"
                                :show="center.show">
                  <p><span class="left">地址：</span><span class="right">{{center.schooladdress}}</span></p>
                </bm-info-window>
              </baidu-map>
              <!--            <mapa v-if="schoolList.length>0" :schoolList="schoolList"></mapa>-->
            </div>
          </div>
        </div>
      </div>
      <!--资讯-->
      <div class="org-index-item-list" v-show="orgNews.length > 0">
        <div class="org-index-title">
          <span></span>
          资讯
          <p  @click="openOrgTab('/pages/organ_news')">查看更多</p>
        </div>
        <div class="org-index-content">
          <div class="org-common">
            <div class="org-news-list">
              <div class="org-news-item" v-for="item in orgNews" @click="openNewsDestail(item)">
                <img src="" alt="">
                <div class="org-news-detail">
                  <p>{{item.title}}</p>
                  <div v-html="item.message">
                    近日，国内知名的教育行业第三方平台“教育宝”依据学员学习人数和真实评价，评选出教育机构“2018极赞口碑奖”，北京元真会计教育凭借实力和口碑斩获此项殊荣。
                  </div>
                  <span>{{item.createTime}}</span>
                </div>
              </div>
              <div style="display: none" class="org-news-item">
                <img src="" alt="">
                <div class="org-news-detail">
                  <p>这里是标题</p>
                  <div>
                    近日，国内知名的教育行业第三方平台“教育宝”依据学员学习人数和真实评价，评选出教育机构“2018极赞口碑奖”，北京元真会计教育凭借实力和口碑斩获此项殊荣。
                  </div>
                  <span>2018/12/20 11:51:59</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!--学员评论-->
      <div class="org-index-item-list">
        <div class="org-index-title">
          <span></span>
          学员评论
          <p @click="openOrgTab('/pages/organ_comment')">查看更多</p>
        </div>
        <div class="org-index-content">
            <ul class="comments-list">
              <li v-for="item in commentsList">
                <div class="comments-head">
                  <img src="../../assets/img/personhead.png" alt="">
                </div>
                <div class="comments-detail">
                  <div class="comments-p">
                    <p>{{item.userName}}</p>
                    <div class="comments-grade">
                      <div class="grade-box">
                        <el-rate
                          v-model="item.userGrade"
                          disabled
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate>
                      </div>
                      <!--                  <div class="grade-item-comments">-->
                      <!--                    <span>环境{{item.envGrade}}</span>-->
                      <!--                    <span>师资{{item.effectGrade}}</span>-->
                      <!--                    <span>效果{{item.facultyGrade}}</span>-->
                      <!--                    <span>服务{{item.serviceGrade}}</span>-->
                      <!--                  </div>-->
                      <div style="clear: both"></div>
                    </div>
                    <span style="margin-top: 15px;margin-left: 20px;color:#ffa200;font-weight: bold">{{item.userGrade}}</span>
                    <!--                <span style="margin-top: 15px;margin-left: 20px;">{{item.createTime}}</span>-->
                  </div>

                  <div class="comments-content">
                    {{item.userDesc}}
                  </div>
                  <div class="comments-imglist">
                    <img v-for="items in item.images" :src="items" alt="">
                  </div>
                </div>
              </li>
              <li style="display: none">
                <div class="comments-head">
                  <img src="../../assets/img/personhead.png" alt="">
                </div>
                <div class="comments-detail">
                  <div class="comments-p">
                    <p>打算的撒多</p>
                    <span>2220</span>
                  </div>
                  <div class="comments-grade">
                    <div class="grade-box">
                      <el-rate
                        disabled
                        text-color="#ff9900"
                        score-template="{4}">
                      </el-rate>
                    </div>
                    <div class="grade-item-comments">
                      <span>环境4</span>
                      <span>师资4</span>
                      <span>效果4</span>
                      <span>服务4</span>
                    </div>
                    <div class="learn-product">
                      学习课程：是萨达撒
                    </div>
                    <div style="clear: both"></div>
                  </div>
                  <div class="comments-content">
                    打算打算多
                  </div>
                  <div class="comments-imglist">
                  </div>
                </div>
              </li>
          </ul>
        </div>
      </div>
    </div>
    <partner ref="partner" v-show="partnerFlag"></partner>
    <signupc ref="signupc1" v-show="handlerFlag"></signupc>
  </div>
</template>
<script>
  import {slider, slideritem} from 'vue-concise-slider';
  import QRCode from "qrcodejs2"; //引入生成二维码插件
  import mapa from '../../components/map';
  import partner from '../../components/bepartner';
  import signupc from '../../components/signupc';
  import orghead from '../../components/orghead';
  import {mapActions} from "vuex";


  export default {
    name: 'HelloWorld',
    data() {
      return {
        handlerFlag:false,
        bannerList: [],
        partnerFlag: false,
        productList: [],
        schoolList: [],
        center: {},
        orgTbasIndex: 0,

        commentsList: [],


        orgId: null,
        orgObj: {},
        Bmap: undefined,
        hotClass: [],
        //滑动配置[obj]
        sliderinit: {
          currentPage: 0,//当前页码
          thresholdDistance: 500,//滑动判定距离
          thresholdTime: 100,//滑动判定时间
          autoplay: 3000,//自动滚动[ms]
          loop: true,//循环滚动
//        direction:'vertical',//方向设置，垂直滚动
          infinite: 1,//无限滚动前后遍历数
          slidesToScroll: 1,//每次滑动项数
          freeMode: true,
          observer: true,
          observeParents: true
        },
        orgPics:[], //机构相册
        orgNews:[],//机构资讯
      }
    },
    components: {
      mapa,
      partner,
      orghead,
      slider,
      slideritem,
      signupc
    },
    computed: {},
    created() {
      this.orgId = this.$route.query.orgId;
      if (this.orgId) {
        this.setOrgId(this.orgId);
      } else {
        this.orgId = this.$store.state.user.activeOrgId
      }
      this.$emit('header', false)
      // this.$emit('footer', false)
      this.getOrgInfo();
      this.getOrgNews();
      this.getOrgComments();
      this.getHotClass();
      this.getOrgBanner();
    },
    methods: {
      ...mapActions(['setOrgId']),
      //打开banner
      openBannerDetail(item){
        item.imageType = item.productType;
        this.openProductDetailByType(item)
      },
      //打开咨询详情
      openNewsDestail(data){
        this.openNewPage('/pages/organ_newsdetail',{id:data.id})
      },
      //打开包名通道
      openSignupc(t){
        if(t == 1){
          alert(this.orgObj.orgTelephone)
          return;
        }

        this.handlerFlag = true;
        this.$refs.signupc1.$emit('partner', {orgId: this.orgObj.id,orgCampus:this.orgObj.orgCampus ? JSON.parse(this.orgObj.orgCampus) : [],t:t}) // 方法1:触发监听事件

      },
      //机构资讯
      getOrgNews(){
        this.http.post('/dir/queryDirOrgMessage', {
          orgId: this.orgId,
          pageNum: 1,
          pageSize: 4
        }).then(res => {
          if (res.code == 0) {
            for(var i=0;i<res.data.list.length;i++){
              res.data.list[i].createTime = this.formatTimeToDay(res.data.list[i].createTime)
            }
            this.orgNews = res.data.list;
          }
        })
      },
      //申请成为合伙人
      bePartner() {
        this.partnerFlag = true;
        this.$refs.partner.$emit('partner', {orgId: this.orgId}) // 方法1:触发监听事件
      },
      //获取机构热门课程
      getHotClass() {
        this.http.post('/dir/queryDirProductRecomByOrgId', {orgId: this.orgId, pageSize: 4, pageNum: 1}).then(res => {
          if (res.code == 0) {
            this.hotClass = res.data.list;
          }
        })
      },
      //获取轮播图
      getOrgBanner(){
        this.http.post('/dir/queryOrgImageList', {orgId: this.orgId}).then(ret => {
          if (ret.code == 0) {
            this.bannerList = ret.data;
          }
        })
      },
      //百度地图
      handler({BMap, map}) {
        var _this = this;
        this.Bmap = map;
      },
      lookDetail(data) {
        this.center = data;
        this.center.show = true;
        this.setBaiduMapPoint(data.lng, data.lat)
      },
      //地图中心点显示
      setBaiduMapPoint(lng, lat) {
        var point = new BMap.Point(lng, lat)
        this.Bmap.centerAndZoom(point, 13)
        var marker = new BMap.Marker(point) // 创建标注
        this.Bmap.addOverlay(marker) // 将标注添加到地图中
        var circle = new BMap.Circle(point, 6, {
          strokeColor: 'Red',
          strokeWeight: 6,
          strokeOpacity: 1,
          Color: 'Red',
          fillColor: '#f03'
        })
        this.Bmap.addOverlay(circle)
      },
      //切换tab
      openChooseTabs(index) {
        this.orgTbasIndex = index;
      },
      //获取评论
      getOrgComments() {
        this.http.post('/dir/queryOrgEvaluation', {
          orgId: this.orgId,
          pageNum: this.comPage,
          pageSize: 10
        }).then(res => {
          if (res.code == 0) {
            for (var i = 0; i < res.data.list.length; i++) {
              res.data.list[i].createTime = this.formatTimeToDay(res.data.list[i].createTime)
            }
            this.commentsList = res.data.list;
            this.comTotal = res.data.total;
          }
        })
      },
      //收藏或取消收藏
      collectionOrg(type) {
        if (type) {
          this.http.post('/dir/saveDirUserCollection', {orgId: this.orgId}).then(res => {
            if (res.code == 0) {
              this.stoast('已收藏')
              this.orgObj.isCollection = true;
            }
          })
        } else {
          this.http.post('/dir/deleteDirUserCollection', {orgId: this.orgId}).then(res => {
            if (res.code == 0) {
              this.stoast('已取消收藏')
              this.orgObj.isCollection = false;
            }
          })
        }

      },
      //获取机构详情
      getOrgInfo() {
        this.http.post('/dir/queryOrgInfo', {orgId: this.orgId}).then(res => {
          if (res.code == 0) {
            this.orgObj = res.data;
            this.schoolList = JSON.parse(res.data.orgCampus)
            this.orgPics = res.data.imageList || [];
            if (this.schoolList.length > 0) {
              for (var i = 0; i < this.schoolList.length; i++) {
                this.schoolList[i].show = false;
              }
            }
            //地图初始化
            if (this.schoolList.length > 0) {
              this.setBaiduMapPoint(this.schoolList[0].lng, this.schoolList[0].lat)
            }


          }
        })
      },
      //打开课程详情
      openProductDetail(data) {
        this.openProductDetailByType(data)
      },
      //打开一个栏目
      openOrgTab(path){
        this.$router.push(path)
      },
    },
    watch: {
      // '$route'(){
      //   if(this.$route.query.type){
      //     this.productType = this.$route.query.type;
      //   }else{
      //     this.productType = null;
      //   }
      //   this.getOrgInfo();
      //   this.getProductListByType();
      //   this.initPageData();
      // }
    }
  }
  import '../../assets/css/common.css';
  import '../../assets/css/list.css';
  import '../../assets/css/style.css'
  import '../../assets/css/index.css'
  import '../../assets/css/product.css'
  import '../../assets/css/organ.css'
  import config from "../../config";
</script>
<style scoped>

  .org-news-list,.comments-list li{
    padding: 0px;
  }
  .org-common{
    padding: 0px;
    width: 100%;
  }
  .org-news-detail{
    width: 875px;
  }
</style>
