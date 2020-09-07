<template>
  <div class="hello" style="background: #f5f5f5">

    <div  class=" pc-center" style="margin-top: 20px">
      <div class="title-news" @click="openIndex">
        <img src="../../assets/img/home.png" alt="">
        <span>首页 > 最新消息 </span>
      </div>

      <div class="organ-allbox" style="margin-top: 0px;margin-bottom: 20px">
        <div class="organ-left" style="padding-top: 10px">
          <ul>
            <li v-for="(item,index) in newsList" @click="openNewsDetail(item)">
              <img  v-show="index<3" src="../../assets/img/message-fair.png" alt="">
              <img  v-show="index>2" src="../../assets/img/message-f.png" alt="">
              <p>{{item.messageTitle}}</p>
            </li>
          </ul>
          <div class="block">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="pagenum"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>

        <div style="width:400px;">
          <div class="pc-product-list-bot">
            <div class="special-class" style="border:none;">
              <span>热门课程</span>
            </div>
            <div class="hotclass-list">
              <div>
                <ul>
                  <li @click="openProductDetail(item)" class="product-item" v-for="item in hotClass">
                    <div class="product-img" :style="{backgroundImage: 'url(' + item.imageUrl + ')'}">
                      <!--<img :src="item.imageUrl" alt="">-->
                    </div>
                    <div class="product-detail">
                      <p class="class-title">{{item.productName}}</p>
                      <div class="class-tag">
                        <span>{{item.className}}</span>
                      </div>
                      <div class="activename">
                        <span v-show="item.isCut==1">邀请砍价</span>
                        <span v-show="item.isGroup==1">拼团优惠</span>
                        <span v-show="item.isCommission==1">邀请返佣</span>
                      </div>
                      <div class="class-num">
                        <div class="class-price">
                          <a href="javascript:;">￥</a>
                          <span>{{item.productPrice}}</span>
                          <div style="clear: both"></div>
                        </div>
                        <div class="class-person">
                          报名<span>{{item.purchaseNum}}</span>人
                        </div>
                        <div style="clear: both"></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        hotClass:[],
        newsList:[],

        total:0,
        pagenum:1,
      }
    },
    created(){
      this.getHotClass();
      this.getNewsList();
      this.$emit('header_two',true);
    },
    methods:{
      openNewsDetail(data){
        this.$router.push({path:'/pages/newsdetail',query:{id:data.messageId}})
      },
      handleCurrentChange(v){
        this.pagenum = v;
        this.getNewsList();
      },
      getNewsList(){
        this.http.post('/org/queryOrgMessageDyanmicList',{pageNum:this.pagenum,pageSize:10}).then(res=>{
          if(res.code == 0){
            this.newsList = res.data.list;
            this.total = res.data.total;
          }
        })
      },
      //获取热门课程
      getHotClass(){
        this.http.post('/product/queryProductRecomList',{orgId:this.orgId}).then(res=>{
          if(res.code == 0){
            this.hotClass = res.data;
          }
        })
      },
      openIndex(){
        this.$router.push('/')
      },

    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
</script>

<style scoped>
  .organ-left img{
    height: 18px;
    width: 18px;
    margin-right:12px;;
    margin-top: 11px;
  }
  .organ-left li{
    cursor: pointer;
    display: flex;
    line-height: 40px;
    color:#666;
    font-size: 12px;
    justify-content: flex-start;
  }
  .title-news img{
    height: 16px;
    margin-right: 5px;
    margin-top: 8px;
  }
  .title-news a{
    color:#f73e3c;
  }
  .title-news{
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    line-height: 36px;
    font-size: 14px;
    color:#333;
  }
  .organ-left{
    width:740px;
  }
</style>
