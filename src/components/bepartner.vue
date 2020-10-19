<template>
  <div>
    <div class="mask" v-show="pflag">
      <div class="partner-box">
        <div class="partner-top">
          <span>合伙人权益</span>
          <p @click="pflag = false">x</p>
        </div>
        <div class="partner-good">
          <div class="parter-good-item">
            <img src="../assets/img/zzw/goods-1.png" alt="">
            <p>自购省钱</p>
            <span>最高30%返现</span>
          </div>
          <div class="parter-good-item">
            <img src="../assets/img/zzw/goods-2.png" alt="">
            <p>分享赚钱</p>
            <span>好友购买得佣金</span>
          </div>
          <div class="parter-good-item">
            <img src="../assets/img/zzw/goods-3.png" alt="">
            <p>现金奖励</p>
            <span>邀请新的合伙人</span>
          </div>
          <div class="parter-good-item">
            <img src="../assets/img/zzw/goods-4.png" alt="">
            <p>课程辅导</p>
            <span>手把手授课</span>
          </div>
        </div>
        <div class="partner-top">
          <span>合伙人权益</span>
        </div>
        <div class="partner-form">
          <div class="partner-form-item">
            <span>昵称:</span>
            <input v-model="form.nikeName" placeholder="请输入昵称" type="text">
          </div>
          <div class="partner-form-item">
            <span>真实姓名:</span>
            <input v-model="form.realName" placeholder="请输入真实姓名" type="text">
          </div>
          <div class="partner-form-item">
            <span>手机号:</span>
            <input v-model="form.phone"  placeholder="请输入手机号码" type="text">
          </div>
          <div class="partner-form-item">
            <span>所在地:</span>
            <el-cascader
              :options="cityList"
              v-model="cityChoose"
              :props="cascaderObj"
            >
            </el-cascader>
            <!--          <input v-model="cityName" placeholder="请选择地址" type="text">-->
          </div>
          <div class="partner-form-item">
            <span>详细地址:</span>
            <input  v-model="form.address"  placeholder="请输入详细地址" type="text">
          </div>
        </div>
        <div class="be-partner-btn" @click="submitData">提交</div>
      </div>
    </div>
    <div class="mask" v-show="ppflag">
      <div class="partner-box" style="top:100px">
        <img class="success-img" src="../assets/img/zzw/success.png" alt="">
        <span class="success-text">信息提交成功</span>
        <div class="success-step">
          <span>第二步：</span>
          购买一款该店铺课程，立即成为合伙人
        </div>
        <div class="be-partner-btn" @click="ppflag = false" style="margin-top: 40px;">
          GO~ 购买课程
        </div>
      </div>
    </div>
  </div>


</template>
<script>
  import '../api/city.data';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        form:{
          nikeName:'',
          realName:'',
          phone:'',
          province:'',
          city:'',
          area:'',
          address:'',
          orgId:null,
        },
        pflag:false,
        ppflag:false,
        newOrgList: [],//特价课程
        cityList:[],
        cityChoose:[],
        cascaderObj:{
          value:'value',
          label:'text'
        },
        orgId:'',
      }
    },
    created() {
      this.monitoring();
      this.cityList = cityData;

    },
    methods: {
      //监听
      monitoring(){
        this.$on('partner', (res) => {
          this.pflag = true;
          this.form.orgId = res.orgId;
        })
      },
      //提交
      submitData(){
        if(!this.form.nikeName){
          this.toast('请输入昵称')
          return;
        }
        if(!this.form.realName){
          this.toast('请输入真实姓名')
          return;
        }
        if(!this.form.phone){
          this.toast('请输入手机号')
          return;
        }
        if(this.cityChoose.length < 3){
          this.toast('请选择所在地')
          return;
        }
        this.form.province = this.cityChoose[0];
        this.form.city = this.cityChoose[1];
        this.form.area = this.cityChoose[2];
        if(!this.form.address){
          this.toast('请输入详细地址')
          return;
        }
        this.http.post('https://www.zz1819.com/tqshoop/app/dir/saveDirUser',this.form).then(res=>{
          if(res.code == 0){
            this.pflag = false;
            this.ppflag = true;

          }
        })
      },

    },
    watch:{
      pflag(v) {
        if(v){
          document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        }else{
          document.getElementsByTagName('html')[0].style.overflow = 'scroll'
        }
      }
    }
  }
  import '../assets/css/common.css';
  import '../assets/css/style.css'
  import cityData from "../api/city.data";
</script>
<style>
  .success-step span{
    color:#040404;
    font-size: 24px;
    font-weight: bold;
  }
  .success-step{
    color:#040404;
    font-size: 14px;
    margin-top: 50px;
  }
  .success-text{
    color:#040404;
    display: block;
    text-align: center;
    font-size: 14px;

  }
  .success-img{
    width: 218px;
    display: block;
    margin: 80px auto 10px auto;
  }
  .el-input__inner{
    height: 50px !important;
    width:350px;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .be-partner-btn{
    cursor: pointer;
    background: #ec6941;
    line-height: 57px;
    color:#fff;
    font-size: 20px;font-weight: bold;
    text-align: center;
    border-radius: 5px;
  }
  .partner-form {
    margin-top: 30px;
  }
  .partner-form-item input{
    display: block;
    height: 50px;
    border:none;
    background: #eeeeee;
    width: 340px;
    padding-left:28px;
  }
  .partner-form-item span{
    color:#040404;
    font-size: 14px;
    line-height: 50px;
    width: 95px;
    padding-right: 10px;
    display: block;
    text-align: right;
  }
  .partner-form-item {
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-start;
  }
  .parter-good-item span{
    color:#8c8c8c;
    font-size: 14px;
  }
  .parter-good-item p {
    margin: 10px 0;
    font-size: 16px;
    text-align: center;
    color:#3a3a3a;
  }
  .parter-good-item img{
    display: block;
    margin: 0 auto;
    width: 67px;
    height: 67px;
  }
  .parter-good-item{
    margin-top: 25px;
  }
  .partner-good{
    display: flex;justify-content: space-around;
  }
  .partner-top p{
    cursor: pointer;
    color:#c4c4c4;
    font-size: 50px;
  }
  .partner-top span{
    color:#040404;
    font-size: 24px;
    font-weight: bold;
  }
  .partner-top{
    border-bottom: 1px solid #c9c9c9;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
  }
  .partner-box{

    padding: 0 45px 20px 45px;
    background: #fff;
    position: absolute;
    border-radius: 5px;
    top:200px;
    width: 475px;
    left:50%;
    height: 70%;
    overflow: scroll;
    margin-left: -238px;
  }

</style>
