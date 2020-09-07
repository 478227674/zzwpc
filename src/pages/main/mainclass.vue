<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>
    <div class="pc-center" >
      <div class="mianbox" style="overflow: hidden">
        <div class="main-left">
          <p>我的订单</p>
          <div class="main-center-line"></div>
          <div class="mainclass-tab">
            <span @click="chooseThisTab(1)" :class="{'tab-active':tabindex==1}">未支付</span>
            <span @click="chooseThisTab(2)" :class="{'tab-active':tabindex==2}">已支付</span>
          </div>
        </div>
        <div class="class-list-box" v-show="tabindex == 1">
          <ul class="classes-table">
            <li v-for="item in noPayList">
              <div class="class-orderid">
                <span>订单号：{{item.orderId}}</span>
                <div style="margin-left: 25px;color:#898989;">{{item.cTimeStr}}</div>
                <div class="real-pay">实付 <span>￥{{item.orderPrice}}</span></div>
              </div>
              <div class="class-detail-box">
                <div class="class-detail-img" @click="openProductDetail(item.productList)">
                  <div class="class-detail-img-box">
                    <img :src="item.productList.imageUrl" alt="">
                  </div>
                  <div class="class-detail-d-box">
                    <p>{{item.productList.productName}}</p>
                    <div class="product-type">
                      <span>上课方式：{{item.productList.className}}</span>
                      <span style="margin-left: 10px;">课程原价：<a href="javascript:;">{{item.productList.productPrice}}</a></span>
                    </div>
                    <a href="javascript:;">开课时间:{{item.productList.startTime}}-{{item.productList.endTime}}</a>
                  </div>
                </div>
                <div class="class-detail-pay"  v-show="item.orderStatus==2" >
                  <span>￥{{item.orderPrice}}</span>
                  <p>已过期 </p>
                </div>
                <div class="class-detail-handle">
                  <span class="classs-handle-btn-n" @click="payNow(item.orderId)" v-show="item.orderStatus==0">立即付款</span>
                  <span class="classs-handle-btn-n" @click="openOrderDetail(item.orderId)">查看详情</span>
                  <span class="classs-handle-btn-n" @click="deleteOrder(item.orderId)">删除订单</span>
<!--                  <span class="classs-handle-btn-y"  v-show="item.orderStatus==1 && item.isEvaluate == 0" @click="openComment(item.orderId)">立即评价</span>-->
                  <!--<span class="classs-handle-btn-y" v-show="item.orderStatus==1">确认上课</span>-->
                </div>
                <div style="clear: both"></div>
              </div>
            </li>
          </ul>
          <div class="block">
            <el-pagination
              background
              @current-change="handleCurrentChange1"
              :current-page="pagenum1"
              layout="total,prev, pager, next"
              :total="total1">
            </el-pagination>
          </div>
        </div>
        <div class="class-list-box" v-show="tabindex == 2">
          <ul class="classes-table">
            <li v-for="item in payList">
              <div class="class-orderid">
                <span>订单号：{{item.orderId}}</span>
                <div style="margin-left: 25px;color:#898989;">{{item.cTimeStr}}</div>
                <div class="real-pay">实付 <span>￥{{item.orderPrice}}</span></div>
              </div>
              <div class="class-detail-box">
                <div class="class-detail-img" @click="openProductDetail(item.productList)">
                  <div class="class-detail-img-box">
                    <img :src="item.productList.imageUrl" alt="">
                  </div>
                  <div class="class-detail-d-box">
                    <p>{{item.productList.productName}}</p>
                    <div class="product-type">
                      <span>上课方式：{{item.productList.className}}</span>
                      <span style="margin-left: 10px;">课程原价：<a href="javascript:;">{{item.productList.productPrice}}</a></span>
                    </div>
                    <a href="javascript:;">开课时间:{{item.productList.startTime}}-{{item.productList.endTime}}</a>
                  </div>
                </div>
                <div class="class-detail-pay"  v-show="item.orderStatus==2" >
                  <span>￥{{item.orderPrice}}</span>
                  <p>已过期 </p>
                </div>
                <div class="class-detail-handle">
                  <span class="classs-handle-btn-n" @click="openOrderDetail(item.orderId)">查看详情</span>
                  <span class="classs-handle-btn-y"  v-show="item.orderStatus==1 && item.isEvaluate == 0" @click="openComment(item.orderId)">立即评价</span>
                  <!--<span class="classs-handle-btn-y" v-show="item.orderStatus==1">确认上课</span>-->
                </div>
                <div style="clear: both"></div>
              </div>
            </li>
            <div class="block">
              <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="pagenum"
                layout="total,prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </ul>
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
      activeName:'first',
      clicktype:1,
      orderList:[],

      tabindex:1,

      payList:[],
      pagenum:1,
      total:0,

      noPayList:[],
      pagenum1:1,
      total1:0,
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.getOrderListPay();
    this.getOrderListNoPay();
  },
  methods:{
    chooseThisTab(t){
      this.tabindex = t;
    },
    getOrderListNoPay(){
      this.http.post('/dir/queryNoPayUserOrder',{pageNum:this.pagenum1,pageSize:5}).then(res=>{
        if(res.code == 0){
          this.noPayList = [];
          for(var i=0;i<res.data.list.length;i++){
            res.data.list[i].productList.startTime = this.formatTimeToDate(res.data.list[i].productList.startTime)
            res.data.list[i].productList.endTime = this.formatTimeToDate(res.data.list[i].productList.endTime)
          }
          this.noPayList = res.data.list;
          this.total1 = res.data.total
        }
      })
    },
    getOrderListPay(){
      this.http.post('/dir/queryPayUserOrder',{pageNum:this.pagenum,pageSize:10}).then(res=>{
        if(res.code == 0){
          this.payList = [];
          for(var i=0;i<res.data.list.length;i++){
            res.data.list[i].productList.startTime = this.formatTimeToDate(res.data.list[i].productList.startTime)
            res.data.list[i].productList.endTime = this.formatTimeToDate(res.data.list[i].productList.endTime)
          }
          this.payList = res.data.list;
          this.total = res.data.total
        }
      })
    },
    deleteOrder(oid){
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteOrderFn(oid);
      }).catch(() => {
      });

    },
    deleteOrderFn(id,index){
      this.http.post('/dir/deleteOrder',{orderList:[id]}).then(res=>{
        if(res.code == 0){
          this.stoast('已删除订单')
          this.getOrderListNoPay()
        }
      })
    },
    handleCurrentChange(v){
      this.pagenum = v;
      this.getOrderListPay();
    },
    handleCurrentChange1(v){
      this.pagenum1 = v;
      this.getOrderListNoPay();
    },
    openProductDetail(data){
        this.openProductDetailByType(data)
    },
    openComment(id){
        this.$router.push({path:'/pages/mainclasscomment',query:{id:id}})
    },
    openOrderDetail(id){
      this.$router.push({path:'/pages/orderdetail',query:{id:id}})
    },
    payNow(id){
      this.$router.push({path:'/pages/orderpay',query:{id:id}})
    },
  },
}
  import '../../assets/css/common.css';
  import '../../assets/css/order.css';
  import '../../assets/css/style.css'
</script>
<style scoped>

  .class-list-box{
    margin-top: 20px;
  }





  .class-detail-pay p span{
    color:#f7260a;
  }
  .classs-handle-btn-n{
    border:1px solid #e5e5e5;
    color:#333;
  }
  .classs-handle-btn-y{
    border:1px solid #ff5000;
    color:#ff5000;
  }
  .class-detail-handle span{
    cursor: pointer;
    margin-left: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    float: right;
    display: block;
    height:28px;
    width:78px;
    line-height:28px;
    text-align: center;
    font-size: 12px;


  }
  .class-detail-handle{
    margin-top: 15px;
    float: right;
    width:220px;
  }
  .class-detail-pay p{
    color:#666;
    font-size: 12px;
  }
  .class-detail-pay{
    width:100px;float: left;
    margin-top: 5px;
    font-size: 14px;
    color:#f7260a;
    text-align: center;
  }
  .class-detail-num{
    width:100px;text-align: center;
    color:#666;font-size: 12px;
    float: left;
    margin-top: 5px;
  }
  .class-detail-price{
    width:100px;text-align: center;
    color:#666;font-size: 12px;
    float: left;
    margin-top: 5px;
  }
  .class-detail-d-box>a{
    color:#666;
    font-size: 12px;
    text-decoration: none;
    display: block;
    margin-top: 15px;
  }
  .class-detail-d-box div>span{
    color:#666;font-size: 12px;
    display: block;
    margin-top: 15px;
  }
  .class-detail-d-box p {
    color:#333;
    font-size: 16px;
    margin-top: 5px;
    font-weight: bold;
  }
  .class-detail-img{
    width:370px;
    float: left;
    display: flex;
    justify-content: flex-start;
  }
  .class-detail-box{
    padding-top: 10px;
  }
  .classes-table{
    /*padding:0px 20px 20px 20px*/
    background: #fff;
  }
  .classes-table-title span{
    line-height: 40px;
    text-align: center;
    color:#666;font-size: 12px;
    display: block;
    float: left;
  }
  .classes-table-title{
    height: 40px;
    background: #f0f0f0;

  }

</style>
