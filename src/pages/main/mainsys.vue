<template>
  <div class="hello" style="background: #f5f5f5;overflow:hidden">
    <div>
      <main-header></main-header>
      <div class="pc-center">
        <div class="mianbox" style="height: 444px;">
          <div class="main-left">
            <p>我的设置</p>
            <div class="main-center-line"></div>
          </div>
          <div style="height: 30px;"></div>
          <div class="sys-list">
            <div>
              <div class="phone-items">
                <span>手机号</span>
                <div>
                  <span>手机号 {{userPhone}}</span>
                  <div>可用手机号加密码登录 <span>AI靶向平台</span>，可通过手机号找回密码</div>
                </div>
              </div>
              <p class="sys-change-btn" @click="changePhoneFlag =true">修改</p>
            </div>
            <div>
              <div class="phone-items">
                <span>密码</span>
                <div>
                  <span>已设置</span>
                  <div>用于保护账号信息和登录安全</div>
                </div>
              </div>
              <p class="sys-change-btn" @click="changePassFlag = true">修改</p>
            </div>
          </div>
        </div>
      </div>
      <div style="height:100px;"></div>
    </div>
    <el-dialog :visible.sync="changePhoneFlag" title="修改手机号" width="30%" >
      <div class="changelist">
        <div class="change-box">
          <span>原手机号</span>
          <p>{{userPhone}}</p>
          <div style="clear: both"></div>
        </div>
        <div class="change-box">
          <span>验证码</span>
          <input v-model="changenewcode" placeholder="请输入6位数验证码" type="text">
          <a @click="getCodeFnByOldPhoneChange" href="javascript:;">{{codeText}}</a>
          <div style="clear: both"></div>
        </div>
        <div class="change-box">
          <span>新手机号</span>
          <input v-model="newphone" placeholder="请输入新手机号" type="text">
          <div style="clear: both"></div>
        </div>
        <div class="change-box">
          <span>验证码</span>
          <input v-model="newcode" placeholder="请输入6位数验证码" type="text">
          <a href="javascript:;"  @click="getCodeFnByOldPhoneChange">{{codeText}}</a>
          <div style="clear: both"></div>
        </div>
        <p @click="submitChangePhone">确定</p>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="changePassFlag" title="修改密码" width="30%" >
      <div class="changelist">
        <div class="change-box">
          <span>原手机号</span>
          <p>{{userPhone}}</p>
          <div style="clear: both"></div>
        </div>
        <div class="change-box">
          <span>验证码</span>
          <input v-model="pwdCode"  placeholder="请输入6位数验证码" type="text">
          <a href="javascript:;"  @click="getCodeFnByChangePwd">{{codeText}}</a>
          <div style="clear: both"></div>
        </div>
        <div class="change-box">
          <span>请输入新密码</span>
          <input  v-model="pwd1" placeholder="请输入密码" type="text">
          <div style="clear: both"></div>
        </div>
        <div class="change-box">
          <span>再次输入</span>
          <input v-model="pwd2"  placeholder="请输入密码" type="text">
          <div style="clear: both"></div>
        </div>
        <p @click="submitChangePwd">确定</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Header from '../../components/mainhead'

  export default {
  name: 'HelloWorld',
  data () {
    return {
      changePassFlag:false,
      changePhoneFlag:false,
      userPhone:'', //旧手机
      clicktype:1,
      phoneStep:0, //记录修改手机号的当前所在位置

      sendFlag:true, //旧手机获取验证码
      setIntval:undefined,
      codeText:'获取验证码',
      setTime:60,

      changenewcode:'',//修改手机号旧手机验证码

      newphone:'',
      newcode:'',

      pwdCode:'',
      pwd1:'',
      pwd2:'',
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.userPhone = JSON.parse(localStorage.getItem('diruserinfo')).userPhone
    this.$emit('header_two',false)

  },
  methods:{
    submitChangePhone(){

      var obj = {
        userPhone:this.newphone,
        type:3,
        code:this.newcode
      }
      this.http.post('/pc/verifySmsCode',obj).then(res=>{
        if(res.code == 0){
          this.http.post('/user/updateUserPhone',{newPhone:this.newphone,originalPhone:this.userPhone}).then(res=>{
            if(res.code == 0){
              this.stoast('修改成功')
              var user = JSON.parse(localStorage.getItem('diruserinfo'));
              user.userPhone = this.newphone;
              localStorage.setItem('diruserinfo',JSON.stringify(user))
              this.sendFlag = true;
              this.setIntval = undefined;
              this.codeText = '获取验证码';
              this.setTime = 60;
            }
          })
        }
      })
    },
    getCodeFnByOldPhoneChange(){
      if(!this.sendFlag){
        this.toast('请稍后再获取')
        return;
      }
      let _this = this;
      var obj = {};
      if(this.phoneStep==0){
        obj = {
          userPhone:this.userPhone,type:3
        }
      }else{
        if(!this.newphone){
          this.toast('请输入新手机号')
          return;
        }
        obj = {
          userPhone:this.newphone,type:3
        }
      }
      this.http.post('/common/sendSmsCode',obj).then(res=>{
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
    getCodeFnByChangePwd(){
      if(!this.sendFlag){
        this.toast('请稍后再获取')
        return;
      }
      let _this = this;
      var obj = {
        userPhone:this.userPhone,type:4
      };
      this.http.post('/common/sendSmsCode',obj).then(res=>{
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

    nextStep(){
      if(!this.changenewcode){
        this.toast('请先输入验证码')
        return;
      }
      var obj = {
        userPhone:this.userPhone,
        type:3,
        code:this.changenewcode
      }
      this.http.post('/pc/verifySmsCode',obj).then(res=>{
        if(res.code == 0){
          clearInterval(this.setIntval)
          this.sendFlag = true;
          this.setIntval = undefined;
          this.codeText = '获取验证码';
          this.setTime = 60;
          this.phoneStep = 1;
        }
      })
    },
    clickType(t){
      this.clicktype = t;
      this.sendFlag = true;
      this.setIntval = undefined;
      this.codeText = '获取验证码';
      this.setTime = 60;
    },
    submitChangePwd(){

      if(!this.pwdCode){
        this.toast('请先输入验证码')
        return;
      }
      if(!this.pwd1 || !this.pwd2){
        this.toast('请输入两次密码验证')
        return;
      }
      if(this.pwd1 != this.pwd2){
        this.toast('密码不一致请重新输入')
        return;
      }
      var obj = {
        userPhone:this.userPhone,
        code:this.pwdCode,
        pwd1:this.pwd1,
        pwd2:this.pwd2,
      }
      this.http.post('/user/updateUserPwd',obj).then(res=>{
        if(res.code == 0){
          this.stoast('修改成功,请重新登录')
          localStorage.removeItem('diruserinfo');
          this.$router.push('/pages/login')
        }
      })
    },
  },

}
import '../../assets/css/common.css';
  import '../../assets/css/style.css'
  import '../../assets/css/order.css'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .changelist>p{
    width: 80%;
    height: 56px;font-size: 18px;
    text-align: center;
    line-height: 56px;
    background: #eb2c00;
    color:#fff;
    margin-top: 15px;
    cursor: pointer;
  }
  .changelist span{
    display: block;
    width: 70px;
    font-size: 12px;
    color:#1b1b1b;
    line-height: 36px;

  }
  .changelist input{
    width: 252px;
    height: 34px;
    padding-left: 10px;
    border:1px solid #dcdcdc;
  }
  .changelist>div{
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-start;
  }
  .changelist{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .sys-change-btn{
    width: 109px;
    height: 32px;
    cursor: pointer;
    text-align: center;
    line-height: 32px;
    color:#eb6100;
    border: 1px solid #eb6100;
  }
  .phone-items div div span{
    color:#eb6100;
  }
  .phone-items>div{
    color:#666666;
    font-size: 12px;
    margin-left: 40px;
  }
  .phone-items{
    display: flex;justify-content: flex-start;
  }
  .phone-items>span{
    line-height: 35px;
    display: block;
    width: 50px;

    font-size: 14px;color:#000;
  }
  .sys-list>div{
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
  }





  .submitdata{
    width:300px;
    height:40px;
    margin: 40px auto;
    text-align: center;
    line-height:40px;
    color:#fff;
    background: #ff5000;
    border-radius: 5px;
    cursor: pointer;
  }
  .change-box a {
    float: left;
    text-decoration: none;
    color:#fff;
    border: none;
    border-radius: 5px;
    text-align: center;
    line-height:36px;
    margin-left: 20px;
    background: #eb2c00;
    height:36px;
    width:120px;
    display: block;
  }
  .change-box input{
    float: left;
    width:140px;
    padding: 0 10px;
    margin-left: 10px;
    height:33px;
    border:1px solid #ccc;
  }
  .change-box p{
    float: left;
    line-height: 35px;
    width:160px;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    margin-left: 10px;
  }
  .change-box span{
    float: left;
    line-height: 35px;
    display: block;
    width:80px;
    text-align: right;
    color:#93939f;
    font-size: 12px;
  }
  .change-box{
    height:35px;
    /*display: flex;*/
    /*justify-content: center;*/
    width:450px;
    margin: 10px auto 0 auto;
  }
  .change-phone{
  }
  .active-box{
    border-color:#ff5000 !important;
  }
  .main-system-items a {
    text-decoration: none;
    position: absolute;
    color:#ff5000;
    right: 30px;
    top: 35px;
    font-size: 12px;
  }
  .main-system-items span{
    color:#666;
    font-size: 14px;
    margin-top: 10px;
    display: block;
  }
  .main-system-items p{
    color:#666;
    font-size: 12px;
    margin-top:20px ;
  }
  .main-system-items{
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    position: relative;
    width:450px;
    height:88px;
    border:1px solid #e5e5e5;

  }
  .main-system-box img{
    height:50px;
    margin-right: 20px;
    width:50px;
    margin-top: 20px;
    margin-left: 20px;
    display: block;
  }
  .main-system-box{

    margin-top: 20px;

    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .main-system-title{
    color:#ff5000;
  }
  .all-main-box{
    /*display: flex;*/
    /*justify-content: flex-start;*/
  }


</style>
