<template>
  <div class="hello" style="background: #f7f7f7;overflow:hidden;">
    <div class="pc-center ">
      <div class="search-types-box">
        <div class="search-step">元儒教育城 > 全部类别 > 搜索</div>
        <div class="search-type-items">
          <a href="javascript:;">方向：</a>
          <div>
            <span @click="chooseOneLevel(null)" :class="{'search-type-active':!sortId}">全部</span>
            <span :class="{'search-type-active':sortId == item.id}" @click="chooseOneLevel(item)"
                  v-for="(item,index) in sortList">{{item.name}}</span>
          </div>
        </div>
        <div class="search-type-items" style="border-bottom: none;">
          <a href="javascript:;">类别：</a>
          <div>
            <span @click="chooseTwoLevel(null)" :class="{'search-type-active':!twoSortId}">全部</span>
            <span :class="{'search-type-active':twoSortId == item.id}" @click="chooseTwoLevel(item)"
                  v-for="item in twoSortList">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="search-ps">以下是搜索<span v-show="searchType==1">课程</span><span v-show="searchType==0">机构</span>的结果</div>
      <div class="search-result-type">
        <span @click="searchTypeTab(0)" :class="{'search-result-type-active' : searchType==0}">机构</span>
        <span @click="searchTypeTab(1)" :class="{'search-result-type-active' : searchType==1}">课程</span>
      </div>
      <div v-show="searchType==0" class="pc-list-l">
        <div style="padding:20px">
          <div class="no-more" v-if="organList.length==0">暂时没有搜到相关数据</div>
          <ul class="list-list" v-else>
            <div v-for="item in organList" @click="openOrganDetail(item.id)">
              <li>
                <div class="organ-logo" :style="{backgroundImage: 'url(' + item.logoUrl + ')'}">
                </div>
                <div class="organ-detail">
                  <div class="organ-title">{{item.orgName}}</div>
                  <div class="organ-products">{{item.orgIntro}}</div>
                  <div class="organ-products">课程总数:{{item.countProduct}}</div>
                  <div class="organ-signup-btn">
                    <div class="organ-free-btn" @click.stop="showForm(0,item)">免费预约试听</div>
                    <div class="organ-getprice-btn" @click.stop="showForm(1,item)">获取更低报价</div>
                    <span>平均6分钟得到答复!</span>
                  </div>
                </div>
                <div class="organ-list-grade">
                  <p>综合评分 <span>{{item.userGrade}}</span></p>
                  <div>真实评价 <span>{{item.evaCount}}个</span></div>
                </div>
              </li>
            </div>
          </ul>
          <div class="block">
            <el-pagination
              background
              @current-change="handleCurrentChangeOrg"
              :current-page="orgPagenum"
              :page-size="10"
              layout="prev, pager, next"
              :total="orgTotal">
            </el-pagination>
          </div>
        </div>

      </div>
      <div v-show="searchType==1">
        <div class="fpl-list" style="padding-top: 10px">
          <div class="organ-product-list-class">
            <span :class="{'active-product-list-class':proType == ''}" @click="chooseTypeSearch('')">最热</span>
            <span :class="{'active-product-list-class':proType == 'live'}" @click="chooseTypeSearch('live')">直播</span>
            <span :class="{'active-product-list-class':proType == 'group'}" @click="chooseTypeSearch('group')">拼团</span>
            <span :class="{'active-product-list-class':proType == 'cut'}" @click="chooseTypeSearch('cut')">砍价</span>
            <span :class="{'active-product-list-class':proType == 'coin'}" @click="chooseTypeSearch('coin')">兑换课</span>
          </div>
          <div class="no-more" v-if="productList.length==0">暂时没有搜到相关数据</div>
          <ul v-else>
            <li @click="openProductDetail(item)" v-for="item in productList">
              <div class="fpl-cover">
                <img :src="item.imageUrl" alt="">
              </div>
              <div style="padding: 20px;background: #eeeeee">
                <div class="fpl-title">
                  {{item.productName}}
                </div>
                <span class="fpl-livetime">{{item.productIntro}}</span>
              </div>
              <div class="fpl-price">
                <div class="commise-fpl">
                  售价:￥{{item.productPrice}}
                </div>
                <span>{{item.purchaseNum}}人已报名</span>
              </div>
            </li>
            <li></li>
            <li></li>
            <li style="display: none">
              <div class="fpl-cover">
                <img src="../assets/img/videotbg.png" alt="">
              </div>
              <div style="padding: 20px">
                <div class="fpl-title">
                  2021中财财经大学MBA项目宣2021中财财经大学MBA项目宣......
                </div>
                <span class="fpl-livetime"> 直播时间：4月16日 19:30-20:30</span>
              </div>

              <div class="fpl-price">
                <div class="commise-fpl">
                  售价￥450
                </div>
                <span>15456人已报名</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="block">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-size="12"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <signupc ref="signupc1" v-show="handlerFlag"></signupc>
  </div>
</template>
<script>
  // require styles
  //  import Swiper from 'swiper';
  import signupc from '../components/signupc';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        proType:'',
        handlerIndex: 0, //选择联系方式
        handlerFlag: false, //操作弹框
        productList: [],
        total: 0,
        pagenum: 1,

        organList: [],
        orgTotal: 0,
        orgPagenum: 1,


        searchType: 0,
        searchWord: "",

        sortList: [], //所有方向包括分类
        twoSortList: [],//选中一个方向后的分类列表
        sortId: null,
        twoSortId: null,
        campus: [],
        handlerObj: {
          productName: '',
          campus: '',
          campusIndex:null,
          phone: '',
          name: '',
          type: 0
        },
      }
    },
    components:{
      signupc
    },
    computed: {},
    created() {
      this.getSortList();
      this.$emit('header_two', true);
      this.sortId = this.$route.query.sortId || null;
      this.twoSortId = this.$route.query.twoSortId || null;
      this.searchWord = this.$route.query.word || '';
      this.proType = this.$route.query.proType || '';
      if(this.proType){
        this.searchType = 1;
      }
      this.searchProductResultByWord();
      this.searchOrganResultByWord();
    },
    methods: {
      chooseTypeSearch(t){
        this.proType = t;
        this.pagenum = 1;
        this.searchProductResultByWord();
      },
      //显示报名弹框
      showForm(t, data) {
        this.handlerFlag = true;
        this.$refs.signupc1.$emit('partner', {orgId: data.id,orgCampus:data.orgCampus ? JSON.parse(data.orgCampus) : [],t:t}) // 方法1:触发监听事件
      },
      //根据方向获取分类列表
      chooseOneLevel(data) {
        this.sortId = data ? data.id : null;
        this.twoSortId = null;
        this.twoSortList = data ? data.children : [];
        if (this.searchType == 0) {
          this.orgPagenum = 1;
          this.searchOrganResultByWord();
        } else {
          this.pagenum = 1;
          this.searchProductResultByWord();
        }
      },
      //选择一个分类
      chooseTwoLevel(data) {
        this.twoSortId = data ? data.id : null;
        if (this.searchType == 0) {
          this.orgPagenum = 1;
          this.searchOrganResultByWord()
        } else {
          this.pagenum = 1;
          this.searchProductResultByWord();
        }
      },
      //获取类型列表
      getSortList() {
        this.http.post('/dir/queryProductSortNoOne', {}).then(res => {
          if (res.code == 0) {
            this.sortList = res.data;
          }
        })
      },
      //切换搜索
      searchTypeTab(t) {
        this.searchType = t;
      },
      openOrganDetail(id) {
        this.openNewPage('/pages/orgdetail',{orgId:id})
        // let routeUrl = this.$router.resolve({
        //   path: "/pages/organ_detail",
        //   query: {id: id}
        // });
        // window.open(routeUrl.href, '_blank');
      },
      openProductDetail(data) {
        this.openProductDetailByType(data.productList ? data.productList : data)
      },
      //搜索机构
      searchOrganResultByWord() {
        this.http.post('/dir/queryOrgSortSearchPC', {
          name: this.searchWord,
          pageNum: this.orgPagenum,
          pageSize: 10,
          sortTwo: this.sortId,
          sortThree:this.twoSortId
        }).then(res => {
          if (res.code == 0) {
            this.organList = res.data.list;
            this.orgTotal = res.data.total;
          } else {
            this.stoast('暂无数据');
          }
        })
      },
      //搜索课程
      searchProductResultByWord() {
        this.http.post('/dir/queryProdyctListSortIdOrName', {
          key: this.searchWord,
          pageNum: this.pagenum,
          pageSize: 12,
          secondSortId: this.twoSortId,
          sortId: this.sortId,
          type:this.proType
        }).then(res => {
          if (res.code == 0) {
            this.productList = res.data.list;
            this.total = res.data.total;
          } else {
            this.stoast('暂无数据');
          }
        })
      },
      handleCurrentChange(val) {
        this.pagenum = val;
        this.searchProductResultByWord();
      },
      handleCurrentChangeOrg(v) {
        this.orgPagenum = v;
        this.searchOrganResultByWord();
      },
    },
    watch: {}
  }
  import '../assets/css/common.css';
  import '../assets/css/list.css';
  import '../assets/css/index.css';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .active-product-list-class {
    background: #ec6941 !important;
    color: #fff !important;
  }
  .organ-product-list-class span{
    cursor: pointer;
    font-size: 14px;
    color:#6b6b6b;
    line-height: 37px;
    padding: 0 45px;
    border: 1px solid #e5e5e5;
  }
  .organ-product-list-class{
    padding: 8px 0;background: #fff;
    display: flex;
    justify-content: flex-start;
  }
  .no-more {
    text-align: center;
    padding: 20px;
  }

  .organ-list-grade div {
    margin-top: 10px;
  }

  .organ-list-grade div span {
    color: #ff6200;
    font-size: 12px;
  }

  .organ-list-grade p span {
    font-size: 24px;
    color: #ff6200;
    font-weight: bold;
  }

  .organ-list-grade {
    color: #7c7c7c;
    font-size: 12px;
    position: absolute;
    right: 40px;
    top: 35px;
  }

  .organ-getprice-btn {
    color: #ec6941;
    border: 1px solid #ec6941
  }

  .organ-free-btn {
    background: #ec6941;
    color: #fff;
  }

  .organ-signup-btn span {
    font-size: 12px;
    color: #ec6941;
    line-height: 40px;
  }

  .organ-signup-btn div {
    cursor: pointer;
    padding: 9px 17px;
    border-radius: 3px;
    font-size: 14px;
    margin-right: 10px;
  }

  .organ-signup-btn {
    display: flex;
    margin-top: 5px;
    justify-items: flex-start;
  }

  .search-result-type-active {
    background: #ec6941 !important;
    color: #fff !important;
  }

  .search-result-type span {
    line-height: 46px;
    font-size: 18px;
    padding: 0 30px;
    color: #414141;
    cursor: pointer;

  }

  .search-result-type {
    display: flex;
    justify-items: flex-start;
    border-bottom: 2px solid #ec6941;
  }

  .search-ps span {
    color: #ec6941;
  }

  .search-ps {
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    margin-top: 4px;
    line-height: 46px;
    padding: 0 20px;
    background: #fafafa;
    color: #606060;
    font-size: 14px;
  }

  .search-types-box {
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
  }

  .search-type-active {
    color: #ec6941 !important;
    background: #fceae4;
  }

  .search-type-items div {
    margin-top: 22px;
    flex: 1;
  }

  .search-type-items a {
    line-height: 85px;
    color: #1b1b1b;
    font-size: 16px;
  }

  .search-type-items span {
    border-radius: 3px;
    cursor: pointer;
    display: inline-block;
    margin-left: 20px;
    padding: 8px 15px;
    color: #656565;
    font-size: 14px;
  }

  .search-type-items {
    border-bottom: 1px dashed #bfbfbf;
    background: #fff;
    padding: 0 30px 10px 30px;
    display: flex;
    justify-items: center;
    justify-content: flex-start;
  }

  .search-step {
    font-size: 14px;
    color: #939393;
    line-height: 47px;
    padding: 0 30px;
    background: #fafafa;
  }

  .fpl-list ul li {
    width: 254px;
    margin-bottom: 30px;
  }

  .fpl-list {
    margin-bottom: 20px;
    width: 1120px;
    background: #fff;
    padding: 40px;
    height: auto;
  }

  .fpl-price {
    background: #eeeeee;
  }

</style>
