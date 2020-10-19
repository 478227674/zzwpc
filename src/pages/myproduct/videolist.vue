<template>
  <div class="hello1" style="background: #000000;width: 100%;height: 100%;">
    <div class=" video-box-all">
      <div class="video-list-top">
        <div class="v-list-left" @click="backToProductList">
          {{productName}}/<span>{{videoName}}</span>
        </div>
        <div @click="downloadPdf" style="color:#fff;font-size: 14px;" class="v-list-right" v-if="stageList.length>0 && stageActiveIndex != null && stageList[stageActiveIndex].datumUrl">
          {{stageList[stageActiveIndex].stageName}}>>讲义下载
        </div>
        <div class="v-list-right">
          <span @click="openMyProduct">我的课程</span>
          <img @click="openMain" v-if="user.imageUrl" :src="user.imageUrl" alt="">
        </div>
      </div>
      <div class="video-box-bot">
        <div class="video-box-left" >
          <div style="width:80%;height:80%;margin:0px auto;" id="box-video">
            <video id="player-container-id" class="video-dom" playsinline webkit-playsinline preload="auto" src=""></video>

          </div>
        </div>
        <div class="video-box-right">
          <p class="video-box-title">{{productName}}</p>
          <div class="subject-list">
            <span @click="getStageListBySubjectId(item.subjectId)" :class="{'active-sub':subjectId == item.subjectId,'no-sub':subjectId!=item.subjectId}" v-for="item in subjectList">{{item.subjectName}}</span>
          </div>
          <div style="overflow-y: scroll">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item style="color:#fff !important;" @click.native="getVideosListByStageId(item.stageId,index)" v-for="(item,index) in stageList" :key="index" :title="item.stageName" :name="index+1">
                <ul class="video-list-data">
                  <li @click="learnVideo(items)" :class="{'active-video-playing':seeVideoId == items.videoId}" v-for="(items,indexs) in item.videoList">
                    <div class="video-data-name">
                      <span v-if="items.onLive == 1 && items.videoType == 1">【直播】</span>
                      <span v-if="items.onLive == 1 && items.videoType == 2">【回放】</span>
                      <span v-if="items.onLive == 0">【录播】</span>
                      {{items.videoName}}
                    </div>
                    <div class="video-data-status">
                      <div v-if="seeVideoId == items.videoId">正在学习</div>
                      <span v-if="items.isFinish == 1 && seeVideoId != items.videoId" class="video-status-seed"></span>
                      <span v-if="items.isFinish == 0 && seeVideoId != items.videoId" class="video-status-nosee"></span>
                      <img v-if="seeVideoId == items.videoId" class="video-playing" src="../../assets/img/video/playing.png" alt="">
                    </div>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="选择回放" width="30%" :visible.sync="videosFlag">
      <ul class="pricelist">
        <li @click="chooseThisVideo(item)" v-for="item in videosList" :class="{'activeprice':videoName == item.videoName}">
          {{item.videoName}}
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="videosFlag = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  <!--  5285890801529766442-->
</template>
<script>

  export default {
    name: 'HelloWorld',
    data() {
      return {
        activeName: '1',
        clicktype: 1,
        sortList: [],
        sortId: null,

        pagenum: 1,
        pagesize: 5,
        total: 0,

        ptype: null,
        productId: null,
        pid: null,
        seeId: null,
        imageType: null,
        vobj: {},
        videoList: [],
        stageList: [],
        subjectList: [],
        subjectId: null,
        stageActiveIndex: null,
        stageId: null,
        videos: [],
        seeVideoId: null,
        videoUrl: '',

        videosList: [],
        videosFlag: false,
        videoName: null,

        productName:'',
        player:undefined,
        user:null,
      }
    },
    components: {},
    created() {
      this.user = this.getUserInfo();
      this.ptype = this.$route.query.type;
      this.productId = this.$route.query.id;
      this.productName = this.$route.query.name;
      this.http.post('/product/querySubjectListByProduct', {
        productId: this.productId,
        productType: this.ptype
      }).then(res => {
        if (res.code == 0) {
          this.subjectList = res.data;
          this.getStageListBySubjectId(res.data[0].subjectId)
        }
      })
    },
    mounted() {
      this.$emit('header',false)
      this.$emit('footer',false)
    },
    methods: {
      //阶段讲义下载
      downloadPdf(){
        if(this.stageList[this.stageActiveIndex].datumUrl){
          window.open(this.stageList[this.stageActiveIndex].datumUrl, '_blank');
        }
      },

      //打开个人中心
      openMain(){
        this.openNewPage('/pages/mainmsg')
      },
      //打开我的课程
      openMyProduct(){
        this.openNewPage('/pages/myproductlist')
      },
      //选择一个回访就看
      chooseThisVideo(data){
        this.replaceVideoHtml(data.broadcastUrl)
      },
      //返回上一页
      backToProductList(){
        this.$router.go(-1)
      },
      //选择一个视频
      learnVideo(data){
        this.seeVideoId = data.videoId;
        this.videoName = data.videoName;
        if(data.onLive == 1){ //直播或者录播
          if(data.videoType == 1){ //直播
            this.http.post('/product/getProductVideoInfo',{videoId:data.videoId}).then(res=>{
              if(res.code == 0){
                this.replaceVideoHtml(res.productVideo.videoUrl)
              }
            })
          }else{//录播
            this.http.post('/product/getProductVideoInfo',{videoId:data.videoId}).then(res=>{
              if(res.code == 0){
                if(res.productVideos.length>0){
                  this.videosList = res.productVideos;
                  this.videosFlag = true;
                }else{
                  // this.replaceVideoHtml(res.productVideos[0].htmlResult)
                }
              }
            })
          }
        }else{ //视频课
          if(this.player){
            this.player.dispose();
            document.getElementById('box-video').innerHTML = '';
            let domStr = '<video id="player-container-id" class="video-dom" width="500" height="300" playsinline webkit-playsinline preload="auto" src=""></video>'
            document.getElementById('box-video').innerHTML = domStr;
          }
          this.$nextTick(function(){
            this.player = TCPlayer('player-container-id', { // player-container-id 为播放器容器 ID，必须与 html 中一致
              fileID: data.lineVideoUrl, // 请传入需要播放的视频 filID（必须）
              appID: '1251662691', // 请传入点播账号的 appID（必须）
              playbackRates: [0.5, 1, 1.25, 1.5, 2]
            });
          })
        }
      },
      //根据阶段ID查找课时列表
      getVideosListByStageId(stageId,index){
        if(this.stageList[index].videoList){
          this.stageActiveIndex = index;
          return;
        }
        this.stageId = stageId;
        this.stageActiveIndex = index;
        this.http.post('/product/getProductVideoList',{stageId:stageId,productId:this.productId,productType:this.ptype,subjectId:this.subjectId}).then(res=>{
          if(res.code == 0){
            this.stageList[index].videoList = res.data;
            this.$set(this.stageList,index,this.stageList[index])
          }
        })
      },
      //根据学科ID查找阶段
      getStageListBySubjectId(subjectId){
        this.subjectId = subjectId;
        this.stageList = [];
        this.videos = [];
        this.http.post('/product/getProductStageList',{productId:this.productId,productType:this.ptype,subjectId:this.subjectId}).then(res=>{
          if(res.code == 0){
            for(var i=0;i<res.data.length;i++){
              res.data[i].flag = false;
            }
            this.stageList = res.data;
          }
        })
      },

    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
  import '../../assets/css/style.css'
</script>
<style>
  .player-container-id-dimensions{
    width: 100% !important;
    height: 100% !important;
  }
  .video-js .vjs-big-play-button {
    background: none !important;
    border: none !important;
    top: 150px !important;
    left: 50% !important;
  }

  .tcp-skin .vjs-progress-control {
    top: -0.1rem !important;
  }

  .video-js {
    margin: 0px auto;
  }

  .el-collapse-item__arrow {
    margin-right: 0px;
  }

  .el-collapse-item__wrap {
    background: none !important;
  }

  .el-collapse-item__content {
    padding-bottom: 0px;
    color: #979797;
  }

  .el-collapse-item__header {
    color: #fff !important;
    background: #434343 !important;
    padding: 0 20px;
    border-bottom: none !important;
  }
  .el-collapse {
    border:none !important;
  }

</style>
<style scoped>
  .video-box-all{
    height: 100%;
  }
  .pricelist li {
    cursor: pointer;
  }
  .subject-list {
    padding: 0px 20px 10px 20px;
  }
  .subject-list span{
    cursor: pointer;
    padding: 3px 7px;
    font-size: 14px;
  }
  .no-sub{
    color:#fff;
  }
  .active-sub{
    color:#eb6100;
    border:1px solid #eb6100;
  }
  .active-video-playing{
    color: #eb6100 !important;
  }
  .video-playing {
    height: 10px;
    width: 10px;
    margin-top: 16px;
  }
  .video-data-status div {
    margin-right: 5px;
  }

  .video-status-seed {
    display: block;
    height: 9px;
    width: 9px;
    border-radius: 50%;
    background: #32b16c;
    margin-top: 16px;
  }

  .video-status-nosee {
    display: block;
    height: 9px;
    width: 9px;
    border-radius: 50%;
    border: 1px solid #7b7b7b;
    margin-top: 16px;

  }

  .video-data-status {
    display: flex;
    justify-items: flex-start;
    line-height: 44px;
  }

  .video-data-name {
    line-height: 44px;
    font-size: 14px;
  }

  .video-list-data li {
    cursor: pointer;
    color: #979797;
    height: 44px;
    padding: 0 20px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }

  .video-box-title {
    padding: 0 20px;
    line-height: 66px;
    font-size: 18px;
    color: #fff;
    height:66px;
    overflow: hidden;

  }

  .video-box-left {
    /*width: 889px;*/
    flex: 1;
    height: 100%;
    display: flex;
    justify-items: center;
  }

  .video-box-right {
    width: 340px;
    background: #313131;
    height: 100%;
  }

  .video-box-bot {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background: #000000;
  }

  .v-list-right img {
    width: 38px;
    border-radius: 50%;
    height: 38px;
    margin-top: 16px;
  }

  .v-list-right {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
  }

  .v-list-right span {
    line-height: 70px;
    padding-left: 35px;
    font-size: 12px;
    color: #979797;
    margin-right: 28px;
    background: url("../../assets/img/video/message.png") no-repeat left 25px;
    background-size: 21px 19px;
  }

  .v-list-left span {
    color: #8a8a8a;
  }

  .v-list-left {
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    padding-left: 30px;
    background: url("../../assets/img/video/back.png") no-repeat left 22px;
    background-size: 25px 22px;
  }

  .video-list-top {
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    line-height: 70px;
    height: 70px;
    background: #1b1b1b;
  }


  .classes-table li {
    height: 120px !important;
  }

  .main-page-title {
    font-size: 18px;
    color: #333;
    line-height: 77px;
    font-weight: bold;
  }


  .subjects-btn span {
    padding: 0 5px;
  }

  .my-product-box-r {
    width: 100px;
  }

  .my-product-box-r img {
    height: 14px;
    margin-top: 17px;
  }

  .my-product-box-r span {
    font-size: 14px;
    color: #666;
    margin-right: 10px;
  }

  .my-product-box li div {
    display: flex;
    justify-content: flex-start;
  }

  .my-product-box li {
    display: flex;
    cursor: pointer;
    overflow: hidden;
    justify-content: space-between;
    line-height: 50px;
    border-top: 1px solid #e5e5e5;
  }

  .my-product-box-l img {
    width: 20px;
    height: 20px;
    margin-top: 15px;
    margin-right: 10px;

  }
</style>
