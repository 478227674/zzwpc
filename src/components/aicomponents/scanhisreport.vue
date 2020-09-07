<!--suppress JSUnresolvedFunction -->
<template>
  <div class="hello" style="background: #f5f5f5">
    <el-dialog :visible.sync="childreportFlag" title="扫描报告" width="95%" >
      <el-tabs v-model="activeName">
        <el-tab-pane label="诊断报告" name="first">
          <div class="result-all">
            <div class="result-box">
              <div class="result-title">学科扫描诊断报告</div>
              <div class="result-detail">
                <div>
                  <span>姓名：</span>
                  <p>{{tobj.userName}}</p>
                </div>
                <div>
                  <span>学科：</span>
                  <p>{{tobj.subjectName}}</p>
                </div>

                <div>
                  <span>时间：</span>
                  <p>{{submitTime}},用时{{useTime}}</p>
                </div>
                <div>
                  <span>正确率：</span>
                  <p>总数量<span>{{tobj.totalNum}}</span>，正确数量<span>{{tobj.rightNum}}</span>，错误数量<span>{{tobj.errorNum}}</span>，正确率<span>{{tobj.rightRate}}%</span></p>
                </div>
              </div>
              <div class="weidu">扫描结果</div>
              <div class="result-table">
                <div class="test-result-num" v-for="(item,index) in tobj.scanQuestions">
                  <div class="test-your-anwser">
                    {{item.knowledge.knowledgeName}}
                    <span v-show="item.difficultyLevel==1 && item.isRight == 0">知识点概念不清晰。</span>
                    <span v-show="item.difficultyLevel==1 && item.isRight == 1">知识点概念清晰</span>
                    <span v-show="item.difficultyLevel==2 && item.isRight == 0">知识点还未深入理解</span>
                    <span v-show="item.difficultyLevel==2 && item.isRight == 1">知识点已经能够理解</span>
                    <span v-show="item.difficultyLevel==3 && item.isRight == 0">知识点还不能运用熟练</span>
                    <span v-show="item.difficultyLevel==3 && item.isRight == 1">知识点已经能运用</span>
                  </div>
                </div>



              </div>
              <div class="weidu">学习建议</div>
              <div style="margin-top: 20px;">
                <span v-html="learnPlan(1)"></span>
                <span v-html="learnPlan(2)"></span>
                <span v-html="learnPlan(3)"></span>
                <span v-html="noWrong()"></span>
              </div>
            </div>
            <div class="result-testlist">
              <div>
                <ul class="test-list">
                  <li  v-for="(item,index) in tobj.scanQuestions">
                    <div class="learn-list-index">
                      题：{{index+1}}
                      <div class="learn-user-anwser">
                        <div class="learn-user-choose">
                          <span>您的选择：{{chooseList[item.userAnswerIndex]}}</span>
                          <img v-if="item.isRight==0" src="../../assets/img/wordwrong.png" alt="">
                          <img v-else src="../../assets/img/testright.png" alt="">
                        </div>
                        <div class="learn-user-right">
                          正确答案：{{chooseList[item.optionAnswerIndex]}}
                        </div>
                        <div class="learn-user-right" style="margin-left: 20px">
                          题号:{{item.questionId}}
                        </div>

                      </div>
                    </div>
                    <div class="learn-list-body" v-html="item.alQuestion.questionStem"></div>
                    <div class="learn-list-choose">
                      <span v-for="(items,indexs) in item.alQuestion.alQuestionOption">{{chooseList[indexs]}}. {{items.optionName}}</span>
                    </div>
                    <div class="hide-answer" style="">
                      <div class="anwser-box">
                        <div class="anwser-btns">
                          <div @click="showAnswerJiexi(item.alQuestion.analysis)">
                            答案详解
                          </div>
                          <div @click="showVideoJiexi1(item.alQuestion.videoUrl)">
                            视频详解
                          </div>
                          <div @click="getAiPushTest(index)">
                            针对训练
                          </div>
                        </div>
                      </div>
                    </div>

                  </li>
                </ul>
              </div>

            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog :visible.sync="vFlag" title="答案解析" width="95%" >
      <div style="width: 100%;" v-html="analysis">

      </div>
    </el-dialog>
    <el-dialog top="1vh" :visible.sync="videoFlag" title="视频详解" width="95%" >
      <div class="video-box" style="width: 500px;margin: 20px auto">
        <video-player  class="video-player vjs-custom-skin"
                       ref="videoPlayer"
                       :playsinline="true"
                       :options="playerOptions"
                       v-show="playerOptions.sources[0].src"
        ></video-player>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="pushFlag" title="针对训练" width="95%" >
      <div>
        <div class="result-testlist" style="width: 100%;">
          <div>
            <ul class="test-list">
              <li  v-for="(item,index) in pushList">
                <div class="learn-list-index">
                  题：{{index+1}}
                  <div class="learn-user-anwser">
                    <div class="learn-user-right" style="margin-left: 20px">
                      题号:{{item.questionId}}
                    </div>
                  </div>
                </div>
                <div class="learn-list-body" v-html="item.questionStem"></div>
                <div class="learn-list-choose">
                  <span v-for="(items,indexs) in item.alQuestionOption">{{chooseList[indexs]}}. {{items.optionName}}</span>
                </div>


                <div class="show-anwser" v-show="!item.isShow" @click="showAnswer(index,true)">
                  显示答案
                </div>
                <div class="hide-answer"  v-show="item.isShow">
                  <div class="hide-anwser"  @click="showAnswer(index,false)">
                    隐藏答案
                  </div>
                  <div style="clear: both;width:100%;border-bottom: 1px solid #e5e5e5;padding-top: 10px;"></div>

                  <div class="anwser-box">
                    <div class="anwser-right">
                      参考答案：{{chooseList[item.anwIndex]}}
                    </div>
                    <div class="anwser-btns">
                      <div @click="showAnswerJiexi(item.analysis)">
                        答案详解
                      </div>
                      <div @click="showVideoJiexi1(item.videoUrl)">
                        视频详解
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </el-dialog>
  </div>
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
          type: "application/x-mpegURL",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
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

      videoFlag:false,
      analysis:'',
      vFlag:false,
      activeName:'first',
      childreportFlag:false,

      tid:null,
      tobj:{
        scanQuestions:[],
      } ,
      chooseList:['A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      submitTime:"",
      resultNum:0,
      useTime:'',

      answerFlag:false,

      pushList:[],

    }
  },
  mounted(){
    this.monitoring() // 注册监听事件
  },
  created(){

  },
  methods:{
    //根据每个题获取针对训练列表
    getAiPushTest(index){
      console.log(this.tobj.scanQuestions[index].alQuestion.questionId)
      this.http.post('/al/getScanRecomQues',{questionId:this.tobj.scanQuestions[index].alQuestion.questionId}).then(res=>{
        if(res.code == 0){
          for(var i=0;i<res.data.length;i++){
            for(var n=0;n<res.data[i].alQuestionOption.length;n++){
              if(res.data[i].alQuestionOption[n].isRight == 1){
                res.data[i].anwIndex = n;
              }
            }
          }
          this.pushFlag = true;
          this.pushList = res.data;
          console.log(this.pushList)
        }
      })
    },
    showAnswer(index,flag){
      this.pushList[index].isShow = flag;
      this.$set(this.pushList,index,this.pushList[index])
    },
    //答案解析
    showAnswerJiexi(ana){
      this.analysis = ana;
      this.vFlag = true;
    },
    //视频
    showVideoJiexi1(fileId){
      this.http.post('/al/getVideoInfo',{fileId:fileId}).then(res=>{
        if(res.code == 0){
          this.playerOptions.sources[0].src = res.m3u8Url
          this.videoUrl = res.m3u8Url;
          this.videoFlag = true;
        }
      })
    },
    monitoring() { // 监听事件
      this.$on('childMethodHis', (res) => {
        this.http.post('/al/queryScanRecordInfo',{recordId:res.recordId}).then(res=>{
          if(res.code == 0){
            this.childreportFlag = true;
            for(var i=0;i<res.data.scanQuestions.length;i++){
              for(var n=0;n<res.data.scanQuestions[i].alQuestion.alQuestionOption.length;n++){
                //找到当前用户选择对应答案的下标 用于后边显示ABCD
                if(res.data.scanQuestions[i].userAnswer == res.data.scanQuestions[i].alQuestion.alQuestionOption[n].optionId){
                  res.data.scanQuestions[i].userAnswerIndex = n;
                }
                //找到正确答案的下标
                if(res.data.scanQuestions[i].alQuestion.alQuestionOption[n].isRight == 1){
                  res.data.scanQuestions[i].optionAnswerIndex = n;
                }
              }
            }
            this.submitTime = this.formatTimeToDate(res.data.createTime)
            this.resultNum = res.data.rightRate
            this.tobj = res.data;
            console.log(JSON.stringify(this.tobj))
            var m = Math.floor(res.data.useTime/60);
            var s = res.data.useTime%60;
            m = m<10 ? '0'+m : m;
            s = s<10 ? '0'+s : s;
            this.useTime =  m+':'+s;
          }
        })
      })

    },
    //学习建议
    learnPlan(lv){
      var str = '';
      var isHas = false; //记录是否有做错的
      for(var i=0;i<this.tobj.scanQuestions.length;i++){
        if(this.tobj.scanQuestions[i].isRight == 0 && this.tobj.scanQuestions[i].difficultyLevel == lv ){
          isHas = true;
          str+=this.tobj.scanQuestions[i].knowledge.knowledgeName+'、'
        }
      }
      if(isHas){ //有做错的情况
        if(lv == 1){
          str += '概念不清晰，建议进入知识讲授栏目加强基本概念学习。'
        }else if(lv == 2){
          str += '还未理解，建议进入知识讲授栏目加强理解，在此基础进行相应的分点专栏训练。'
        }else if(lv == 3){
          str += '还不能运用熟练，建议进入相应的分点专栏训练。'
        }
        return str;
      }else{
        return ''
      }
    },
    noWrong(){
      var str = '';
      var haveWrong = false; //记录是否有做错的
      for(var i=0;i<this.tobj.scanQuestions.length;i++){
        if(this.tobj.scanQuestions[i].isRight == 0 ){
          haveWrong = true;
        }
      }
      if(haveWrong){
        str = ''
      }else{
        str = '恭喜您，您本次扫描全部过关，可继续扫描或者进入其他栏目学习。'
      }
      return str;
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
