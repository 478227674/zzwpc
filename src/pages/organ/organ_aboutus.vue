<template>
  <div class="hello" style="background: #f5f5f5">
    <orghead></orghead>
    <div class="org-desc pc-center">
      <div class="org-desc-detail">
        <div class="org-desc-orgname">
          {{orgObj.orgName}}
        </div>
        <div class="org-desc-code" v-html="orgObj.orgDesc">
        </div>
      </div>
      <div class="org-desc-hotclasses">
        <div class="store-hot-class">
          <div class="hot-title">热门课程</div>
          <div class="hot-class-list">
            <div  @click="openProductDetail(item)"  v-for="item in hotClass" class="hot-class-detail">
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
  import orghead from '../../components/orghead'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        hotClass:[],
        orgObj:{},

      }
    },
    components:{
      orghead
    },
    created(){
      this.orgId = this.$store.state.user.activeOrgId;
      this.$emit('header', false)
      this.getHotClass();
      this.getOrgInfo();
    },
    methods:{
      //打开课程详情
      openProductDetail(data) {
        this.openProductDetailByType(data)
      },
      //获取机构详情
      getOrgInfo() {
        this.http.post('/dir/queryOrgInfo', {orgId: this.orgId}).then(res => {
          if (res.code == 0) {
            this.orgObj = res.data;
          }
        })
      },
      //获取机构热门课程
      getHotClass(){
        this.http.post('/dir/queryDirProductRecomByOrgId',{orgId:this.orgId,pageSize:3,pageNum:1}).then(res=>{
          if(res.code == 0){
            this.hotClass = res.data.list;
          }
        })
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
