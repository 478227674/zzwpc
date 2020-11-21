<template>
  <div class="hello" style="background: #f5f5f5">
    <orghead></orghead>
    <div class="pc-center organ-allbox">
      <div class="org-common">
        <ul class="teachers-list">
          <li v-for="item in teacherList">
            <img :src="item.imageUrl" alt="">
            <div class="teacher-detail">
              <p class="teacher-name"> {{item.teacherName}}</p>
              <div class="teacher-intro">{{item.teacherTag}}</div>
              <div class="teacher-desc" v-html="item.teacherDesc"></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="org-desc-hotclasses">
        <div class="store-hot-class" style="background: #fff;">
          <div class="hot-title">热门课程</div>
          <div class="hot-class-list">
            <div @click="openProductDetail(item)" v-for="item in hotClass" class="hot-class-detail">
              <div class="hot-class-img">
                <img :src="item.imageUrl" alt="">
              </div>
              <div class="hot-class-text">
                <div class="hot-class-top">
                  <p>{{item.productName}}</p>
                  <div class="hot-class-classtime">
                    <span>班制：{{item.className}}</span>
                    <span>授课：{{item.teachName}}</span>
                  </div>
                </div>
                <div class="hot-class-price">
                  <div>
                    ￥{{item.productPrice}}
                    <span>返佣￥{{item.commissionRebate}}</span>
                  </div>
                  <p>{{item.purchaseNum}}已报名</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  // import mapa from '../../components/map'
  import orghead from '../../components/orghead'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        orgId: null,
        orgData: {},
        hotClass: [],
        teacherList:[],
      }
    },
    components: {
      // mapa
      orghead
    },
    created() {
      this.orgId = this.$store.state.user.activeOrgId;
      this.getHotClass();
      this.getTeachersList();
      this.$emit('header', false);
    },
    methods: {
      //获取热门课程
      getHotClass() {
        this.http.post('/dir/queryDirProductRecomByOrgId', {orgId: this.orgId, pageSize: 3, pageNum: 1}).then(res => {
          if (res.code == 0) {
            this.hotClass = res.data.list;
          }
        })
      },
      //获取老师列表
      getTeachersList() {
        this.http.post('/dir/queryOrgTeacher', {orgId: this.orgId,pageSize:9999,pageNum:1}).then(res => {
          if (res.code == 0) {
            this.teacherList = res.data.list;
          }
        })
      },

      openIndex() {
        this.$router.push('/')
      },
      openOrganDetail() {
        this.$router.push({path: '/pages/organ_detail', query: {id: this.orgId}})
      },
      openOrganProduct() {
        this.$router.push({path: '/pages/organ_product', query: {id: this.orgId}})
      },
      openOrganSchool() {
        this.$router.push({path: '/pages/organ_school', query: {id: this.orgId}})
      },
      openOrganComments() {
        this.$router.push({path: '/pages/organ_comment', query: {id: this.orgId}})
      },
      openOrganPresent() {
        this.$router.push({path: '/pages/organ_present', query: {id: this.orgId}})
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/index.css'
  import '../../assets/css/organ.css'
</script>
<style scoped>
  .teacher-desc{
    font-size: 14px;
    color:#7f7f7f;
    line-height: 20px;
  }
  .teacher-intro{
    margin: 10px 0;
    color:#313131;
    font-size: 18px;
    font-weight: bold;
  }
  .teacher-name{
    color:#313131;
    font-size: 21px;
    font-weight: bold;
  }
  .teacher-detail{
    width: 555px;
    margin-left: 25px;
  }
  .teachers-list li img{
    width: 205px;
    margin-bottom: 10px;
    height: 205px;
  }
    .teachers-list li {
      padding-left: 35px;
      display: flex;
      justify-content: flex-start;
    }
</style>
