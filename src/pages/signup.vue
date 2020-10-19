<template>
  <div class="hello" style="background: #fff;height: 100%;">
    <div class="login-box">
      <div class="login-title">
        <h2>元儒教育城分销平台</h2>
<!--        <span>新一代分销体系，为企业提供一站式服务</span>-->
      </div>
      <div class="login-box-new">
        <div class="login-type">
          <p @click="openLogin"><span>已有账号，</span>马上登陆</p>
          <div>注册账户</div>
        </div>
        <div class="login-item">
          <div class="login-username">
            <input v-model="userPhone" placeholder="请输入手机号" type="text">
          </div>
          <div class="login-code">
            <input v-model="code" placeholder="请输入验证码" type="number">
            <span @click="getCodeCheck">{{codeText}}</span>
          </div>
          <div class="login-userpass">
            <input v-model="userPwd" placeholder="请输入登录密码" type="password">
          </div>
          <div class="login-userpass">
            <input v-model="userPwd2" placeholder="请输入登录密码" type="password">
          </div>
        </div>
        <div class="login-hand">
          <div class="login-remnber">
            <span :class="{'remnber-box':isAgree}" @click="isAgree = !isAgree"></span>
            <p>我已阅读并接受 <span>用户协议</span> 和 <span>隐私政策</span></p>
          </div>
        </div>
        <div class="login-btn" @click="signUpNowCode">登录</div>
      </div>
      <div style="text-align: center;font-size: 12px;color:#fff;">
        Copyright@1998-2014 元儒教育城 .All Rights Reserved
      </div>
    </div>
    <el-dialog title="验证码" :visible.sync="codeFlag">
      <div class="coderight code11" @click="refreshCode" style="margin:0 auto" >
        <SIdentify :identifyCode="identifyCode"></SIdentify>
      </div>
      <input style="height: 40px;border:1px solid #a0a0a0;padding-left: 10px;" v-model="imgcode" type="text" >

      <div slot="footer" class="dialog-footer">
        <el-button @click="codeFlag  = false">取 消</el-button>
        <el-button type="primary" @click="getCodeFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import SIdentify from "../components/identify";
  import { mapActions } from "vuex";

  export default {
    name: 'HelloWorld',
    data () {
      return {
        isAgree:false,
        codeFlag:false,
        userPhone:'',
        userPwd:'',
        userPwd2:'',
        inviteCode:'',
        code:'',
        sendFlag:true,
        codeText:'获取验证码',
        setIntval:undefined,
        setTime:60,
        imgcode:'',
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
      this.$emit('header',false)
      this.$emit('footer',false)
    },
    methods:{
      ...mapActions(['setUser']),
      signUpNowCode(){
        var _this = this;
        if(!this.checkPhone(this.userPhone)){
          this.toast('请输入正确的手机号码')
          return;
        }
        if(!this.code){
          this.toast('请输入验证码')
          return;
        }
        if(!this.userPwd || !this.userPwd2){
          this.toast('请输入并二次确认登录密码')
          return
        }
        if(this.userPwd != this.userPwd2){
          this.toast('两次密码不一致，请重新输入')
          return;
        }
        if(!this.isAgree){
          this.toast('请同意用户协议和隐私政策')
          return;
        }
        var obj  = {
          userPhone:this.userPhone,
          code:this.code,
          userPwd:this.userPwd,
        };
        this.http.post('/dir/registUser',obj).then(res=>{
          if(res.code == 0) {
            this.stoast('注册成功！')
            setTimeout(function () {
              _this.$router.push('/pages/login')

            },1500)
          }
        })

      },
      getCodeCheck(){
        if(!this.userPhone){
          this.toast('请先输入手机号')
          return;
        }
        this.refreshCode();
        this.codeFlag = true;
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
        this.http.post('/sendSmsCode',{userPhone:this.userPhone,type:1}).then(res=>{
          if(res.code == 0){
            this.stoast('已发送')
            _this.sendFlag = false;
            this.codeFlag = false;
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

      openLogin(){
        this.$router.push('/pages/login')
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
  .login-r{
    width: 80%;
  }
  .login-form{
    width: 40%;
    height: 550px;
    margin:50px auto;
  }
</style>
