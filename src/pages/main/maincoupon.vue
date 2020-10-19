<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>

    <div class="pc-center">
      <div class="mianbox">
        <div class="main-left">
          <p>我的优惠券</p>
          <div class="main-center-line"></div>
        </div>
        <div>
          <div class="coupon-list">
            <div class="coupon-list-box">
              <div class="coupon-items-all " v-for="item in couponList">
                <div class="coupon-items">
                  <div class="coupon-bgbox">
                    <div class="coupon-top">
                      <div class="coupon-num">
                        {{item.usedAmount}}<span>元</span>
                      </div>
                      <div class="coupon-desc">
                        <div class="coupon-desc-title">
                          <span>券</span>
                          {{item.orgName}}
                        </div>
                        <div class="coupon-canuse">满{{item.withAmount}}元使用</div>
                      </div>
                    </div>
                    <div class="coupon-time">
                      有效期:{{item.startTime}} 至 {{item.endTime}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="height: 20px;"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '../../components/mainhead'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        pagenum:1,
        pagesize:5,
        total:1,
        couponList:[],
        tabindex:0,
      }
    },
    components:{
      'main-header':Header,
    },
    created(){
      this.$emit('header_two',false)
      this.getMyCouponList();
    },
    methods:{
      getMyCouponList(){
        this.http.post('/user/queryCouponList',{pageNum:this.pagenum,pageSize:10}).then(res=>{
          if(res.code == 0){
            for(var i=0;i<res.data.list.length;i++){
              res.data.list[i].startTime = this.formatTimeToDate(res.data.list[i].startTime)
              res.data.list[i].endTime = this.formatTimeToDate(res.data.list[i].endTime)
            }
            this.couponList = res.data.list;
            this.total = res.data.total;
          }
        })
      },
      handleCurrentChange(v){
        this.pagenum = v;
        this.getMyCouponList()
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/style.css'
  import '../../assets/css/order.css'
  import '../../assets/css/coupon.css'
</script>
<style scoped>
  .coupon-bgbox{
    height: 90px;
  }
  .coupon-items{
    height: 95px;
    width:360px;
  }
  .coupon-items-all{
    margin-right: 0 !important;
    width: 360px;
    margin-bottom: 10px;
  }
  .coupon-top{
    display: flex;
    justify-content: flex-start;
  }
  .coupon-list-box{
    justify-content: space-between;
  }
</style>
