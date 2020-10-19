<template>
  <div class="hello" style="background: #f5f5f5">
    <orghead></orghead>
    <!--学员评价-->
    <div class="pc-center organ-allbox" >
      <div class="org-common">
        <div class="special-class">
          <span>学员评价</span>
          <div class="organ-grade" style="margin-top: 0px;" v-show="orgObj.userGrade">
            <div class="organ-allgrade">
              <span >{{orgObj.userGrade}}</span>
              <a v-show="orgObj.userGrade>=4" href="javascript:;">极好</a>
              <a v-show="orgObj.userGrade<4 && orgObj.userGrade>2" href="javascript:;">很好</a>
              <a v-show="orgObj.userGrade<=2" href="javascript:;">一般</a>
            </div>
            <div class="grade-items">
              <span>环境 {{orgObj.envGrade}}</span>
              <span>师资 {{orgObj.effectGrade}}</span>
              <span>效果 {{orgObj.facultyGrade}}</span>
              <span>服务 {{orgObj.serviceGrade}}</span>
            </div>
          </div>
        </div>
        <ul class="comments-list">
          <li v-for="item in commentsList">
            <div class="comments-head">
              <img src="../../assets/img/personhead.png" alt="">
            </div>
            <div class="comments-detail">
              <div class="comments-p">
                <p>{{item.userName}}</p>
                <div class="comments-grade">
                  <div class="grade-box">
                    <el-rate
                      v-model="item.userGrade"
                      disabled
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </div>
<!--                  <div class="grade-item-comments">-->
<!--                    <span>环境{{item.envGrade}}</span>-->
<!--                    <span>师资{{item.effectGrade}}</span>-->
<!--                    <span>效果{{item.facultyGrade}}</span>-->
<!--                    <span>服务{{item.serviceGrade}}</span>-->
<!--                  </div>-->
                  <div style="clear: both"></div>
                </div>
                <span style="margin-top: 15px;margin-left: 20px;color:#ffa200;font-weight: bold">{{item.userGrade}}</span>
<!--                <span style="margin-top: 15px;margin-left: 20px;">{{item.createTime}}</span>-->
              </div>

              <div class="comments-content">
                {{item.userDesc}}
              </div>
              <div class="comments-imglist">
                <img v-for="items in item.images" :src="items" alt="">
              </div>
            </div>
          </li>
          <li style="display: none">
            <div class="comments-head">
              <img src="../../assets/img/personhead.png" alt="">
            </div>
            <div class="comments-detail">
              <div class="comments-p">
                <p>打算的撒多</p>
                <span>2220</span>
              </div>
              <div class="comments-grade">
                <div class="grade-box">
                  <el-rate
                    disabled
                    text-color="#ff9900"
                    score-template="{4}">
                  </el-rate>
                </div>
                <div class="grade-item-comments">
                  <span>环境4</span>
                  <span>师资4</span>
                  <span>效果4</span>
                  <span>服务4</span>
                </div>
                <div class="learn-product">
                  学习课程：是萨达撒
                </div>
                <div style="clear: both"></div>
              </div>
              <div class="comments-content">
                打算打算多
              </div>
              <div class="comments-imglist">
              </div>
            </div>
          </li>
        </ul>
        <div class="block">
          <el-pagination
            background
            @current-change="currentChangeCommon"
            :current-page="comPage"
            :page-size="10"
            layout="prev, pager, next"
            :total="comTotal">
          </el-pagination>
        </div>
      </div>
      <div class="org-desc-hotclasses">
        <div class="org-all-grade">
          <div class="org-grade-top">
            <div>
              综合评分
              <span>{{comTotal}}人评价</span>
            </div>
            <p>
              {{orgObj.userGrade || '暂无评分'}}
            </p>
          </div>
          <div class="org-grade-item">
            <div>
              <span>环境</span>
              <p>{{orgObj.envGrade || 0}}</p>
            </div>
            <div>
              <span>师资</span>
              <p>{{orgObj.effectGrade || 0}}</p>
            </div>
            <div>
              <span>效果</span>
              <p>{{orgObj.facultyGrade || 0}}</p>
            </div>
            <div>
              <span>服务</span>
              <p>{{orgObj.serviceGrade || 0}}</p>
            </div>
          </div>
        </div>
        <div class="store-hot-class" style="background: #fff;">
          <div class="hot-title">热门课程</div>
          <div class="hot-class-list">
            <div  @click="openProductDetail(item)"  v-for="item in hotClass" class="hot-class-detail">
              <div class="hot-class-img">
                <img :src="item.imageUrl" alt="">
              </div>
              <div class="hot-class-text">
                <div class="hot-class-top">
                  <p>{{item.productName}}</p>
                  <div class="hot-class-classtime">
                    <span>班制：{{item.className}}</span>
                    <span>授课：{{item.teachName}}</span>
                  </div>
                </div>
                <div class="hot-class-price">
                  <div>
                    ￥{{item.productPrice}}
                    <span>返佣￥{{item.commissionRebate}}</span>
                  </div>
                  <p>{{item.purchaseNum}}已报名</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import orghead from '../../components/orghead'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        orgId:null,
        comPage:1,
        comTotal:0,
        commentsList:[],
        orgData:{},
        orgObj:{},
        hotClass:[],
      }
    },
    components:{
      orghead,
    },
    created(){
      this.orgId = this.$store.state.user.activeOrgId;
      this.$emit('header', false)
      this.getOrgComments();
      this.getOrgInfo();
      this.getHotClass();
    },
    methods:{
      //获取机构详情
      getOrgInfo() {
        this.http.post('/dir/queryOrgInfo', {orgId: this.orgId}).then(res => {
          if (res.code == 0) {
            this.orgObj = res.data;
          }
        })
      },
      //换页
      currentChangeCommon(v){
        this.comPage = v;
        this.getOrganDetail();
      },
      //打开课程详情
      openProductDetail(data) {
        this.openProductDetailByType(data)
      },
      //获取机构热门课程
      getHotClass(){
        this.http.post('/dir/queryDirProductRecomByOrgId',{orgId:this.orgId,pageSize:3,pageNum:1}).then(res=>{
          if(res.code == 0){
            this.hotClass = res.data.list;
          }
        })
      },
      //获取评论
      getOrgComments(){
        this.http.post('/dir/queryOrgEvaluation',{orgId:this.orgId,pageNum:this.comPage,pageSize:10}).then(res=>{
          if(res.code == 0){
            for(var i=0;i<res.data.list.length;i++){
              res.data.list[i].createTime = this.formatTimeToDay(res.data.list[i].createTime)
            }
            this.commentsList = res.data.list;
            this.comTotal = res.data.total;
          }
        })
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/index.css'
  import '../../assets/css/organ.css'
</script>
