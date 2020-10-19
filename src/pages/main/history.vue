<!--suppress BadExpressionStatementJS -->
<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>
    <div class="pc-center" >
      <div class="mianbox" style="overflow: hidden">
        <div class="main-left">
          <p>浏览记录</p>
          <div class="main-center-line"></div>
          <div class="mainclass-tab">
            <span @click="chooseThisTab(0)" :class="{'tab-active':tabindex==0}">课程</span>
            <span @click="chooseThisTab(1)" :class="{'tab-active':tabindex==1}">店铺</span>
          </div>
        </div>
        <div class="his-list-box" v-show="tabindex==0">
          <ul class="his-list">
            <li v-for="item in hisProductList" @click="openProductDetail(item)">
              <span class="browser-time">{{item.createTime}}</span>
              <div class="position-div"></div>
              <div class="his-div">
                <div class="his-org-cover">
                  <img :src="item.imageUrl" alt="">
                  <div style="display: none">
                    <span>24课时</span>
                  </div>
                </div>
                <div class="his-title">
                  <div>{{item.productName}}</div>
                  <span>{{item.productIntro}}</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="block">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="pagenum"
              :page-size="5"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="his-list-box" v-show="tabindex==1">

          <ul class="his-list">
            <li v-for="item in hisOrgList" @click="openOrgDetail(item.orgId)">
              <span class="browser-time">{{item.createTime}}</span>
              <div class="position-div"></div>
              <div class="his-div">
                <div class="his-cover">
                  <img :src="item.imageUrl" alt="">
                </div>
                <div class="his-title">
                  <div>{{item.orgName}}</div>
                  <span>{{item.orgIntro}}</span>
                </div>
              </div>
            </li>
            <li style="display: none">
              <span class="browser-time">刚刚</span>
              <div class="position-div"></div>
              <div class="his-div">
                <div class="his-cover">
                  <img src="../../assets/img/teststoreicon.png" alt="">
                </div>
                <div class="his-title">
                  <div>这里是标题</div>
                  <span>这里是描述</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="block">
            <el-pagination
              background
              @current-change="gethisOrgListByPagenum"
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
      hisProductList:[],
      orgPage:1,
      orgTotal:0,
      hisOrgList:[],
      tabindex:0,
      clicktype:1,
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.$emit('header_two',false)
    this.getBroProductList();
    this.getBroOrgList();
  },
  methods:{
    chooseThisTab(t){
      this.tabindex = t;
    },
    //获取收藏课程
    getBroProductList(){
      this.http.post('/dir/queryBroweHistory',{pageNum:this.pagenum,pageSize:this.pagesize}).then(res=>{
        if(res.code == 0){
          this.hisProductList = res.data.list;
          this.total = res.data.total;
        }
      })
    },
    //获取收藏机构
    getBroOrgList(){
      this.http.post('/dir/queryDirUserBrowseSearch',{pageNum:this.orgPage,pageSize:5}).then(res=>{
        if(res.code == 0){
          for(var i=0;i<res.data.list.length;i++){
            res.data.list[i].createTime = this.formatTimeToDay(res.data.list[i].createTime)
          }
          this.hisOrgList = res.data.list;
          this.orgTotal = res.data.total;
        }
      })
    },
    //产品切页
    handleCurrentChange(val){
      this.pagenum = val;
      this.getBroProductList();
    },
    //机构切页
    gethisOrgListByPagenum(val){
      this.orgPage = val;
      this.getBroOrgList();
    },
    //打开产品详情
    openProductDetail(data){
        this.openProductDetailByType(data)
    },
    //打开机构首页详情
    openOrgDetail(id){
      this.openNewPage('/pages/orgdetail',{orgId:id})
    },
    //取消关注机构
    cancleCollectOrg(data){

    },
  },
}
  import '../../assets/css/common.css';
  import '../../assets/css/style.css'
  import '../../assets/css/order.css'
</script>
<style scoped>
  .his-list-box{
    margin-top: 20px;
  }
  .his-org-cover div span{
    color:#fff;
    font-size: 12px;
    position: absolute;
    bottom:8px;
    right: 8px;
  }
  .his-org-cover div{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0px;
    left: 0px;
    background: rgba(0,0,0,0.5);
  }
  .his-org-cover{
    position: relative;
    width: 112px;
    height: 75px;
  }
  .his-org-cover img{
    width: 100%;
    height: 100%
  }
  .his-title span{
    font-size: 12px;color:#2a2a2a;
  }
  .his-title div{
    margin-bottom: 10px;
    font-size: 18px;
    color:#2a2a2a;
    font-weight: bold;
  }
  .his-title {
    margin-left: 20px;
  }
  .his-cover img{
    width: 100%;
    height: 100%;
  }
  .his-cover {
    width: 65px;
    height: 65px;
    border:1px solid #dcdcdc;
  }
  .browser-time{
    font-size: 14px ;
    color:#7f7f7f;
  }
  .his-div {
    display: flex;
    margin-top: 10px;
    justify-content: flex-start;
  }
  .position-div{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #c9c9c9;
    position: absolute;
    left: -5px;
    top:0px;
  }
  .his-list li {
    cursor: pointer;
    padding-bottom: 30px;
    border-left: 1px solid #c9c9c9;
    padding-left: 25px;
    position: relative;
  }
</style>
