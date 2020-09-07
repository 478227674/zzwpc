<!--suppress JSUnresolvedFunction -->
<template>
  <div class="hello" style="background: #f5f5f5">
    <el-dialog top="1vh" title="测试报告" width="95%" :visible.sync="childreportFlag">
      <el-tabs v-model="activeName">
        <el-tab-pane label="诊断报告" name="first">
          <div class="result-all">
            <div class="result-box">
              <div class="result-title">根题诊断报告</div>
              <div class="result-detail">
                <div>
                  <span>单元：</span>
                  <p>{{reobj.knowledgeName}}</p>
                </div>
                <div>
                  <span>姓名：</span>
                  <p>{{reobj.userName}}</p>
                </div>
                <div>
                  <span>时间：</span>
                  <p>{{reobj.createTime}}，用{{useTimeText}}</p>
                </div>
                <div>
                  <span>成绩：</span>
                  <p><span>{{reobj.userScore}}</span> 分，全国平均 <span>{{reobj.avgScore}}</span> 分，领先 {{reobj.userRank}}% 的学员</p>
                </div>
              </div>
              <div class="weidu">知识掌握维度分析</div>
              <div class="result-table">
                <div class="result-radar">
                  <div class="result-daibiao">
                    <div>
                      <span style="background: #c23531"></span>
                      <p>全国</p>
                    </div>
                    <div style="margin-left: 30px;">
                      <span style="background: #2f4554"></span>
                      <p>我</p>
                    </div>
                  </div>
                  <div style="width:300px;height:300px;" id="echartsbox" ref="echartsbox"></div>
                </div>
                <div class="result-fenx">
                  <div>概念：该知识概念已全面了解 </div>
                  <div>理解：该知识未能理解，不清楚来龙去脉 </div>
                  <div>运用：该知识还未学会运用</div>
                </div>
              </div>
<!--              <div class="weidu">学习建议</div>-->
<!--              <div style="margin-top: 20px;">-->
<!--                asdadha-->
<!--              </div>-->
            </div>
            <div class="result-testlist">
              <div>
                <ul class="test-list">
                  <li v-for="(item,index) in testList">
                    <div class="learn-list-index">
                      题 {{index+1}}
                      <div class="learn-user-anwser">
                        <div class="learn-user-choose">
                          <span>您的选择：{{chooseList[item.userIndex]}}</span>
                          <img v-if="item.userIndex==item.rightIndex" src="../../assets/img/testright.png" alt="">
                          <img v-else src="../../assets/img/wordwrong.png" alt="">
                        </div>
                        <div class="learn-user-right">
                          正确答案：{{chooseList[item.rightIndex]}}
                        </div>
                        <div class="learn-user-right" style="margin-left: 20px">
                          题号:{{item.questionId}}
                        </div>

                      </div>
                    </div>
                    <div class="learn-list-body" v-html="item.alQuestions[0].questionStem"></div>
                    <div class="learn-list-choose">
                      <span v-for="(items,indexs) in item.alQuestions[0].alQuestionOption">{{chooseList[indexs]}}. {{items.optionName}}</span>
                    </div>
                    <div class="anwser-btns" style="justify-content: flex-end">
                      <div @click="showAnswerJiexi(item.analysis)">
                        答案详解
                      </div>
                      <div @click="showVideoJiexi1(item.videoUrl)">
                        视频详解
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="智能推练" name="four">
          <div>
            <ul class="test-list">
              <li v-for="(item,index) in pushList">
                <div class="learn-list-index">题：{{index+1}}</div>
                <div class="learn-list-body" v-html="item.questionStem"></div>
                <div class="learn-list-choose">
                  <span v-for="(items,indexs) in item.alQuestionOption">{{chooseList[indexs]}}. {{items.optionName}}</span>
                </div>
                <div class="show-anwser"  v-show="!item.isShow" @click="showAnswer(index,true)">
                  显示答案
                </div>
                <div style="clear: both"></div>
                <div class="hide-answer"  v-show="item.isShow" style="display: none;">
                  <div class="hide-anwser" @click="showAnswer(index,false)">
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

        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog top="1vh" :visible.sync="vFlag" title="答案解析" width="95%" >
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

      kid:null,
      testList:[],
      reobj:{},
      useTimeText:''
    }
  },
  mounted(){
    this.monitoring() // 注册监听事件
  },
  created(){

  },
  methods:{
    //根据每个题获取针对训练列表
    getAiPushTest(kid){
      this.http.post('/al/getRecomQuesList',{knowledgeId:kid}).then(res=>{
        console.log(res)
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
        }
      })
    },
    showAnswer(index,flag){
      this.pushList[index].isShow = flag;
      this.$set(this.pushList,index,this.pushList[index])
      console.log(this.pushList[index])
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
          this.playerOptions.sources[0].src = res.mp4Url
          this.videoUrl = res.mp4Url;
          this.videoFlag = true;
        }
      })
    },
    monitoring() { // 监听事件
      this.$on('testMethod', (res) => {
        this.http.post('/al/getUserReport',{knowledgeId:res.kid}).then(ret=>{
          if(ret.code == 0){
            this.getAiPushTest(ret.data.knowledgeId);
            this.childreportFlag = true;
            this.testList = ret.data.alDisgnosisRecords;
            for(var i=0;i<this.testList.length;i++){
              var rightAnwser = this.testList[i].answer;//正确答案ID
              var userAnwser = this.testList[i].userAnswer;//用户答案ID
              var testObj = this.testList[i].alQuestions[0];//题 题干包括选项
              for(var n=0;n<testObj.alQuestionOption.length;n++){
                //判断正确答案下标
                if(testObj.alQuestionOption[n].isRight == 1){
                  this.testList[i].rightIndex = n;
                }
                //判断用户答案下标
                if(userAnwser == testObj.alQuestionOption[n].optionId){
                  this.testList[i].userIndex = n;
                }
              }
            }
            this.reobj = ret.data;
            this.reobj.createTime = this.formatTimeToDay(this.reobj.createTime)
            //用时转成分秒形式
            var mt = Math.floor(this.reobj.useTime/60) < 10 ? ('0'+Math.floor(this.reobj.useTime/60)) : Math.floor(this.reobj.useTime/60);
            var st = this.reobj.useTime%60 < 10 ? '0'+this.reobj.useTime%60 : this.reobj.useTime%60
            this.useTimeText = mt+'分'+st+'秒'

            //组合三个分数为数组 雷达图需要用
            var myScore = [this.reobj.simpleNum,this.reobj.middleNum,this.reobj.difficultyNum]
            this.$nextTick(function () {
              var myChart = echarts.init(this.$refs.echartsbox);
              console.log(myChart)
              var option = {
                title: {
                },
                legend: {
                },
                radar: {
                  indicator: [
                    { name: '概念',max:100 },
                    { name: '理解',max:100 },
                    { name: '运用',max:100 },
                  ],
                  axisLabel: {
//                        show: true,
                    fontSize: 12,
                    color: '#838D9E',
                    showMaxLabel: false, //不显示最大值，即外圈不显示数字30
                    showMinLabel: false, //显示最小数字，即中心点显示0
                  },
                  center: ['50%', '50%'],
                  radius: 100,
                  startAngle: 90,
                  splitNumber: 2,
                  shape: 'circle',
                  name: {
                    formatter:'{value}',
                    textStyle: {
                      color:'#72ACD1'
                    }
                  },
                  splitArea: {
                    areaStyle: {
                      color: ['rgba(255,255, 255, 0.2)',
                        'rgba(245, 245, 245, 1)', 'rgba(114, 172, 209, 0.6)',
                        'rgba(114, 172, 209, 0.8)', 'rgba(255, 255, 209, 1)'],
                      shadowColor: 'rgba(255, 255, 255, 1)', //中间小圈
                      shadowBlur: 1 //外围阴影
                    }
                  },
                  axisLine: {
                    lineStyle: {
                      color: 'rgba(47, 69, 87, 1)'
                    }
                  },
                  splitLine: {
                    lineStyle: {
                      color: 'rgba(175, 175, 175,1)'
                    }
                  }
                }
                ,
                series: [
                  {
                    name: '雷达图',
                    type: 'radar',
                    itemStyle: {
                      emphasis: {
                        // color: 各异,
                        lineStyle: {
                          width: 4
                        }
                      }
                    },
                    data: [
                      {
                        value: [80,65,45], //全国平均
                        areaStyle: {
                          normal: {
                            color: 'rgba(255, 255, 255, 0.5)'
                          }
                        }
                      },
                      {
                        value: 50, //自己分数
                        areaStyle: {
                          normal: {
                            color: 'rgba(255, 255, 255, 0.5)'
                          }
                        }
                      },
                    ]
                  },

                ]
              }
              myChart.setOption(option, true);
            })

          }
        })
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
import '../../assets/css/learn.css'
</script>
<style>
  .el-dialog__body{
    padding-top: 0px;
  }
</style>
<style scoped>

  .result-table{
    margin-top: 20px;
  }
  .anwser-box{
    justify-content: flex-end;
  }
</style>
