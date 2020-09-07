 <template>
  <div class="hello" >
    <div style="background: #000">
      <div class="pc-center">
          <div class="pc-top">
            <ul>
              <li>
                <a href="http://www.xhcedu.com/2020topic/zsjz/index.html" target="_blank">首页 </a>
              </li>
              <li>
                <a href="http://www.xhcedu.com/2020topic/zsjz/index.html" target="_blank">提前面试 </a>
              </li>
              <li>
                <a href="http://www.xhcedu.com/2020topic/zsjz/index2.html" target="_blank">MBA </a>
              </li>
              <li>
                <a href="http://www.xhcedu.com/2020topic/zsjz/xfgcs/index.html" target="_blank">EMBA </a>
              </li>
              <li>
                <a href="http://www.xhcedu.com/2020topic/zsjz/jzExt/index5.html" target="_blank">MEM </a>
              </li>
              <li>
                <a href="http://www.xhcedu.com/2020topic/zsjz/jzExt/index5.html" target="_blank">MPAcc </a>
              </li>
              <li>
                <a href="http://www.xhcedu.com/2020topic/zsjz/jzExt/index5.html" target="_blank">在职研究生</a>
              </li>
<!--              <li>-->
<!--                <a target="_blank" href="http://www.tqmba.com">首页</a>-->
<!--              </li>-->
<!--              <li>-->
<!--                <a target="_blank" href="http://bj.tqmba.com/myron/21jz/21zsjz/">提前面试</a>-->
<!--              </li>-->
<!--              <li>-->
<!--                <a target="_blank" href="http://bj.tqmba.com/myron/21jz/21zsjz/">MBA</a>-->
<!--              </li>-->
<!--              <li>-->
<!--                <a target="_blank" href="http://www.tqmba.com/myron/20jz/2020EMBA/">EMBA</a>-->
<!--              </li>-->
<!--              <li>-->
<!--                <a target="_blank" href="http://mem.net.cn/">MEM</a>-->
<!--              </li>-->
<!--              <li>-->
<!--                <a target="_blank" href="http://bj.tqmba.com/myron/21jz/21zsjz/">MPAcc</a>-->
<!--              </li>-->
<!--              <li>-->
<!--                <a target="_blank" href="http://bj.tqmba.com/myron/19jz/2019zzyjs/">在职研究生</a>-->
<!--              </li>-->
            </ul>
          </div>
          <div class="pc-top-r">
            <div style="border:none;">
              客服电话：4000-888-686
            </div>
<!--            <div  v-show="isLogin" @click="openMyCenter">-->
<!--              个人中心-->
<!--            </div>-->
<!--            <div  v-show="isLogin" @click="openMyMessage">-->
<!--              我的消息-->
<!--            </div>-->
<!--            <div v-show="isLogin" >-->
<!--              欢迎您 {{userphone}} <span style="color:#f73e3c" @click="loginout()">退出</span>-->
<!--            </div>-->
<!--            <div v-show="!isLogin" @click="openSignup">-->
<!--              注册-->
<!--            </div>-->
<!--            <div v-show="!isLogin" @click="openLogin">-->
<!--              登录-->
<!--            </div>-->
          </div>
          <div style="clear: both"></div>
      </div>
    </div>
    <div class="h-two">
      <div style="width: 1200px;margin:0 auto;display: flex">
        <img @click="openMbaIndex"  src="../assets/img/dis/salelogo.png" alt="">
        <div class="h-two-r">
          <div class="pc-search-title ">
            <input v-model="searchword" placeholder="搜索课程名称" type="text">
            <span @click="searchResult"></span>
          </div>
        </div>
        <div class="islogin-box">
          <div class="item-top islogin-mystore">
            <div class="main-menu-list">
              <span></span>
              <div v-if="collOrgList.length > 0" v-for="item in collOrgList" @click.stop="openOrgDetail(item)">{{item.orgName}}</div>
              <div v-if="collOrgList.length == 0">暂无收藏</div>
            </div>
          </div>
          <div class="item-top islogin-mymessage" @click="openMyMessage">
            <span v-if="unMsgCount>0">{{unMsgCount}}</span>
          </div>
          <div v-if="isLogin" class="item-top islogin-myhead" @click="openMain">
            <img src="http://wk.xhcedu.com/2020/202005/a_835f873c4b4d4de5a5e175ebb341a4f1.jpg" style="width: 32px;height: 32px;border-radius: 50%" alt="">
            <div class="main-menu-list">
              <span></span>
              <div @click="openPageByPath('/pages/mainmessage')">我的消息</div>
              <div @click="openPageByPath('/pages/myproductlist')">我的课程</div>
              <div @click="openPageByPath('/pages/rakebackhis')">返佣记录</div>
              <div @click="openPageByPath('/pages/maincollect')">收藏记录</div>
              <div @click="openMyOrg">我的店铺</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-items" style="display: none">
      <div class="pc-center">
        <ul>
          <li  @click="openTab(item)"  v-for="item in tabList" v-bind:class="{'active-h-two':item.tabIndex == tabIndex_Active}">
            {{item.text}}
          </li>
<!--          <li>-->
<!--            扫描诊断-->
<!--          </li>-->
<!--          <li>-->
<!--            免费课程-->
<!--          </li>-->
<!--          <li>-->
<!--            知识讲授-->
<!--          </li>-->
<!--          <li>-->
<!--            在线直播-->
<!--          </li>-->
<!--          <li>-->
<!--            拼团课程-->
<!--          </li>-->
<!--          <li>-->
<!--            资料下载-->
<!--          </li>-->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import appcode from './appload'

  export default {
  name: 'HelloWorld',
  data () {
    return {
      special:[],//特价课程
      orgList:[],//机构列表
      isLogin:false,
      userphone:'',
      dialogVisible:false,
      searchword:'',
      tabList:[
        {'text':'AI系统首页',tabIndex:0,path:'/',query:{}},
        {'text':'扫描诊断',tabIndex:2,path:'/pages/targettingindex',query:{}},
        {'text':'免费课程',tabIndex:1,path:'/pages/free',query:{}},
        {'text':'知识讲授',tabIndex:4,path:'/pages/ptp',query:{}},
        {'text':'在线直播',tabIndex:5,path:'/pages/live',query:{}},
        {'text':'优惠课程',tabIndex:6,path:'/pages/group',query:{}},
        {'text':'资料下载',tabIndex:3,path:'/pages/file',query:{}},
      ],
      tabIndex_Active:'',
      timerText:'000',
      collOrgList:[],
      unMsgCount:0,
    }
  },
  created(){
    if(this.$store.state.user.user.userPhone){
        this.isLogin = true;
        this.getMyCollectionOrgList();
        this.http.post('/dir/queryUnReadMsgCount',{}).then(res=>{
          if(res.code == 0){
            this.unMsgCount = res.data;
          }
        })
    }else{
        this.isLogin = false;
    }
    var active_path = this.$route.path;
    for(var i=0;i<this.tabList.length;i++){
      if(active_path == this.tabList[i].path){
        this.tabIndex_Active = this.tabList[i].tabIndex;
      }
    }

  },
  components:{
    appcode
  },
  methods:{
    //打开我的
    openMain(){
      this.openNewPage('/pages/maincenter',{})
    },
    //个人中心
    openPageByPath(path){
      this.openNewPage(path,{})
    },
    // 打开我的店铺
    openMyOrg(){
      var orgId = this.$store.state.user.user.orgId ? this.$store.state.user.user.orgId : null;
      if(orgId){
        this.openNewPage('/pages/orgdetail',{orgId:orgId})
      }
    },
    //打开店铺首页
    openOrgDetail(data){
      this.openNewPage('/pages/orgdetail',{orgId:data.orgId})

    },
    //获取收藏店铺列表
    getMyCollectionOrgList(){
      this.http.post('/dir/queryDirUserCollection',{pageSize:1000,pageNum:1}).then(res=>{
        if(res.code == 0){
          this.collOrgList = res.data.list;
        }
      })
    },
    //原地爆炸
    getTimerText(newMonth,newDays){
      let date = new Date();
      let nowTime = date.getTime();
      let month = date.getMonth();
      let day = date.getDate();
      let days;
      if(month==newMonth && day == newDays){ //判断是否是当天
        return this.timerText = '000';
      }else if(month == newMonth && day>newDays){ //是否已经过了12月21号了
        let endTime = Date.parse((new Date(date.getFullYear()+1)+'-'+newMonth +'-'+ newDays +' 00:00:00')) //获取到第二年的12月21号
        days = Math.floor((endTime-nowTime)/86400000);
      }else{
        let endTime = Date.parse(new Date(date.getFullYear()+'-'+newMonth +'-'+ newDays +' 00:00:00')) //获取到第二年的12月21号
        days = Math.floor((endTime-nowTime)/86400000);
      }
      if(days > 0){
        if(days < 10){
          days = '00'+days;
          return days;
        }else if(days < 100){
          days = '0'+days;
          return days;
        }else{
          return days;
        }
      }else{
        return -1;
      }
    },
    showApp(){
      this.dialogVisible = true;
    },
    openMyCenter(){
      if(this.isLogin){
        var routeUrl = this.$router.resolve({
          path: "/pages/mainmsg",
          query: {}
        });
        window.open(routeUrl .href, '_blank');
      }else{
        this.$router.push('/pages/login')
      }
    },
    openMyMessage(){
      if(this.isLogin){
        this.$router.push('/pages/mainmessage')
      }else{
        this.$router.push('/pages/login')
      }
    },
    callme(){
    },
    openLogin(){
      this.$router.push('/pages/login')
    },
    openSignup(){
      this.$router.push('/pages/signup')
    },
    openUpload(){
      this.$router.push('/pages/uploadapp')
    },
    loginout(){
      localStorage.removeItem('diruserinfo')
      this.stoast('已退出')
      setTimeout(()=>{
          this.$router.push('/');
          location.reload()
      },1000)
    },
    openPosition(){
      if(localStorage.getItem('diruserinfo')){
        this.$router.push('/pages/position')
      }else{
        this.$router.push('/pages/login')
      }
    },
    openMbaIndex(){
      this.$router.push('/')
    },
    searchResult(){
      if(!this.searchword){
        this.toast('请输入关键字后搜索')
        return;
      }
      if(this.$route.path == '/pages/search'){

      }
      let routeUrl = this.$router.resolve({
        path: "/pages/search",
        query: {word:this.searchword}
      });
      window.open(routeUrl .href, '_blank');
    },
    openTab(data){
      // let routeUrl = this.$router.resolve({
      //   path:data.path,
      //   query: data.query
      // });
      // window.open(routeUrl .href, '_blank');
      //
      let routeUrl = this.$router.resolve({
        path: data.path,
        query: data.query
      });
      window.open(routeUrl .href, '_blank');
    },
    openLogin(){
      this.$router.push('/pages/login')
    },

  },
  watch: {
    '$route' (to, from) {
      var active_path = to.path
      for(var i=0;i<this.tabList.length;i++){
        if(active_path == this.tabList[i].path){
          this.tabIndex_Active = this.tabList[i].tabIndex;
        }
      }
    }
  }
}
import '../assets/css/common.css';
import '../assets/css/style.css'
</script>
<style scopd>
  .item-top:hover .main-menu-list{
    display: block;
  }
  .main-menu-list div{
    width: 60px;margin: 0 auto;
    line-height: 29px;font-size: 12px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
  }
  .main-menu-list span{
    display: block;
    width: 10px;
    height: 10px;
    position: absolute;
    top:-6px;
    left: 50%;
    margin-left: -5px;
    transform: rotate(45deg);
    background: #fff;
    z-index: 200;
    border-left:1px solid #e5e5e5;
    border-top:1px solid #e5e5e5;
  }
  .main-menu-list{
    display: none;
    position: absolute;
    top: 65px;
    width: 80px;
    z-index: 333;
    left: 50%;
    margin-left: -50px;
    background: #fff;
    border: 1px solid #e5e5e5;
  }
  .islogin-myhead{
    width: 32px;
    border-radius: 50%;
    /*overflow: hidden;*/
    height: 32px;
    position: relative;
    /*background: url("") no-repeat 0px 0px ;*/
    /*background-size:32px 32px;*/
  }
  .islogin-mymessage > span{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    right: 20px;
    top:25px;
    background:#e60012;
    font-size: 12px;
    color:#fff;
    line-height: 16px;
    display: block;
    text-align: center;
  }
  .islogin-mymessage{
    position: relative;
    background: url("../assets/img/dis/message.png") no-repeat 0px 30px ;
    background-size: 29px 29px;
  }
  .islogin-mystore {
    position: relative;
    background: url("../assets/img/dis/store.png") no-repeat 0px 30px ;
    background-size: 29px 27px;
  }
  .islogin-box .item-top{
    width: 30px;
    height: 30px;
    padding-top: 30px;
    padding-right: 20px;
    cursor: pointer;
  }
  .islogin-box{
    /*margin-top: 30px;*/
    margin-left: 23px;
    display: flex;justify-content: flex-start;
  }
  .head-timer > div >  span{
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top:0px;
    text-align: center;
    line-height: 35px;
    font-size: 18px;
    font-weight: bold;
    color:#ff0000;
  }
  .head-timer > div{
    margin-left: 3px;
    width: 27px;
    height: 33px;
    border:1px solid #e8c9bf;
    position: relative;
    margin-top: 25px;
  }
  .head-timer > div a {
    width: 100%;
    height: 17px;
    background: #fcece7;
    position: absolute;
    left: 0px;
    top:0px;
  }
  .head-timer{
    line-height: 88px;
    color:#333;
    font-size: 17px;
    margin-left: 20px;
    display: flex;
  }
  .menu-items ul {
    display: flex;
    justify-content: flex-start;
  }
  .menu-items li:hover{
    background: #a40000;
    color:#d6b0b2;
  }
  .menu-items li {
    padding: 0px 33px;
    cursor: pointer;
    font-size: 18px;
    line-height: 50px;
    color:#fff;
  }
  .app-codeimg {
    position: absolute;
    right: 0px;
    top:50px;
    z-index: 500;
  }
  .download-app>div{
    position: relative;
  }
  .download-app>div>img{
    margin-top: 28px;
    margin-left: 15px;
  }
  .download-app span{
    color:#1b1b1b;
    font-size: 16px;
    line-height: 88px;
  }
  .download-app{
    display: flex;;
    justify-content: flex-start;
    margin-left:30px;
  }
  .menu-items{
    background: #b81c22;
    height:50px;
  }
  .pc-search-title{
    width: 710px;
    height: 46px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    margin-left: 40px;
    border:1px solid #ec6941;
    margin-top: 20px;
  }
  .pc-search-title input{
    padding: 0 10px;
    outline: none;
    width: 656px;
    height: 46px;
    border:none;
    background: #fdf8f8;
    color:#323232;
  }
  .pc-search-title span{
    background: #ec6941 url("../assets/img/searchicon.png") no-repeat 12px 8px;
    height: 46px;
    width: 60px;
    text-align: center;
    cursor: pointer;
    line-height: 46px;
    color:#fff;
    display: block;
  }
  .active-h-two{
    background: #a40000 !important;
    color:#d6b0b2 !important;
  }
  .h-two-c ul {
    margin-left: 50px;
    display: flex;
    justify-content: space-between;
    line-height: 80px;
    font-size: 16px;color:#333;
  }
  .h-two-c ul li {
    cursor: pointer;
    margin-right: 20px;
  }
  .h-two{
    border-bottom: 4px solid #f0f1f1;
    width: 100%;
    height: 88px;
    background: #fff;
  }
  .h-two .pc-center {
    position: relative;
    display: flex;
    justify-content: flex-start;
  }
  .h-two>div>img{
    height: 50px;
    cursor: pointer;
    margin-top: 15px;
  }
</style>
<style scoped>

</style>
