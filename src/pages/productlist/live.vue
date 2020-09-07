<template>
  <div class="hello" style="background: #f7f7f7;overflow:hidden;">
    <div class="page-box-top">
      <img src="../../assets/img/product/livebg.png" alt="">
      <div class="page-top">
        <div class="pc-center">
          <span>在线直播</span>
          <div>
            <p>在线直播</p>
            <a href="javascript:;">邀请好友一起，共享超高优惠</a>
          </div>
        </div>
      </div>
    </div>

    <div class="pc-center">
      <div style="font-size: 25px;color:#333;font-weight: bold;line-height: 80px;">今日直播</div>
      <div class="live-list-box" style="margin-top: 0px;">
        <div class="live-cover">
          <div>
            <img class="live-cover-v" :src="activeLive.imageUrl" alt="">
            <div class="live-detail-v">
                    <span>
                      {{activeLive.productName}}
                    </span>
              <div>
                {{activeLive.purchaseNum}}
              </div>
            </div>
          </div>
        </div>
        <div class="live-list">
          <ul>
            <li @click="openProductDetail(item)" :class="{'active-live':item.productId == activeLive.productId}" @mouseover="mouseOver(item)" v-for="item in liveList">
              <div>
                <span></span>
                <div class="live-type" v-if="item.isLiveing == 1">直播中</div>
                <div class="live-type" v-if="item.isLiveing == 2">准备中</div>
                <div class="live-type" v-if="item.isLiveing == 3">录播</div>
                <img class="live-img" :src="item.imageUrl" alt="">
                <div class="live-detail-text">
                  <p>{{item.productVideo.startTimeStr}} （{{item.purchaseNum}}人已报名）</p>
                  <p>{{item.productName}}</p>
                </div>
              </div>
            </li>
            <li style="display: none" class="active-live">
              <div>
                <span></span>
                <div class="live-type">录播</div>
                <img class="live-img" src="../../assets/img/videotbg.png" alt="">
                <div class="live-detail-text">
                  <p>13:00-14:00 张文斌</p>
                  <p>北大MBA提前面试材料如何准备</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>

    <div class="psubjectlist">
      <div class="pc-center" style="display: flex;justify-content: flex-start">
        <div style="width: 80%;">
          <div class="pc-center" style="border-bottom: 1px solid #c9c9c9;">
            <ul>
              <li @click="chooseThisSort(null)" :class="{'active-level':!subId}">全部</li>
              <li @click="chooseThisSort(item)" :class="{'active-level':sortId == item.id}" v-for="item in sortList">{{item.name}}</li>
            </ul>
          </div>

          <div class="pc-center" style="border-bottom: 1px solid #c9c9c9;">
            <ul>
              <li @click="chooseThisSub(null)" :class="{'active-level':!subId}">全部</li>
              <li @click="chooseThisSub(item)" :class="{'active-level':subId == item.subjectId}" v-for="item in subjectList">{{item.subjectName}}</li>
            </ul>
          </div>
          <div class="pc-center">
            <ul >
              <li @click="choosePrice(null)" :class="{'active-level' : !rangeId}">全部</li>
              <li @click="choosePrice(item)" v-for="item in priceList">
                <span :class="{'active-level' : rangeId == item.rangeId}" v-if="item.startPrice>0">{{item.startPrice}} - {{item.endPrice}}</span>
                <span :class="{'active-level' : rangeId == item.rangeId}" v-if="item.startPrice==0">免费</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>

    <div class="pc-center">
      <div class="free-product-list">
        <div class="fpl-list">
          <ul>
            <li v-for="item in livePageList"  @click="openProductDetail(item)">
              <div class="fpl-cover">
                <img :src="item.imageUrl" alt="">
              </div>
              <div style="padding: 14px 15px 13px 15px">
                <div class="fpl-title">
                  {{item.productName}}
                </div>
                <span class="fpl-livetime">{{item.productIntro}}</span>
              </div>
              <div class="fpl-price">
                <div class="commise-fpl">
                  ￥{{item.productPrice}}
                </div>
                <span>{{item.purchaseNum}}人已报名</span>
              </div>
            </li>
            <li style="display: none" >
              <div class="fpl-cover">
                <img src="../../assets/img/videotbg.png" alt="">
              </div>
              <div style="padding: 14px 15px 13px 15px">
                <div class="fpl-title">
                  2021中财财经大学MBA项目宣2021中财财经大学MBA项目宣......
                </div>
                <span class="fpl-livetime"> 直播时间：4月16日 19:30-20:30</span>
              </div>

              <div class="fpl-price">
                <p>免费</p>
                <span>15456人已报名</span>
              </div>
            </li>
            <li style="visibility: hidden;height:0px;"></li>
            <li style="visibility: hidden;height:0px;"></li>
          </ul>
        </div>
      </div>
      <div class="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div style="height: 50px;"></div>

  </div>
</template>

<script>
  import QRCode from "qrcodejs2"; //引入生成二维码插件
  import config from '../../config'

  // require styles
  export default {
    name: 'HelloWorld',
    data () {
      return {
        videoFlag:false,
        livePageList:[],
        total:0,
        pagenum:1,
        pagesize:12,
        jingpinList:[],
        orgAreaId:null,
        productType:0,
        subjectList:[],
        subId:null,
        priceList:[],
        rangeId:null,
        liveList:[],
        activeLive:{},


        sortId:null,
        sortList:[],
      }
    },
    components: {
    },
    created(){
      this.getProductListByType();
      this.initPageData();
    },
    methods:{
      //选择项目
      chooseThisSort(data){
        this.sortId =  data ? data.id : null;
        this.getSubjectBySortId();
      },
      mouseOver(data){
        this.activeLive = data;
      },
      //选择科目
      chooseThisSub(data){
        this.subId = data ? data.subjectId : null;
        this.pagenum = 1;
        this.getProductListByType();
      },
      getSubjectBySortId(){
        this.http.post('/al/querySubjectList',{sortId:this.sortId}).then(ret=>{
          if(ret.code == 0){
            this.subjectList = ret.data;
          }
        })
      },

      //初始化页面数据
      initPageData(){
        this.http.post('/product/getProductSortListByLevel',{level:3}).then(res=>{
          if(res.code == 0){
            this.sortList = res.data;
            this.sortId = res.data[0].id;
            this.getSubjectBySortId();
          }
        });
        this.http.post('/product/queryProductRange',{}).then(res=>{
          if(res.code == 0){
            this.priceList = res.data;
          }
        })
        //直播列表
        this.http.post('/product/getHomeProductLiveList',{}).then(res=>{
          if(res.code == 0){
            let nowTime = new Date().getTime();
            for(var i=0;i<res.data.length;i++){
              //isLiveing  1直播中 2准备中 3录播
              if(nowTime > res.data[i].productVideo.startTime && nowTime < res.data[i].productVideo.endTime){
                res.data[i].isLiveing = 1;
              }else if(nowTime < res.data[i].productVideo.startTime){
                res.data[i].isLiveing = 2;
              }else{
                res.data[i].isLiveing = 3;
              }
              res.data[i].productVideo.startTimeStr = this.formatTimeToDateAndHour(res.data[i].productVideo.startTime)
            }
            this.liveList = res.data;
            if(res.data[0]){
              this.activeLive = res.data[0];
            }
          }
        });
      },
      //选择价格
      choosePrice(data){
        this.rangeId = data ? data.rangeId : null;
        this.startPrice = data ? data.startPrice : null;
        this.endPrice = data ? data.endPrice : null;
        this.pagenum = 1;
        this.getProductListByType();
      },
      //打开详情
      openProductDetail(data){
        this.openProductDetailByType(data)
      },
      getProductByOneId(){ //项目下所有科目
        this.pagenum = 1;
        this.productList = [];
        this.subjectId = null;
        this.getProductListByType()
      },
      //筛选课程列表
      getProductListByType(){
        this.firstType = null;
        var obj = {
          pagenum:this.pagenum,
          pagesize:this.pagesize,
          startPrice:this.startPrice,
          endPrice:this.endPrice,
          sortId:this.sortId,
          subjectId:this.subId,
        };

        this.http.post('/product/getProductLiveList',obj).then(res=>{
          if(res.code == 0){
            this.livePageList = res.data.list;
            this.total = res.data.total
            if(res.data.list.length == 0 && this.pagenum == 1){
              this.toast('暂时没有查到更多数据')
              this.livePageList = []
            }
          }
        })
      },
      //获取所有分类
      getTypeList(){
        var obj = {};
        this.http.post('/product/queryProductSort',obj).then(res=>{
          if(res.code == 0){
            this.typeList = res.data;
          }
        })
      },
      //切换页码
      handleCurrentChange(val){
        this.pagenum = val;
        this.getProductListByType();
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/index.css';
  import {slider, slideritem} from "vue-concise-slider";
</script>
<style scoped>

</style>
