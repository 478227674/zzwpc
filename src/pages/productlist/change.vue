<template>
<div class="hello" style="background: #f7f7f7;overflow:hidden;">
<!--    <div class="change-all-box">-->
<!--      <img src="../../assets/img/product/changebg.jpg" alt="">-->
<!--      <div class="change-rule">-->
<!--        <div>-->
<!--          <img src="../../assets/img/donwloadcode.png" alt="">-->
<!--        </div>-->
<!--        <p>-->
<!--          使用APP推荐好友注册立即获得500台币/人，你现在拥有 <span>5598</span> 太奇币-->
<!--        </p>-->
<!--      </div>-->
      <div style="position: relative;z-index: 2;margin-top: 180px" class="pc-center change-list">
        <div class="free-product-list">
          <div class="fpl-list">
            <ul>
              <li v-for="item in freeList"  @click="openProductDetail(item)">
                <div class="fpl-cover">
                  <img :src="item.imageUrl" alt="">
                  <div class="change-num">
                    <span>可全额</span>
                    <div>
                      可使用 <a href="javascript:;">{{item.productPrice*10}}</a>TQB,兑换此课程
                    </div>
                  </div>
                </div>
                <div style="padding: 5px 15px">
                  <div class="fpl-title">
                    {{item.productName}}
                  </div>
                  <span class="fpl-livetime">{{item.productIntro}}</span>
                  <div class="change-detail">
                    <span>{{item.purchaseNum}}人已报名</span>
                    <s>原价 ￥{{item.productPrice}}</s>
                    <a href="javascript:;">现价￥{{item.productPrice}}</a>

                  </div>
                </div>
                <div class="fpl-price">
                  <p>免费</p>
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
<!--              <li style="visibility: hidden"></li>-->
<!--              <li style="visibility: hidden"></li>-->
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
    </div>
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
        freeList:[],
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
      }
    },
    computed: {

    },
    created(){
      this.getProductListByType();
      this.initPageData();
    },
    methods:{
      //选择科目
      chooseThisSub(data){
        this.subId = data ? data.subjectId : null;
        this.pagenum = 1;
        this.getProductListByType();
      },
      //初始化页面数据
      initPageData(){
        // this.http.post('/product/getProductSortListByLevel',{level:3}).then(res=>{
        //   if(res.code == 0){
        //     // this.sortList = res.data;
        //     this.http.post('/al/querySubjectList',{sortId:res.data[0].id}).then(ret=>{
        //       if(ret.code == 0){
        //         this.subjectList = ret.data;
        //       }
        //     })
        //   }
        // });
        // this.http.post('/product/queryProductRange',{}).then(res=>{
        //   if(res.code == 0){
        //     this.priceList = res.data;
        //   }
        // })
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
          pagesize:6,
        };

        this.http.post('/product/getCoinProduct',obj).then(res=>{
          if(res.code == 0){
            this.freeList = res.data.list;
            this.total = res.data.total
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
      //切换页码
      handleCurrentChange(val){
        this.pagenum = val;
        this.getProductListByType();
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/index.css';
</script>
<style scoped>
  .pc-center{
    width: 1058px;
  }
  .change-num > div{
    font-size: 12px;
  }
  .change-num div a {
    color:#fa0707;
  }
  .change-num > span{
    height: 20px;
    width: 68px;
    display: block;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color:#fa0707;
    border:1px solid #fa0707;
    margin: 11px 5px 11px 10px;
  }
  .change-num{
    color:#fff;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    bottom:0px;
    height: 42px;
    line-height: 42px;
    left:0px;
    width: 100%;
    background: rgba(0,0,0,0.5);
  }

  .change-detail s{
    padding: 0 15px;
  }
  .change-detail a{
    color:#f15009;
    font-size: 15px;
  }
  .fpl-livetime{
    padding: 4px 0px;
  }
  .change-detail{
    display: flex;
    justify-content:flex-start ;
    font-size: 12px;
    color:#636363;
  }
  .change-list{
    padding:30px 35px;
    background: #212c35;
    border:1px solid #7e6b5a;
  }
  .change-rule img{
    width: 100%;
    height: 100%;
  }
  .change-rule p span{
    line-height: 50px;
    font-size: 32px;color:#eb6100;
  }
  .change-rule p{
    flex: 1;
    padding-right: 60px;
    height: 64px;
    line-height: 64px;
    color:#fff;
    font-size: 16px;
    background: #1b1b1b;
    margin-top: 15px;
  }
  .change-rule div{
    width: 92px;
    height: 92px;
    background: red;
    overflow: hidden;
    border-radius: 5px;
    border: 5px solid #1b1b1b;
  }
  .change-rule{
    overflow: hidden;
    text-align: center;
    position: relative;
    z-index: 3;
    display: flex;
    justify-items: center;
    width: 50%;
    margin: 150px auto 0 auto;
  }
  .change-all-box>img{
    z-index: 1;
    width: 100%;
    position: absolute;
    left: 0px;top:0px;
  }
  .change-all-box{
    overflow: hidden;
    position: relative;
  }
  .fpl-title{
    width:210px ;
    background-size: 17px 15px;
  }
  .fpl-price p{
    color:#eb6100;
    font-weight: bold;
    font-size: 19px;
  }
  .fpl-price span{
    font-size: 18px;
    color:#eb6100;
    font-weight: bold;
  }
  .fpl-price{
    line-height: 42px;
  }
  .fpl-cover{
    position: relative;
  }
  .fpl-list ul li{
    width: 306px;
    height: 355px;
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

</style>
