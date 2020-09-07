<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>
    <div class="pc-center">
      <div class="mianbox">
        <div style="background: #fff;padding: 20px">
          <div>
            <div class="person-msg">
              <!--<img :src="imageUrl" alt="">-->
              <div class="change-box">
                <span>当前头像</span>
                <el-upload
                  class="avatar-uploader"
                  action="apiurl"
                  :http-request="uploadImg"
                  :show-file-list="false">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                </el-upload>
                <div style="clear: both"></div>
              </div>
              <div class="change-box">
                <span>用户名</span>
                <input v-model="userPhone" readonly="readonly" type="text">
                <div style="clear: both"></div>
              </div>
              <div class="change-box">
                <span>真实姓名</span>
                <input v-model="userName" type="text">
                <div style="clear: both"></div>
              </div>
              <div class="change-box">
                <span>性别</span>
                <el-select style="width: 160px;margin-left: 10px;" v-model="sex" placeholder="请选择">
                  <el-option
                    v-for="item in sexs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div style="clear: both"></div>
              </div>
              <div class="change-box">
                <span>联系邮箱</span>
                <input v-model="mail" type="text">
                <div style="clear: both"></div>
              </div>
              <div class="change-box">
                <span>注册时间</span>
                <input v-model="signupTime" readonly="readonly" type="text">
                <div style="clear: both"></div>
              </div>
              <div class="msg-btn" @click="submitData">
                保存更改
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../../components/mainhead'
  import citydata from '../../api/city.data'

  export default {
  name: 'HelloWorld',
  data () {
    return {
      sortList:[],
      myobj:{},
      cityList:[],

      userName:'',
      userPhone:'',
      sex:0,
      mail:'',
      signupTime:'',
      imageUrl:'',
      imageId:null,
      cascaderObj:{
        value:'value',
        label:'text'
      },
      sexs:[
        {
          value:'0',
          label:'请选择'
        },
        {
          value:'1',
          label:'男'
        },
        {
          value:'2',
          label:'女'
        },

      ]

    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.cityList = citydata;
    this.$emit('header_two',false)

    this.getMyCenterInfo();
//    this.$emit('footer',false)
  },
  methods:{
    uploadImg(data){
      this.$uploadImg(data).then(res=>{
        if(res.code == 0){
          this.imageId = res.data.fileId
          this.imageUrl = res.data.filePath
        }
      })
    },
    submitData(){
      var obj = {
        imageId:this.imageId,
        userName:this.userName,
        sex:this.sex,
        mail:this.mail
      }
      this.http.post('/user/updateUserInfo',obj).then(res=>{
        if(res.code == 0){
            this.stoast('修改成功')
            this.getMyCenterInfo();
        }
      })
    },
    getMyCenterInfo(){
      this.http.post('/user/queryUserInfo',{}).then(res=>{
        if(res.code == 0){
          this.myobj = res.data;
          this.userName = res.data.userName;
          this.userPhone = res.data.userPhone;
          this.imageId = res.data.imageId;
          this.sex = res.data.sex.toString();
          if(res.data.imageUrl){
              this.imageUrl = res.data.imageUrl;
          }else{
              this.imageUrl = '../../assets/img/test1.png'
          }
          if(res.data.mail){
              this.mail = res.data.mail;
          }
//          this.email = res.data.
          this.signupTime = this.formatTimeToDate(res.data.createTime)
        }
      })
    },

    openIndex(){
      this.$router.push('/')
    },
    openJoin(){
      this.$router.push('/pages/join')
    },
    openUpload(){
      this.$router.push('/pages/uploadapp')
    },
    openJoinForm(){
      this.$router.push('/pages/joinform')

    },
  },
}
import '../../assets/css/common.css';
import '../../assets/css/style.css'
</script>
<style scoped>
  .msg-btn{
    font-size: 16px;
    color:#fff;
    width:260px;
    height:40px;line-height: 40px;
    text-align: center;
    border-radius: 5px;
    background: #ff5000;
  }
  .person-msg>span{
    display: block;
    text-align: center;
    margin-bottom: 30px;
    color:#333;
  }

  .person-msg{
    text-align: center;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .change-box input{
    float: left;
    width:140px;
    padding: 0 10px;
    margin-left: 10px;
    height:33px;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
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
    text-align: left;
    color:#93939f;
    font-size: 12px;
  }
  .change-box{
    display: flex;
    justify-content: flex-start;
    margin: 0 auto 20px auto;
    width:100%;
  }

.avatar{
  width:60px;
  height:60px;border-radius: 50%;
}
</style>
