<template>
  <div class="hello" style="background: #f5f5f5;position: relative">
    <div class="order-bg">
      <div></div>
      <img src="../../assets/img/main/mainb-index.png" alt="">
    </div>
    <div class="pc-center sure-order">
      <div class="order-sure-box">
        <h1>确认订单</h1>
      </div>
      <div class="order-detail-all">
        <div class="order-detail-text">
          <div>订单信息</div>
          <p>我有疑问，需要反馈</p>
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
              <div class="order-price-new">
                  现价： <span>￥{{oobj.orderPrice}}</span>
              </div>
                <!--<span class="classs-handle-btn-n">申请退款</span>-->
                <!--<span class="classs-handle-btn-y" @click="openComment">立即评价</span>-->
                <!--<span class="classs-handle-btn-y">确认上课</span>-->
              <div style="clear: both"></div>
            </div>
          </li>
        </ul>
        <div class="youhui">

          <div v-show="oobj.isGroup == 1">
            <a>拼团</a>
            <span>-￥{{oobj.productPrice-oobj.orderPrice}}</span>
            <div style="clear: both"></div>

          </div>
          <div v-show="oobj.isCut == 1">
            <a>砍价</a>
            <span>-￥{{oobj.cutPrice}}</span>
            <div style="clear: both"></div>

          </div>
          <div>
            <a>课程发送提醒至</a>
            <span style="float: left;margin-left: 10px;font-size: 12px;color:#535353;">{{userPhone}}</span>
            <span style="color:#898989;" @click="openBindPhone">修改</span>
            <div style="clear: both"></div>
          </div>
        </div>
        <div class="payBox">
          <div class="pay-detail">
            <div>
              <span>共计商品总金额 ￥{{oobj.orderPrice}}</span>
              <span>折扣优惠 ￥{{couponmoney}}</span>
              <span v-show="isUseCoin">太奇币抵扣 ￥{{canUse/10}}</span>
            </div>
            <div class="real-pay1">
              实付 <a>￥{{payPrice}}</a>
            </div>
            <p @click="getQrcode">提交订单</p>
          </div>
        </div>

      </div>
    </div>

    <div class="mask" v-show="showCoupon">
      <div>
        <ul class="coupon-list-ul">
          <li class="coupon-canuse" v-for="item in cList" @click="useCoupon(item)">
            <div class="coupon-num">
              <span class="withamount">满{{item.withAmount}}可用</span>
              ￥ <span>{{item.usedAmount}}</span>
            </div>
            <div class="coupon-detail">
              <p>{{item.orgName}}</p>
              <span>有限期:{{item.createTime}}-{{item.validTime}}</span>
            </div>
          </li>
        </ul>
        <div class="closemask" @click="closeMask()">
          取消
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        cList:[], //优惠券列表
        isUseCoin:false, //是否使用太奇币
        orgId:null,
        orgData:{},
        oid:null,
        appOrderCut:{},
        oobj:{},
        myCoin:0,//我的太奇币
        canUse:0,//可用太奇币
        payPrice:0,//实际支付
        userPhone:JSON.parse(localStorage.getItem('diruserinfo')).userPhone,
        couponId:null, //优惠券ID
        showCoupon:false, //优惠券显示和隐藏
        couponmoney:0,//优惠金额
      }
    },
    created(){
      this.oid = this.$route.query.id;
      this.getOrderDetail();
//      this.getQrcode();
      this.$emit('header_two',true);
    },
    methods:{
        //优惠券列表的显示和隐藏
      showCouponList(){
          if(this.cList.length==0){
            this.toast('暂无优惠券可用')
            return;
          }
          this.showCoupon = true;
      },
      closeMask(){
        this.showCoupon = false;
      },
      useCoupon(data){
          if(data.withAmount>this.oobj.orderPrice){
            this.toast('优惠券不可用')
            return;
          } else{
            this.couponmoney = data.usedAmount;
            this.payPrice -= this.couponmoney;
            if(this.payPrice<0){
                this.payPrice = 0
            }
          }
      },
      //使用太奇币 价格计算
      handleMoney(){
        if(this.myCoin>=10){
          this.isUseCoin = !this.isUseCoin
          if(this.isUseCoin){ //如果选择状态
            if(this.canUse>=this.oobj.coinLimit){ //判断自己可使用的是否大于限制 如果大于 可使用的就等于限制 然后计算价格
              this.stoast('此产品最多可使用' + this.oobj.coinLimit + '个太奇币')
              this.canUse = this.oobj.coinLimit;
              this.payPrice = this.payPrice - this.canUse/10;
              if(this.payPrice<0){
                this.payPrice = 0
              }
              return;
            }
            //如果小于限制 直接计算
            this.payPrice = this.payPrice - this.canUse/10
            if(this.payPrice<0){
                this.payPrice = 0
            }
          }else{ //未选择状态
            this.payPrice = this.oobj.orderPrice;
          }
        }else{
          this.stoast('太奇币数量不足10，不可抵扣。')
        }

      },
      //获取二维码
      getQrcode(){
        var obj = {
            id:this.oid
        };
        if(this.isUseCoin){
            obj.coinnum = this.canUse;
        }
        if(this.couponId){
            obj.cid = this.couponId;
        }
        obj.pay=this.payPrice;

        this.$router.push({path:'/pages/pay',query:obj})
//        this.http.post('/pc/wx/pay',{orderId:this.oid}).then(res=>{
//          if(res.code == 0){
//          }
//        })
      },
      getOrderDetail(){
        this.http.post('/order/queryOrderInfo',{orderId:this.oid}).then(res=>{
          if(res.code == 0){
            res.data.startTime = this.formatTimeToDate(res.data.startTime)
            res.data.endTime = this.formatTimeToDate(res.data.endTime)
            res.data.createTime = this.formatTimeToDate(res.data.createTime)
            this.oobj = res.data
            this.appOrderCut = res.data.appOrderCut;
            this.myCoin = res.data.coinNum;
            this.canUse = Number(this.myCoin) - Number((this.myCoin%10));
            if(this.oobj.isGroup == 1){
                if(this.oobj.isCut == 1){
                  this.payPrice = this.oobj.orderPrice - this.oobj.cutPrice;
                }else{
                    this.payPrice = this.oobj.orderPrice
                }
            }
            if(this.oobj.isCut == 1){
              this.payPrice = res.data.orderPrice
            }
            if(this.oobj.orderType == 2 || this.oobj.orderType == 1){
              this.payPrice = res.data.orderPrice
            }
            this.orgId = res.data.orgId
            this.http.post('/user/queryCouponList',{pagenum:1,pagesize:50,orgId:this.orgId}).then(res=>{
              if(res.code == 0){
                for(var i=0;i<res.data.list.length;i++){
                  res.data.list[i].createTime = this.formatTimeToDate(res.data.list[i].createTime)
                  res.data.list[i].validTime = this.formatTimeToDate(res.data.list[i].validTime)
                }
                this.cList = res.data.list;
              }
            })
          }
        })
      },

      openOrganDetail(){
        this.$router.push({path:'/pages/organ_detail',query:{id:this.orgId}})
      },
      openOrganProduct(){
        this.$router.push({path:'/pages/organ_product',query:{id:this.orgId}})
      },
      openOrganSchool(){
        this.$router.push({path:'/pages/organ_school',query:{id:this.orgId}})
      },
      openOrganComments(){
        this.$router.push({path:'/pages/organ_comment',query:{id:this.orgId}})
      },
      openOrganPresent(){
        this.$router.push({path:'/pages/organ_present',query:{id:this.orgId}})
      },
      openBindPhone(){
        this.$router.push({path:'/pages/mainsys',query:{}})

      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
  import '../../assets/css/pay.css';
  import '../../assets/css/index.css'
  import '../../assets/css/organ.css'
  import '../../assets/css/coupon.css'
</script>
<style scoped>
  .classes-table li{
    height: 120px;
    background: #f1f4f7;
    box-shadow:none !important;
  }
</style>
