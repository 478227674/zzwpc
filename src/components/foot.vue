<template>
  <div class="hello" style="background: #fff;overflow: hidden">
    <div style="display:none" class="pc-footer">
      <div class="pc-center footer-center" style="margin-top:30px;">
        <div class="foot-logobox">
          <img src="../assets/img/dis/biglogo.png" alt="">
          <div class="company-detail">
            <div> 朝阳校区：北京市朝阳区劲松华腾北塘商务大厦7层716室
            </div>
            <div> 咨询电话：010-52893105 52893103
            </div>
            <div> 北京市海淀区元儒教育城培训学校——MBA辅导培训中心提供优质MBA考前辅导培训
            </div>
            <div> 北京市海淀区元儒教育城培训学校——全国专业的管理类联考辅导机构
            </div>
          </div>
        </div>
        <div class="foot-right">
          <div class="foot-right-item">
            <div>关于元儒教育城</div>
            <p>元儒教育城简介</p>
            <p>元儒教育城之歌</p>
            <p>学员风采</p>
            <p>元儒教育城历程</p>
            <p>联系我们</p>
          </div>
          <div class="foot-right-item">
            <div>项目</div>
            <p>MBA（工商管理硕士）</p>
            <p>EMBA（高级工商管理硕士）</p>
            <p>MEM （工程管理硕士）</p>
            <p>MPA （公共管理硕士）</p>
            <p>在职研究生</p>
          </div>
        </div>
        <div style="display:none" class="aboutus">
          <ul>
            <li @click="openAboutUs">关于我们</li>
            <li @click="openAboutUs1">权利申明</li>
            <li @click="openAboutUs2">法律声明</li>
            <li @click="openAboutUs3">隐私条款</li>
          </ul>
        </div>
        <div style="display:none" class="contactus">
          <div>联系我们</div>
          <div>元儒教育城</div>
          <span class="index-foot-1">电话：400-8018-618</span>
          <span class="index-foot-2">地址：北京市海淀区魏公村理工科技大厦17楼</span>
        </div>
        <div style="display:none" class="footer-left">
          <div>
            <img src="../assets/img/donwloadcode.png" alt="">
            <span>扫描下载APP</span>
          </div>
          <!--          <div>-->
          <!--            <img src="../assets/img/uploadqrcode.png" alt="">-->
          <!--            <span>扫描添加客服微信号</span>-->

          <!--          </div>-->
        </div>
      </div>
    </div>
    <div class="new-foot">
       <div class="pc-center">
         <div class="new-foot-menu">
           <div>元儒网</div>
           <span @click="openAboutUs(1)">平台介绍</span>
           <span>联系方式</span>
           <span @click="openAboutUs(2)">法律申明</span>
         </div>
         <div class="new-foot-menu">
           <div>机构服务</div>
           <span @click="openAboutUs(3)">平台公告</span>
           <span><a href="https://www.zz1819.com/sys/#/signup" target="_blank">申请入驻</a></span>
           <span><a href="https://www.zz1819.com/sys/#/userlogin" target="_blank">机构登录</a></span>
         </div>
         <div class="new-foot-phone">
           <span>全国统一客服电话(免长途费)</span>
           <div>400-010-9988</div>
           <p>工作日 9:00-17:00 接听</p>
         </div>
         <div class="new-foot-app">
           <div>
             <span>小程序</span>
             <img src="../assets/img/zzw/appcode.png" alt="">
           </div>
           <div>
             <span>app</span>
             <img src="../assets/img/zzw/appcode.png" alt="">
           </div>
         </div>
       </div>
    </div>
    <div class="pc-footer1">
      <ul class="fff12">
        <li>
          <div class="foot-img-for">
            <img style="margin-right: 20px;" src="../assets/img/zzw/foot1.png" alt="">
            <img style="margin-right: 20px;" src="../assets/img/zzw/foot2.png" alt="">
            <img style="margin-right: 20px;" src="../assets/img/zzw/foot3.png" alt="">
            <img src="../assets/img/zzw/foot4.png" alt="">
          </div>
        </li>
        <li>
          Copyright© 元儒教育城    20201998-2014  All Rights Reserved         京ICP备10033867号-13
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        newOrgList: [],//特价课程
      }
    },
    created() {
      // this.getOrgList();
    },
    methods: {

      // getOrgList(){
      //   this.http.post('/pc/common/queryOrgList',{}).then(res=>{
      //     if(res.code == 0){
      //       this.newOrgList = res.data;
      //     }
      //   })
      //
      // },
      openAboutUs(t) {
        this.openNewPage('/pages/aboutus',{type:t})
      },
      openJoinUs() {
        this.$router.push('/pages/joinform')
      },
      openAboutUs1() {
        this.$router.push('/pages/right')
      },
      openAboutUs2() {
        this.$router.push('/pages/law')

      },
      openAboutUs3() {
        this.$router.push('/pages/secret')

      },
    },
  }
  import '../assets/css/common.css';
  import '../assets/css/style.css'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .foot-img-for {
    display: flex;
    justify-content: center;
  }
  .foot-img-for img{
    width: 110px;
  }
  .pc-footer1{
    background:#fff;
  }
  .new-foot-app div img{
    width: 110px;
    height: 110px;
  }
  .new-foot-app div span{
    margin-bottom: 10px;
    color:#4b4b4b;
    font-size: 18px;
    text-align: center;
    display: block;
  }
  .new-foot-app div{
    margin-right: 50px;
  }
  .new-foot-app{
    display: flex;
    justify-content: flex-start;
  }
  .new-foot-phone p {
    color:#323232;
    font-size: 14px;
    text-align: center;
  }
  .new-foot-phone div{
    font-size: 18px;
    color:#323232;
    font-weight: bold;
    text-align: center;
  }
  .new-foot-phone span{
    color:#323232;
    font-size: 14px;
    display: block;
    text-align: center;
  }
  .new-foot-phone{
    width: 200px;
    height: 155px;
    background: url("../assets/img/zzw/footphone.png") no-repeat left bottom;
    background-size: 150px 112px;
  }
  .new-foot-menu span a {
    color:#4b4b4b;
  }
  .new-foot-menu span{
    cursor: pointer;
    color:#4b4b4b;
    font-size: 14px;
    display: block;
    margin-top:20px;
  }
  .new-foot-menu div{
    color:#4b4b4b;
    font-size: 18px;
    font-weight: bold;
  }
  .new-foot{
    border-top: 3px solid #eb6100;
    background: #f5f6f9;padding: 22px 0px 38px 0px;
  }
  .new-foot .pc-center{
    display: flex;
    justify-content: space-around;
  }



  .foot-right-item p:hover{
    color:#EC6946
  }
  .foot-right-item p {
    cursor: pointer;
    font-size: 14px;
    margin-top: 15px;
  }
  .foot-right-item div{
    font-size: 25px;
    font-weight: bold;
  }
  .foot-right-item {
    text-align: center;
    margin-left: 70px;
    color:#8e8e8e;
  }
  .foot-right{
    display: flex;
    justify-content: flex-start;
  }
  .company-detail{
    color:#a3a3a3;
    font-size: 14px;
  }
  .company-detail div{
    margin-top: 20px;
  }
  .foot-logobox img {
  }


  .neworg-list ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .neworg-list {
    margin: 20px 20px 0 20px;
  }

  .neworg-list li {
    cursor: pointer;
    margin-right: 37px;
    margin-bottom: 20px;
    font-size: 12px;
    color: #666;
  }

  .active-footer-btn {
    color: #f73e3c;
  }

  .active-footer-btn a {
    position: absolute;
    width: 100%;
    bottom: 0px;
    left: 0;
    border-bottom: 3px solid #f73e3c;
  }

  .neworg-title {
    margin: 0 20px;
    height: 56px;
    line-height: 56px;
    font-size: 17px;
    color: #333;
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid #e5e5e5;
  }

  .neworg-title span {
    position: relative;
    margin-right: 45px;
    display: block;
  }

  .neworg {
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
  }

  .youshi {
    display: flex;
    margin-top: 30px;
    justify-content: flex-start;
    margin-bottom: 30px;
  }

  .youshi li p {
    margin-top: 15px;
    color: #333;
    font-size: 16px;
    text-align: center;
    margin-bottom: 15px;
  }

  .youshi li div {
    font-size: 12px;
    color: #666666;
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }

  .youshi li {
    width: 25%;
  }

  .youshi li img {
    display: block;
    margin: 0 auto;
    width: 86px;
    height: 100px;
  }


  .aboutus {
    margin-top: 40px;
    color: #333333;
    font-size: 15px;
  }

  .aboutus li {
    cursor: pointer;
    color: #fff;
    margin-bottom: 13px;
  }

  /*底部*/
  .fff1 {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    color: #333;
    font-size: 12px;
  }

  .fff1 li {
    cursor: pointer;
    padding: 0 10px;
  }

  .fff12 {
    padding: 22px 0;
    margin-top: 20px;
    color: #6b6b6b;
    font-size: 12px;
  }

  .fff12 li {
    color: #6b6b6b;
    text-align: center;
    margin-bottom: 10px;
    padding: 0 10px;
    border-right: 1px solid #999999;
  }

  .contactus {
    width: 380px;
    margin-top: 40px;
  }

  .contactus span {
    color: #fff;
    display: block;
    padding-left: 26px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }


  .contactus div {
    font-size: 15px;
    color: #fff;
    margin-bottom: 13px;
  }

  .footer-left div span {
    display: block;
    text-align: center;
    color: #fff;
    font-size: 13px;
  }

  .footer-left {
    margin-top: 40px;
    width: 520px;
    display: flex;
    justify-content: space-around;
  }

  .footer-left div {
    width: 150px;
  }

  .footer-center {
    display: flex;
    justify-content: space-between;
  }

  .pc-footer {
    width: 100%;
    height: 240px;
    background: #313131;
    border-top: 2px solid #f73e3c;
  }


</style>
