<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>
    <div class="pc-center">
      <div class="mianbox">
        <div class="main-left" style="margin-bottom: 20px;">
          <p>分校课程</p>
          <div class="main-center-line"></div>
          <div class="mainclass-tab">
            <span v-for="item in sortList" @click="getTestListBySortId(item.id)" :class="{'tab-active':sortId==item.id}">{{item.name}}</span>
          </div>
        </div>
        <div style="background: #fff;">
          <ul class="classes-table">
            <li v-for="item in ftofList" @click="openMyProductListBySortId(item)">
              <div class="class-detail-box">
                <div class="class-detail-img">
<!--                  <div class="class-detail-img-box">-->
<!--                    <img :src="item.imageUrl" alt="">-->
<!--                  </div>-->
                  <div class="class-detail-d-box">
                    <p>{{item.productName}}</p>
                    <div class="product-type">
                      <span>上课方式：{{item.className}}</span>
                      <span style="margin-left: 10px;">课程原价：<a href="javascript:;">{{item.productPrice}}</a></span>
                    </div>
                    <a href="javascript:;" style="color:#ab1e24">有效期:一年</a>
                  </div>
                </div>
                <div style="clear: both"></div>
              </div>
              <span class="keeplearn">继续学习</span>
            </li>
          </ul>
          <div class="block">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="pagenum"
              layout="total,prev, pager, next"
              :total="ftotal">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../../components/mainhead'

  export default {
  name: 'HelloWorld',
  data () {
    return {
      activeName:'first',
      clicktype:1,
      sortList:[],
      videoList:[],
      sortId:null,

      pagenum:1,
      total:0,
      ftofList:[],
      ftotal:0,
      fpagenum:1,

    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.getSortList();
    this.$emit('header_two',false)

//    this.$emit('footer',false)
  },
  methods:{
    openMyProductListBySortId(data){
      this.openNewPage('/pages/videolist',{type:data.imageType,id:data.productId,name:data.productName})
      // this.$router.push({path:'/pages/videolist',query:{type:data.imageType,id:data.productId,name:data.productName}})
    },
    //学科按钮单击事件
    getTestListBySortId(id){
      this.sortId = id;
      this.fpagenum = 1;
      this.ftofList = [];
      this.getFtofList();
    },
    getFtofList(){
      this.http.post('/order/querySchoolPageList',{pageNum:this.fpagenum,pageSize:10,sortId:this.sortId}).then(res=>{
        if(res.code == 0){
          this.ftofList = res.data.list;
          this.ftotal = res.data.total;
        }
      })
    },
    // //根据项目ID获取课程列表
    // getTestListFn(){
    //   this.http.post('/order/queryOrderListByAlClassId',{sortId:this.sortId,pageNum:this.pagenum,pageSize:10}).then(res=>{
    //     if(res.code == 0){
    //       for(var i=0;i<res.data.list.length;i++){
    //         res.data.list[i].startTime = this.formatTimeToDate(res.data.list[i].startTime)
    //         res.data.list[i].endTime = this.formatTimeToDate(res.data.list[i].endTime)
    //       }
    //       this.videoList = res.data.list;
    //       this.total = res.data.total;
    //     }
    //   })
    // },
    //获取学科列表
    getSortList(){
      this.http.post('/order/querySortIdByOrder',{imageType:8}).then(res=>{
        if(res.code == 0){
          this.sortList = res.data;
          this.sortId = res.data[0].id;
          this.getFtofList(this.sortId)
        }
      })

    },
    handleCurrentChange(v){
      this.fpagenum = v;
      this.getFtofList();
    },
  },
}
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
  import '../../assets/css/style.css';
  import '../../assets/css/order.css';

</script>
<style scoped>
  .keeplearn{
    cursor: pointer;
    position: absolute;
    right: 50px;
    top:40px;
    color:#ff6200;
    font-size: 18px;
  }
  .classes-table li{
    position: relative;
    height: 120px !important;
  }
  .main-page-title{
    font-size: 18px;
    color:#333;
    line-height: 77px;
    font-weight: bold;
  }


  .subjects-btn span{
    padding: 0 5px;
  }
  .my-product-box-r{
    width:100px;
  }
  .my-product-box-r img{
    height: 14px;
    margin-top: 17px;
  }
  .my-product-box-r span{
    font-size: 14px;
    color:#666;
    margin-right: 10px;
  }
  .my-product-box li div{
    display: flex;
    justify-content: flex-start;
  }
  .my-product-box li {
    display: flex;
    cursor: pointer;
    overflow: hidden;
    justify-content: space-between;
    line-height: 50px;
    border-top: 1px solid #e5e5e5;
  }
  .my-product-box-l img{
    width: 20px;
    height: 20px;
    margin-top: 15px;
    margin-right: 10px;

  }
</style>
