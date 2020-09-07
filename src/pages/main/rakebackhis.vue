<!--suppress BadExpressionStatementJS -->
<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>
    <div class="pc-center" >
      <div class="mianbox" style="overflow: hidden">
        <div class="main-left">
          <p>返佣记录</p>
        </div>
        <ul class="rake-list">
          <li v-for="item in rakebackList">
            <img src="../../assets/img/zzw/moneyicon.png" alt="">
            <div class="rake-item">
              <p>返佣</p>
              <div class="rake-timeandsource">
                <span>{{item.createTime}}</span>
                <div>
                  来源于: <span>{{item.orgName}}</span>-<span>{{item.productName}}</span>
                </div>
              </div>
            </div>
            <p class="comisse-price">+ ￥{{item.commissionAmount}}</p>
          </li>
        </ul>
        <div class="block">
          <el-pagination
            background
            @current-change="getrakebackListByPagenum"
            :current-page="rakePage"
            :page-size="5"
            layout="prev, pager, next"
            :total="rakebackTotal">
          </el-pagination>
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
      rakePage:1,
      rakebackTotal:0,
      rakebackList:[],
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.$emit('header_two',false)
    this.getRateBackList();
  },
  methods:{

    //获取收藏机构
    getRateBackList(){
      this.http.post('/dir/queryDirUserCommissionArrByUserId',{pageNum:this.rakePage,pageSize:5}).then(res=>{
        if(res.code == 0){
          for(var i=0;i<res.data.list.length;i++){
            res.data.list[i].createTime = this.formatTimeToDay(res.data.list[i].createTime)
          }
          this.rakebackList = res.data.list;
          this.rakebackTotal = res.data.total;
        }
      })
    },
    //机构切页
    getrakebackListByPagenum(val){
      this.rakePage = val;
      this.getRateBackList();
    },
    //打开机构首页详情
    openOrgDetail(data){
      this.openNewPage('/pages/orgdetail',{orgId:data.id})
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
  .rake-timeandsource div span{
    color:#f3593c;
    font-size: 12px;
    text-decoration: underline;
  }
  .rake-timeandsource div{
    color:#8b8b8b;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
  }
  .rake-timeandsource>span{
    color:#8b8b8b;
    font-size: 12px;
  }
  .rake-timeandsource div{
    margin-left: 30px;
  }
  .rake-timeandsource{
    display: flex;
    line-height: 15px;
    margin-top: 5px;
    justify-content: flex-start;
  }
  .rake-item  p{
    font-size: 18px;
    color:#010101;
  }
  .rake-item {
    margin-left: 20px;
  }
  .rake-list li img{
    height: 31px;
    margin-top: 5px;
    width: 27px;
  }

  .comisse-price{
    position: absolute;
    right: 30px;
    top:30px;
    font-weight: bold;
    color:#f20e0e;
    font-size: 18px;
  }
  .rake-list li {
    position: relative;
    box-shadow: 1px 1px 10px #b9bbbb;
    padding: 20px 34px;
    display: flex;
    justify-content: flex-start;
  }
  .rake-list{
    margin-top: 10px;
  }
</style>
