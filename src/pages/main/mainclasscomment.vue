<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>

    <div class="pc-center">
      <div class="mianbox">
        <div style="height: 20px;"></div>
        <ul class="classes-table" style="padding-left:0px;">
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
                <!--<span class="classs-handle-btn-n" v-show="oobj.isCutEnd" @click="getQrcode">-->
                <!--继续分享-->
                <!--<div id="qrcode" class="qrcode"></div>-->

                <!--</span>-->
                <!--<span class="classs-handle-btn-n">申请退款</span>-->
                <!--<span class="classs-handle-btn-y" @click="openComment">立即评价</span>-->
                <!--<span class="classs-handle-btn-y">确认上课</span>-->
              </div>
              <div style="clear: both"></div>
            </div>
          </li>

        </ul>
        <div style="background: #fff;padding-bottom: 20px;display: flex;justify-content: flex-start">
          <div class="class-c-box">
            <textarea v-model="userDesc" placeholder="请在此输入您的评价信息" name="" id="" cols="30" rows="10"></textarea>
            <div class="comment-uploadimg">
              <div style="display: flex;justify-content: flex-start">
                <img v-for="item in imageIdList" style="margin:0 10px 10px; 0  " :src="item.src" alt="">
                <el-upload
                  class="avatar-uploader"
                  action="apiurl"
                  :http-request="uploadImg"
                  :show-file-list="false">
                  <img src="../../assets/img/uploadimg.png" class="avatar">
                </el-upload>
              </div>
              <span>添加图片(最多4张)</span>
            </div>
          </div>
          <div>
            <div style="height:100px;"></div>
            <div class="rate-all-box">
              <span>环境</span>
              <el-rate class="rate-box" v-model="envGrade"></el-rate>
            </div>
            <div class="rate-all-box">
              <span>师资</span>
              <el-rate class="rate-box" v-model="facultyGrade"></el-rate>
            </div>
            <div class="rate-all-box">
              <span>效果</span>
              <el-rate class="rate-box" v-model="effectGrade"></el-rate>
            </div>
            <div class="rate-all-box">
              <span>服务</span>
              <el-rate class="rate-box" v-model="serviceGrade"></el-rate>
            </div>
          </div>
        </div>
        <div style="background: #fff;padding: 10px 0 20px 0">
          <div class="submitcomment" @click="submitComment">提交评价</div>
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
      clicktype:1,
      value1:0,
      oid:null,
      oobj:{},
      appOrderCut:{},
      userDesc:'',
      envGrade:0,
      effectGrade:0,
      facultyGrade:0,
      serviceGrade:0,
      imageIdList:[],
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
    uploadImg(data){
      if(this.imageIdList.length==4){
        this.toast('最多可以上传4张图片')
        return;
      }
      this.$uploadImg(data).then(res=>{
        if(res.code == 0){
        this.imageIdList.push({
          src: res.data.filePath,
          imageId:res.data.fileId
        })
//          this.imageId = res.data.fileId
//          this.imageUrl = res.data.filePath
        }
      })
    },
    submitComment(){
        if(!this.userDesc){
          this.toast('请输入评价内容')
          return;
        }
        if(this.imageIdList.length==0){
          this.toast('请至少上传一张图片')
          return;
        }
      if(!this.envGrade||!this.effectGrade||!this.facultyGrade||!this.serviceGrade){
        this.toast('不能给课程评价0分哦!')
        return;
      }
        var arr=[];
        for(var i=0;i<this.imageIdList.length;i++){
            arr.push({
                imageId:this.imageIdList[i].imageId
            })
        }

      var obj = {
        orderId:this.oid,
        envGrade:this.envGrade,
        effectGrade:this.effectGrade,
        facultyGrade:this.facultyGrade,
        serviceGrade:this.serviceGrade,
        userDesc:this.userDesc,
        imageIdList:arr
      }
      this.http.post('/order/evaluateOrder',obj).then(res=>{
        if(res.code == 0){
          this.stoast('感谢您的评价！')
          var _this = this;
          setTimeout(function () {
            _this.$router.go(-1)
          },1500)
        }
      })
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
</script>
<style scoped>
  .submitcomment{
    cursor: pointer;
    width:130px;
    height:40px;
    line-height: 40px;
    text-align: center;
    color:#fff;
    font-size: 14px;
    border-radius: 5px;
    background: #ff5000;
    margin: 0 auto;
  }
  .rate-box{
    margin-left: 15px;
  }
  .rate-all-box{
    margin-bottom: 15px;
    margin-left: 40px;
    display: flex;
    justify-content: flex-start;
  }
  .comment-uploadimg span{
    color:#666;font-size: 12px;
    display: block;
    margin-bottom: 20px;
    margin-top: 5px;
  }
  .comment-uploadimg{
    margin-left: 20px;
  }
  .comment-uploadimg img{
    cursor: pointer;
    width:70px;
    height:70px;
    border-radius: 10px;
  }
  .class-c-box textarea{
    width:460px;
    outline: none;
    padding: 0 20px;
    border:none;
    display: block;
    border-bottom: 1px solid #e5e5e5;
    margin: 25px auto;
  }
  .class-c-box{
    width:500px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
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
  .class-detail-d-box{
    margin-left: 20px;
  }
  .class-detail-img-box{
    width:160px;
    height:160px;
    border-radius: 5px;
    overflow: hidden;
  }
  .class-detail-img-box img{
    width:100%;
    height:100%;
  }
  .class-detail-img{
    width:370px;
    float: left;
    display: flex;
    justify-content: flex-start;
    padding-left: 20px;
  }
  .class-detail-box{
    padding-top: 10px;
  }
  .class-orderid{
    background: #fff1de;
    line-height: 30px;
    padding:0 20px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .classes-table li {
    padding-bottom: 20px;
    padding-top: 20px;
    border-bottom: 1px solid #e5e5e5;
    height:200px;
  }
  .classes-table{
    padding:0px 20px 20px 20px;background: #fff;
  }


</style>
