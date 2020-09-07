<!--suppress BadExpressionStatementJS -->
<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>
    <div class="pc-center" >
      <div class="mianbox" style="overflow: hidden">
        <div class="main-left">
          <p>我的收藏</p>
          <div class="main-center-line"></div>
          <div class="mainclass-tab">
            <span @click="chooseThisTab(0)" :class="{'tab-active':tabindex==0}">课程</span>
            <span @click="chooseThisTab(1)" :class="{'tab-active':tabindex==1}">店铺</span>
          </div>
        </div>
        <div class="class-list-box" v-show="tabindex == 0">
          <ul class="classes-table">
            <li v-for="item in collectProductList">
              <div class="class-detail-box">
                <div class="class-detail-img" @click="openProductDetail(item.productList)">
                  <div class="class-detail-img-box">
                    <img :src="item.productList.imageUrl" alt="">
                  </div>
                  <div class="class-detail-d-box">
                    <p>{{item.productList.productName}}</p>
                    <div class="product-type">
                      <span>上课方式：{{item.productList.productIntro}}</span>
                    </div>
                  </div>
                </div>
                <div style="clear: both"></div>
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
        <div class="class-list-box" v-show="tabindex == 1">
          <ul class="col-orglist">
            <li v-for="(item,index) in collectOrgList" @click="openOrgDetail(item)">
              <div class="col-org-left">
                <img :src="item.imageUrl" alt="">
                <div class="col-org-text">
                  <p>{{item.orgName}}</p>
                  <div class="desc-item">{{item.orgIntro}}</div>
                  <span>商品总数：{{item.countProduct}}</span>
                </div>
              </div>
              <div class="cancle-col" @click.stop="cancleCollectOrg(item,index)">取消收藏</div>
            </li>
          </ul>
          <div class="block">
            <el-pagination
              background
              @current-change="getCollectOrgListByPagenum"
              :current-page="orgPage"
              :page-size="5"
              layout="prev, pager, next"
              :total="orgTotal">
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
      pagenum:1,
      pagesize:5,
      total:1,
      collectProductList:[],


      orgPage:1,
      orgTotal:0,
      collectOrgList:[],
      tabindex:0,
      clicktype:1,
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.$emit('header_two',false)
    this.getCollectList();
    this.getCollectOrg();
  },
  methods:{
    chooseThisTab(t){
      this.tabindex = t;
    },
    //获取收藏课程
    getCollectList(){
      this.http.post('/user/queryUserFavoriteProductList',{pageNum:this.pagenum,pageSize:this.pagesize}).then(res=>{
        if(res.code == 0){
//          for(var i=0;i<res.data.list.length;i++){
//            res.data.list[i].createTime = this.formatTimeToDate(res.data.list[i].createTime)
//          }
          this.collectProductList = res.data.list;
          this.total = res.data.total;
        }
      })
    },
    //获取收藏机构
    getCollectOrg(){
      this.http.post('/dir/queryDirUserCollection',{pageNum:this.orgPage,pageSize:5}).then(res=>{
        if(res.code == 0){
          this.collectOrgList = res.data.list;
          this.orgTotal = res.data.total;
        }
      })
    },
    //产品切页
    handleCurrentChange(val){
      this.pagenum = val;
      this.getCollectList();
    },
    //机构切页
    getCollectOrgListByPagenum(val){
      this.orgPage = val;
      this.getCollectOrg();
    },
    //打开产品详情
    openProductDetail(data){
        // this.openProductDetailByType(data)
    },
    //打开机构首页详情
    openOrgDetail(data){
      this.openNewPage('/pages/orgdetail',{orgId:data.id})
    },
    //取消关注机构
    cancleCollectOrg(data,index){
      this.http.post('/dir/deleteDirUserCollection',{orgId:data.orgId}).then(res=>{
        if(res.code == 0){
          this.stoast('已取消收藏')
          this.collectOrgList.splice(index,1)
        }
      })
    },
  },
}
  import '../../assets/css/common.css';
  import '../../assets/css/style.css'
  import '../../assets/css/order.css'
</script>
<style scoped>

</style>
