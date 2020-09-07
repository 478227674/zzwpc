<template>
  <div class="hello" style="background: #f5f5f5">
    <div v-show="orgId" style="background: #fff;">
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
    <div v-show="orgId" style="background: #ff7f00">
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
    <div class="pc-center" style="margin-top: 20px;">
      <img src="../../assets/img/spebannerb.png" style="width:100%;" alt="">
    </div>
    <!--热门课程-->
    <div class="pc-center organ-allbox">
      <div class="organ-left">
        <div class="special-class" style="border: none">
          <span>精品特价课</span>
        </div>
        <div >
          <ul class="spe-list">
            <li v-for="item in productList" @click="openSpeProductDetail(item)">
              <div class="spe-icon">
                <img class="spe-bigicon" :src="item.imageUrl" alt="">
                <img class="spe-liticon" src="../../assets/img/spe-icon1.png" alt="">
              </div>
              <div class="spe-list-detail">
                <p>{{item.productName}}</p>
                <span>{{item.className}}</span>
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
            <li style="border: none">

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
          <ul style="padding-bottom: 20px;">
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
        isType:0,
      }
    },
    components:{
      slider,
      slideritem
    },
    created(){
      this.orgId = this.$route.query.id;
      this.getOrganSpeProduct();
      this.$emit('header_two',true);
      if(this.$route.query.id){
        this.isType=1;
        this.getOrganDetail();
      }else{

      }
    },
    methods:{
      handleCurrentChange(v){
          this.pagenum = v;
          this.getOrganSpeProduct();
      },
      getOrganSpeProduct(){
        this.http.post('/product/queryProductSpecialList',{orgId:this.orgId,pagenum:this.pagenum,pagesize:this.pagesize}).then(res=>{
          if(res.code == 0){
            this.productList = res.data.list;
            this.total = res.data.total
            if(this.pagenum==1&&res.data.list.length==0){
                this.stoast('暂时没有查到更多数据')
            }
          }
        })
      },
      getOrganDetail(){
        this.http.post('/pc/org/queryOrgInfo',{orgId:this.orgId}).then(res=>{
          if(res.code == 0){
            this.orgData = res.data;
          }
        })
      },
      openSpeProductDetail(data){
        this.$router.push({path:'/pages/productspe_detail',query:{id:data.productId}})
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
  .organ-num p span{
    color:#f7260a;

  }
  .organ-num p {
    line-height: 28px;
    font-size: 12px !important;
  }
  .organ-num > div span{
    font-size: 24px;
    color:#f7260a;
    font-weight: bold;
  }
  .organ-num > div{
    font-size: 12px;
    color:#f7260a;
  }
  .organ-num{
    width:100% !important;
    display: flex;
    justify-content: space-between;
  }
  .spe-list li {
    margin-bottom: 20px;
    cursor: pointer;
  }
  .spe-list-detail{
    padding: 15px;
  }
  .spe-list-detail span{
    font-size: 12px;color:#666;
  }
  .spe-list-detail p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    margin-bottom: 10px;
    font-size: 18px;
    color:#333;
  }
  .spe-liticon{
    height:50px;
    position: absolute;
    right:0px;bottom:0px;
  }
  .spe-bigicon{
    width:280px;
    height:280px;
  }
  .spe-list:after{
    content: ""; display: block; height:0; width:280px;
  }

  .pc-product-list-bot ul li{
    width:220px !important;
  }
  .spe-list{
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
  }
  .spe-list li {
    width:280px;
    height:400px;
    border: 1px solid #e5e5e5;
  }
  .spe-icon{
    width:280px;
    height:280px;
    position: relative;
  }
</style>
