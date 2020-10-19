 <template>
  <div class="hello" >
    <div style="background: #f6f6f6">
      <div class="pc-head-all">
        <div class="pc-top">
          <ul>
            <li style="padding: 0px;position: relative">
              <a href="javascript:;">元儒网 > {{cityName?cityName+' > ' : ''}}  {{orgObj.orgName}}</a>
            </li>
          </ul>
        </div>
        <div class="pc-top-r">
          <div class="head-menu pinpai">
            <p>机构中心</p> <span class="menu-down"> > </span>
            <div class="head-1">
              <div class="go-sys">
                <p>元儒教育城分校</p>
                <div>已合作机构<a target="_blank" href="https://www.zz1819.com/sys/#/userlogin">登录后台系统管理</a></div>
              </div>
              <div class="go-sys">
                <p>品牌合作</p>
                <div style="border-bottom: none">享受按结果收费的整合式报名,<a target="_blank" href="https://www.zz1819.com/sys/#/signup">申请合作>></a></div>
              </div>
            </div>
          </div>
          <div class="head-menu" style="line-height: 36px">|</div>
          <div class="head-menu nmsl" >
            <p>类别导航</p> <span class="menu-down"> > </span>
            <div class="menu-types">
              <div style="display: flex;justify-content: flex-start;flex-wrap: wrap">
                <div class="nmsl-type" v-for="(item,index) in sortList">
                  <div class="nmsl-big">{{item.name}} <span @click="openMoreTypes"> 更多>> </span></div>
                  <div class="nmsl-small">
                    <p class="three-type" @click="searchResultBySort(items)" v-for="items in item.children">{{items.name}}</p>
                  </div>
                </div>
              </div>
              <div style="display: none">
                <div class="nmsl-type">
                  <div class="nmsl-big">兴趣/爱好</div>
                  <div class="nmsl-small">
                    <p>舞蹈</p>
                    <p>舞蹈</p>
                    <p>舞蹈</p>
                    <p>舞蹈</p>
                  </div>
                </div>
                <div class="nmsl-type">
                  <div class="nmsl-big">兴趣/爱好</div>
                  <div class="nmsl-small">
                    <p>舞蹈</p>
                    <p>舞蹈</p>
                    <p>舞蹈</p>
                    <p>舞蹈</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="head-menu" style="line-height: 36px">|</div>
          <div class="head-menu">
            <p>在线客服</p>
          </div>
          <div class="head-menu">
            <p>4000-888-686</p>
          </div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="pc-center org-store">
      <div class="org-storebox">
        <div class="store-head-and-name">
          <div class="store-head">
            <img :src="orgObj.logoUrl" alt="">
          </div>
          <div class="store-text">
              <div class="name-and-grade">
                <span style="line-height: 40px">{{orgObj.orgName}}</span>
                <div class="organ-index-top" style="margin-bottom: 0;margin-left:15px" v-if="orgObj.userGrade">
                  <span>{{orgObj.userGrade}}</span>
                  <a style="margin-top: 10px">很好</a>
                  <div style="margin-top: 5px">
                    <a href="javascript:;">环境 {{orgObj.envGrade}}</a>
                    <a href="javascript:;">师资 {{orgObj.effectGrade}}</a>
                    <a href="javascript:;">效果 {{orgObj.facultyGrade}}</a>
                    <a href="javascript:;">服务 {{orgObj.serviceGrade}}</a>
                  </div>
                </div>
              </div>
<!--            <p>-->

<!--              <img src="../assets/img/zzw/noc.png" @click="collectionOrg(1)" v-if="!orgObj.isCollection" alt="">-->
<!--              <img src="../assets/img/zzw/yesc.png" @click="collectionOrg(0)" v-if="orgObj.isCollection" alt="">-->
<!--              <span @click="bePartner" v-if="!orgObj.isDirUser">申请成为店铺合伙人</span>-->
<!--            </p>-->
            <div style="margin-top: 0px" class="store-div">{{orgObj.orgIntro}}</div>
            <span>
              商品总数:{{orgObj.countProduct}}
              <img @click="collectionOrg(true)" v-if="!orgObj.isCollection" src="../assets/img/zzw/collectpro.png" alt="">
              <img @click="collectionOrg(false)" v-if="orgObj.isCollection" src="../assets/img/zzw/noc.png" alt="">
            </span>
          </div>

          <div class="store-qrcode">
            <div id="qrcode"></div>
            <!--            <span>微信扫码</span>-->
            <!--            <span>访问内容方店铺</span>-->
          </div>
        </div>
        <div class="conact-store">
          <div>联系店家</div>
          <p>电话:{{orgObj.orgPhone}}</p>
          <p>座机:{{orgObj.orgTelephone}}</p>
        </div>
      </div>
    </div>
    <div class="org-tabs ">
      <div class="">

        <span v-for="(item,index) in menuList" @click="openChooseTabs(item.path)" :class="{'active-org-tabs':activeIndex == index}">{{item.name}}</span>
<!--        <span @click="openChooseTabs('/pages/orgdetail')" class="active-org-tabs">主页</span>-->
<!--        <span @click="openChooseTabs('/pages/organ_product')">课程</span>-->
<!--        <span @click="openChooseTabs('/pages/organ_comment')" >评价({{comTotal}})</span>-->
<!--        <span @click="openChooseTabs('/pages/organ_teachers')" >老师</span>-->
<!--        <span @click="openChooseTabs('/pages/organ_news')" >资讯</span>-->
<!--        <span @click="openChooseTabs('/pages/organ_school')">校区</span>-->
<!--        <span @click="openChooseTabs('/pages/organ_aboutus')">关于我们</span>-->
      </div>
    </div>
  </div>
</template>
<script>
  import '../api/city.data';
  import QRCode from "qrcodejs2"; //引入生成二维码插件
  import config from '../config'
  export default {
  name: 'HelloWorld',
  data () {
    return {
      cityName:'',
      orgTbasIndex:0,
      orgObj:{},
      orgId:null,
      comTotal:0,
      menuList:[
        {name:'主页',path:'/pages/orgdetail'},
        {name:'课程',path:'/pages/organ_product'},
        {name:'评价',path:'/pages/organ_comment'},
        {name:'资讯',path:'/pages/organ_news'},
        {name:'老师',path:'/pages/organ_teachers'},
        {name:'校区',path:'/pages/organ_school'},
        {name:'关于我们',path:'/pages/organ_aboutus'},
      ],
      activeIndex:null,
      sortList:[],
    }
  },
  created(){
    if(localStorage.getItem('CITY_NAME')){
      this.cityName = localStorage.getItem('CITY_NAME')
    }else{
      this.cityName = '北京'
    }
    for(var i=0;i<this.menuList.length;i++){
      if(this.$route.path == this.menuList[i].path){
        this.activeIndex = i;
      }
    }
    this.getSortList();

    this.orgId = localStorage.getItem('ACTIVE_ORG_ID');
    this.getOrgInfo();
  },
  components:{
  },
  methods:{
    //收藏或取消收藏
    collectionOrg(type) {
      if (type) {
        this.http.post('/dir/saveDirUserCollection', {orgId: this.orgId}).then(res => {
          if (res.code == 0) {
            this.stoast('已收藏')
            this.orgObj.isCollection = true;
          }
        })
      } else {
        this.http.post('/dir/deleteDirUserCollection', {orgId: this.orgId}).then(res => {
          if (res.code == 0) {
            this.stoast('已取消收藏')
            this.orgObj.isCollection = false;
          }
        })
      }

    },
    //根据类型搜索
    searchResultBySort(data){
      this.openNewPage('/pages/search',{sortId:data.sid,twoSortId:data.id})
    },
    openMoreTypes(){
      this.openNewPage('/pages/search',{})
    },
    //获取类型列表
    getSortList(){
      this.http.post('/dir/queryProductSortNoOne', {}).then(res => {
        if (res.code == 0) {
          for(var i=0;i<res.data.length;i++){
            res.data[i].index = 0;
          }
          this.sortList = res.data;
        }
      })
    },
    //获取机构详情
    getOrgInfo() {
      this.http.post('/dir/queryOrgInfo', {orgId: this.orgId}).then(res => {
        if (res.code == 0) {
          this.orgObj = res.data;
          // this.handler()
          this.createOrgQrcode()
        }
      })
    },
    //生成二维码
    createOrgQrcode() {
      var shareUrl = '';
      var user = this.$store.state.user.user || {};
      shareUrl = config.wxUrl + 'organ_detail.html?id=' + this.orgId + '&inviteCode=' + user.inviteCode + '&'
      if (document.getElementById('qrcode').innerHTML) {
        document.getElementById('qrcode').innerHTML = "";
      } else {
        let qrcode = new QRCode('qrcode', {
          width: '100',
          height: '100',
          text: shareUrl, // 二维码地址
          colorDark: "#000",
          colorLight: "#FFF",
        })
      }
    },
    openChooseTabs(t){
      this.$router.push({path:t,query:{orgId:this.orgId}})
    },
  },
  watch:{

  }

}
import '../assets/css/common.css';
  import '../assets/css/style.css'
  import '../assets/css/head.css'
  import '../assets/css/organ.css'
</script>
<style scoped>


  .active-org-tabs {
    color: #fbc2b0 !important;
    background: #c34721 !important;
  }

  .org-tabs span:hover {
    color: #fbc2b0;
    background: #c34721;
  }

  .org-tabs span {
    font-size: 18px;
    line-height: 46px;
    text-align: center;
    display: block;
    padding: 0 30px;
    cursor: pointer;
  }
  .org-tabs div{
    width: 1200px;
    display: flex;
    justify-content: flex-start;
    height: 46px;
    margin: 10px auto 0px auto;
  }
  .org-tabs {

    background: #ea5427;
    color: #fff;
  }


  .conact-store {
    height: 88px;
    margin: 15px auto;
    width: 150px;
    padding: 0 20px;
    /*padding: 16px 0px 16px 20px;*/
  }

  .conact-store p {
    font-size: 14px;
    color: #6b6b6b;
    margin-top: 10px;
  }

  .conact-store div {
    font-size: 18px;
    font-weight: bold;
    color: #2a2a2a;

  }

  .store-qrcode div {
    width: 100px;
    height: 100px;
  }

  .store-qrcode span {
    font-size: 12px;
    color: #6b6b6b;
    display: block;
  }

  .store-text p span {
    color: #eb6100;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
  }

  .store-qrcode {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .store-text img {
    cursor: pointer;
    margin: 0 10px;
    width: 16px;
    height: 16px;
  }

  .store-text .store-div, .store-text > span {
    color: #6b6b6b;
    display: block;
    font-size: 14px;
    margin-top: 10px;
    width:700px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .store-text .name-and-grade {
    color: #2a2a2a;
    font-size: 18px;
    display: flex;
    font-weight: bold;
  }

  .store-text {
    margin-left: 20px;
  }

  .store-head-and-name {
    display: flex;
    position: relative;
    justify-content: flex-start;
    width: 986px;
    border-right: 4px solid #f0f1f1;
    height: 88px;
    padding: 16px 0px 16px 20px;

  }

  .org-storebox {
    display: flex;
    justify-content: space-between;
    background: #fff;
  }

  .store-head img {
    width: 100%;
    height: 100%;
  }

  .store-head {
    width: 87px;
    height: 87px;
    border: 1px solid #dcdcdc;
  }
  .org-store {
    height: 131px;
    display: flex;
    justify-content: flex-start;
  }

</style>
