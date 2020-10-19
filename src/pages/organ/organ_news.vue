<template>
  <div class="hello" style="background: #f5f5f5">
    <orghead></orghead>
    <!--学员评价-->
    <div class="pc-center organ-allbox" >
      <div class="org-common">
        <div class="org-news-list">
          <div class="org-news-item" @click="openNewsDestail(item)" v-for="item in newList">
            <img src="" alt="">
            <div class="org-news-detail">
              <p>{{item.title}}</p>
              <div v-html="item.message">

              </div>
              <span>{{item.createTime}}</span>
            </div>
          </div>
        </div>
        <div class="block">
          <el-pagination
            background
            @current-change="currenChangePage"
            :current-page="pagenum"
            :page-size="10"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div class="org-desc-hotclasses">
        <div class="store-hot-class" style="background: #fff;">
          <div class="hot-title">热门课程</div>
          <div class="hot-class-list">
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
  import orghead from '../../components/orghead'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        orgId:null,
        hotClass:[],
        newList:[],
        orgData:{},
        pagenum:1,
        total:0,

      }
    },
    components:{
      // mapa
      orghead
    },
    created(){
      this.orgId = this.$store.state.user.activeOrgId;
      this.$emit('header', false)
      this.getHotClass();
      this.getOrgNews();
    },
    methods:{
      openNewsDestail(data){
        this.openNewPage('/pages/organ_newsdetail',{id:data.id})
      },
      currenChangePage(v){
        this.pagenum = v;
        this.getOrgNews()
      },
      //打开课程详情
      openProductDetail(data) {
        this.openProductDetailByType(data)
      },
      //机构资讯
      getOrgNews(){
        this.http.post('/dir/queryDirOrgMessage', {
          orgId: this.orgId,
          pageNum: this.pagenum,
          pageSize: 10
        }).then(res => {
          if (res.code == 0) {
            for(var i=0;i<res.data.list.length;i++){
              res.data.list[i].createTime = this.formatTimeToDay(res.data.list[i].createTime)
            }
            this.newList = res.data.list;
            this.total = res.data.total;
          }
        })
      },
      //获取机构热门课程
      getHotClass(){
        this.http.post('/dir/queryDirProductRecomByOrgId',{orgId:this.orgId,pageSize:3,pageNum:1}).then(res=>{
          if(res.code == 0){
            this.hotClass = res.data.list;
          }
        })
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/index.css'
  import '../../assets/css/organ.css'
</script>
<style scoped>

</style>
