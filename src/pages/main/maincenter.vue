<!--suppress BadExpressionStatementJS -->
<template>
  <div class="hello1" style="background: #f5f5f5;position:relative">
    <main-header></main-header>
    <div class="pc-center">
      <div class="mianbox" >
        <div class="person-top">
          <div class="person_detail">
            <div class="person-image">
              <img :src="myobj.imageUrl || 'https://www.zz1819.com/bg/personhead.png'" alt="">
              <div>
                <p>{{myobj.userPhone}}</p>
                <div v-show="myobj.isCommission==1">
                  拥有返佣权
                </div>
                <div v-show="myobj.isCommission==0">
                  暂无返佣权
                </div>
              </div>
            </div>
            <div>
              <div class="safe-level">
                <p>
                  我的安全等级 <span class="safe-c">中</span>
                </p>
                <span @click="openMyDetail">完善资料</span>
              </div>
              <div class="main-items-sys">
                <img @click="openChange" style="height:27px;width:19px;" src="../../assets/img/login-phone.png" alt="">
                <img @click="openChange" style="height:24px;width:26px;" src="../../assets/img/login-pwd.png" alt="">
                <img @click="openMyDetail" style="height:25px;width:25px;" src="../../assets/img/login-person.png" alt="">
                <img @click="openMyMessage" style="height:20px;width:26px;" src="../../assets/img/login-x.png" alt="">
              </div>
            </div>
          </div>
          <div class="person-money">
            <div @click="openMyZzwMoney(1)">
              <img src="../../assets/img/zzb.png" alt="">
              <div>
                <p>我的元儒币</p>
                <span>{{coinNum}}</span>
              </div>
            </div>
            <div @click="openMyZzwMoney(2)" style="border-left: 1px solid #ff5000;box-sizing: border-box">
              <img src="../../assets/img/zzm.png" alt="">
              <div>
                <p>我的佣金</p>
                <span>￥{{money}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="person-history" v-show="historyList.length>0">
          <div class="main-system-title">
            浏览记录
            <span @click="clearSeeHistory">清除记录</span>
          </div>
          <div class="history-list">
            <ul>
              <li v-for="item in historyList">
                ◆ {{item.productName}}
              </li>


            </ul>
          </div>
        </div>
        <div class="person-history">
          <div class="main-system-title">
            猜你喜欢
            <span>换一批</span>
          </div>
          <div class="hotclass-list">
            <div>
              <ul>
                <li class="product-item" v-for="item in hotClass">
                  <div class="product-img" :style="{backgroundImage: 'url(' + item.imageUrl + ')'}">
                    <!--<img :src="item.imageUrl" alt="">-->
                  </div>
                  <div class="product-detail">
                    <p class="class-title">{{item.productName}}</p>
                    <div class="class-tag">
                      <span>{{item.className}}</span>
                    </div>
                    <div class="activename">
                      <span v-show="item.isCut==1">邀请砍价</span>
                      <span v-show="item.isGroup==1">拼团优惠</span>
                      <span v-show="item.isCommission==1">邀请返佣</span>
                    </div>
                    <div class="class-num">
                      <div class="class-price">
                        <a href="javascript:;">￥</a>
                        <span>{{item.productPrice}}</span>
                        <div style="clear: both"></div>
                      </div>
                      <div class="class-person">
                        报名<span>{{item.purchaseNum}}</span>人
                      </div>
                      <div style="clear: both"></div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

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
      hotClass:[],
      myobj:{},
      coinNum:0,
      money:0,
      historyList:[],
    }
  },
  components:{
    'main-header':Header,
  },
  created(){
    this.getMyCenterInfo();
    this.getSeeHistory();
  },
  methods:{
    getMyCenterInfo(){
      this.http.post('/user/queryUserInfo',{}).then(res=>{
        if(res.code == 0){
          this.myobj = res.data;

          this.coinNum = res.data.appCoin.coinNum;
          this.money = res.data.appCommission.commissionTotalAmount || 0;
        }
      })
    },
    getSeeHistory(){
      this.http.post('/user/queryBroweHistory',{}).then(res=>{
        if(res.code == 0){
          this.historyList = res.data;
        }
      })
    },
    clearSeeHistory(){
      this.http.post('/user/clearBroweList',{}).then(res=>{
        if(res.code == 0){
          this.stoast('已清除')
          this.historyList = [];
        }
      })
    },
    openMyZzwMoney(t){
        if(t==1){
          this.$router.push('/pages/mainzzb')
        }else{
          this.$router.push('/pages/mainmoney')
        }
    },
    openChange(){
        this.$router.push('/pages/mainsys')
    },
    openMyMessage(){
      this.$router.push('/pages/mainmessage')

    },
    openMyDetail(){
      this.$router.push('/pages/mainmsg')
    },
    openIndex(){
      this.$router.push('/')
    },

  },
}
import '../../assets/css/common.css';
import '../../assets/css/style.css'
</script>
<style scoped>
  .main-system-title span{
    position: absolute;
    right:0px;
    font-size: 15px;
    color:#ff5000;
    cursor: pointer;
  }
  .history-list ul{
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

  }
  .history-list ul li {
    width:50%;
    color:#666;
    font-size: 12px;
    margin-bottom: 20px;
  }
  .person-history{
    padding: 20px;
    background: #fff;
    margin-top: 20px;
  }
  .main-system-title{
    position: relative;
    line-height: 20px;
    font-size: 17px;
    padding-left: 10px;
    border-left: 3px solid #ff5000;
  }
  .person-money>div p {
    font-size: 18px;
    color:#666;
    margin-bottom: 10px;
    margin-top: 25px;
  }
  .person-money div span{
    color:#ff5000;
    font-size: 15px;
  }
  .person-money img{
    margin-right: 20px;
    height:70px;
    margin-top: 15px;

  }
  .person-money>div{
    cursor: pointer;
    width:50%;
    display: flex;
    justify-content: center;
  }
  .person-money{
    display: flex;
    justify-content:space-around;
    width:610px;
    height:100px;
    padding: 35px 0px;
    background: #fff;
  }
  .main-items-sys img{
    cursor: pointer;
  }
  .main-items-sys{
    display: flex;
    justify-content: space-between;

  }
  .safe-level>span{
    position: absolute;
    right: 0;
    top:0px;
    line-height: 50px;
    font-size: 12px;
    color:#f7260a;
    cursor: pointer;
  }
  .safe-level p{
    color:#999999;
    font-size: 12px;
  }
  .safe-c{
    background: #ff7f00;
  }
  .safe-level p span{
    margin-left: 3px;
    display: inline-block;
    height:20px;
    width:20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color:#fff;
    border-radius: 3px;
  }
  .safe-level{
    position: relative;
    line-height:50px;

  }
  .person-image > div > div{
    color:#666666;
    font-size: 12px;
    padding-left: 26px;
    background: url("../../assets/img/isc.png") no-repeat left 0px;
    background-size: 18px 16px;
    margin-top: 5px;

  }
  .person-image>div{
    margin-left: 10px;
  }
  .person-image>div>p{
    margin-top: 7px;font-size: 14px;
    color:#666;
  }
  .person-image{
    display: flex;
    justify-content: flex-start;
  }
  .person-image>img{
    width:50px;
    height:50px;
    border-radius: 50%;
  }
  .person_detail{
    /*display: flex;*/
    /*justify-content: flex-start;*/
    width:300px;
    padding: 20px;
    border-right:20px solid #f7f7f7;
    height:130px;
    background: #fff;
  }
  .person-top{
    display: flex;
    justify-content: flex-start;
  }


</style>
