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
          <li class="organ_active"  @click="openOrganComments">
            评价
          </li>
          <li @click="openOrganPresent">
            机构简介
          </li>
        </ul>
      </div>
    </div>
    <div v-show="orgData.imageList.length>=3" class="pc-center" style="margin-top: 20px;display: flex;justify-content: space-between">
      <img v-show="index<3" v-for="(item,index) in orgData.imageList" :src="item.attachment.fileUrl" style="width:30%;" alt="">
    </div>
    <!--学员评价-->
    <div class="pc-center organ-allbox" >
      <div class="organ-left">
        <div class="special-class">
          <span>学员评价（{{total}}）</span>
          <div class="organ-grade" style="margin-top: 0px;" v-show="orgData.userGrade">
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
        </div>
        <ul class="comments-list">
          <li v-for="item in commentsList">
            <div class="comments-head">
              <img src="../../assets/img/personhead.png" alt="">
            </div>
            <div class="comments-detail">
              <div class="comments-p">
                <p>{{item.userName}}</p>
                <span>{{item.createTime}}</span>
              </div>
              <div class="comments-grade">
                <div class="grade-box">
                  <el-rate
                    v-model="item.userGrade"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </div>
                <div class="grade-item-comments">
                  <span>环境{{item.envGrade}}</span>
                  <span>师资{{item.effectGrade}}</span>
                  <span>效果{{item.facultyGrade}}</span>
                  <span>服务{{item.serviceGrade}}</span>
                </div>
                <div class="learn-product">
                  学习课程：{{item.productName}}
                </div>
                <div style="clear: both"></div>
              </div>
              <div class="comments-content">
                {{item.userDesc}}
              </div>
              <div class="comments-imglist">
                <img v-for="items in item.images" :src="items" alt="">
              </div>
            </div>
          </li>

        </ul>
        <div class="block">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-size="pagesize"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <div style="width:260px;">
        <div class="pc-product-list-bot">
          <div>选择太奇建工AI</div>
          <span class="pc-line"></span>
          <ul style="padding-bottom: 20px">
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
  import { slider, slideritem } from 'vue-concise-slider'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        orgId:null,
        value5:5,
        pagenum:1,
        pagesize:5,
        total:0,
        commentsList:[],
        orgData:{},
      }
    },
    components:{
      slider,
      slideritem
    },
    created(){
      this.orgId = this.$route.query.id
      this.getOrganComments();
      this.getOrganDetail();
      this.$emit('header_two',true);
    },
    methods:{
      getOrganDetail(){
        this.http.post('/pc/org/queryOrgInfo',{orgId:this.orgId}).then(res=>{
          if(res.code == 0){
            this.orgData = res.data;
            this.imageList = res.data.imageList;
          }
        })
      },
      handleCurrentChange(v){
          this.pagenum = v;
          this.getOrganComments();
      },

      getOrganComments(){
        this.http.post('/org/queryOrgEvaluation',{orgId:this.orgId,pagenum:this.pagenum,pagesize:5}).then(res=>{
          if(res.code == 0){
            for(var i=0;i<res.data.list.length;i++){
              res.data.list[i].createTime = this.formatTimeToDay(res.data.list[i].createTime)
            }
            this.total = res.data.total;
            this.commentsList = res.data.list;
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
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/index.css'
  import '../../assets/css/organ.css'
</script>
