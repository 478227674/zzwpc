<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>

    <div class="pc-center">
      <div class="mianbox">
        <ul class="classes-table">
          <li>
            <div class="class-orderid">
              <span>订单号：{{oobj.orderId}}</span>
              <div>{{oobj.orgName}} {{oobj.createTime}}</div>
            </div>
            <div class="class-detail-box">
              <div class="class-detail-img">
                <div class="class-detail-img-box">
                  <img :src="oobj.imageUrl" alt="">
                </div>
                <div class="class-detail-d-box">
                  <p>{{oobj.productName}}</p>
                  <div><span>{{oobj.className}}</span></div>
                  <a href="javascript:;">开课时间: {{oobj.startTime}}</a>
                </div>
              </div>
              <div class="class-detail-price">
                ￥{{oobj.productPrice}}
              </div>
              <div class="class-detail-pay" v-show="oobj.orderStatus==0">
                <span v-show="(oobj.isCut==1 &&oobj.isGroup==0 ) || oobj.isCut==1 &&oobj.isGroup==1">￥{{oobj.orderPrice}}</span>
                <span v-show="oobj.isCut==0">￥{{oobj.orderPrice}}</span>
                <p v-show="oobj.isGroup==1">拼团省 <span>￥{{oobj.productPrice-oobj.orderPrice}}</span> </p>
                <p v-show="oobj.isCut==1">可砍 <span>￥{{appOrderCut.cutFloorPrice}}</span>,已砍掉<span>￥{{oobj.cutPrice}}</span> </p>
              </div>
              <div class="class-detail-pay"  v-show="oobj.orderStatus==1" >
                <span>￥{{oobj.payPrice}}</span>
                <p v-show="oobj.isGroup==1">拼团省 <span>￥{{oobj.productPrice-oobj.orderPrice}}</span> </p>
                <p v-show="oobj.isCut==1">可砍 <span>￥{{appOrderCut.cutFloorPrice}}</span>,已砍掉<span>￥{{oobj.cutPrice}}</span> </p>
              </div>
              <div class="class-detail-pay"  >
                <p v-show="oobj.orderStatus==0" >未支付</p>
                <p v-show="oobj.orderStatus==1" >已支付</p>
                <p v-show="oobj.orderStatus==2" >已过期 </p>
              </div>
              <div class="class-detail-handle">
              <span class="classs-handle-btn-n" v-show="oobj.isCutEnd" @click="getQrcode">
                继续分享
                <div id="qrcode" class="qrcode"></div>

              </span>
                <!--<span class="classs-handle-btn-n">申请退款</span>-->
                <!--<span class="classs-handle-btn-y" @click="openComment">立即评价</span>-->
                <!--<span class="classs-handle-btn-y">确认上课</span>-->
              </div>
              <div style="clear: both"></div>
            </div>
          </li>
        </ul>
        <div class="success-box">
          <div class="success-box-d" v-show="oobj.orderStatus==1">
            <img src="../../assets/img/buysuccess.png" alt="">
            <div>
              <span>报名成功</span>
              <div>
                订单金额：<span>￥{{oobj.payPrice}}</span>
              </div>
            </div>
          </div>
          <ul class="jingshi">
            <li>
              <div>
                安全提醒
              </div>
              <p>付款成功后，元儒教育城不会以付款异常、卡单、系统升级为由联系您。<span>请勿泄露银行卡号、手机验证码。否则会造成钱款损失。谨防电话诈骗！</span></p>
            </li>
            <li>
              <div>
                特别说明
              </div>
              <p>开课一周内请登录平台确认，上课良好，学费转付机构或者不满意，退还所有学费。</p>
            </li>
            <li>
              <div>
                返佣特权
              </div>
              <p>报名成功您享有精品特价权，返佣金额为所推荐学员报名特价课学费比列的90%</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../../components/mainhead'
  import QRCode from "qrcodejs2"; //引入生成二维码插件
  import config from "../../config"; //引入生成二维码插件
  export default {
  name: 'HelloWorld',
  data () {
    return {
      clicktype:1,
      oid:null,
      oobj:{},
      appOrderCut:{},

    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.oid = this.$route.query.id;
    this.getOrderDetail();
    this.$emit('header_two',false)

//    this.$emit('footer',false)
  },
  methods:{
    getQrcode(){
      if(!localStorage.getItem('diruserinfo')){
        this.$router.push('/pages/login');
        return;
      }
      var shareUrl = '';
      var user = JSON.parse(localStorage.getItem('diruserinfo'))
      shareUrl = config.wxUrl +  'productshare.html?id='+ this.oid+'&mainid='+ user.userId + '&'
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
    openComment(){
        this.$router.push('/pages/mainclasscomment')
    },
    getOrderDetail(){
      this.http.post('/order/queryOrderInfo',{orderId:this.oid}).then(res=>{
        if(res.code == 0){
          res.data.startTime = this.formatTimeToDate(res.data.startTime)
          res.data.endTime = this.formatTimeToDate(res.data.endTime)
          res.data.createTime = this.formatTimeToDate(res.data.createTime)
          this.oobj = res.data
          this.appOrderCut = res.data.appOrderCut;
          if(this.oobj.isCut == 1){
            if(new Date().getTime()<this.oobj.appOrderCut.cutEndTime){
                this.oobj.isCutEnd = true;
            }
          }
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
  .class-detail-img{
    padding-left: 0;
  }
  .jingshi div{
    font-size: 16px;
    color:#ff5000;
    margin-bottom: 15px;
  }
  .jingshi p{
    font-size: 14px;color:#333;
  }
  .jingshi p span{
    color:#ff5000;
  }
  .jingshi li{
    border-bottom: 1px solid #e5e5e5;
    padding: 20px 0px;
  }
  .success-box-d>div>div span{
    color:#f7260a;
  }
  .success-box-d>div>div{
    margin-top: 20px;
    font-size: 12px;color:#333;
  }
  .success-box-d>div{
    margin-left: 20px;
  }
  .success-box-d>div>span{
    display: block;
    margin-top: 20px;
    color:#333;
    font-size: 16px;
  }
  .success-box-d img{
    height:90px;
  }
  .success-box-d{
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: flex-start;
  }
  .success-box{
    padding:0 20px 20px 20px;background: #fff;
  }
  .classes-table{
    padding:20px 20px 20px 20px;background: #fff;
  }


</style>
