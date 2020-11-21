<template>
  <div class="hello">
    <div style="background: #f6f6f6">
      <div class="pc-head-all">
        <div class="pc-top">
          <ul>
            <li style="padding: 0px;position: relative">
              <a href="javascript:;" @click="cityFlag = !cityFlag">{{cityName}} <span
                style="color:#ec6941">[切换城市]</span> </a>
              <div v-show="cityFlag" class="city-list">
                <div class="city-select">
                  <div class="city-title">城市选择</div>
                  <el-select @change="getProvinceId" style="margin-right: 10px;width: 200px;" v-model="provinceId" placeholder="请选择">
                    <el-option
                      v-for="item in cityList"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select @change="getCityId" style="width: 200px;" v-model="cityId" placeholder="请选择">
                    <el-option
                      v-for="item in twoList"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="city-show-list">
                  <h3>按省份选择</h3>
                  <ul class="show-list-item">
                    <li v-for="item in cityList">
                      <div class="province-name">
                        {{item.text}}
                      </div>
                      <div class="city-list-little">
                        <span class="city-name-class" @click.stop="chooseThisNmslCity(item,items)"
                              v-for="items in item.children">{{items.text}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li style="position: relative;" @click="codeFlag = !codeFlag">
              手机浏览
              <div @click.stop="" v-show="codeFlag" style="left:50%;margin-left:-50px;width: 100px;height: 100px;background: #fff;z-index: 100;padding: 10px;position:absolute;">
                <img style="width: 100%;height: 100%;" src="https://www.zz1819.com/bg/h5url.png" alt="">
              </div>
            </li>
          </ul>
        </div>
        <div class="pc-top-r">
          <div v-if="!isLogin" class="head-menu" @click="openLogin">
            <p style="padding-right: 0px;">登录</p>
          </div>
          <div v-if="isLogin" class="head-menu" @click="openMain">
            <p style="padding-right: 0px;">个人中心</p>
          </div>

          <div class="head-menu pinpai">
            <p>机构中心</p> <span class="menu-down"> > </span>
            <div class="head-1">
              <div class="go-sys">
                <p>元儒教育城分校</p>
                <div>已合作机构<a target="_blank" href="https://www.zz1819.com/sys/#/userlogin">登录后台系统管理</a></div>
              </div>
              <div class="go-sys">
                <p>品牌合作</p>
                <div style="border-bottom: none">享受按结果收费的整合式报名,<a target="_blank"
                                                                  href="https://www.zz1819.com/sys/#/signup">申请合作>></a>
                </div>
              </div>
            </div>
          </div>
          <div class="head-menu" style="line-height: 36px">|</div>
          <div class="head-menu nmsl">
            <p>类别导航</p> <span class="menu-down"> > </span>
            <div class="menu-types">
              <div style="display: flex;justify-content: flex-start;flex-wrap: wrap">
                <div class="nmsl-type" v-for="(item,index) in sortList">
                  <div class="nmsl-big">{{item.name}} <span @click="openMoreTypes"> 更多>> </span></div>
                  <div class="nmsl-small">
                    <p class="three-type" @click="searchResultBySort(items)" v-for="items in item.children">
                      {{items.name}}</p>
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
            <p>400-010-9988</p>
          </div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="h-two">
      <div style="width: 1200px;margin:0 auto;display: flex;justify-content: space-around">
        <img @click="openMbaIndex" src="../assets/img/dis/salelogo.png" alt="">
        <div class="h-two-menu">
          <span @click="openMbaIndex">首页</span>
          <span @click="openSearchByProType('cut')">拼团砍价</span>
          <span @click="openSearchByProType('free')">免费课程</span>
          <span @click="openSearchByProType('coin')">兑换领券</span>
          <span @click="openQab(1)">学员保障</span>
          <span @click="openQab(2)">问题汇总</span>
        </div>
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
              <div v-if="collOrgList.length > 0" v-for="item in collOrgList" @click.stop="openOrgDetail(item)">
                {{item.orgName}}
              </div>
              <div v-if="collOrgList.length == 0">暂无收藏</div>
            </div>
          </div>
          <div class="item-top islogin-mymessage" @click="openMyMessage">
            <span v-if="unMsgCount>0">{{unMsgCount}}</span>
          </div>
          <div @click="openLogin" v-if="!isLogin" style="line-height: 88px;color:#ec6941;cursor:pointer;">
            登录
          </div>
          <div v-if="isLogin" class="item-top islogin-myhead" @click="openMain">
            <img :src="user.imageUrl" style="width: 32px;height: 32px;border-radius: 50%" alt="">
            <div class="main-menu-list">
              <span></span>
              <div @click="openPageByPath('/pages/mainmessage')">我的消息</div>
              <div @click="openPageByPath('/pages/myproductlist')">我的课程</div>
              <!--              <div @click="openPageByPath('/pages/rakebackhis')">返佣记录</div>-->
              <div @click="openPageByPath('/pages/maincollect')">收藏记录</div>
              <!--              <div @click="openMyOrg">我的店铺</div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../api/city.data';

  export default {
    name: 'HelloWorld',
    data() {
      return {

        special: [],//特价课程
        orgList: [],//机构列表
        isLogin: false,
        userphone: '',
        dialogVisible: false,
        searchword: '',
        tabIndex_Active: '',
        collOrgList: [],
        unMsgCount: 0,
        sortList: [],
        user: {},

        cityName: '城市选择',//默认
        cityFlag: false,
        provinceId: '',
        cityId: '',
        cityList: [],
        twoList: [],
        codeFlag:false,
      }
    },
    created() {
      if (localStorage.getItem('CITY_NAME')) {
        this.cityName = localStorage.getItem('CITY_NAME')
      } else {
        this.cityName = '北京市'
        localStorage.setItem('PROVINCE_ID', 110000)
        localStorage.setItem('CITY_ID', 110100)
        localStorage.setItem('CITY_NAME', '北京市')
      }
      this.cityList = cityData;
      this.getSortList();
      if (this.$store.state.user.user.userPhone) {
        this.user = this.$store.state.user.user;
        this.isLogin = true;
        this.getMyCollectionOrgList();
        this.http.post('/dir/queryUnReadMsgCount', {}).then(res => {
          if (res.code == 0) {
            this.unMsgCount = res.data;
          }
        })
      } else {
        this.isLogin = false;
      }
    },
    components: {},
    methods: {
      //打开问题汇总 和 学员保障
      openQab(t){
        this.openNewPage('/pages/qab',{type:t})
      },
      //进入二级产品筛选
      openSearchByProType(t) {
        this.openNewPage('/pages/search',{proType: t})
      },
      //选择省后
      getProvinceId(data) {
        this.provinceId = data;
        for (var i = 0; i < this.cityList.length; i++) {
          if (data == this.cityList[i].value) {
            this.twoList = this.cityList[i].children;
          }
        }
      },
      //选择市
      getCityId(data) {
        this.cityId = data;
        var cityName = ''
        for (var i = 0; i < this.twoList.length; i++) {
          if (data == this.twoList[i].value) {
            cityName = this.twoList[i].text;
          }
        }
        this.chooseThisNmslCity({value: this.provinceId}, {value: this.cityId, text: cityName})
      },
      //选择一个城市
      chooseThisNmslCity(data, data2) {
        localStorage.setItem('PROVINCE_ID', data.value)
        localStorage.setItem('CITY_ID', data2.value)
        localStorage.setItem('CITY_NAME', data2.text)
        location.reload();
      },
      //选择三级跳页
      searchResultBySort(data) {
        this.openNewPage('/pages/search', {sortId: data.sid, twoSortId: data.id})
      },
      openMoreTypes() {
        this.openNewPage('/pages/search', {})
      },
      //选择分类
      chooseTwoLevel(data, index, indexs) {
        this.sortList[index].index = indexs;
      },
      //获取类型列表
      getSortList() {
        this.http.post('/dir/queryProductSortNoOne', {}).then(res => {
          if (res.code == 0) {
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].index = 0;
            }
            this.sortList = res.data;
          }
        })
      },
      //打开我的
      openMain() {
        this.openNewPage('/pages/mainmsg', {})
      },
      //个人中心
      openPageByPath(path) {
        this.openNewPage(path, {})
      },
      // 打开我的店铺
      openMyOrg() {
        var orgId = this.$store.state.user.user.orgId ? this.$store.state.user.user.orgId : null;
        if (orgId) {
          this.openNewPage('/pages/orgdetail', {orgId: orgId})
        }
      },
      //打开店铺首页
      openOrgDetail(data) {
        this.openNewPage('/pages/orgdetail', {orgId: data.orgId})

      },
      //获取收藏店铺列表
      getMyCollectionOrgList() {
        this.http.post('/dir/queryDirUserCollection', {pageSize: 1000, pageNum: 1}).then(res => {
          if (res.code == 0) {
            this.collOrgList = res.data.list;
          }
        })
      },
      //原地爆炸
      getTimerText(newMonth, newDays) {
        let date = new Date();
        let nowTime = date.getTime();
        let month = date.getMonth();
        let day = date.getDate();
        let days;
        if (month == newMonth && day == newDays) { //判断是否是当天
          return this.timerText = '000';
        } else if (month == newMonth && day > newDays) { //是否已经过了12月21号了
          let endTime = Date.parse((new Date(date.getFullYear() + 1) + '-' + newMonth + '-' + newDays + ' 00:00:00')) //获取到第二年的12月21号
          days = Math.floor((endTime - nowTime) / 86400000);
        } else {
          let endTime = Date.parse(new Date(date.getFullYear() + '-' + newMonth + '-' + newDays + ' 00:00:00')) //获取到第二年的12月21号
          days = Math.floor((endTime - nowTime) / 86400000);
        }
        if (days > 0) {
          if (days < 10) {
            days = '00' + days;
            return days;
          } else if (days < 100) {
            days = '0' + days;
            return days;
          } else {
            return days;
          }
        } else {
          return -1;
        }
      },
      showApp() {
        this.dialogVisible = true;
      },
      openMyCenter() {
        if (this.isLogin) {
          var routeUrl = this.$router.resolve({
            path: "/pages/mainmsg",
            query: {}
          });
          window.open(routeUrl.href, '_blank');
        } else {
          this.$router.push('/pages/login')
        }
      },
      openMyMessage() {
        if (this.isLogin) {
          this.$router.push('/pages/mainmessage')
        } else {
          this.$router.push('/pages/login')
        }
      },
      callme() {
      },
      openLogin() {
        this.$router.push('/pages/login')
      },
      openSignup() {
        this.$router.push('/pages/signup')
      },
      openUpload() {
        this.$router.push('/pages/uploadapp')
      },
      loginout() {
        localStorage.removeItem('diruserinfo')
        this.stoast('已退出')
        setTimeout(() => {
          this.$router.push('/');
          location.reload()
        }, 1000)
      },
      openPosition() {
        if (localStorage.getItem('diruserinfo')) {
          this.$router.push('/pages/position')
        } else {
          this.$router.push('/pages/login')
        }
      },
      openMbaIndex() {
        this.$router.push('/')
      },
      searchResult() {
        if (!this.searchword) {
          this.toast('请输入关键字后搜索')
          return;
        }
        if (this.$route.path == '/pages/search') {

        }
        let routeUrl = this.$router.resolve({
          path: "/pages/search",
          query: {word: this.searchword}
        });
        window.open(routeUrl.href, '_blank');
      },
      openTab(data) {
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
        window.open(routeUrl.href, '_blank');
      },

    },

  }
  import '../assets/css/common.css';
  import '../assets/css/style.css'
  import '../assets/css/head.css'
  import cityData from "../api/city.data";
</script>
<style scopd>
  .h-two-menu span:hover {
    color: #ec6941;
  }

  .h-two-menu span {
    line-height: 83px;
    cursor: pointer;
    padding: 0 10px;
    font-size: 14px;
    color: #323232;
  }
</style>
