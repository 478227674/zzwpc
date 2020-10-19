<template>
  <div class="hello" style="background: #fff">
    <div style="position: relative">
      <div class="pc-center">
        <div class="login-top">
          <div @click="openSignup">
            Hi!欢迎来到元儒教育城<span>免费注册</span>
          </div>
        </div>
      </div>
      <div class="login-box1">
        <p>欢迎登录元儒教育城</p>
        <div class="input-item">
          <img class="itemimg1" src="../assets/img/login-phone.png" alt="">
          <input type="text" v-model="userPhone" placeholder="请输入手机号">
        </div>
        <div class="input-item">
          <img class="itemimg2" src="../assets/img/login-code.png" alt="">
          <input type="text" v-model="code" placeholder="请输入验证码">
          <span @click="getCodeFn">{{codeText}}</span>
        </div>
        <div class="img-code">
          <div class="input-item input-item1">
            <img class="itemimg3" src="../assets/img/login-code1.png" alt="">
            <input v-model="imgcode" type="text" placeholder="请输入图形验证码">
          </div>
          <div class="coderight code11" @click="refreshCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </div>
        </div>
        <div class="login-type">
<!--          <div>-->
<!--            <span @click="isAgree = !isAgree" v-show="!isAgree"></span>-->
<!--            <img @click="isAgree = !isAgree" v-show="isAgree" src="../assets/img/agree.png" alt="">-->
<!--            一周内免登录-->
<!--          </div>-->
          <a href="javascript:;" @click="openLoginByPwd">切换密码登录</a>
        </div>
        <div class="login-btn" @click="loginNow">登录</div>
      </div>
    </div>
    <div>
      <img style="width: 100%" src="../assets/img/loginbanner.png" alt="">
    </div>
    <img class="foot-banner-l" src="../assets/img/login-foot-banner.png" alt="">
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import SIdentify from "../components/identify";
  export default {
    name: 'HelloWorld',
    data () {
      return {
        isAgree:false,
        code:'',
        userPhone:'',
        userPwd:'',
        sendFlag:true,
        codeText:'获取验证码',
        imgcode:'',
        setIntval:undefined,
        setTime:60,
        identifyCode:'',
        identifyCodes: "1234567890",
      }
    },
    components:{
      SIdentify: SIdentify
    },
    created(){
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      this.$emit('header_two',false)
    },
    methods:{
      ...mapActions(['setUser']),

      loginNow(){
        if(!this.checkPhone(this.userPhone)){
          this.toast('请输入正确的手机号码')
          return;
        }
        if(!this.code){
          this.toast('请输入正确的验证码')
          return;
        }
        if(this.imgcode != this.identifyCode){
            this.toast('图形验证码不正确')
          return;
        }
        let _this = this;
        this.http.post('/user/userLogin',{userPhone:this.userPhone,code:this.code,loginType:2}).then(res=>{
          if(res.code == 0){
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            });
            this.setUser(res.data)
            localStorage.setItem('diruserinfo',JSON.stringify(res.data))
            setTimeout(function () {
              if(navigator.userAgent.indexOf("Safari")>0 && navigator.userAgent.indexOf("Chrome")<0){
                window.location.replace('http://wk.xhcedu.com/xhc/index.html#/');
              }else{
                window.open('http://wk.xhcedu.com/xhc/index.html#/');
              }
            },1500)
          }
        })
      },

      getCodeFn(){
        if(!this.sendFlag){
          this.toast('请稍后再获取')
          return;
        }
        if(!this.userPhone){
          this.toast('请先输入手机号')
          return;
        }
        if(!this.checkPhone(this.userPhone)){
          this.toast('请输入正确的手机号码')
          return;
        }
        let _this = this;
        this.http.post('/common/sendSmsCode',{userPhone:this.userPhone,type:2}).then(res=>{
          if(res.code == 0){
            _this.sendFlag = false;
            _this.setIntval = setInterval(function () {
              if(_this.setTime>0){
                _this.setTime -= 1;
                _this.codeText = _this.setTime + 's后获取';
              }else{
                _this.sendFlag = true;
                _this.codeText = '获取验证码'
                _this.setTime = 60;
                clearInterval(_this.setIntval)
              }
            },1000)
          }
        })
      },
      openSignup(){
        this.$router.push('/pages/signup')
      },
      openLoginByPwd(){
        this.$router.push('/pages/loginbypwd')
      },
      openIndex(){
        this.$router.push('/')
      },
      //验证码abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      },
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
        }
      },
    },
  }
  import '../assets/css/common.css';
  import '../assets/css/style.css'
  import '../assets/css/login.css'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .login-box1{
    position: absolute;
    width: 510px;
    height: 380px !important;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 10px -1px #ff5000;
    top: 180px;
    left: 50%;
    margin-left: -255px;
  }

</style>
