<template>
  <div class="hello" style="background: #f5f5f5">

    <div  class=" pc-center" style="margin-top: 20px">
      <div class="title-news" @click="openIndex">
        <img src="../../assets/img/home.png" alt="">
        <span>首页 > 最新消息 > </span>
        <a href="javascript:;"> 消息详情</a>
      </div>



      <div class="organ-allbox" style="margin-top: 0px;margin-bottom: 20px">
        <div class="organ-left">
          <p>{{mdata.messageTitle}}</p>
          <span>{{mdata.createTime}}</span>
          <div v-html='mdata.messageContent' class="messagecontent-vbox">

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
        newsId:null,
        mdata:{},
      }
    },
    created(){
      this.newsId = this.$route.query.id;
      this.getHotClass();
      this.getNewsDetail();
      this.$emit('header_two',true);
    },
    methods:{
      getNewsDetail(){
        this.http.post('/org/queryOrgMessageDyanmicInfo',{messageId:this.newsId}).then(res=>{
          if(res.code == 0){
            res.data.createTime = this.formatTimeToDay(res.data.createTime)
            this.mdata = res.data;
          }
        })
      },
      //获取热门课程
      getHotClass(){
        this.http.post('/product/queryProductRecomList',{}).then(res=>{
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
  .messagecontent-vbox img{
    max-width: 100%;
  }
  .organ-left span{
    color:#666;
    font-size: 12px;
    margin-bottom: 10px;
    display: block;
  }
  .organ-left p {
    margin-bottom: 15px;
    font-size: 19px;
    color:#333;
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
