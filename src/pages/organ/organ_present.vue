<template>
  <div class="hello" style="background: #f5f5f5">
    <div style="background: #fff;">
      <div class="pc-center od-top">
        <div class="organ-name-bpoxx">
          <img :src="orgData.logoUrl" alt="">
          <div class="organ-name-top">{{orgData.orgName}}
            <div v-show="orgData.orgTelephone!=0">{{orgData.orgTelephone}}</div>
            <div v-show="orgData.orgTelephone==0">成为本机构会员可见</div>
          </div>
        </div>
        <div class="od-intro">{{orgData.orgIntro}}</div>
      </div>


    </div>
    <div style="background: #ff7f00">
      <div class="od-tab pc-center">
        <ul>
          <li @click="openOrganDetail">
            首页
          </li>
          <li @click="openOrganProduct">
            课程
          </li>
          <li @click="openOrganSchool">
            校区
          </li>
          <li @click="openOrganComments">
            评价
          </li>
          <li class="organ_active"  @click="openOrganPresent">
            机构简介
          </li>
        </ul>
      </div>
    </div>
    <div class="pc-center" style="margin-top: 20px;">
      <img src="../../assets/img/organbanner.png" style="width:100%;" alt="">
    </div>
    <div class="pc-center organbox">
      <div class="organ-image">
        <img :src="orgData.logoUrl" alt="">
      </div>
      <div class="organ-detail">
        <div class="organ-title">{{orgData.orgName}}</div>
        <ul>
          <li>
            <div class="organ-item-title">
              机构简介:
            </div>
            <p>
              {{orgData.orgIntro}}
            </p>
          </li>
          <li>
            <div class="organ-item-title">
              机构优惠:
            </div>
            <p>
              最多可抵扣<span>{{orgData.maxCoinLimit}}</span>太奇币
            </p>
          </li>
          <li>
            <div class="organ-item-title">
              咨询热线:
            </div>
            <p v-if="orgData.orgTelephone!=0">
              {{orgData.orgTelephone}} （本校老师接听）
            </p>
            <p v-else>
              成为本机构会员可见
            </p>
          </li>
          <li>
            <div class="organ-item-title">
              特色服务:
            </div>
            <p>
              <a href="javascript:;">不满可退款</a>
              <a href="javascript:;">师声互动</a>
              <a href="javascript:;">随报随学</a>
            </p>
          </li>
        </ul>
        <div class="organ-grade" v-show="orgData.userGrade">
          <div class="organ-allgrade">
            <span >{{orgData.userGrade}}</span>
            <a v-show="orgData.userGrade>=4" href="javascript:;">极好</a>
            <a v-show="orgData.userGrade<4 && orgData.userGrade>2" href="javascript:;">很好</a>
            <a v-show="orgData.userGrade<=2" href="javascript:;">一般</a>
          </div>
          <div class="grade-items">
            <span>环境 {{orgData.envGrade}}</span>
            <span>师资 {{orgData.effectGrade}}</span>
            <span>效果 {{orgData.facultyGrade}}</span>
            <span>服务 {{orgData.serviceGrade}}</span>
          </div>
        </div>
        <div class="organ-grade" v-show="!orgData.userGrade">
          <span class="organ-item-title">暂无评分</span>
        </div>
        <div class="organ-btns">
          <div class="test-linten">预约试听</div>
          <div class="share-money" @click="openSpeProduct" >精品特价</div>
        </div>
      </div>
    </div>

    <!--学员评价-->
    <div class="pc-center organ-allbox" >
      <div class="organ-left">
        <div class="special-class" style="border-bottom: none">
          <span>关于我们</span>
        </div>
        <div class="about-us-organ" v-html="htmlT">

        </div>
      </div>
      <div style="width:260px;">
        <div class="pc-product-list-bot">
          <div>选择太奇建工AI</div>
          <span class="pc-line"></span>
          <ul>
            <li>
              <img src="../../assets/img/c1.png" alt="">
              <div>
                <p>行业平台</p>
                <span>有20年的互联网+教育经验， 懂学生需要什么。</span>
              </div>
            </li>
            <li>
              <img src="../../assets/img/c2.png" alt="">
              <div>
                <p>教育资源丰富</p>
                <span>覆盖全国上百个城市多家品牌 机构，老师好，学校多，课程多。</span>
              </div>
            </li>
            <li>
              <img src="../../assets/img/c4.png" alt="">
              <div>
                <p>专业平台顾问</p>
                <span>百余名资深教育顾问，站在 第三方的角度，快速为您定 制一对一的个性化解决方案。</span>
              </div>
            </li>
            <li>
              <img src="../../assets/img/c1.png" alt="">
              <div>
                <p>行业平台</p>
                <span>有20年的互联网+教育经验， 懂学生需要什么。</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        value5:5,
        pagenum:1,
        pagesize:5,
        total:0,
        orgId:null,
        htmlT:'',
        orgData:{},


      }
    },
    created(){
        this.orgId = this.$route.query.id
      this.getOrgPresent()
      this.getOrganDetail()
      this.$emit('header_two',true);
    },
    methods:{
      getOrgPresent(){
        this.http.post('/org/queryOrgDesc',{orgId:this.orgId}).then(res=>{
          if(res.code == 0){
            this.htmlT = res.data;
          }
        })
      },
      getOrganDetail(){
        this.http.post('/pc/org/queryOrgInfo',{orgId:this.orgId}).then(res=>{
          if(res.code == 0){
            this.orgData = res.data;
            this.imageList = res.data.imageList;
          }
        })
      },

      openIndex(){
        this.$router.push('/')
      },
      openOrganDetail(){
        this.$router.push({path:'/pages/organ_detail',query:{id:this.orgId}})
      },
      openOrganProduct(){
        this.$router.push({path:'/pages/organ_product',query:{id:this.orgId}})
      },
      openOrganSchool(){
        this.$router.push({path:'/pages/organ_school',query:{id:this.orgId}})
      },
      openOrganComments(){
        this.$router.push({path:'/pages/organ_comment',query:{id:this.orgId}})
      },
      openOrganPresent(){
        this.$router.push({path:'/pages/organ_present',query:{id:this.orgId}})
      },
      openSpeProduct(){
        this.$router.push({path:'/pages/organ_speproduct',query:{id:this.orgId}})
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
  import '../../assets/css/index.css'
  import '../../assets/css/organ.css'
</script>
<style scoped>
  .about-us-organ p{
    margin-top: 15px;
    line-height: 25px;
  }
  .about-us-organ{
    color:#333;
    font-size:14px;
  }
</style>
