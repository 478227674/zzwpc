<!--suppress BadExpressionStatementJS -->
<template>
  <div class="hello1" style="background: #f5f5f5;">
    <main-header></main-header>

    <div class="mianbox">
      <div style="background: #fff;padding: 20px">
        <div class="main-system-title" style="color:#ff5000">
          我的评价
        </div>
        <ul class="comments-list">
          <li v-for="item in commentsList">
            <div class="comments-detail">
              <div class="comments-p">
                <p>{{item.orgName}}  {{item.productName}}</p>
                <span>{{item.createTime}}</span>
              </div>
              <div class="comments-grade">
                <div class="grade-box">
                  <el-rate
                    v-model="item.userGrade"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </div>
                <div class="grade-item-comments">
                  <span>环境 {{item.envGrade}}</span>
                  <span>师资 {{item.effectGrade}}</span>
                  <span>效果 {{item.facultyGrade}}</span>
                  <span>服务 {{item.serviceGrade}}</span>
                </div>
                <div style="clear: both"></div>
              </div>
              <div class="comments-content">
                {{item.userDesc}}
              </div>
              <div class="comments-imglist">
                <img v-for="items in item.images" :src="items" alt="">
              </div>
            </div>
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
      commentsList:[],
      value1:4.5,
      pagenum:1,
      pagesize:5,
      total:0,
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.$emit('header_two',false)

    this.getCommentsList();
//    this.$emit('footer',false)
  },
  methods:{

    getCommentsList(){
//
      this.http.post('/user/queryUserEvaluationList',{pagenum:this.pagenum,pagesize:this.pagesize}).then(res=>{
        if(res.code == 0){
          for(var i=0;i<res.data.list.length;i++){
              res.data.list[i].createTime = this.formatTimeToDate(res.data.list[i].createTime)
          }
          this.commentsList = res.data.list;
          this.total = res.data.total;
        }
      })
    },
    handleCurrentChange(v){
        this.pagenum = v;
        this.getCommentsList()
    },
  },
}
import '../../assets/css/common.css';
  import '../../assets/css/style.css'
  import '../../assets/css/organ.css'
</script>
<style scoped>

  .comments-p > p{
    font-size: 16px;color:#333;
    font-weight: bold;
  }
</style>
