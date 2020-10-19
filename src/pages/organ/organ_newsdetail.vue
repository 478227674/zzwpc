<template>
  <div class="hello" style="background: #f5f5f5">
    <orghead></orghead>
    <div class="news-title pc-center">
      {{newObj.orgName}} > {{newObj.title}}
    </div>
    <div class="pc-center news-detail-box">
      <div class="news-content-box">
        <div class="news-title1">
          {{newObj.title}}
        </div>
        <div class="news-time">{{newObj.createTime}}</div>
        <div class="news-content" v-html="newObj.message">

        </div>
      </div>
      <div class="news-list-other">
        <div style="display:none" class="news-list-right">
          <div>
            最热公告
          </div>
          <ul>
            <li v-for="item in newList" @click="openNewDetail(item)">
              {{item.newTitle}}
            </li>
          </ul>
        </div>
        <div class="hot-product">
          <div class="hot-title-r" style="margin-top: 0">
            课程推荐
          </div>
          <div class="hot-class-list" style="padding: 0;background: #fff;">
            <div  @click="openProductDetail(item)"  v-for="item in hotClass" class="hot-class-detail">
              <div class="hot-class-img">
                <img :src="item.imageUrl" alt="">
              </div>
              <div class="hot-class-text">
                <div class="hot-class-top">
                  <p>{{item.productName}}</p>
                  <div class="hot-class-classtime">
                    <span>班制：{{item.className}}</span>
                    <span>授课：{{item.teachName}}</span>
                  </div>
                </div>
                <div class="hot-class-price">
                  <div>
                    ￥{{item.productPrice}}
                    <span>返佣￥{{item.commissionRebate}}</span>
                  </div>
                  <p>{{item.purchaseNum}}已报名</p>
                </div>
              </div>
            </div>
            <div class="hot-class-detail" style="display: none">
              <div class="hot-class-img">
                <img src="../../assets/img/videotbg.png" alt="">
              </div>
              <div class="hot-class-text">
                <div class="hot-class-top">
                  <p>2021英语系统课程班</p>
                  <div class="hot-class-classtime">
                    <span>课时：55</span>
                    <span>课时：55</span>
                  </div>
                </div>
                <div class="hot-class-price">
                  <div>
                    ￥450
                    <span>返佣￥200</span>
                  </div>
                  <p>123456已报名</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import orghead from '../../components/orghead'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        hotClass:[],
        newsId:null,
        mdata:{},
        newList:[],
        timeProList:[],
        newObj:{},
      }
    },
    components:{
      // mapa
      orghead
    },
    created(){
      this.newsId = this.$route.query.id;
      this.getNewsDetail();
      // this.getNews();
      // this.getRecomProductList();
      this.$emit('header',false);
    },
    methods:{
      openNewDetail(data){
        this.openNewPage('/pages/newsdetail',{id:data.newId})
      },
      getRecomProductList(){
        this.http.post('/dir/queryRandomDirProductType4',{pageNum:1,pageSize:4}).then(res=>{
          if(res.code == 0){
            this.timeProList = res.data.list;
          }
        });
      },
      //获取公告
      getNews(t){
        this.http.post('/dir/new/queryNewList',{pageNum:1,pageSize:5}).then(res=>{
          if(res.code == 0){
            this.newList = res.data.list;
          }
        });
      },
      //打开课程详情
      openProductDetail(data){
        this.openProductDetailByType(data)
      },
      //获取消息详情
      getNewsDetail(){
        this.http.post('/dir/queryDirOrgMessageById',{id:this.newsId}).then(res=>{
          if(res.code == 0){
            res.data.createTime = this.formatTimeToDay(res.data.createTime)
            this.newObj = res.data;
            this.orgId = res.data.orgId;
            this.getHotClass();

          }
        })
      },
      //获取热门课程
      getHotClass(){
        this.http.post('/dir/queryDirProductRecomByOrgId',{orgId:this.orgId,pageNum:1,pageSize:4}).then(res=>{
          if(res.code == 0){
            this.hotClass = res.data.list;
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
  .news-list-other{
    width: 323px;
  }
  .hot-title-r {
    color:#323232;
    font-size: 18px;
    line-height: 74px;
    padding: 0 20px;
    background: #fff;
    margin: 20px auto 10px auto;
  }
  .hot-product{

  }
  .news-list-right li {
    cursor: pointer;
    line-height: 47px;
    font-size: 14px;
    color:#909090;
    border-bottom: 1px dashed #e5e5e5;
  }
  .news-list-right div{
    font-size: 18px;
    padding-bottom: 18px;
    color:#323232;
    border-bottom: 1px solid #dcdcdc;
  }
  .news-list-right{
    width: 280px;
    padding: 30px 20px;
    background: #fff;
  }
  .news-content{
    margin-top: 10px;
  }
  .news-content img{
    max-width: 100%;
  }
  .news-time {
    color:#909090;
    font-size: 12px;
    padding: 20px;
    border-bottom: 1px solid #e5e5e5;
  }
  .news-title1{
    color:#323232;
    font-size: 32px;
  }
  .news-content-box{
    padding: 50px 30px;
    background: #fff;
    width: 796px;

  }
  .news-detail-box{
    display: flex;
    justify-content: space-between;
  }
  .news-title {
    line-height: 46px;
    color:#323232;
    font-size: 14px;
  }
</style>
