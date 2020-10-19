<template>
  <div class="hello" style="background: #f5f5f5">
    <div class="news-title pc-center">
      元儒教育城 > {{title}}
    </div>
    <div class="pc-center news-detail-box">
      <div class="news-content-box">
        <div class="news-title1">
          {{title}}
        </div>
        <div class="news-content" v-html="desc">

        </div>
      </div>
      <div class="news-list-other">
        <div class="hot-product">
          <div class="hot-title-r" style="margin-top:0">
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
        type:1, //1关于我们 2法律申明 3权利声明 4隐私条款
        desc:'',
        title:'',
        titleList:{
          '1':'学员保障',
          '2':'问题汇总',
        },
        hotClass:[],
      }
    },
    created(){
      this.type = this.$route.query.type;
      this.getNews();
      this.getHotClass();
      this.title = this.titleList[this.type]
    },
    methods:{
      //获取信息
      getNews(){
        this.http.post('/dir/queryDirRules',{type:this.type,pageNum:1,pageSize:1}).then(res=>{
          if(res.code == 0){
            this.desc = res.data.list[0] ? res.data.list[0].content : '';
          }
        })
      },
      //打开课程详情
      openProductDetail(data){
        this.openProductDetailByType(data)
      },
      //获取热门课程
      getHotClass(){
        this.http.post('/dir/queryRandomDirProductType4',{pageNum:1,pageSize:4}).then(res=>{
          if(res.code == 0){
            this.hotClass = res.data.list;
          }
        });
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
