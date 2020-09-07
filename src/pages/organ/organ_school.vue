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
          <li  class="organ_active" @click="openOrganSchool">
            校区
          </li>
          <li @click="openOrganComments">
            评价
          </li>
          <li  @click="openOrganPresent">
            机构简介
          </li>
        </ul>
      </div>
    </div>
    <!--<div class="pc-center" style="margin-top: 20px;">-->
      <!--<img :src="orgData.imageUrl" style="width:100%;" alt="">-->
    <!--</div>-->

<!--    <div class="pc-center pc-center-padding" style="padding-bottom: 20px;">-->
<!--      <div class="special-class">-->
<!--        <span>我们的校区</span>-->
<!--      </div>-->
<!--      <mapa v-if="addresslist.length>0" :addresslist="addresslist"></mapa>-->
<!--    </div>-->

  </div>

</template>
<script>
  // import mapa from '../../components/map'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        orgId:null,
        addresslist:[],
        orgData:{},

      }
    },
    components:{
      // mapa

    },
    created(){
      this.orgId = this.$route.query.id;
      this.getOrganDetail();
      this.$emit('header_two',true);
    },
    methods:{
      getOrganDetail(){
        this.http.post('/org/queryOrgInfo',{orgId:this.orgId}).then(res=>{
          if(res.code == 0){
            this.orgData = res.data
            this.addresslist = JSON.parse(res.data.orgCampus)
            if(this.addresslist.length>0){
              for(var i=0;i<this.addresslist.length;i++){
                this.addresslist[i].show = false;
              }
            }
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
<style scoped>

</style>
