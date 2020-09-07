<template>
  <div class="hello" style="background: #f7f7f7;overflow:hidden;">
    <div class="psubjectlist">
      <div class="pc-center" style="border-bottom: 1px solid #c9c9c9;">
        <ul>
          <li @click="chooseThisSort(null)" :class="{'active-level':!subId}">全部</li>
          <li @click="chooseThisSort(item)" :class="{'active-level':sortId == item.id}" v-for="item in sortList">{{item.name}}</li>
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
    <div class="pc-center">
      <div class="free-product-list" style="padding-bottom: 20px;">
        <div class="fpl-list" style="width: 100%;">
          <ul>
            <li class="time-c" @click="openProductDetail(item)" v-for="item in freeList">
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
            <li class="time-c">
              <div class="fpl-cover">
<!--                <img :src="item.imageUrl" alt="">-->
              </div>
              <div style="padding: 20px">
                <div class="fpl-title">
                  S啊实打实大
                </div>
                <span class="fpl-livetime">啊实打实大师大师的</span>
              </div>
              <div class="fpl-price">
                <div class="commise-fpl" >
                  售价:￥111
                </div>
                <span>22人已报名</span>
              </div>
              <div class="share-can-get linear-btn">
                推广赚￥222
              </div>
            </li>
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



        sortId:null,
        sortList:[],
      }
    },
    computed: {

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
      },
      getSubjectBySortId(){
        this.http.post('/al/querySubjectList',{sortId:this.sortId}).then(ret=>{
          if(ret.code == 0){
            this.subjectList = ret.data;
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

        this.http.post('/product/getProductActivityList',obj).then(res=>{
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
<style>
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #eb6100 !important;
  }
</style>
<style scoped>


</style>
