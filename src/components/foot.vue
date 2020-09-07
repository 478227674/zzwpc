<template>
  <div class="hello" style="background: #313131;overflow: hidden">
    <div class="pc-footer">
      <div class="pc-center footer-center" style="margin-top:30px;">
        <div class="foot-logobox">
          <img src="../assets/img/dis/biglogo.png" alt="">
          <div class="company-detail">
            <div> 朝阳校区：北京市朝阳区劲松华腾北塘商务大厦7层716室
            </div>
            <div> 咨询电话：010-52893105 52893103
            </div>
            <div> 北京市海淀区太奇培训学校——MBA辅导培训中心提供优质MBA考前辅导培训
            </div>
            <div> 北京市海淀区太奇培训学校——全国专业的管理类联考辅导机构
            </div>
          </div>
        </div>
        <div class="foot-right">
          <div class="foot-right-item">
            <div>关于太奇</div>
            <p>太奇简介</p>
            <p>太奇之歌</p>
            <p>学员风采</p>
            <p>太奇历程</p>
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
          <div>太奇建工AI（北京太奇教育科技有限公司）</div>
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
    <div class="pc-footer1">
      <ul class="fff12">
        <li>
          海淀总部：北京市海淀区中关村南大街9号北京理工科技大厦1701
          咨询电话：010-62138466/62750695
          全国统一报名专线：4000-888-686
        </li>
        <li>
          Copyright© 太奇教育    20201998-2014  All Rights Reserved         京ICP备10033867号-13
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
      openOrganDetail(id) {
        let routeUrl = this.$router.resolve({
          path: "/pages/organ_detail",
          query: {id: id}
        });
        window.open(routeUrl.href, '_blank');
      },
      // getOrgList(){
      //   this.http.post('/pc/common/queryOrgList',{}).then(res=>{
      //     if(res.code == 0){
      //       this.newOrgList = res.data;
      //     }
      //   })
      //
      // },
      openAboutUs() {
        this.$router.push('/pages/aboutus')
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
