<template>
  <div v-html="vhtml"  class="hello" style="background: #f5f5f5">
  </div>

</template>
<script>

  export default {
    name: 'hello',
    data () {
      return {
        vid:null,
        vhtml:'',
      }
    },
    components:{

    },
    created(){
      this.vid = this.$route.query.id;
      this.tryThisVideo();
      this.$emit('header_two',false);
    },
    methods:{
      //试听课程
      tryThisVideo(data){
        this.http.post('/product/getProductVideoInfo',{videoId:this.vid}).then(res=>{
          if(res.code == 0){
            this.vhtml = res.htmlResult;
            this.vhtml = this.vhtml.replace('>Tip<','温馨提示')
            localStorage.setItem('videohtml',this.vhtml);
            location.href = 'http://qk.taiqiedu.com/mba/video.html'
          }
        })
      },

    },
    watch:{

    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
</script>


<style scoped>
  .group-time img{
    height:32px;
    margin: 8px 60px;
    width:113px;
  }
  .cut-price span{
    padding: 3px 8px;
    font-size: 12px;
    border-radius: 50px;
    background: #ffe589;
    color:#ff7000;
  }
  .cut-price s {
    font-size: 12px;
  }
  .pc-center-padding{
    display: flex;
    justify-content: space-between;
  }

</style>
