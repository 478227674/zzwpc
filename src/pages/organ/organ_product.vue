<template>
  <div class="hello" style="background: #f5f5f5">
    <orghead></orghead>
    <div class="pc-center organ-product-list">
      <div class="organ-product-list-left">
        <div class="organ-product-list-class">
          <span :class="{'active-product-list-class':typeIndex == 0}" @click="chooseTypeSearch(0)">最热</span>
          <span :class="{'active-product-list-class':typeIndex == 1}" @click="chooseTypeSearch(1)">直播</span>
          <span :class="{'active-product-list-class':typeIndex == 2}" @click="chooseTypeSearch(2)">拼团</span>
          <span :class="{'active-product-list-class':typeIndex == 3}" @click="chooseTypeSearch(3)">砍价</span>
          <span :class="{'active-product-list-class':typeIndex == 4}" @click="chooseTypeSearch(4)">兑换课</span>
        </div>
        <div>
          <div class="free-product-list">
            <div class="fpl-list" style="width: 100%;height:auto">
              <ul>
                <li class="time-c" @click="openProductDetail(item)" v-for="item in productList">
                  <div class="fpl-cover">
                    <img :src="item.imageUrl" alt="">
                  </div>
                  <div style="padding: 20px">
                    <div class="fpl-title">
                      {{item.productName}}
                    </div>
                    <span class="fpl-livetime"> {{item.productIntro}}</span>
                  </div>

                  <div class="fpl-price">
                    <div class="commise-fpl">
                      售价:￥{{item.productPrice}}
                    </div>
                    <span>{{item.purchaseNum}}人已报名</span>
                  </div>
                  <div class="share-can-get linear-gray-btn">
                    推广赚￥{{item.commissionRebate || 0}}
                  </div>
                </li>
                <li style="background: none"></li>
                <li style="background: none"></li>
                <li class="time-c" style="display: none">
                  <div class="fpl-cover">
                    <img src="../../assets/img/videotbg.png" alt="">
                  </div>
                  <div style="padding: 20px">
                    <div class="fpl-title">
                      2021中财财经大学MBA项目宣2021中财财经大学MBA项目宣......
                    </div>
                    <span class="fpl-livetime"> 直播时间：4月16日 19:30-20:30</span>
                  </div>

                  <div class="fpl-price">
                    <div class="commise-fpl">
                      售价:￥111
                    </div>
                    <span>222人已报名</span>
                  </div>
                  <div class="share-can-get linear-gray-btn">
                    推广赚￥69.3
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
          </div>
        </div>

      </div>
      <div class="organ-product-list-right">
        <div class="right-title">热门课程</div>
        <div class="right-list">
          <div class="right-list-item" @click="openProductDetail(item)" v-for="item in hotClass">
            <div class="right-item-cover">
              <img :src="item.imageUrl" alt="">
            </div>
            <div class="right-detail">
              <p>{{item.productName}}</p>
              <span>{{item.productIntro}}</span>
              <div>
                <a href="javascript:;">￥{{item.productPrice}}</a>
                <span>{{item.purchaseNum}}人已报名</span>
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
        productList: [],
        total: 0,
        pagenum: 1,
        pagesize: 9,
        requestUrl:'/dir/queryProductListRedu',
        urlList:[
          '/dir/queryProductListRedu',
          '/dir/queryProductListZhibo',
          '/dir/queryProductListPintuan',
          '/dir/queryProductListKanjia',
          '/dir/queryProductListDuihuan',
        ],
        typeIndex:0,
        hotClass:[],
      }
    },
    components:{
      orghead
    },
    created(){
      this.orgId = this.$store.state.user.activeOrgId;
      this.$emit('header', false)
      this.getProductListByType();
      this.getHotClass();
    },
    methods:{
      //获取机构热门课程
      getHotClass(){
        this.http.post('/dir/queryDirProductRecomByOrgId',{orgId:this.orgId,pageSize:6,pageNum:1}).then(res=>{
          if(res.code == 0){
            this.hotClass = res.data.list;
          }
        })
      },
      //选择类型筛选
      chooseTypeSearch(t){
        this.typeIndex = t;
        this.requestUrl = this.urlList[t]; //切换请求路径
        this.pagenum = 1;
        this.getProductListByType();
      },
      //打开课程详情
      openProductDetail(data) {
        this.openProductDetailByType(data)
      },
      //筛选课程列表
      getProductListByType() {
        var obj = {
          pageNum: this.pagenum,
          pageSize: this.pagesize,
          orgId: this.orgId,
        };
        this.http.post(this.requestUrl, obj).then(res => {
          if (res.code == 0) {
            this.productList = res.data.list;
            this.total = res.data.total
            if (res.data.list.length == 0 && this.pagenum == 1) {
              this.stoast('暂时没有查到更多数据')
              this.productList = []
            }
          }
        })
      },
      //切换页码课程
      handleCurrentChange(val) {
        this.pagenum = val;
        this.getProductListByType();
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
  import '../../assets/css/index.css'
  import '../../assets/css/organ.css'
</script>
<style scoped>
  .fpl-list > ul li{
    margin-bottom: 10px;
  }
</style>
