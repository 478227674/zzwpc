<template>
  <div class="hello" style="background: #f7f7f7;overflow:hidden;">
    <div class="page-box-top">
      <img src="../../assets/img/product/putongbg.png" alt="">
      <div class="page-top">
        <div class="pc-center">
          <span>知识讲授</span>
          <div>
            <p>知识讲授</p>
            <div style="display: flex;justify-content: flex-start;flex-wrap: wrap;margin-left: 10px;">
              <a style="width: 40%;display: block;line-height: normal !important;"  v-for="item in sortTestTime" href="javascript:;">
                距{{item.name}}考试时间还有
                <span class="sytime" v-if="item.textDays>0">{{item.textTime[0] + item.textTime[1] + item.textTime[2]}}</span>
                <span class="sytime" v-if="item.textDays<0">0</span>
                天
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    <div class="psubjectlist" style="">-->
    <!--      <div class="pc-center" style="border-bottom: 1px solid #c9c9c9;">-->
    <!--        <ul>-->
    <!--          <li @click="chooseThisSub(null)" :class="{'active-level':!subId}">全部</li>-->
    <!--          <li @click="chooseThisSub(item)" :class="{'active-level':subId == item.subjectId}" v-for="item in subjectList">{{item.subjectName}}</li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--      <div class="pc-center">-->
    <!--        <ul >-->
    <!--          <li @click="choosePrice(null)" :class="{'active-level' : !rangeId}">全部</li>-->
    <!--          <li @click="choosePrice(item)" v-for="item in priceList">-->
    <!--            <span :class="{'active-level' : rangeId == item.rangeId}" v-if="item.startPrice>0">{{item.startPrice}} - {{item.endPrice}}</span>-->
    <!--            <span :class="{'active-level' : rangeId == item.rangeId}" v-if="item.startPrice==0">免费</span>-->
    <!--          </li>-->
    <!--        </ul>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="pc-center">
      <div class="product-list-type1" style="margin-top: 20px;">
        <ul>
          <li v-for="item in knowledgeList" @click="openProductDetail(item)">
            <div class="product-list-type1-cover">

              <img class="plt-cover" :src="item.imageUrl" alt="">
            </div>
            <div class="product-list-type1-detail">
              <h3>{{item.productName}}</h3>
              <div class="plt-intro">
                <span class="plt-intro-text">{{item.productIntro}}</span>
                <span>共{{item.classTime}}节</span>
                <span>{{item.purchaseNum}}人已购买</span>
              </div>
              <div class="free-videos">
                <div v-for="items in item.productVideos" @click.stop="tryThisVideo(items)">
                  <span>免费</span>
                  <div>{{items.videoName}}</div>
                </div>
                <div style="display: none">
                  <span>免费</span>
                  <div>复试总论及经验分享</div>
                </div>
              </div>
              <div class="product-list-type1-pa">
                <div class="plt-activetype">
                  <span v-if="item.isGroup == 1">拼团课程</span>
                  <span v-if="item.isCut == 1">邀请砍价</span>
                  <span v-for="vipitem in item.memberLevels">{{vipitem.memberName}}免费</span>
                </div>
                <div class="plt-price">
                  <span v-if="item.isGroup == 1">
                    ￥{{item.minGroupPrice}}
                  </span>
                  <span v-if="item.isCut==0 && item.isGroup == 0">
                      ￥{{item.productPrice}}
                    </span>
                  <s  v-if="item.isCut==1 || item.isGroup == 1">原价：{{item.productPrice}}</s>
                </div>
              </div>
            </div>
          </li>
          <li style="display: none">
            <div class="product-list-type1-cover">

              <img class="plt-cover" src="../../assets/img/videotbg.png" alt="">
            </div>
            <div class="product-list-type1-detail">
              <h3>MBA/MPA/MACC复试通过训练营</h3>
              <div class="plt-intro">
                <span class="plt-intro-text">涵盖所有考点、一站式搞定复试问题</span>
                <span>共35节</span>
                <span>545人已购买</span>
              </div>
              <div class="free-videos">
                <div>
                  <span>免费</span>
                  <div>复试总论及经验分享</div>
                </div>
                <div>
                  <span>免费</span>
                  <div>复试总论及经验分享</div>
                </div>
                <div>
                  <span>免费</span>
                  <div>复试总论及经验分享</div>
                </div>
              </div>
              <div class="product-list-type1-pa">
                <div class="plt-activetype">
                  <span>拼团课程</span>
                  <span>拼团课程</span>
                </div>
                <div class="plt-price">
                    <span>
                      ￥359
                    </span>
                  <s>原价：686.00</s>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div style="height: 50px;"></div>
    <tryvideos ref="seevideos" :visible.sync="videoFlag"></tryvideos>

  </div>
</template>

<script>
  import QRCode from "qrcodejs2"; //引入生成二维码插件
  import config from '../../config'
  import tryvideos from "../../components/videos/tryvideos";

  // require styles
  export default {
    name: 'HelloWorld',
    data () {
      return {
        videoFlag:false,
        knowledgeList:[],
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
        timerText:'',
        sortTestTime:{},
      }
    },
    components: {
      tryvideos
    },
    created(){
      this.getProductListByType();
      this.getTimerText();
      this.sortTestTime = JSON.parse(localStorage.getItem('timer'));
    },
    methods:{
      getTimerText(){
        let date = new Date();
        let nowTime = date.getTime();
        let month = date.getMonth();
        let day = date.getDate();
        let days;
        if(month==11 && day == 21){ //判断是否是当天
          this.timerText = '000';
        }else if(month == 11 && day>21){ //是否已经过了12月21号了
          let endTime = Date.parse((new Date(date.getFullYear()+1)+'-12-21 00:00:00')) //获取到第二年的12月21号
          days = Math.floor((endTime-nowTime)/86400000);
        }else{
          let endTime = Date.parse(new Date(date.getFullYear()+'-12-21 00:00:00')) //获取到第二年的12月21号
          days = Math.floor((endTime-nowTime)/86400000);
        }


        if(days < 10){
          this.timerText = '00'+days;
          return;
        }else if(days < 100){
          this.timerText = '0'+days;
        }else{
          this.timerText = days.toString().split("");
        }
      },
      //试听课程
      tryThisVideo(data){
        this.$refs.seevideos.$emit('seeVideosByComments',data)
      },
      //选择科目
      chooseThisSub(data){
        this.subId = data ? data.subjectId : null;
        this.pagenum = 1;
        this.getProductListByType();
      },
      //初始化页面数据
      initPageData(){
        this.http.post('/product/getProductSortListByLevel',{level:3}).then(res=>{
          if(res.code == 0){
            // this.sortList = res.data;
            this.http.post('/al/querySubjectList',{sortId:res.data[0].id}).then(ret=>{
              if(ret.code == 0){
                this.subjectList = ret.data;
              }
            })
          }
        });
        this.http.post('/product/queryProductRange',{}).then(res=>{
          if(res.code == 0){
            this.priceList = res.data;
          }
        })
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

        this.http.post('/product/getHomeProductIsTryListNew',obj).then(res=>{
          if(res.code == 0){
            this.knowledgeList = res.data;
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
  .page-top a{
    margin-left: 0px;
  }
  .fpl-price p{
    font-size: 14px;
  }
  .fpl-price span{
    font-size: 12px;
  }
  .fpl-price{
    line-height:45px;
  }
  .fpl-cover{
    height: 180px;
  }
  .fpl-list ul li{
    width: 260px;
    height: 300px;
  }

  .fpl-list{
    width: 100%;
    height: auto;
  }

  .psubjectlist{
    width: 100%;
    background: #fff;
    box-shadow: 0px 1px 15px #999;
  }
  .page-top p{
    text-shadow: 0px 0px 20px #ff2d3c;
  }
  .psubjectlist ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .psubjectlist li {
    cursor: pointer;
    line-height: 70px;
    padding-right: 50px;

  }
  .psubjectlist {
    font-size: 18px;
    color:#010101;
  }
  .page-top > div > span{
    background: url("../../assets/img/product/productpositionicon.png") no-repeat left 0px;
  }
  .sytime{
    font-size: 20px;
    font-weight: bold;
  }
</style>
