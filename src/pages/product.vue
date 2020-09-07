<template>
  <div class="hello" style="background: #f7f7f7;overflow:hidden;">
    <div class="pc-center pc-organ-box">
      <div class="pc-list-l">
        <div style="padding: 20px 20px 0px 20px">
          <div class="pc-list-top">
            <div>
              <span>太奇网课平台</span>
              <span>></span>
              <span>知识讲授</span>
            </div>
          </div>
          <div class="pc-list-item" style="padding-bottom: 0px;border-bottom: 0px">
            <div class="pc-list-title">
              类型
            </div>
            <div class="pc-list-detail">
              <ul class="one-level-ul" style="flex-wrap: wrap;border-bottom: none">
                <li @click="chooseProductType(null)" v-bind:class="{'active-level':productType == 0}">全部</li>
                <li @click="chooseProductType(1)" v-bind:class="{'active-level':productType == 1}">拼团</li>
                <li @click="chooseProductType(2)" v-bind:class="{'active-level':productType == 2}">砍价</li>
                <li @click="chooseProductType(3)" v-bind:class="{'active-level':productType == 3}">特价</li>
              </ul>
            </div>
          </div>
          <div class="pc-list-item">
            <div class="pc-list-title">
              类别
            </div>
            <div class="pc-list-detail">
              <ul class="one-level-ul">
                <li class="one-level-list-li" @click="chooseThisOneType(null,null)" v-bind:class="{'active-one':!onelevelId}">全部<span></span></li>
                <li class="one-level-list-li" @click="chooseThisOneType(index,item)" v-for="(item,index) in typeList" v-bind:class="{'active-one':onelevelId == item.id}">{{item.name}}<span></span></li>
              </ul>
              <ul class="one-level-ul" style="border-bottom: none">
                <li @click="getProductByOneId" v-show="onelevelId">全部</li>
                <li class="two-level-list-li" v-bind:class="{'active-level':twolevelId == item.id,'active-one':twolevelId == item.id&&typeList3.length>0}" v-show="typeList2.length>0"  @click="chooseThisTwoType(index,item)" v-for="(item,index) in typeList2">{{item.name}}<span></span></li>
              </ul>
              <div class="level-3-list" v-show="typeList3.length>0">

                <div class="level-3-all" style="cursor: pointer;" @click="getProductByTwoId">
                  全部
                </div>
                <div class="level-3-item">
                  <ul>
                    <li v-bind:class="{'active-level':thrlevelId == item.id}"  @click="chooseThisEnd(item)" v-for="(item,index) in typeList3">
                      {{item.name}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
<!--          <div class="pc-list-item" style="padding-bottom: 0px;border-bottom: 0px">-->
<!--            <div class="pc-list-title">-->
<!--              区域-->
<!--            </div>-->
<!--            <div class="pc-list-detail">-->
<!--              <ul class="one-level-ul" style="flex-wrap: wrap;border-bottom: none">-->
<!--                <li  @click="chooseThisCity(null)" v-bind:class="{'active-level':!orgAreaId}">全部</li>-->
<!--                <li v-for="item in cityList" @click="chooseThisCity(item)" v-bind:class="{'active-level':orgAreaId == item.id}">{{item.name}}</li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <div style="height:20px;background: #f7f7f7;"></div>
        <div style="padding: 20px 20px 0px 20px">
          <div class="pc-list-list-top">
            <div class="sx-type pc-list-sx">
              <span class="active-level">综合</span>
            </div>
          </div>
          <ul class="list-list">
            <li v-for="(item,index) in productList" @click="openProductDetail(item)">
              <div class="organ-logo"  :style="{backgroundImage: 'url(' + item.imageUrl + ')'}">
              </div>
              <div class="organ-detail">
                <div class="organ-title">
                  {{item.productName}}
                  <div @click.stop="getCode(item,index)">
                    分享课程
                    <div :id="getQrcodeId(item.productId)"  class="qrcode"></div>
                  </div>
                </div>
                <div class="organ-products">{{item.className}}</div>
                <div class="activename">
                  <span v-show="item.isCut==1">邀请砍价</span>
                  <span v-show="item.isGroup==1">拼团优惠</span>
                  <span v-show="item.isCommission==1">邀请返佣</span>
                </div>
                <div class="organ-num">
                  <div v-show="item.productPrice>0">
                    ￥<span>{{item.productPrice}}</span>
                  </div>
                  <div v-show="item.productPrice==0">
                    <span>免费</span>
                  </div>
                  <p>
                    报名 <span>{{item.purchaseNum}}</span>人
                  </p>
                </div>
              </div>
            </li>
          </ul>
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
      </div>
      <div class="pc-list-r">
        <div class="pc-product-list-top">
          <div>
            精品课程
          </div>
          <ul>
            <li  @click="openProductDetail(item)" v-for="item in jingpinList" class="pc-product-list-li">
              <div class="pc-product-list-cover"  :style="{backgroundImage: 'url(' + item.imageUrl + ')'}">

              </div>
              <div class="pc-product-list-detail">
                <p>{{item.productName}}</p>
                <span>{{item.orgName}}</span>
                <a href="javascript:;" class="active-level see-detail">查看</a>
              </div>
            </li>

          </ul>
        </div>
        <div style="height:20px;background: #f7f7f7;"></div>
        <div class="pc-product-list-bot">
          <div>选择太奇网课平台</div>
          <span class="pc-line"></span>
          <ul>
            <li>
              <img src="../assets/img/c1.png" alt="">
              <div>
                <p>行业平台</p>
                <span>有20年的互联网+教育经验， 懂学生需要什么。</span>
              </div>
            </li>
            <li>
              <img src="../assets/img/c2.png" alt="">
              <div>
                <p>教育资源丰富</p>
                <span>覆盖全国上百个城市多家品牌 机构，老师好，学校多，课程多。</span>
              </div>
            </li>
            <li>
              <img src="../assets/img/c4.png" alt="">
              <div>
                <p>专业平台顾问</p>
                <span>百余名资深教育顾问，站在 第三方的角度，快速为您定 制一对一的个性化解决方案。</span>
              </div>
            </li>
            <li>
              <img src="../assets/img/c1.png" alt="">
              <div>
                <p>行业平台</p>
                <span>有20年的互联网+教育经验， 懂学生需要什么。</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from "qrcodejs2"; //引入生成二维码插件
  import config from '../config'
  // require styles
//  import Swiper from 'swiper';
  export default {
    name: 'HelloWorld',
    data () {
      return {
        onelevelId:null,
        twolevelId:null,
        thrlevelId:null,
        allTotal:0,
        firstType:0,
        requestUrl:'',
        swiperOption: {
          loop: true,
          autoplay: {
            delay: 1500,
//            stopOnLastSlide: false,
            /* 触摸滑动后是否继续轮播 */
//            disableOnInteraction: false
          },
          on: {
            //滑动之后回调函数
            slideChangeTransitionStart: function() {
              /* realIndex为滚动到当前的slide索引值 */
            },
          },
          //分页器设置
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
            type: "bullets"
          }
        },
        productList:[],
        total:0,
        pagenum:1,
        pagesize:5,
        typeList:[],
        typeList2:[],
        typeList3:[],
        oneIndex:0,

        orgAreaId:null,
        cityName:localStorage.getItem('cityName') || '北京',
        cityList:[],
       productType:0,
        jingpinList:[]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    created(){
      this.$emit('header_two',true)
      //根据各种参数筛选
      if(this.$route.query.oid){
        this.onelevelId = this.$route.query.oid;
        this.getProductByS();
      }
      //根据类型筛选
      if(this.$route.query.producttype){
        this.productType = this.$route.query.producttype;
        this.getProductByS();
      }
      this.getProductByS();

      this.getTypeList();
      // this.getCityList();
      this.getJingpinProduct();
    },
    methods:{
      //生成二维码
      getCode(data,index){
        if(!localStorage.getItem('diruserinfo')){
          this.$router.push('/pages/login');
          return;
        }
        if(this.productList[index].isQrcode){
            return;
        }
        var shareUrl = '';
        var user = JSON.parse(localStorage.getItem('diruserinfo'))
        if(data.imageType==5){
          shareUrl = config.wxUrl +  'productspe_detail.html?id=' + data.productId + '&inviteCode='+user.inviteCode + '&'
        }else if(data.imageType == 4){
            if(data.isGroup == 1){
              shareUrl = config.wxUrl +  'productgroup_detail.html?id=' + data.productId + '&inviteCode='+user.inviteCode + '&'
            }else{
              shareUrl = config.wxUrl +  'productkan_detail.html?id=' + data.productId + '&inviteCode='+user.inviteCode + '&'
            }
        }
        document.getElementById('qrcode'+data.productId).style.display = 'block'
        document.getElementById('qrcode'+data.productId).innerHTML = ''
        let qrcode = new QRCode('qrcode'+data.productId, {
          width:'100',
          height: '100',
          text:shareUrl, // 二维码地址
          colorDark : "#000",
          colorLight : "#FFF",
        })
        this.productList[index].isQrcode = true;
      },
      //给每个二维码的box生成一个id
      getQrcodeId(id){
          return 'qrcode'+id;
      },
      //获取竞聘课程列表
      getJingpinProduct(){
        this.http.post('/product/queryBoutiqueProduct',{}).then(res=>{
          if(res.code == 0){
            this.jingpinList = res.data;
          }
        })
      },
      //打开详情
      openProductDetail(data){
        this.openProductDetailByType(data)
      },
      //选择类型获取
      chooseProductType(t){
        if(!t){
          this.productType = null
        }else{
          this.productType = t;
        }
        this.getProductByS()
      },
      //选择一级类型
      chooseThisOneType(index,data){ //点击一级分类
        if(!index&&!data){
          this.onelevelId = null;
          this.twolevelId = null;
          this.thrlevelId = null;
          this.typeList2 = [];
          this.typeList3 = [];
          this.getProductByS();
          return;
        }
        if(this.typeList[index].children){
          this.typeList2 = this.typeList[index].children || [];
          this.typeList3 = this.typeList[index].children[0].children || [];
        }else{
          this.typeList2 = [];
          this.typeList3 = [];
        }
        this.onelevelId = data.id;
        this.twolevelId = null;
        this.thrlevelId = null;
        this.oneIndex = index;
      },
      //选择二级
      chooseThisTwoType(index,data){ //点击二级分类
        this.twolevelId = data.id;
          if(this.typeList[this.oneIndex].children[index].children){
            this.typeList3 = this.typeList[this.oneIndex].children[index].children;
          }else{
            this.typeList3 = [];
            this.thrlevelId = null;
          }
      },
      getProductByTwoId(){ //点三级全部查询
        this.pagenum = 1;
        this.productList = [];
        this.thrlevelId = null;
        this.getProductByS()
      },
      getProductByOneId(){ //点二级全部查询
        this.pagenum = 1;
        this.productList = [];
        this.twolevelId = null;
        this.thrlevelId = null;
        this.getProductByS()
      },
      chooseThisEnd(data){ //点三级查询 不是全部
        this.thrlevelId = data.id;
        this.pagenum = 1;
        this.productList = [];
        this.getProductByS()
      },
      //选择城市
      chooseThisCity(data){
        this.pagenum = 1;
        this.productList = [];
        if(!data){
          this.orgAreaId =data;
        }else{
          this.orgAreaId = data.id;
        }
        this.getProductByS()
      },
      //筛选课程列表
      getProductByS(){
        this.firstType = null;
        var obj = {pagenum:this.pagenum,pagesize:this.pagesize};
        if(this.onelevelId){
          obj.firstSortId = this.onelevelId;
        }
        if(this.twolevelId){
          obj.secondSortId = this.twolevelId;
        }
        if(this.thrlevelId){
          obj.sortId = this.thrlevelId;
        }
        if(this.productType!=0){
            obj.productType = this.productType;
        }
        this.http.post('/product/queryAllProductList',obj).then(res=>{
          if(res.code == 0){
            this.productList = res.data.list;
            this.total = res.data.total
            this.$nextTick(function () {
              for(var i=0;i<res.data.list.length;i++){
                document.getElementById('qrcode'+res.data.list[i].productId).innerHTML = '';
              }
            })
            if(res.data.list.length == 0 && this.pagenum == 1){
              this.toast('暂时没有查到更多数据')
              this.productList = []
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
      //获取城市区县
      getCityList(){
        this.http.post('/user/queryUserRegionList',{pagenum:this.pagenum,pagesize:this.pagesize}).then(res=>{
          if(res.code == 0){
            this.cityList = res.data.regions;
          }
        })
      },
      //根据首页拼团 砍价 和返佣进来默认查询课程列表方法
      getProductListByType(){
        this.http.post(this.requestUrl,{pagenum:this.pagenum,pagesize:this.pagesize}).then(res=>{
          if(res.code == 0){
            this.productList = res.data.list;
            this.total = res.data.total;
            this.$nextTick(function () {
              for(var i=0;i<res.data.list.length;i++){
                  document.getElementById('qrcode'+res.data.list[i].productId).innerHTML = '';
              }
            })
          }
        })
      },
      //打开切换地址页面
      openPosition(){
        this.$router.push('/pages/position')
      },
      //获取课程总数
      getAllProductTotal(){
        this.http.post('/common/queryStatistics',{}).then(res=>{
          if(res.code == 0){
            this.allTotal = res.productCount;
          }
        })
      },
      //切换页码
      handleCurrentChange(val){
        this.pagenum = val;
        this.getProductByS();
      },
    },
  }
  import '../assets/css/common.css';
  import '../assets/css/list.css';
  import '../assets/css/style.css'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
