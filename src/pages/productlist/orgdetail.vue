<template>
  <div class="hello" style="background: #f7f7f7;overflow:hidden;">
    <div class="pc-center store-detail">
      <div class="store-detailbox">
        <div class="store-head-and-name">
          <div class="store-head">
            <img :src="orgObj.logoUrl" alt="">
          </div>
          <div class="store-text">
            <p>{{orgObj.orgName}}
              <img src="../../assets/img/zzw/noc.png"  @click="collectionOrg(1)" v-if="!orgObj.isCollection" alt="">
              <img src="../../assets/img/zzw/yesc.png" @click="collectionOrg(0)" v-if="orgObj.isCollection" alt="">
              <span>申请成为店铺合伙人</span>
            </p>
            <div>{{orgObj.orgIntro}}</div>
            <span>商品总数:{{orgObj.countProduct}}</span>
          </div>

          <div class="store-qrcode">
            <div id="qrcode"></div>
<!--            <span>微信扫码</span>-->
<!--            <span>访问内容方店铺</span>-->
          </div>
        </div>
        <div class="conact-store">
          <div>联系店家</div>
          <p>电话:{{orgObj.orgPhone}}</p>
          <p>座机:{{orgObj.orgTelephone}}</p>
        </div>
      </div>
    </div>
    <div class="pc-center">
      <div class="screen-box">
        <div>
          <select name="" v-model="priceIndex" @change="getPrice">
            <option :value="null">价格</option>
            <option :value="index" v-for="(item,index) in priceList">
              <span v-if="item.max">{{item.min}} - {{item.max}}</span>
              <span v-else> >{{item.min}} </span>
            </option>
          </select>
        </div>
        <div>
          <select name="" v-model="commIndex" @change="getCommise">
            <option :value="null">佣金</option>
            <option :value="index" v-for="(item,index) in commList">
              <span v-if="item.max">{{item.min}} - {{item.max}}</span>
              <span v-else> >{{item.min}} </span>
            </option>
          </select>
        </div>
        <div>
          <select name="" v-model="time" @change="getTime">
            <option :value="null">默认顺序</option>
            <option value="desc">时间倒序</option>
            <option value="asc">时间正序</option>
          </select>
        </div>
      </div>
    </div>
    <div class="pc-center" style="padding-bottom: 20px;">
      <div class="free-product-list">
        <div class="fpl-list" style="width: 100%;">
          <ul>
            <li class="time-c" @click="openProductDetail(item)" v-for="item in productList" >
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
                <div class="commise-fpl" >
                  售价:￥{{item.productPrice}}
                </div>
                <span>{{item.purchaseNum}}人已报名</span>
              </div>
              <div class="share-can-get linear-gray-btn">
                推广赚￥{{item.commissionRebate}}
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
                <div class="commise-fpl" >
                  售价:￥111
                </div>
                <span>222人已报名</span>
              </div>
              <div class="share-can-get linear-gray-btn">
                推广赚￥69.3
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import QRCode from "qrcodejs2"; //引入生成二维码插件

  export default {
    name: 'HelloWorld',
    data () {
      return {
        onelevelId:null,
        twolevelId:null,
        thrlevelId:null,
        allTotal:0,
        firstType:0,
        requestUrl:'',
        productList:[],
        total:0,
        pagenum:1,
        pagesize:5,
        typeList:[],
        typeList2:[],
        typeList3:[],
        oneIndex:0,
        jingpinList:[],
        orgAreaId:null,
        cityName:localStorage.getItem('cityName') || '北京',
        cityList:[],
        productType:null,

        priceIndex:null,
        priceList:[
          {min:0,max:199},
          {min:200,max:999},
          {min:1000,max:2999},
          {min:3000,max:6999},
          {min:7000,max:9999},
          {min:10000},
        ],

        commIndex:null,
        commList:[
          {min:1,max:99},
          {min:100,max:499},
          {min:500,max:999},
          {min:1000,max:4999},
          {min:5000,max:9999},
          {min:10000},
        ],
        time:null,
        rangeId:null,
        startPrice:null,
        endPrice:null,
        subjectId:null,

        orgId:null,
        orgObj:{},
        minPrice:'',
        maxPrice:'',
        minComPrice:'',
        maxComPrice:'',
        timeType:'',
      }
    },
    computed: {
    },
    created(){
      this.orgId = this.$route.query.orgId;
      this.$emit('header_two',true)
      if(this.$route.query.type){
        this.productType = this.$route.query.type;
      }
      this.getOrgInfor();
      this.getProductListByType();
    },
    methods:{
      //生成二维码
      createOrgQrcode(){
        var shareUrl = '';
        var user = this.$store.state.user.user || {};
        shareUrl = config.wxUrl +  'product_detail.html?orgId=' + this.orgId + '&inviteCode='+user.inviteCode + '&'
        if(document.getElementById('qrcode').innerHTML){
          document.getElementById('qrcode').innerHTML = "";
        }else{
          let qrcode = new QRCode('qrcode', {
            width:'100',
            height: '100',
            text:shareUrl, // 二维码地址
            colorDark : "#000",
            colorLight : "#FFF",
          })
        }
      },
      //收藏或取消收藏
      collectionOrg(type){
        if(type){
          this.http.post('/dir/saveDirUserCollection',{orgId:this.orgId}).then(res=>{
            if(res.code == 0){
              this.stoast('已收藏')
              this.orgObj.isCollection = true;
            }
          })
        }else{
          this.http.post('/dir/deleteDirUserCollection',{orgId:this.orgId}).then(res=>{
            if(res.code == 0){
              this.stoast('已取消收藏')
              this.orgObj.isCollection = false;
            }
          })
        }

      },
      //根据发布时间
      getTime(e){
        this.timeType = e.target.value;
        this.pagenum = 1;
        this.getProductListByType();
        console.log(e)
      },
      //根据佣金]筛选
      getCommise(){
        var commItem = this.commList[this.commIndex];
        this.minComPrice = commItem.min;
        this.maxComPrice = commItem.max ? commItem.max : 99999;
        this.pagenum = 1;
        this.getProductListByType();
      },
      //根据价格筛选
      getPrice(e){
        var priceItem = this.priceList[this.priceIndex];
        this.minPrice = priceItem.min;
        this.maxPrice = priceItem.max ? priceItem.max : 99999;
        this.pagenum = 1;
        this.getProductListByType();
      },
      //获取机构详情
      getOrgInfor(){
        this.http.post('/dir/queryOrgInfo',{orgId:this.orgId}).then(res=>{
          if(res.code == 0){
            this.orgObj = res.data;
            this.createOrgQrcode()
          }
        })
      },
      //打开课程详情
      openProductDetail(data){
        this.openProductDetailByType(data)
      },
      //筛选课程列表
      getProductListByType(){
        var obj = {
          pageNum:this.pagenum,
          pageSize:this.pagesize,
          orgId:this.orgId,
          minPrice:this.minPrice,
          maxPrice:this.maxPrice,
          minComPrice:this.minComPrice,
          maxComPrice:this.maxComPrice,
          timeType:this.timeType
        };
        this.http.post('/dir/queryProductListCommissionTrue',obj).then(res=>{
          if(res.code == 0){
            this.productList = res.data.list;
            this.total = res.data.total
            if(res.data.list.length == 0 && this.pagenum == 1){
              this.stoast('暂时没有查到更多数据')
              this.productList = []
            }
          }
        })
      },
      //切换页码
      handleCurrentChange(val){
        this.pagenum = val;
        this.getProductListByType();
      },

    },
    watch:{
      '$route'(){
        if(this.$route.query.type){
          this.productType = this.$route.query.type;
        }else{
          this.productType = null;
        }
        this.getOrgInfor();
        this.getProductListByType();
        this.initPageData();
      }
    }
  }
  import '../../assets/css/common.css';
  import '../../assets/css/list.css';
  import '../../assets/css/style.css'
  import '../../assets/css/index.css'
  import config from "../../config";
</script>
<style scoped>
  .free-product-list {
    margin-top: 20px;
  }
  .screen-box div select{
    width: 129px;
    height: 39px;
    border:1px solid #e5e5e5;
    color:#6b6b6b;
  }
  .screen-box{
    display: flex;
    justify-content: flex-start;
    padding: 8px;
    background: #fff;
  }
  .conact-store{
    height: 88px;
    margin: 15px auto;
    /*padding: 16px 0px 16px 20px;*/
  }
  .conact-store p {
    font-size: 14px;
    color:#6b6b6b;
    margin-top: 10px;
  }
  .conact-store div{
    font-size: 18px;
    font-weight: bold;
    color:#2a2a2a;

  }
  .store-qrcode div{
    width: 100px;
    height: 100px;
  }
  .store-qrcode span{
    font-size: 12px;
    color:#6b6b6b;
    display: block;
  }
  .store-text p span{
    color:#eb6100;font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
  }
  .store-qrcode  {
    position: absolute;
    top:10px;
    right: 10px;
  }
  .store-text img{
    cursor: pointer;
    margin: 0 10px;
    width: 16px;
    height: 16px;
  }
  .store-text div,.store-text > span{
    color:#6b6b6b;
    display: block;
    font-size: 14px;
    margin-top: 10px;
  }
  .store-text p {
    color:#2a2a2a;
    font-size: 18px;
    font-weight: bold;
  }
  .store-text{
    margin-left: 20px;
  }
  .store-head-and-name{
    display: flex;
    position: relative;
    justify-content: flex-start;
    width: 986px;
    border-right: 4px solid #f0f1f1;
    height: 88px;
    padding: 16px 0px 16px 20px;

  }
  .store-detailbox{
    display: flex;justify-content: space-between;
    background: #fff;
    margin-bottom: 5px;
  }

  .store-head img{
    width: 100%;
    height: 100%;
  }
  .store-head{
    width: 87px;
    height:87px;
    border:1px solid #dcdcdc;
  }
  .store-detailbox
  .store-detail{
    height: 131px;
    display: flex;
    justify-content: flex-start;
  }

</style>
