<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>
    <div class="pc-center">
      <div class="mianbox">
        <div style="background: #fff;padding: 20px">
          <div class="main-system-title" style="color:#ff5000">
            我的课程>课程详情
          </div>
          <div class="main-system-title" style="color:#333;font-size: 15px;margin-top: 10px;">
            目录
          </div>
          <div>
            <div class="class-list">
              <div class="subjects-btn">
                <span @click="getStageListBySubjectId(item.subjectId)" :class="{'active-btns':subjectId==item.subjectId}" v-for="item in subjectList">{{item.subjectName}}</span>
              </div>
              <div v-for="(item,index) in stageList" @click="getVideosListByStageId(item.stageId,index)">
                <div class="stagelist" >
                <span>
                    {{item.stageName}}
                </span>
                  <img :class="{'open-active':stageId==item.stageId&&item.flag}" src="../../assets/img/right.png" alt="">
                </div>
                <ul v-show="stageActiveIndex == index && item.flag" class="list-uel">
                  <li :class="{'learning-now':item.videoId==seeVideoId}" v-for="(item,index) in videos" @click="learnVideo(item)">
                    <div>
                      {{index+1}}.{{item.videoName}}
                    </div>
                    <span >
                    正在学习
                  </span>

                  </li>
                </ul>
              </div>
            </div>

          </div>
          <div>
            <div class="video-box" style="margin-top: 10px;width: 800px;">
              <!--            <video  controls poster="../../assets/img/videotbg.png" :src="videoUrl"></video>-->
              <img style="width: 100%;" src="../../assets/img/videotbg.png" v-show="playerOptions.sources[0].src==''" alt="">
              <video-player  class="video-player vjs-custom-skin"
                             ref="videoPlayer"
                             :playsinline="true"
                             :options="playerOptions"
                             v-show="playerOptions.sources[0].src"
              ></video-player>
            </div>
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
</template>
<script>
  import Header from '../../components/mainhead'
  import 'videojs-contrib-hls'
  export default {
  name: 'HelloWorld',
  data () {
    return {
      playerOptions : {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: "" //url地址
        }],
        poster: "../../assets/img/videotbg.png", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      },

      clicktype:1,
      sortList:[],
      sortId:null,

      pagenum:1,
      pagesize:5,
      total:0,

      ptype:null,
      productId:null,
      pid:null,
      seeId:null,
      imageType:null,
      vobj:{},
      videoList:[],
      stageList:[],
      subjectList:[],
      subjectId:null,
      stageActiveIndex:null,
      stageId:null,
      videos:[],
      seeVideoId:null,
      videoUrl:'',

      videosList:[],
      videosFlag:false,
      videoName:null,
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.ptype = this.$route.query.type;
    this.productId = this.$route.query.id;
    this.$emit('header_two',false)

    this.http.post('/product/querySubjectListByProduct',{productId:this.productId,productType:this.ptype}).then(res=>{
      if(res.code == 0){
        this.subjectList = res.data;
        this.subjectId =  res.data[0].subjectId;
        this.getStageListBySubjectId(this.subjectId)
      }
    })
//    this.$emit('footer',false)
  },
  methods:{
    //选择一个回访就看
    chooseThisVideo(data){
      this.videoName = data.videoName;
      this.replaceVideoHtml(data.htmlResult)
    },
    //看课程
    learnVideo(data){
      this.seeVideoId = data.videoId;
      if(data.videoType==2){ //如果是回访 需要调回访列表 区分多个和一个
        this.http.post('/product/getProductVideoInfo',{videoId:data.videoId}).then(res=>{
          if(res.code == 0){
            if(res.productVideos.length>1){
              this.videosList = res.productVideos;
              this.videosFlag = true;
            }else{
              this.replaceVideoHtml(res.productVideo.htmlResult)
            }
          }
        })
      }else {
        if(data.onLive==1){
          this.http.post('/product/getProductVideoInfo',{videoId:data.videoId}).then(res=>{
            if(res.code == 0){
              this.replaceVideoHtml(res.productVideo.htmlResult)
            }
          })
          // window.open(data.videoUrl);
        }else{
          this.http.post('/al/getVideoInfo',{fileId:data.lineVideoUrl}).then(res=>{
            if(res.code == 0){
              this.playerOptions.sources[0].src = res.mp4Url
              this.videoUrl = res.mp4Url;
              this.videoFlag = true;
            }
          })
        }
      }
    },

    //根据阶段ID查看课时列表
    getVideosListByStageId(stageId,index){
      this.stageList[index].flag = !this.stageList[index].flag;
      if(!this.stageList[index].flag){
        return;
      }
      this.stageId = stageId;
      this.stageActiveIndex = index;
      this.http.post('/product/getProductVideoList',{stageId:stageId,productId:this.productId,productType:this.ptype,subjectId:this.subjectId}).then(res=>{
        if(res.code == 0){
          this.videos = res.data;
        }
      })
    },
    //根据学科ID查询阶段列表
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
  watch:{
    videoFlag(val,oval){
      if(!val){
        this.playerOptions.sources[0].src = ''

      }
    },
  },
}
  import '../../assets/css/common.css';
  import '../../assets/css/product.css';
  import '../../assets/css/style.css'
</script>
<style scoped>
  .list-uel span{
    display: none;
  }
  .learning-now div{
    color:#f73e3c !important;
  }
  .learning-now span{
    display: block !important;
  }
 .video-box video{
   height: 540px;
   width: 100%;
 }
  .class-list li {
    cursor: pointer;
  }
  .pricelist{
    width: 80%;
    margin: 0 auto;
  }
  .activeprice{
    border-color:#f73e3c !important;
    color:#f73e3c !important;
  }
  .pricelist li {
    cursor: pointer;
    margin-bottom: 10px;
    height: 40px;
    line-height: 40px;
    width: 100%;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    text-align: center;
  }
</style>
