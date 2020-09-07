<!--suppress JSUnresolvedFunction -->
<template>
  <el-dialog top="1vh" title="试听课程" width="80%" :visible.sync="videoFlag">
    <video-player  class="video-player vjs-custom-skin"
                   ref="videoPlayer"
                   :playsinline="true"
                   :options="playerOptions"
    ></video-player>
    <div slot="footer" class="dialog-footer">
      <el-button @click="videoFlag = false">取 消</el-button>
    </div>
  </el-dialog>

</template>
<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      pushFlag:false,
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
      videos:[],
      subjectId:null, //查看的当前学科ID
      subjectList:[],//学科列表
      stageId:null,//查看的当前阶段ID
      stageList:[],//阶段列表
      stageActiveIndex:null,
      videoUrl:'',
      videoFlag:false,
      shareUrl:'',
    }
  },
  mounted(){
    this.monitoring() // 注册监听事件
  },
  created(){

  },
  methods:{
    monitoring() { // 监听事件
      this.$on('seeVideosByComments', (res) => {
        this.tryThisVideo(res)
      })

    },
    //试听课程
    tryThisVideo(data){
      if(data.videoType==2){
        this.http.post('/product/getProductVideoInfo',{videoId:data.videoId}).then(res=>{
          if(res.code == 0){
            this.replaceVideoHtml(res.productVideos[0].htmlResult)
          }
        })
      }else {
        if(data.onLive==1){
          this.http.post('/product/getProductVideoInfo',{videoId:data.videoId}).then(res=>{
            if(res.code == 0){
              this.replaceVideoHtml(res.productVideo.htmlResult)
            }
          })
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
import '../../assets/css/learn.css'
</script>
<style scoped>
  .result-table{
    margin-top: 20px;
  }
  .result-fenx{
    margin-top: 10px;
    margin-left: 0px;
  }
  .anwser-box{
    justify-content: flex-end;
  }
</style>
