<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>

    <div class="pc-center">
      <div class="mianbox">
        <div class="person-history">
          <div class="main-system-title">
            我的消息>消息详情
          </div>
          <div>
            <div class="msg-detail-title">
              消息来源：<span>平台</span>
            </div>
            <div class="msg-detail-title">
              产生时间：<span>{{mobj.pushTime}}</span>
            </div>

            <div class="msg-detail-title">
              消息内容：
              <div>
                {{mobj.messageContent}}
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

  export default {
  name: 'HelloWorld',
  data () {
    return {
      pagenum:1,
      pagesize:5,
      total:1,
      pushId:null,
      mobj:{},
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.pushId = this.$route.query.id;
    this.getMsgDetail();
    this.$emit('header_two',false)

  },
  methods:{
      getMsgDetail(){
        this.http.post('/dir/queryMessageInfo',{pushId:this.pushId}).then(res=>{
          if(res.code == 0){
            res.data.pushTime = this.formatTimeToDay(res.data.pushTime)
            this.mobj = res.data
          }
        })
      },
    openMessageDetail(){
        this.$router.push('/pages/msgdetail')
    },
  },
}
  import '../../assets/css/common.css';
  import '../../assets/css/style.css';
  import '../../assets/css/product.css';
</script>
<style scoped>
  .msg-detail-title>div{
    color:#333;
    margin-top: 15px;
  }
  .msg-detail-title{
    color:#666;;font-size: 15px;
    margin-top: 20px;
  }
  .person-history{
    background: #fff;
    padding: 20px;
  }
  .main-system-title{
    font-size: 18px;color:#ff5000;
  }



</style>
