<template>
  <div class="hello" style="background: #f7f7f7;overflow:hidden;">
    <div class="pc-center pc-organ-box">
      <div class="pc-list-l">
        <div style="padding: 20px 20px 0px 20px">
          <div class="pc-list-top">
            <div>
              <span>太奇分销平台</span>
              <span>></span>
              <span>搜索</span>
            </div>
          </div>
        </div>
        <div style="height:20px;background: #f7f7f7;"></div>
        <div style="padding: 20px 20px 0px 20px">
          <div class="pc-list-list-top">
            <div class="sx-type pc-list-sx">
              <span class="active-level">综合</span>
            </div>
          </div>
          <ul class="list-list">
            <div v-for="item in productList" @click="openProductDetail(item)">
              <li v-if="item.imageType!=0">
                <div class="organ-logo"  :style="{backgroundImage: 'url(' + item.fileUrl + ')'}">
                </div>
                <div class="organ-detail">
                  <div class="organ-title">{{item.name}}</div>
                  <div class="organ-products">{{item.className}}</div>
                  <div class="activename">
                    <span v-show="item.isCut==1">邀请砍价</span>
                    <span v-show="item.isGroup==1">拼团优惠</span>
                    <span v-show="item.isCommission==1">邀请返佣</span>
                  </div>
                  <div class="organ-num">
                    <div>
                      ￥<span>{{item.price}}</span>
                    </div>
                    <p>
                      报名 <span>{{item.purchaseNum}}</span>人
                    </p>
                  </div>
                </div>
              </li>
              <li v-if="item.imageType==0" @click="openOrganDetail(item.id)">
                <div class="organ-logo"  :style="{backgroundImage: 'url(' + item.fileUrl + ')'}">
                </div>
                <div class="organ-detail">
                  <div class="organ-title">{{item.name}}</div>
                  <div class="organ-products">课程({{item.countProduct}}):{{item.intro}}</div>
                  <div class="organ-products">{{item.intro}}</div>

                  <!--<div class="organ-num">-->
                    <!--<div>-->
                      <!--￥<span>{{item.price}}</span>-->
                    <!--</div>-->
                    <!--<p>-->
                      <!--报名 <span>{{item.purchaseNum}}</span>人-->
                    <!--</p>-->
                  <!--</div>-->
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // require styles
//  import Swiper from 'swiper';
  export default {
    name: 'HelloWorld',
    data () {
        return {
        allTotal:0,
        firstType:0,
        requestUrl:'',
        productList:[],
        total:0,
        pagenum:1,
        pagesize:5,
        oneIndex:0,

        orgAreaId:null,
        searchWord:"",
      }
    },
    computed: {
    },
    created(){
      this.$emit('header_two',true);
      if(this.$route.query.word){
          this.searchWord = this.$route.query.word;
          this.searchResultByWord();
      }
      // this.initPageData();
    },
    methods:{
      // initPageData(){
      //   this.http.post('/home/queryOrgMessageDynamicList',{}).then(res=>{
      //     if(res.code == 0){
      //     }
      //   })
      // },
      openOrganDetail(id){
        let routeUrl = this.$router.resolve({
          path: "/pages/organ_detail",
          query: {id:id}
        });
        window.open(routeUrl .href, '_blank');
      },
      openProductDetail(data){
        data.productId = data.id;
        this.openProductDetailByType(data.productList ? data.productList : data)
      },
      searchResultByWord(){
        this.http.post('/dir/search',{key:this.searchWord,pageNum:this.pagenum,pageSize:this.pagesize}).then(res=>{
          if(res.code == 0){
            this.productList = res.data;
            this.total = res.data.total;
          }else{
            this.stoast('暂无数据');
          }
        })
      },
      openPosition(){
        this.$router.push('/pages/position')
      },
      handleCurrentChange(val){
        this.pagenum = val;
        this.searchResultByWord();
      },
    },
    watch: {
      '$route' (to, from) { //监听路由是否变化
        if(this.$route.query.word){//判断id是否有值
          //调数据
          this.searchWord = this.$route.query.word;
          this.searchResultByWord();
        }
      }
    }
  }
  import '../assets/css/common.css';
  import '../assets/css/list.css';
  import '../assets/css/style.css'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .active-level{
    color:#ff5000 !important;
  }
  .organ-num{
    width:100% !important;
  }
  .organ-num > p span{
    font-size: 12px !important;
    line-height:23px;

  }
  .organ-num div{
    color:#f7260a !important;
  }
  .activename{
    margin-top: 15px;
  }

  .el-pagination{
    width: 50%;
    margin: 20px auto;
    display: flex;
    justify-content: center;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #ff5000 !important;
  }
  .number{
    border:1px solid #e7e7e7 !important;
    color:#333;
  }




  .swiper-slide,.swiper-wrapper{
    height:440px;
    overflow: hidden;
  }
  .pc-product-list-bot ul li {
    width:220px;
    display: flex;
    justify-content: flex-start;
    margin: 0 auto 15px auto;
  }
  .pc-product-list-bot ul li img{
    width:50px;height: 50px;
    margin-right:10px;
  }
  .pc-product-list-bot ul li >div{
    width:160px;
  }
  .pc-product-list-bot ul li div p {
    font-size: 14px;color:#333;
  }
  .pc-product-list-bot ul li div span{
    colro:#666666;
    font-size: 12px;
  }
  .pc-product-list-bot > div{
    font-size: 14px;color:#333;
    padding-top: 20px;
    padding-bottom: 10px;
    text-align: center;
  }
  .pc-product-list-bot > span{
    display: block;
    width:60px;
    border-bottom: 2px solid #ff5000;
    margin: 0 auto 15px auto;
  }
  .pc-product-list-detail a {
    color:#ff5000;
    font-size: 12px;
    margin-top: 10px;
    text-decoration: none;
    display: block;
  }
  .pc-product-list-detail span{
    display: block;
    margin-top: 10px;
    font-size: 12px;color:#666;
    overflow: hidden;   /*超出隐藏*/
    white-space: nowrap; /*强制在同一行显示*/
    text-overflow: ellipsis; /*省略号*/
  }
  .pc-product-list-detail{
    margin-left: 15px;
    width:125px;
  }
  .pc-product-list-detail p {
    width:100%;
    overflow: hidden;   /*超出隐藏*/
    white-space: nowrap; /*强制在同一行显示*/
    text-overflow: ellipsis; /*省略号*/
    font-size: 12px;
    color:#333;
  }
  .pc-product-list-cover{
    width: 80px;height: 80px;
    overflow: hidden;
    border-radius: 5px;
    background-size: 100% 100%;
  }
  .pc-list-r>ul{
    margin-top: 15px;
  }
  .pc-product-list-li{
    padding-top: 15px;
    display:flex;
    justify-content:flex-start;
    width:220px;
    margin: 0 auto;
    border-bottom: 1px dashed #e5e5e5;
    padding-bottom: 10px;
  }
  .pc-product-list-top > div{
    width:220px;
    margin: 0 auto;
    padding: 20px 0;
    border-bottom: 1px solid #e5e5e5;
    font-size: 15px;
    color:#333;
  }
  .pc-product-list-top{
    padding-bottom: 20px;
    overflow: hidden;
  }


</style>
