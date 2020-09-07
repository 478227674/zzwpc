<!--suppress BadExpressionStatementJS -->
<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>
    <div class="pc-center" >
      <div class="mianbox" style="overflow: hidden">
        <div class="main-left">
          <p>合伙店铺</p>
        </div>
        <div class="class-list-box">
          <ul class="col-orglist">
            <li v-for="item in partnerList" @click="openOrgDetail(item)">
              <div class="col-org-left">
                <img :src="item.logoUrl" alt="">
                <div class="col-org-text">
                  <p>{{item.orgName}}</p>
                  <div class="desc-item">{{item.orgIntro}}</div>
                  <div class="getcommise-price">
                    <span>商品总数:{{item.countProduct}}</span>
                    <a href="javascript:;">已赚佣金:￥{{item.commissionAmount}}</a>
                  </div>
                </div>
              </div>
              <div class="cancle-col">去赚佣金</div>
            </li>
          </ul>
          <div class="block">
            <el-pagination
              background
              @current-change="getpartnerListByPagenum"
              :current-page="partnerPage"
              :page-size="5"
              layout="prev, pager, next"
              :total="partnerTotal">
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
      partnerPage:1,
      partnerTotal:0,
      partnerList:[],
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.$emit('header_two',false)
    this.getPartnerList();
  },
  methods:{
    //获取收藏机构
    getPartnerList(){
      this.http.post('/dir/queryDirUserOrgInfoArr',{pageNum:this.partnerPage,pageSize:5}).then(res=>{
        if(res.code == 0){
          this.partnerList = res.data.list;
          this.partnerTotal = res.data.total;
        }
      })
    },
    //机构切页
    getpartnerListByPagenum(val){
      this.partnerPage = val;
      this.getPartnerList();
    },
    //打开机构首页详情
    openOrgDetail(data){
      this.openNewPage('/pages/orgdetail',{orgId:data.id})
    },

  },
}
  import '../../assets/css/common.css';
  import '../../assets/css/style.css'
  import '../../assets/css/order.css'
</script>
<style scoped>
  .getcommise-price{
    display: flex;
    justify-content: flex-start;
  }
  .getcommise-price a{
    margin-left: 20px;
    margin-top: 10px;
  }
  .getcommise-price a {
    font-size: 12px;
    color:#ff6200;
    text-decoration: underline;
  }
</style>
