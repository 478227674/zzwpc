<template>
  <div class="hello" style="background: #f5f5f5">
    <div style="height:20px;"></div>
    <div class="pc-center pc-box-flex">
      <div class="ab-left">
        <ul>
          <li @click="openPageByUrl('/pages/aboutus')">
            关于我们
          </li>
          <li @click="openPageByUrl('/pages/right')">
            权利声明
          </li>
          <li @click="openPageByUrl('/pages/law')">
            法律声明
          </li>
          <li class="active-abli" @click="openPageByUrl('/pages/secret')">
            隐私条款
          </li>
        </ul>
      </div>
      <div class="ab-right">
        <p>隐私条款</p>
        <div v-html="domHtml"></div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        domHtml:'',
      }
    },
    components:{
    },
    created(){
      this.$emit('header_two',true)

      this.getDetail();
    },
    methods:{
      openPageByUrl(url){
        this.$router.push(url)
      },
      getDetail(){
        this.http.post('/common/querySysRules',{}).then(res=>{
          if(res.code == 0){
            this.domHtml = res.data.privacyClause
          }
        })

      },
    },
  }
  import '../../assets/css/common.css';
</script>


<style scoped>
  .ab-right div{
    margin-bottom: 30px;
    font-size: 13px;
    color:#333;
    text-indent: 30px;
    line-height: 25px;
  }
  .ab-right p{
    margin-bottom: 30px;
    line-height: 47px;
    color:#ff5000;font-size: 18px;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
  }
  .pc-box-flex{
    display: flex;
    justify-content: space-between;
  }
  .ab-right{
    width:940px;
    padding: 20px;
    background: #fff;
  }
  .active-abli{
    color:#ff5000 !important;
  }
  .ab-left li {
    cursor: pointer;
    line-height: 50px;
    font-size: 17px;
    color:#333;
    text-align: center;
    border-bottom: 1px solid #f7f7f7;
  }
  .ab-left{
    width:200px;
    background: #fff;
  }
</style>
