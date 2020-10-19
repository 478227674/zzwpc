<!--suppress JSUnresolvedFunction -->
<template>
  <div class="hello" style="background: #f5f5f5">
    <div class="pc-center">
      <div class="aitar-title">
        <span>扫描诊断</span>
        <p></p>
      </div>
      <div class="scan-items3" style="margin-top: 0px;">
        <ul>
          <li @click="">
            <div class="scan-items3-top scan-items-1">
              <span>全面扫描</span>
              <div class="hover-box scan-items-1">
                <div class="hover-desc">
                  <p>专项题库全科扫描</p>
                  <p>每道题附带名师详解及针对训练</p>
                  <p>AI扫描结果反馈</p>
                </div>
                <span>
                  <a href="javascript:;"></a>
                </span>
              </div>
            </div>
            <div class="collapse-box">
              <el-collapse accordion v-model="activeNames" @change="handleChange">
                <el-collapse-item v-if="item.id != 8" v-for="(item,index) in sortList" :title="item.name" :name="item.id+1*item.id">
                  <div class="sortlist-items">
                    <span @click="openScan(items)" v-for="items in item.child">{{items.subjectName}}</span>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </li>
          <li @click="">
            <div class="scan-items3-top scan-items-2">
              <span>分点诊断</span>
              <div class="hover-box scan-items-2">
                <div class="hover-desc">
                  <p>纳米级细化考点训练</p>
                  <p>AI纵向三维诊断</p>
                  <p>智能生成诊断报告</p>
                </div>
                <span>
                  <a href="javascript:;"></a>
                </span>
              </div>

            </div>
            <div class="collapse-box">
              <el-collapse accordion v-model="activeNames" @change="handleChange1">
                <el-collapse-item v-if="item.id != 8" v-for="item in sortList" :title="item.name" :name="item.id+2*item.id">
                  <div class="sortlist-items">
                    <span @click="openAiLearn(items)" v-for="items in item.child">{{items.subjectName}}</span>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>

          </li>
          <li @click="">
            <div class="scan-items3-top scan-items-3">
              <span>综合训练</span>
              <div class="hover-box scan-items-3">
                <div class="hover-desc">
                  <p>针对薄弱科目靶向抽题训练</p>
                  <p>AI智能组卷测评</p>
                  <p>自动记录错题</p>
                </div>
                <span>
                  <a href="javascript:;"></a>
                </span>
              </div>

            </div>
            <div class="collapse-box">
              <el-collapse accordion v-model="activeNames" @change="handleChange2">
                <el-collapse-item v-if="item.id != 8" v-for="item in sortList" :title="item.name" :name="item.id+3*item.id">
                  <div class="sortlist-items">
                    <span @click="openTrainIndex(items)" v-for="items in item.child">{{items.subjectName}}</span>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>

          </li>
        </ul>
        <div @click="buyDialog" class="salepackage-btn">温馨提示：欢迎使用元儒教育城，有颜色的学科代表已经购买，没有颜色的还未购买，系统可免费试用7天！！点击购买销售包</div>
      </div>
    </div>
    <div class="pc-center">
      <div class="aitar-title">
        <span>历史列表</span>
        <p></p>
      </div>
      <div style="padding:15px 20px;background: #fff;">
        <el-table
          :header-cell-style="{background:'#fff1f1',color:'#333',fontSize:'18px',fontWeight:'normal',textAlign:'center',fontWeight:'bold'}"
          :data="hisList"
          @row-click="clickHistory"
          ref="multipleTable"
          tooltip-effect="dark"
          @selection-change="handleSelectionChangeHistory"
          border
          style="width: 100%">
          <el-table-column
            prop="subjectName"
            align="center"
            label="模式">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">全面扫描</span>
              <span v-if="scope.row.type == 2">分点诊断</span>
              <span v-if="scope.row.type == 3">综合训练</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            align="center"
            label="测试时间">
          </el-table-column>
          <el-table-column
            prop="useTime"
            align="center"
            label="用时">
          </el-table-column>
<!--          <el-table-column-->
<!--            prop="resultNum"-->
<!--            align="center"-->
<!--            label="总数量">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="resultNum"-->
<!--            align="center"-->
<!--            label="用时">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="resultNum"-->
<!--            align="center"-->
<!--            label="时间">-->
<!--          </el-table-column>-->
          <el-table-column
            prop="testId"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <span style="color:#f73e3c;cursor:pointer;" @click="openReportList(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-box" style="background: #fff" >
          <el-pagination
            @current-change="handleCurrentChangeHistory"
            :current-page="pagenum"
            layout="total,  prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="pc-center">
      <div style="display: flex;justify-content: space-between;margin-top: 20px;">
        <div class="indexscan-left">
          <div class="index-scan-num">
            统计<span>(年):</span>{{testCount}}
          </div>
          <div id="echartsbox" ref="echartsbox1">

          </div>
        </div>
        <div class="indexscan-right">
          <div id="echartsbox-line" ref="echartsboxline">

          </div>
        </div>
      </div>
    </div>
    <div style="height: 50px;"></div>
    <el-dialog :visible.sync="buyFlag" title="续费充值">
      <div class="buy-box">
        <div class="title-bot-border"></div>
        <div class="buy-sp-list">
          <span @click="buySalePackage(item)" :class="{'buy-active':saleId ==item.alSaleId}" v-for="item in list">{{item.saleName}}</span>
        </div>
        <div class="active-list">
          <div :class="{'active-list-item':ruleId==item.ruleId}" v-for="item in pricelist" @click="chooseThisPrice(item)">
            <div class="active-list-days">
              <span>{{item.price}}</span>元/{{item.days}}
            </div>
            <div class="active-list-desc">
              (选择科目) 单科任意训练
            </div>
          </div>
          <div class="" style="display: none">
            <div class="active-list-days">
              <span>29</span>元/7天
            </div>
            <div class="active-list-desc">
              (选择科目) 单科任意训练
            </div>
          </div>
        </div>
        <div class="salepackage-btn" @click="submitBuy">立即购买</div>

      </div>
    </el-dialog>
    <el-dialog title="支付" width="30%" :visible.sync="payFlag">
      <div class="paynum">
        <div class="shouldpay">应付金额：<span>￥{{payPrice}}</span> </div>
      </div>
      <div class="qrcodebox-pay">
        <div id="qrcode" style="margin:10px auto;display: block">

        </div>
        <div style="display: flex;justify-content: center;">
          <p>
            微信支付
          </p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="payFlag = false">取 消</el-button>
        <el-button type="primary" @click="paySuccess">已支付</el-button>

      </div>
    </el-dialog>

  </div>
</template>
<script>

import QRCode from "qrcodejs2";

export default {
  name: 'HelloWorld',
  data () {
    return {
      buyFlag:false,
      subIds:[
        {subjectId:1001,subjectName:'数学'},
        {subjectId:1002,subjectName:'英语'},
        {subjectId:1003,subjectName:'逻辑'},
      ],
      payPrice:'0',
      payFlag:false,
      list:[],
      testFlag:false,
      ruleId:null,
      pricelist:[],
      ids:[],
      saleId:null,
      hisList:[],
      pagenum:1,
      total:0,
      testCount:0,

      sortId:null,
      sortList:[],
      sortList1:[],
      sortList2:[],
      subjectList:[],
      subId:null,
      activeNames:'',
      activeNames1:'',
      activeNames2:'',
    }
  },
  components:{
//    slider,
//    slideritem
  },
  created(){
    // this.initLineCharts()
    this.getTargettingList();
    this.getHistoryList();
    this.$emit('header_two',true);
  },
  mounted(){
    this.http.post('/user/queryAlTestCount',{}).then(res=>{
      if(res.code == 0){
        this.testCount = res.diagnosisCount + res.scanCount + res.testCount;
        this.$nextTick(function () {
          this.initPirCharts(res)
        })
      }
    })
    this.http.post('/al/queryTargetCounts',{}).then(res=>{
      if(res.code == 0){
        var subjectData = {
          '5':[], //一级建造师
          '6':[], //二级建造师
          '7':[], //消防工程师
          '8':[], //建造工程师
        };
        for(var i in res.data){
          for(var n=0;n<res.data[i].length;n++){
            subjectData[i].push(res.data[i][n])
          }
        }
        return;
        let dateArr = [];
        let mathArr = res['1001'];
        let englishArr = res['1002'];
        let logicArr = res['1003'];
        for(var i=mathArr.length;i--;i<mathArr<=0){
          dateArr.push(mathArr[i].currentTime)
          subjectData.maths.push(mathArr[i].count);
          subjectData.english.push(englishArr[i].count);
          subjectData.logic.push(logicArr[i].count);
        }
        this.initLineCharts(dateArr,subjectData)
      }
    })
    this.http.post('/product/getProductSortListByLevel',{level:3}).then(res=>{
      if(res.code == 0){
        this.sortList = res.data;
        this.sortList1 = res.data;
        this.sortList2 = res.data;
        this.sortId = res.data[0].id;
      }
    });
  },
  methods:{
    handleChange(val) {
      this.getThreeLevelSort(val/2)
    },
    handleChange1(val) {
      this.getThreeLevelSort(val/3)
    },
    handleChange2(val) {
      this.getThreeLevelSort(val/4)
    },
    getThreeLevelSort(id){
      var isFlag = true,index;
      for(var i=0;i<this.sortList.length;i++){
        if(this.sortList[i].id == id){
          if(this.sortList[i].child){
            return
          }else{
            index = i;
            isFlag = false;
          }
        }
      }
      if(!isFlag){
        this.http.post('/al/querySubjectList',{sortId:id}).then(ret=>{
          if(ret.code == 0){
            this.sortList[index].child = ret.data;
            this.$set(this.sortList,index,this.sortList[index])
          }
        })
      }

    },
    openReportList(data){
      if(data.type == 1){

      }else if(data.type == 2){

      }else{

      }
    },
    //获取历史数据
    getHistoryList(){
      this.http.post('/user/queryAlTestRecord',{pageNum:this.pagenum,pageSize:10}).then(res=>{
        if(res.code == 0){
          for(var i=0;i<res.data.list.length;i++){
            res.data.list[i].useTime = this.getUseTime(res.data.list[i].useTime);
            res.data.list[i].createTime = this.formatTimeToDay(res.data.list[i].createTime);
          }
          this.hisList = res.data.list;
          this.total = res.data.total;
        }
      })

    },
    //购买
    buyDialog(){
      this.buySalePackage(this.list[0])
      this.buyFlag = true;
    },
    //初始化饼状图
    initPirCharts(data){
      //饼状图配置
      var myChart = echarts.init(document.getElementById('echartsbox'));
      var option = {
        color:['#35b6d1','#29d9a9','#4983ec'], //颜色设置
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}'+ '条' +'({d}%)'
        },
        legend: { //解释
          orient: 'horizontal',
          bottom: 10,
          data: ['全面扫描', '分点诊断', '综合训练']
        },
        series: [
          {
            name: '诊断次数',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false, //控制饼状图中间文字是否显示
                fontSize: '15', //字体大小
                fontWeight: 'bold' //是否加粗
              }
            },
            data: [ //数据结构
              {value: data.scanCount, name: '全面扫描'},
              {value: data.diagnosisCount, name: '分点诊断'},
              {value: data.testCount, name: '综合训练'},
            ]
          }
        ]
      }
      myChart.setOption(option, true);
    },
    //新版本线装图
    initLineCharts(date,subobj){
      //Echarts初始化
      let _this = this;
      this.$nextTick(function () {
        var myChartsLine = echarts.init(this.$refs.echartsboxline);
        var optionLine = {
          color:['#de57f6','#438afe','#22ac38'],
          title: {
            text: '平台训练统计(日期/次数)'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            x: 'right',
            data: [ '数学', '英语','逻辑']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          // toolbox: { //保存图片按钮
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          xAxis: {
            axisTick:{
              lineStyle:{
                width:0 //刻度线宽度
              },
            },
            axisLine:{       //X轴是否显示
              "show":false
            },
            color:'#fff',
            type: 'category',
            boundaryGap: false,
            data: date
          },
          yAxis: {
            axisTick:{
              lineStyle:{
                width:0 //刻度线宽度
              },
            },
            axisLine:{       //Y轴是否显示
              "show":false
            },
            color:'#fff',
            type: 'value',
            min:0,
            max:500
          },
          series: [
            {
              name: '数学',
              type: 'line',
              data: subobj.maths,
              itemStyle: {
                normal: {
                  lineStyle:{
                    width:3//设置线条粗细
                  }
                }
              }
            },
            {
              name: '英语',
              type: 'line',
              data: subobj.english,
              itemStyle: {
                normal: {
                  lineStyle:{
                    width:3//设置线条粗细
                  }
                }
              }
            },
            {
              name: '逻辑',
              type: 'line',
              data: subobj.logic,
              itemStyle: {
                normal: {
                  lineStyle:{
                    width:3//设置线条粗细
                  }
                }
              }
            },
          ]
        };
        myChartsLine.setOption(optionLine, true);
      })
    },



    clickHistory(){},
    handleSelectionChangeHistory(){},
    handleCurrentChangeHistory(v){
      this.pagenum = v;
      this.getHistoryList();
    },
    //没有权限提示框
    confirmUserDate(callback){
      this.$alert('您的试用期是7天,好好把握哦!\n 是否开始试用?', '温馨提示', {
        confirmButtonText: '是的，我要开始奋斗了',
        callback: action => {
          if(action == 'confirm'){
            if(callback){
              callback()
            }
          }
        }
      });
    },
    //检查用户有没有学科权限
    checkUserSubject(id,callback){
      this.http.post('/al/queryAlSalePackBySubjectId',{subjectId:id}).then(res=>{
        if(res.code == 0){
          if(callback){
            callback(res.data)
          }
        }
      })
    },
    openScan(data){
      this.checkUserSubject(data.subjectId,(res)=>{
        if(res == 1){
          this.$router.push({path:'/pages/scantest',query:{ids:JSON.stringify([data.subjectId]),name:data.subjectName}})
        }else{
          this.confirmUserDate(()=>{
            this.$router.push({path:'/pages/scantest',query:{ids:JSON.stringify([data.subjectId]),name:data.subjectName}})
          })
        }
      })
    },
    openAiLearn(data){
      this.checkUserSubject(data.subjectId,(res)=>{
        if(res == 1){
          this.$router.push({path:'/pages/learnlist',query:{ids:JSON.stringify([data.subjectId]),name:data.subjectName}})
        }else{
          this.confirmUserDate(()=>{
            this.$router.push({path:'/pages/learnlist',query:{ids:JSON.stringify([data.subjectId]),name:data.subjectName}})
          })
        }
      })
    },
    openTrainIndex(data){
      this.checkUserSubject(data.subjectId,(res)=>{
        if(res == 1){
          this.$router.push({path:'/pages/trainindex',query:{ids:JSON.stringify([data.subjectId]),name:data.subjectName}})
        }else{
          this.confirmUserDate(()=>{
            this.$router.push({path:'/pages/trainindex',query:{ids:JSON.stringify([data.subjectId]),name:data.subjectName}})
          })
        }
      })
    },
    paySuccess(){
      this.buyFlag = false;
      this.payFlag = false;
      this.getTargettingList();
    },
    //购买事件
    submitBuy(){
      if(!this.ruleId){
        this.toast('请选择规格购买')
        return;
      }
      this.http.post('/al/pcWxPay',{alSaleId:this.saleId,ruleId:this.ruleId}).then(res=>{
        if(res.code == 0){
          this.payFlag = true;
          this.$nextTick(function () {
            let qrcode = new QRCode('qrcode', {
              width:'190',
              height: '190',
              text:res.data, // 二维码地址
              colorDark : "#000",
              colorLight : "#FFF",
            })
          })
        }
      })

    },
    chooseThisPrice(data){
      this.ruleId = data.ruleId;
      this.payPrice = data.price;
      this.saleId = data.alSaleId;
    },
    buySalePackage(data){
      this.ruleId = null;
      this.saleId = data.alSaleId;

      this.http.post('/al/getAlSalePackagePrice',{alSaleId:data.alSaleId}).then(res=>{
        if(res.code == 0){
          this.buyFlag = true;
          for(var i=0;i<res.data.list.length;i++){
            if(res.data.list[i].days < 180){
              res.data.list[i].days =  Math.floor((res.data.list[i].days/30)) + '月' + res.data.list[i].days%30 + '天'
            }else if(res.data.list[i].days == 180){
              res.data.list[i].days = '半年'
            }else if(res.data.list[i].days==365){
              res.data.list[i].days = '1年'
            }
          }
          this.pricelist = res.data.list;
        }
      })
    },
    getTargettingList(){
      this.http.post('/al/getAlSalePackageList',{}).then(res=>{
        if(res.code == 0){
          this.list = res.data.list;
          this.saleID = res.data.list[0].alSaleId;
        }
      })
    },
    tryTest(data){
      this.ids = data.subjectIds;
      this.testFlag = true;
    },
    startTest(data){
      this.ids = data.subjectIds;
      this.testFlag = true;
    },
  },
  watch:{
    payFlag(newVal,oldVal){
      if(!newVal && document.getElementById('qrcode').innerHTML){
        document.getElementById('qrcode').innerHTML = ''
      }
    },
  },
}
import '../../assets/css/common.css';
import '../../assets/css/learn.css'
import '../../assets/css/index.css'
</script>
<style>
  .sortlist-items span{
    cursor: pointer;
    margin-right: 10px;
  }
  .sortlist-items span:hover{
    color:#eb6100;
  }
  .collapse-box{
    height: 148px;
    overflow-y: scroll;
    padding: 0 10px;
  }
  #qrcode img{
    margin: 10px auto;
  }
  .active-list-item{
    border:1px solid #eb6100 !important;
    background: url("../../assets/img/target/buy-choose.png") no-repeat right 68px;
    background-size: 42px  42px;
  }
  .active-list-desc{
    text-align: center;
    color:#494949;
    font-size: 15px;
  }
  .active-list-days span{
    font-size: 30px;
  }
  .active-list-days{
    margin-top: 20px;
    text-align: center;
    color:#fd5f00;
    font-size: 12px;
  }
  .active-list>div{
    width: 48%;
    height: 110px;
    cursor: pointer;
    border:1px solid #bfbfbf;
  }
  .active-list{
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
  }
  .buy-active{
    background: #eb2c00 !important;
    color:#fff !important;
    border:1px solid #eb2c00 !important;

  }
  .buy-sp-list span{
    display: block;
    cursor: pointer;
    width: 24%;
    height: 42px;
    line-height: 42px;font-size: 14px;
    color:#6a6a6a;
    text-align: center;
    border: 1px solid #a0a0a0;
  }
  .buy-sp-list {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
  }
  .title-bot-border{
    border-bottom: 1px solid #d2d2d2;
  }
  .el-dialog__body{
    padding-top: 0px;
  }
  .el-dialog__header{
    text-align: center;
  }
  .salepackage-btn{
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 14px;
    color:#fff;
    background: #eb2c00;
    cursor: pointer;
    margin-top: 20px;
  }
  .scan-items3-top:hover  .hover-box{
    opacity: 1;
    transition-duration: 1s;
  }
  .hover-desc{
    text-align: center;
    margin-top: 15px;
  }
  .hover-desc p{
    font-size: 14px;color:#fff;
    margin-bottom: 10px;
  }
  .hover-box > span a {
    width: 84px;
    height: 84px;
    display: block;
    position: absolute;
    top:8px;
    left: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,1);

  }
  .hover-box > span{
    position: absolute;
    bottom:-50px;
    left: 50%;
    margin-left: -50px;
    display: block;
    width: 100px;
    border-radius: 50%;
    height: 100px;
    background-color:  rgba(255,255,255,0.5);
  }
  .hover-box{
    transition: opacity 1s;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top:0px;
    background:#0bc18f;
  }
  .aitar-title p {
    flex: 1;
    background: url("../../assets/img/target/aitar-1.png") no-repeat 0px 7px;
    background-size:100% 12px;
    margin-left: 20px;
  }
  .aitar-title span{
    color:#404040;
    font-size: 18px;
    font-weight: bold;
  }
  .aitar-title{
    display: flex;
    justify-content: flex-start;
    padding: 35px 0px 20px 0px;
  }
</style>
