<template>
  <div class="hello" style="background: #fff;height: 100%;">
    <div class="login-box">
      <div class="login-title">
        <h2>元儒教育城分销平台</h2>
<!--        <span>新一代分销体系，为企业提供一站式服务</span>-->
      </div>
      <div class="login-box-new">
        <div class="login-type">
          <p @click="openIndex">返回首页</p>
          <div @click="chooseLoginType(1)"><span :class="{'login-type-active':loginType == 1}"></span>密码登录</div>
          <div @click="chooseLoginType(2)"><span :class="{'login-type-active':loginType == 2}"></span>短信登录</div>
        </div>
        <div class="login-item" v-show="loginType == 1">
          <div class="login-username">
            <input v-model="userPhone" placeholder="请输入手机号" type="text">
          </div>
          <div class="login-userpass">
            <input v-model="userPwd" placeholder="请输入登录密码" type="password">
          </div>
        </div>
        <div class="login-item" v-show="loginType == 2">
          <div class="login-username">
            <input v-model="userPhone" placeholder="请输入手机号" type="text">
          </div>
          <div class="login-code">
            <input v-model="code" placeholder="请输入验证码" type="number">
            <span @click="getCodeCheck">{{codeText}}</span>
          </div>
        </div>
        <div class="login-hand">
          <div class="login-remnber">
            <span :class="{'remnber-box':isAgree}" @click="isAgree = !isAgree"></span>
            <p>下次自动登录</p>
          </div>
          <div class="login-forget">
            <span>忘记密码</span> | <span @click="openSignup">注册</span>
          </div>
        </div>
        <div class="login-btn" @click="loginNow">登录</div>

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
  import { mapActions } from "vuex";
  import SIdentify from "../components/identify";

  export default {
    name: 'HelloWorld',
    inject:['reload'],
    data () {
      return {
        loginType:1,
        codeFlag:false,
        isAgree:false,
        code:'',
        userPhone:'',
        userPwd:'',
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
      this.$emit('header',false)
      this.$emit('footer',false)
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods:{
      ...mapActions(['setUser']),
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
        this.http.post('/sendSmsCode',{userPhone:this.userPhone,type:2}).then(res=>{
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

      getCodeCheck(){
        if(!this.userPhone){
          this.toast('请先输入手机号')
          return;
        }
        this.refreshCode();
        this.codeFlag = true;
      },
      chooseLoginType(t){
        this.loginType = t;
      },
      //验证码登录
      loginNowFn(){
        var obj = {userPhone:this.userPhone,code:this.code,loginType:2}
        this.loginRequest(obj)
      },
      loginRequest(obj){
        this.http.post('/dir/userLogin',obj).then(res=>{
          if(res.code == 0){
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            });
            this.setUser(res.data)
            localStorage.setItem('diruserinfo',JSON.stringify(res.data))
            this.reload();
            this.$router.push('/');
          }else{
            this.refreshCode();
          }
        })
      },
      //密码登录
      loginNow(){
        var obj = {};
        if(!this.checkPhone(this.userPhone)){
          this.toast('请输入正确的手机号码')
          return;
        }
        if(this.loginType == 1){
          if(!this.userPwd){
            this.toast('请输入密码')
            return;
          }
          obj = {
            userPhone:this.userPhone,userPwd:this.userPwd,loginType:1
          }
          this.loginRequest(obj)
        }else{
          if(!this.code){
            this.toast('请输入验证码')
            return;
          }
          var obj = {userPhone:this.userPhone,code:this.code,loginType:2}
          this.loginRequest(obj)
        }
      },
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
      openSignup(){
        this.$router.push('/pages/signup')
      },
      openIndex(){
        this.$router.push('/')
      },
    },
  }
  import '../assets/css/common.css';
  import '../assets/css/style.css'
  import '../assets/css/login.css'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
