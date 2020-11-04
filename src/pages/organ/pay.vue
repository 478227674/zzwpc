<!--suppress BadExpressionStatementJS -->
<template>
  <div class="hello1" style="background: #f5f5f5;">
    <div class="order-bg">
      <div></div>
      <img src="../../assets/img/main/mainb-index.png" alt="">
    </div>
    <div class="pc-center sure-order">
      <div class="order-sure-box">
        <h1>支付订单</h1>
      </div>
      <div class="order-detail-all">
        <div class="order-detail-text">
          <div>订单编号 {{oid}}</div>
        </div>
        <ul class="classes-table">
          <li>
            <div class="class-detail-box">
              <div class="class-detail-img">
                <div class="class-detail-img-box">
                  <img :src="oobj.imageUrl" alt="">
                </div>
                <div class="class-detail-d-box">
                  <p>{{oobj.productName}}</p>
                  <div><span>上课方式：{{oobj.className}}</span></div>
                  <a href="javascript:;" style="color:#e90811;">开课时间: {{oobj.startTime}}</a>
                </div>
              </div>
<!--              <div class="order-price-new">-->
<!--                现价： <span>￥{{oobj.orderPrice}}</span>-->
<!--              </div>-->
              <!--<span class="classs-handle-btn-n">申请退款</span>-->
              <!--<span class="classs-handle-btn-y" @click="openComment">立即评价</span>-->
              <!--<span class="classs-handle-btn-y">确认上课</span>-->
              <div style="clear: both"></div>
            </div>
          </li>
        </ul>
<!--        <div class="pay-type">-->
<!--          <h4>支付方式</h4>-->
<!--          <div class="pay-type-list">-->
<!--            <div class="pay-type-item">-->
<!--              <img src="../../assets/img/wxlogo.png" alt="">-->
<!--              <span>微信支付</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
        <div style="color:#eb6100;font-size: 12px;margin-top: 25px;">
          已为你锁定课程席位，请在 15:00 内完成支付即可
        </div>
        <div class="payBox" style="margin-top: 50px;">
          <div class="pay-detail">
            <div class="real-pay1" style="font-size: 28px;">
              应付金额 <a>￥{{payPrice}}</a>
            </div>
            <p style="float:right" @click="getCode">立即支付</p>
          </div>
        </div>
      </div>

    </div>
<!--    <div class="pc-center pc-center-padding"  >-->
<!--      <div class="paynum">-->
<!--        <div>请选择支付方式</div>-->
<!--        <div class="shouldpay">应付金额：<span>￥{{payPrice}}</span> </div>-->
<!--      </div>-->

<!--    </div>-->
    <el-dialog :visible.sync="payFlag" title="微信支付" width="25%" >
      <div class="qrcodebox-pay">
        <div id="qrcodepay">

        </div>
        <div style="display: flex;justify-content: center;">
          <p>
            微信支付
          </p>
        </div>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import QRCode from "qrcodejs2"; //引入生成二维码插件

  export default {
  name: 'HelloWorld',
  data () {
    return {
      orderIntval:undefined,
      coinNum:0,
      cList:[], //优惠券列表
      isUseCoin:false, //是否使用币
      orgId:null,
      orgData:{},
      oid:null,
      appOrderCut:{},
      oobj:{},
      payFlag:false,
      myCoin:0,//我的币
      canUse:0,//可用太奇币
      payPrice:0,//实际支付
      couponId:null, //优惠券ID
      showCoupon:false, //优惠券显示和隐藏
      couponmoney:0,//优惠金额
    }
  },
  components:{
  },
  created(){
    var query = this.$route.query;
    this.oid = query.id;
    this.getOrderDetail11();
    this.payPrice = query.pay;
    if(query.coinnum){
        this.coinNum = query.coinnum
    }
    if(query.cid){
        this.couponId = query.cid;
    }
    setTimeout(()=>{
        // this.getCode();
    },200);
  },
  methods:{
    getOrderDetail11(){
      this.http.post('/order/queryOrderInfo',{orderId:this.oid}).then(res=>{
        if(res.code == 0){
          res.data.startTime = this.formatTimeToDate(res.data.startTime)
          res.data.endTime = this.formatTimeToDate(res.data.endTime)
          res.data.createTime = this.formatTimeToDate(res.data.createTime)
          this.oobj = res.data
          this.appOrderCut = res.data.appOrderCut;
          this.myCoin = res.data.coinNum;
        }
      })
    },

    getOrderStatus(){
        this.orderIntval = setInterval(() => {
          this.http.post('/order/queryOrderInfo',{orderId:this.oid}).then(res=>{
            if(res.code == 0){
              if(res.data.orderStatus == 1){
                this.stoast('支付成功')
                clearInterval(this.orderIntval)
                setTimeout(()=>{
                  this.$router.push('/pages/mainclass')
                },1500)
              }
            }
          })
        },3000)
    },
    getCode(){

        this.http.post('/wx/pay',{orderId:this.oid,coinNum:this.coinNum,couponId:this.couponId}).then(res=>{
          if(res.code == 0){

            if(res.data){
              window.location.href = res.data;
              if(navigator.userAgent.indexOf("Safari")>0 && navigator.userAgent.indexOf("Chrome")<0){
                window.location.replace(res.data);
              }else{
                window.open(res.data);
              }
              // this.payFlag = true;
              // this.$nextTick(()=>{
              //
              //   let qrcode = new QRCode('qrcodepay', {
              //     width:'190',
              //     height: '190',
              //     text:res.data, // 二维码地址
              //     colorDark : "#000",
              //     colorLight : "#FFF",
              //   })
              //   this.getOrderStatus();
              // })

            }else{
              this.stoast('支付成功')
              clearInterval(this.orderIntval)
              setTimeout(()=>{
                this.$router.push('/pages/mainclass')
              },1500)
            }
          }
        })

    },
    callme(){},
    openPosition(){
      this.$router.push('/pages/position')
    },
    openMyCenter(){
      this.$router.push('/pages/maincenter')
    },
    openMyMessage(){
        this.$router.push('/pages/mainmessage')
    },
    getOrderDetail(){
      this.http.post('/user/queryUserInfo',{}).then(res=>{
        if(res.code == 0){
          this.myobj = res.data;
          this.coinNum = res.data.appCoin.coinNum;
          this.money = res.data.appCommission.commissionTotalAmount || 0;
          this.getOrderStatus()
        }
      })
    },
  },
}
  import '../../assets/css/common.css';
  import '../../assets/css/style.css'
  import '../../assets/css/pay.css'
  import configUrl from "../../config";
</script>
<style scoped>
  .pc-product-list-bot ul li{
    width:220px !important;
  }

  .classes-table li{
    height: 120px;
    background: #f1f4f7;
    box-shadow:none !important;
  }
  .pay-type-item span{
    line-height: 105px;
    color:#181818;
    font-size: 25px;
  }
  .pay-type-item img{
    margin:30px;
  }
  .pay-type-item{
    cursor: pointer;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    width: 215px;
    height: 105px;
    border-radius: 5px;
    border:1px solid #eb6100;
    background: #fff url("../../assets/img/target/buy-choose.png") no-repeat right 75px;
    background-size: 35px 32px;
  }
  .pay-type-list{
    margin-top: 20px;
    padding: 37px 30px;background:#f1f4f7;

  }
  .pay-type h4{
      color:#1b1b1b;
  }


  .qrcodebox-pay p {
    font-size: 24px;color:#333;
    background: url("../../assets/img/wxlogo.png") no-repeat left 0px;
    height: 40px;
    background-size: 40px 40px;
    line-height:40px;
    margin: 0 auto;
    display: inline-block;
    padding-left: 50px;
  }
  #qrcodepay{
    width:190px;
    height:190px;
    padding: 5px;
    background: #fff;
    border: 1px solid #ff5000;
    margin: 0px auto 20px auto;
  }
  .shouldpay span{
    color:#f7260a;
    font-size: 24px;
    line-height:60px;
    font-weight: bold;
    display: block;
  }
  .shouldpay{
    display: flex;
    justify-content: flex-start;
    margin-left: 80px;
  }
  .paynum{
    display: flex;
    justify-content: flex-start;
    line-height: 60px;
    font-size: 14px;
    color:#666;
  }
  .center-title{
    position: absolute;
    left: 300px;
    line-height: 70px;
    font-size: 24px;
    color: #666;
  }

</style>
