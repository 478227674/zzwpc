<template>
  <div class="hello" style="background: #f5f5f5">
    <div style="background: #fff;">
      <div class="pc-center od-top">
        <div class="organ-name-bpoxx">
          <img :src="orgData.logoUrl" alt="">
          <div class="organ-name-top">{{orgData.orgName}}
            <div v-show="orgData.orgTelephone!=0">{{orgData.orgTelephone}}</div>
            <div v-show="orgData.orgTelephone==0">成为本机构会员可见</div>
          </div>
        </div>
        <div class="od-intro">{{orgData.orgIntro}}</div>
      </div>


    </div>
    <div style="background: #ff7f00">
      <div class="od-tab pc-center">
        <ul>
          <li @click="openOrganDetail">
            首页
          </li>
          <li class="organ_active" @click="openOrganProduct">
            课程
          </li>
          <li @click="openOrganSchool">
            校区
          </li>
          <li @click="openOrganComments">
            评价
          </li>
          <li  @click="openOrganPresent">
            机构简介
          </li>
        </ul>
      </div>
    </div>
    <div v-show="orgData.imageList.length>=3" class="pc-center" style="margin-top: 20px;display: flex;justify-content: space-between">
      <img v-show="index<3" v-for="(item,index) in orgData.imageList" :src="item.attachment.fileUrl" style="width:30%;" alt="">
    </div>
    <!--热门课程-->
    <div class="pc-center organ-allbox">
      <div class="organ-left">
        <div class="special-class">
          <span>热门课程</span>
        </div>
        <div >
          <ul class="list-list">
            <li v-for="item in productList" @click="openProductDetail(item)">
              <div class="organ-logo"  :style="{backgroundImage: 'url(' + item.imageUrl + ')'}">
              </div>
              <div class="organ-detail">
                <div class="organ-title">{{item.productName}}</div>
                <div class="organ-products">{{item.className}}</div>
                <div class="activename">
                  <span v-show="item.isCut==1">邀请砍价</span>
                  <span v-show="item.isGroup==1">拼团优惠</span>
                  <span v-show="item.isCommission==1">邀请返佣</span>
                </div>
                <div class="organ-num">
                  <div>
                    ￥<span>{{item.productPrice}}</span>
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
      <div style="width:260px;">
        <div class="pc-product-list-bot">
          <div>选择太奇建工AI</div>
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
  import { slider, slideritem } from 'vue-concise-slider'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        pagenum:1,
        total:0,
        pagesize:5,
        productList:[],
        value5:5,
        orgId:null,
        orgData:{},

      }
    },
    components:{
      slider,
      slideritem
    },
    created(){
      this.orgId = this.$route.query.id;
      this.getOrgAllProduct();
      this.getOrganDetail();
      this.$emit('header_two',true);
    },
    methods:{
      getOrgAllProduct(){
        this.http.post('/product/queryAllProductList',{orgId:this.orgId,pagenum:this.pagenum,pagesize:5}).then(res=>{
          if(res.code == 0){
            this.total = res.data.total;
            this.productList = res.data.list;
          }
        })
      },
      getOrganDetail(){
        this.http.post('/org/queryOrgInfo',{orgId:this.orgId}).then(res=>{
          if(res.code == 0){
            this.orgData = res.data;
            this.imageList = res.data.imageList;
          }
        })
      },
      openProductDetail(data){
          this.openProductDetailByType(data)
//        if(data.imageType==2){
//          this.$router.push({path:'/pages/product_detail',query:{id:data.productId}})
//        }else if(data.imageType == 4){
//          if(data.isCut == 1 && data.isGroup == 0){
//            this.$router.push({path:'/pages/productcut_detail',query:{id:data.productId}})
//          }else if(data.isGroup == 1 || (data.isGroup == 1 && data.isCut == 1)){
//            this.$router.push({path:'/pages/productgroup_detail',query:{id:data.productId}})
//          }
//        }else if(data.imageType == 5){ //特价
//          this.$router.push({path:'/pages/productspe_detail',query:{id:data.productId}})
//        }
      },
      handleCurrentChange(v){
          this.pagenum = v;
          this.getOrgAllProduct();
      },

      openIndex(){
        this.$router.push('/')
      },
      openOrganDetail(){
        this.$router.push({path:'/pages/organ_detail',query:{id:this.orgId}})
      },
      openOrganProduct(){
        this.$router.push({path:'/pages/organ_product',query:{id:this.orgId}})
      },
      openOrganSchool(){
        this.$router.push({path:'/pages/organ_school',query:{id:this.orgId}})
      },
      openOrganComments(){
        this.$router.push({path:'/pages/organ_comment',query:{id:this.orgId}})
      },
      openOrganPresent(){
        this.$router.push({path:'/pages/organ_present',query:{id:this.orgId}})
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
  import '../../assets/css/index.css'
  import '../../assets/css/organ.css'
</script>
<style scoped>
  .organ-num{
    width:100% !important;
  }
  .organ-detail {
    width: 730px;
  }
  .organ-num div{
    color:#f7260a !important;
  }
</style>
