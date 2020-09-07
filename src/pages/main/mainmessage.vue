<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>

    <div class="pc-center">
      <div class="mianbox">
        <div class="main-left">
          <p>我的消息</p>
          <div class="main-center-line"></div>
          <div class="mainclass-tab">
            <span @click="chooseThisTab(0)" :class="{'tab-active':tabindex==0}">全部</span>
            <span @click="chooseThisTab(1)" :class="{'tab-active':tabindex==1}">通知</span>
            <span @click="chooseThisTab(2)" :class="{'tab-active':tabindex==2}">评价</span>
          </div>
          <div v-if="msgList.length > 0" class="deleteall" @click="deleteAllMyMessage">一键删除</div>
        </div>

<!--        <ul class="message-list">-->
<!--          <li>-->
<!--            <div>阿打算大</div>-->
<!--            <span>20200-1050-05</span>-->
<!--            <img @click="deleteThisMessage" class="deletemsg-icon" src="../../assets/img/zzw/deletemsg.png" alt="">-->
<!--          </li>-->
<!--        </ul>-->


        <ul class="message-list">
          <li v-for="item in msgList" @click="openMessageDetail(item.pushId)">
            <div>{{item.messageContent}}</div>
            <span>{{item.pushTime}}</span>
            <img @click.stop="deleteThisMessage(item.pushId)" class="deletemsg-icon" src="../../assets/img/zzw/deletemsg.png" alt="">
          </li>
        </ul>
        <div class="block">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-size="pagesize"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
        <div style="height: 20px;"></div>
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
      msgList:[],
      tabindex:0,
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.$emit('header_two',false)
    this.getMessageList();
  },
  methods:{
    chooseThisTab(t){
      this.tabindex = t;
    },
    //删除所有消息
    deleteAllMyMessage(){
      var _this = this;
      if (confirm("确定删除所有消息吗？")) {
        this.http.post('/dir/deleteMessageByUser',{}).then(res=>{
          if(res.code == 0){
            this.stoast('已删除')
            this.getMessageList();
          }
        })
      }
    },
    //删除消息
    deleteThisMessage(id){
        var _this = this;
      if (confirm("确定删除此条通知吗？")) {
        this.http.post('/dir/deleteMessage',{pushId:id}).then(res=>{
          if(res.code == 0){
              this.getMessageList();
          }
        })
      }
    },
    getMessageList(){
      this.http.post('/dir/queryUnReadMsgList',{pagenum:this.pagenum,pagesize:this.pagesize}).then(res=>{
        if(res.code == 0){
//          this.numtotal = res.coinNum;
          for(var i=0;i<res.data.list.length;i++){
            res.data.list[i].pushTime = this.formatTimeToDay(res.data.list[i].pushTime)
          }
          this.msgList = res.data.list;
          this.total = res.data.total;
        }
      })
    },
    handleCurrentChange(v){
      this.pagenum = v;
      this.getMessageList()
    },
    openMessageDetail(id){
        this.$router.push({path:'/pages/msgdetail',query:{id:id}})
    },
  },
}
import '../../assets/css/common.css';
  import '../../assets/css/style.css'
  import '../../assets/css/order.css'
</script>
<style scoped>
  .deleteall{
    top: 30px;
    right: 0px;
    cursor: pointer;
    position: absolute;
    font-size: 17px;
    color:#f30707;

  }
  .message-list span{
    color:#858585;
    font-size: 12px;
  }
  .message-list div{
    font-size: 16px;color:#333333;
  }
  .message-list{
    margin-top: 20px;
  }
  .message-list li:hover .deletemsg-icon{
    display: block;
  }
  .deletemsg-icon{
    position: absolute;
    height: 29px;
    width: 27px;
    right: 25px;
    top:28px;
    cursor: pointer;
    display: none;
  }

  .message-list li{
    margin-bottom: 10px;
    cursor: pointer;
    width: 96%;
    padding: 20px 2%;
    height: 40px;
    position: relative;
    box-shadow: 1px 1px 10px #f0f0f0;
  }




  .message-handle img{
    height:17px;
    cursor: pointer;
    margin-top: 15px;
  }
  .message-handle{
    text-align: right;
  }
  .message-handle span{
    display: block;
    color:#666;
    font-size: 12px;
  }
  .message-detail span{
    color:#666;font-size: 12px;
  }
  .message-detail>p{
    margin-bottom: 5px;
  }
  .message-detail {
    margin-left: 18px;
    color:#333;
  }
  .message-left{
    width:80%;
    display: flex;
    cursor: pointer;
    justify-content: flex-start;
  }
  .msg-icon{
    width:60px;
    height:60px;
    position: relative;

  }
  .msg-icon img{
    width:100%;
    height:100%;
    border-radius: 3px;
  }
  .msg-icon span{
    display: block;
    width:12px;
    height:12px;
    position: absolute;
    top:-6px;
    right:-6px;
    border-radius: 50%;
    background: #dd060e;
  }
  .main-message-list li{
    padding: 20px 0px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;

  }
  .person-history{
    background: #fff;
    padding: 20px;
  }
  .main-system-title{
    font-size: 18px;color:#ff5000;
  }



</style>
