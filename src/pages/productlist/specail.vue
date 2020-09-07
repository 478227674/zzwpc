<template>
  <div class="hello" style="background: #f7f7f7;overflow:hidden;">
    <div class="pc-center pc-organ-box">
      <div class="pc-list-l">
        <div style="padding: 20px 20px 0px 20px">
          <div class="pc-list-top">
            <div>
              <span>太奇网课平台</span>
              <span>></span>
              <span>特价课程</span>
            </div>
          </div>
        <div style="padding: 20px 20px 0px 20px">
          <ul class="list-list">
            <li v-for="(item,index) in productList" @click="openProductDetail(item)">
              <div class="organ-logo"  :style="{backgroundImage: 'url(' + item.imageUrl + ')'}">
              </div>
              <div class="organ-detail">
                <div class="organ-title">
                  {{item.productName}}
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
              <img src="../../assets/img/c1.png" alt="">
              <div>
                <p>行业平台</p>
                <span>有20年的互联网+教育经验， 懂学生需要什么。</span>
              </div>
            </li>
            <li>
              <img src="../../assets/img/c2.png" alt="">
              <div>
                <p>教育资源丰富</p>
                <span>覆盖全国上百个城市多家品牌 机构，老师好，学校多，课程多。</span>
              </div>
            </li>
            <li>
              <img src="../../assets/img/c4.png" alt="">
              <div>
                <p>专业平台顾问</p>
                <span>百余名资深教育顾问，站在 第三方的角度，快速为您定 制一对一的个性化解决方案。</span>
              </div>
            </li>
            <li>
              <img src="../../assets/img/c1.png" alt="">
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
  import config from '../../config'
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
        jingpinList:[],
        orgAreaId:null,
        cityName:localStorage.getItem('cityName') || '北京',
        cityList:[],
        productType:0,

        priceList:[],
        rangeId:null,
        startPrice:null,
        endPrice:null,
        sortId:null,
        subjectId:null,
        sortList:[],
        subjectList:[],
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    created(){
      this.$emit('header_two',true)
      this.getJingpinProduct();
      this.getProductListByType();
    },
    methods:{
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
      //筛选课程列表
      getProductListByType(){
        this.firstType = null;
        var obj = {
          pagenum:this.pagenum,
          pagesize:this.pagesize,
        };

        this.http.post('/home/queryCommissionProductList',obj).then(res=>{
          if(res.code == 0){
            this.productList = res.data.list;
            this.total = res.data.total
            if(res.data.list.length == 0 && this.pagenum == 1){
              this.toast('暂时没有查到更多数据')
              this.productList = []
            }
          }
        })
      },
      //打开切换地址页面
      openPosition(){
        this.$router.push('/pages/position')
      },
      //切换页码
      handleCurrentChange(val){
        this.pagenum = val;
        this.getProductListByType();
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/list.css';
  import '../../assets/css/style.css'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
