<template>
  <div class="hello" style="overflow: hidden">
    <div class="main-banner">
      <img style="width: 100%;height: 120px" src="../assets/img/main/mainb-index.png" alt="">
      <div></div>
    </div>
    <div class="main-bg-box">
      <div class="main-bg-all">
        <div class="main-name">
          <div class="mian-head-box">
            <img :src="userobj.imageUrl" alt="">
            <div>
              <p>{{userobj.userName}}</p>
              <span v-if="userobj.sex == 0">女</span>
              <span v-if="userobj.sex == 1">男</span>
              <span style="padding: 0 10px;">|</span>
              <span>这位同学很懒，木有签名的说~</span>
            </div>
          </div>
        </div>
        <div class="router-list-page">
          <ul>
            <li @click="openThisRouter(item.path)" :class="getClassName(item.tabIndex)" v-for="(item,index) in menuList">
              <p v-if="tabIndex_Active == item.tabIndex"></p>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="pc-center" style="display: none">
      <div class="pc-center" style="display: flex;justify-content: space-between;margin-top: 20px;width:180px;float: left;">
        <div class="main-left">
          <div @click="openMyCenter">
            个人中心
          </div>
          <ul>
            <li @click="openThisRouter(item.path)" v-for="(item,index) in menuList" :class="{'list-last':index==menuList.length-1,'active-name':tabIndex_Active == item.tabIndex}">
              {{item.name}}
            </li>

          </ul>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      menuList:[
        {
          tabIndex:1,
          name:'个人信息',
          path:'/pages/mainmsg',
          img:'../assets/img/main/main1.png',
          activeimg:'../assets/img/main/main-1.png',
        },
        {tabIndex:3,name:'我的课程',path:'/pages/myproductlist'},
        {tabIndex:2,name:'我的订单',path:'/pages/mainclass'},
        // {tabIndex:6,name:'合伙店铺',path:'/pages/partner'},
        {tabIndex:4,name:'浏览记录',path:'/pages/history'},
        {tabIndex:5,name:'我的收藏',path:'/pages/maincollect'},
        {tabIndex:7,name:'我的消息',path:'/pages/mainmessage'},
        // {tabIndex:11,name:'返佣记录',path:'/pages/rakebackhis'},
        {tabIndex:8,name:'安全设置',path:'/pages/mainsys'},
        // {tabIndex:10,name:'我的优惠券',path:'/pages/mainsys'},
        // {tabIndex:2,name:'● 我的评价',path:'/pages/maincomment'},
        // {tabIndex:6,name:'● 我的佣金',path:'/pages/mainmoney'},
        {tabIndex:10,name:'我的优惠券',path:'/pages/maincoupon'},
        // {tabIndex:8,name:'● 我的客服',path:''},

      ],
      tabIndex_Active:null,
      isLogin:false,
      cityName:localStorage.getItem('cityName') || '北京',
      userobj:{},
    }
  },
  created(){
    this.getMyCenterInfo();
    this.$emit('header',true);
    if(this.$store.state.user.user){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
    var active_path = this.$route.path;
    for(var i=0;i<this.menuList.length;i++){
      if(active_path == this.menuList[i].path){
        this.tabIndex_Active = this.menuList[i].tabIndex;
      }
    }
  },
  methods:{
    //获取个人信息
    getMyCenterInfo(){
      this.http.post('/user/queryUserInfo',{}).then(res=>{
        if(res.code == 0){
         this.userobj = res.data;
         if(!this.userobj.imageUrl){
           this.userobj.imageUrl = 'https://www.zz1819.com/bg/personhead.png'
         }
        }
      })
    },
    getClassName(index){
      // {'active-page':tabIndex_Active == item.tabIndex}
      var classArr = ['main-' + index] //先给默认样式类名
      if(this.tabIndex_Active == index){
        classArr.push('active-page') //点击后背景颜色样式类名
        classArr.push('active-page'+index) //点击之后切换为橙色的icon
      }
      return classArr
    },
    openMyCenter(){
      if(this.isLogin){
        this.$router.push('/pages/maincenter')
      }
    },
    openMyMessage(){
      if(this.isLogin){
        this.$router.push('/pages/mainmessage')
      }
    },
    openThisRouter(path){
        this.$router.push(path)
    },
    callme(){
    },
    openIndex(){
      this.$router.push('/')
    },
    openPosition(){
      this.$router.push('/pages/position')
    },

  },
}
import '../assets/css/common.css';
import '../assets/css/style.css'
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body{
    padding-right:0px!important
  }
  .hello{
    position: absolute;
  }
  .active-page{
    background-color: #fff !important;
    color:#ff6200 !important;
  }


  .active-page1{
    background: url("../assets/img/main/main-1.png") no-repeat 38px 14px !important;
    background-size: 18px 19px !important;
  }
  .active-page2{
    background: url("../assets/img/main/main-2.png") no-repeat 38px 14px !important;
    background-size: 18px 19px !important;
  }
  .active-page3{
    background: url("../assets/img/main/main-3.png") no-repeat 38px 14px !important;
    background-size: 20px 18px !important;
  }
  .active-page4{
    background: url("../assets/img/main/main-3.png") no-repeat 38px 16px !important;
    background-size: 20px 17px !important;
  }
  .active-page5{
    background: url("../assets/img/main/main-5.png") no-repeat 38px 14px !important;
    background-size: 19px 19px !important;
  }
  .active-page6{
    background: url("../assets/img/main/main-6.png") no-repeat 38px 16px !important;
    background-size: 21px 21px !important;
  }
  .active-page7{
    background: url("../assets/img/main/main-7.png") no-repeat 38px 16px !important;
    background-size: 21px 19px !important;
  }
  .active-page8{
    background: url("../assets/img/main/main-8.png") no-repeat 38px 14px !important;
    background-size: 21px 21px !important;
  }
  .active-page9{
    background: url("../assets/img/main/main-9.png") no-repeat 38px 14px !important;
    background-size: 21px 21px !important;
  }
  .active-page10{
    background: url("../assets/img/main/main-10.png") no-repeat 38px 16px !important;
    background-size: 23px 16px !important;
  }
  .active-page11{
    background: url("../assets/img/main/main-11.png") no-repeat 38px 16px !important;
    background-size: 20px 16px !important;
  }

  .main-1{
    background: url("../assets/img/main/main1.png") no-repeat 38px 14px;
    background-size: 18px 19px ;
  }
  .main-2{
    background: url("../assets/img/main/main2.png") no-repeat 38px 14px;
    background-size: 18px 19px ;
  }
  .main-3{
    background: url("../assets/img/main/main3.png") no-repeat 38px 14px;
    background-size: 20px 18px ;
  }
  .main-4{
    background: url("../assets/img/main/main3.png") no-repeat 38px 16px;
    background-size: 20px 17px ;
  }
  .main-5{
    background: url("../assets/img/main/main5.png") no-repeat 38px 14px;
    background-size: 19px 19px ;
  }
  .main-6{
    background: url("../assets/img/main/main6.png") no-repeat 38px 16px;
    background-size: 21px 21px ;
  }
  .main-7{
    background: url("../assets/img/main/main7.png") no-repeat 38px 16px;
    background-size: 21px 19px ;
  }
  .main-8{
    background: url("../assets/img/main/main8.png") no-repeat 38px 14px;
    background-size: 21px 21px ;
  }
  .main-9{
    background: url("../assets/img/main/main9.png") no-repeat 38px 14px;
    background-size: 21px 21px ;
  }
  .main-10{
    background: url("../assets/img/main/main10.png") no-repeat 38px 16px;
    background-size: 23px 16px ;
  }
  .main-11{
    background: url("../assets/img/main/main11.png") no-repeat 38px 16px;
    background-size: 20px 16px !important;
  }
  .router-list-page ul li img{
    width: 18px;
    height: 19px;
  }
  .router-list-page ul li p {
    width: 4px;
    height: 27px;
    background: #eb6100;
    position: absolute;
    left: 0px;
    top:11px;
  }
  .router-list-page ul li {
    position: relative;
    cursor: pointer;
    font-size: 14px;color:#a1a09f;
    line-height: 50px;
    background-color: #fff3eb;
    height: 50px;
    width: 200px;
    display: flex;
    justify-content: center;
  }
  .router-list-page{
    width: 200px;
    padding: 22px;
    background: #fff;
    float: left;
  }
  .main-test-count span{
    font-size: 24px;
    font-weight: bold;
  }
  .main-test-count div{
    margin-left: 35px;
  }
  .main-test-count{
    font-size: 14px;color:#fff;
    margin-top: 60px;
    margin-right: 40px;
    display: flex;
    justify-content: flex-start;
  }
  .mian-head-box p{
    font-size: 26px;color:#fff;
    margin-top: 10px;
  }
  .mian-head-box span{
    font-size: 12px;color:#fff;


  }
  .mian-head-box div{
    margin-left: 20px;
  }
  .mian-head-box img{
    width:77px;
    height: 77px;
    border-radius: 50%;
    border: 6px solid #dcdcdc;
  }
  .mian-head-box{
    display: flex;
    justify-content: flex-start;
    padding: 17px 20px 17px 30px;

  }
  .main-bg-box{
    width: 1098px;
    margin: 0 auto;
    position: relative;min-height:500px;z-index: 10;
  }
  .main-bg-all{
    width: 100%;
    z-index: 10;
    top:-100px;
    left: 0px;
    position: absolute;
  }
  .main-name{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 124px;
    background: url("../assets/img/main/mainbg.png") no-repeat 0px 0px;
    background-size: 100% 100%;
  }
  .main-banner div{
    position: absolute;
    left: 0px;top:0px;
    width: 100%;
    height: 100%;
    box-shadow:inset 0px 15px 10px -15px #000;
  }
  .main-banner img{
    display: block;
  }
  .main-banner {
    z-index: 1;
    position: relative;
  }





  .center-title{
    position: absolute;
    left: 230px;
    line-height: 70px;
    font-size: 24px;color:#666;
  }
  .youshi{
    display: none !important;
  }
  .active-name{
    color:#f73e3c !important;
  }
  .list-last{
    border-bottom: none !important;
  }
  .main-left ul li {
    cursor: pointer;
    width:160px;
    border-bottom: 1px solid #f73e3c;
    margin: 0 auto;
    line-height: 40px;
    color:#666;font-size: 12px;
  }
  .main-left>div{
    width:140px;
    margin: 0 auto;
    padding: 0 20px;
    line-height: 50px;
    font-size: 17px;
    color:#fff;
    background: #f73e3c;
  }
  .main-left{
    width:180px;
    background: #fff;

  }
  .login-top{
    position: relative;
  }

</style>
