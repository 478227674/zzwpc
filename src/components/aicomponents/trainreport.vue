<!--suppress JSUnresolvedFunction -->
<template>
  <div class="hello" style="background: #f5f5f5">
    <el-dialog top="1vh" :visible.sync="childreportFlag">
      <div class="learn-top" style="border-bottom: 1px solid #e5e5e5;margin-bottom: 10px;">
        <span>考试时间：{{submitTime}}</span>
      </div>
      <div>
        <ul class="test-list">
          <li  v-for="(item,index) in tobj.alTestRecords">
            <div class="learn-user-right" >
              题号:{{item.questionId}}
            </div>
            <div class="learn-list-body">{{index+1}}.<span v-html="item.alQuestion.questionStem"></span></div>
            <div class="learn-list-choose">
              <span v-for="(itemss,indexss) in item.alQuestion.alQuestionOption">{{chooseList[indexss]}}. {{itemss.optionName}}</span>
            </div>
            <div class="learn-list-user-choose">
              <el-radio-group v-model="item.userAnswer">
                <el-radio :key="indexss" disabled v-for="(itemss,indexss) in item.alQuestion.alQuestionOption" :label="itemss.optionId.toString()">{{chooseList[indexss]}}</el-radio>
              </el-radio-group>
            </div>
            <div class="jietifenxi">
              <span>您的选择:{{chooseList[item.alQuestion.userAnswerIndex]}}</span>
              <div></div>
              <span>【解题分析】</span>
              <div class="jiexi1" style="margin-top: 5px;" v-html="item.alQuestion.analysis"></div>
            </div>
          </li>
        </ul>
      </div>
    </el-dialog>

  </div>

</template>
<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
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

      kid:null,
      testList:[],
      useTimeText:''
    }
  },
  mounted(){
    this.monitoring() // 注册监听事件
  },
  created(){

  },
  methods:{
    monitoring() { // 监听事件
      var _this = this;
      this.$on('trainIndexChild', (res) => {
        this.http.post('/al/getTestResult',{testId:res.tid}).then(ret=>{
          if(ret.code == 0){
            this.childreportFlag = true;
            for(var i=0;i<ret.alTestRecords.length;i++){
              for(var n=0;n<ret.alTestRecords[i].alQuestion.alQuestionOption.length;n++){
                //找到当前用户选择对应答案的下标 用于后边显示ABCD
                if(ret.alTestRecords[i].userAnswer == ret.alTestRecords[i].alQuestion.alQuestionOption[n].optionId){
                  ret.alTestRecords[i].alQuestion.userAnswerIndex = n;
                }
                //找到正确答案的下标
                if(ret.alTestRecords[i].alQuestion.optionId == ret.alTestRecords[i].alQuestion.alQuestionOption[n].optionId){
                  ret.alTestRecords[i].alQuestion.optionAnswerIndex = n;
                }
              }
            }
            _this.submitTime = this.formatTimeToDay(ret.alTest.createTime*1000)
            _this.resultNum = ret.alTest.resultNum
            _this.tobj = ret;
            var m = Math.floor(ret.alTest.useTime/60);
            var s = ret.alTest.useTime%60;
            m = m<10 ? '0'+m : m;
            s = s<10 ? '0'+s : s;
            _this.useTime =  m+':'+s;
          }
        })
      })

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
  .jiexi1 img{
    max-width: 100%;
  }
</style>
<style scoped>

  .result-table{
    margin-top: 20px;
  }
  .anwser-box{
    justify-content: flex-end;
  }

  .jietifenxi p {
    margin-top: 15px;
  }
  .jietifenxi{
    margin-top: 15px;
  }
  .jietifenxi span{
    color:#f7260a;
    font-size: 14px;
  }
</style>
