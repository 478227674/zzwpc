<template>
  <div>
    <div class="mask" v-show="handlerFlag">
      <div class="dialog-box">
        <span @click="handlerFlag = false">x</span>
        <div class="dialog-left">
          <div @click="handlerTab(0)" :class="{'dialog-left-active':handlerIndex == 0}">免费预约试听</div>
          <div @click="handlerTab(1)" :class="{'dialog-left-active':handlerIndex == 1}">免费获取报价</div>
        </div>
        <div v-show="handlerIndex == 0" class="dialog-right">
          <div class="dialog-right-title">
            <p>免费预约课程试听</p>
            <div>
              用户平均<span>6</span>分钟得到答复
            </div>
            <img src="" alt="">
          </div>
          <div class="dialog-form">
            <div class="dialog-form-item">
              <span>试听课程</span>

              <select name="createTime" v-model="pIndex">
                <option :value="null">请选择您要试听的课程</option>
                <option :value="index" v-for="(item,index) in pList">{{item.productName}}
                </option>
              </select>
<!--              <input v-model="handlerObj.productName" placeholder="请输入您要试听的课程名" type="text">-->
            </div>
            <div class="dialog-form-item">
              <span>试听校区</span>
              <select name="campus" id="" v-model="handlerObj.campusIndex">
                <option :value="null">请选择试听的校区地址</option>
                <option :value="index" v-for="(item,index) in campus">{{item.schoolname}}({{item.schooladdress}})
                </option>
              </select>
            </div>
            <div class="dialog-form-item">
              <span>手机号码</span>
              <input v-model="handlerObj.phone" placeholder="填写手机号，抢试听名额" type="text">
            </div>
            <div class="submit-btn" @click="submitHandler">立即申请</div>
            <div style="clear: both"></div>
            <div class="dialog-ps">*为了您的权益，您的隐私将严格保密</div>
          </div>
        </div>
        <div v-show="handlerIndex == 1" class="dialog-right">
          <div class="dialog-right-title">
            <p>免费获取课程报价</p>
            <div>
              用户平均<span>6</span>分钟得到答复
            </div>
            <img src="" alt="">
          </div>
          <div class="dialog-form">
            <div class="dialog-form-item">
              <span>报价课程</span>
              <select name="createTime" v-model="pIndex">
                <option :value="null">请选择您要试听的课程</option>
                <option :value="index" v-for="(item,index) in pList">{{item.productName}}
                </option>
              </select>
<!--              <input v-model="handlerObj.productName" placeholder="请输入您要获取报价的课程名" type="text">-->
            </div>
            <div class="dialog-form-item">
              <span>您的称呼</span>
              <input v-model="handlerObj.name" placeholder="请输入您的称呼" type="text">
            </div>
            <div class="dialog-form-item">
              <span>手机号码</span>
              <input v-model="handlerObj.phone" placeholder="填写手机号，抢试听名额" type="text">
            </div>
            <div class="submit-btn" @click="submitHandler">免费获取课程报价</div>
            <div style="clear: both"></div>
            <div class="dialog-ps">*为了您的权益，您的隐私将严格保密</div>
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
        handlerObj: {
          productName: '',
          productId:'',
          campus: '',
          campusIndex:null,
          phone: '',
          name: '',
          type: 0,
          orgId:'',
        },
        pIndex:'',
        campus:[],
        handlerIndex: 0, //选择联系方式
        handlerFlag: false, //操作弹框
        pList:[],
      }
    },
    created() {
      this.monitoring();
      this.cityList = cityData;

    },
    methods: {
      //监听
      monitoring(){
        this.$on('partner', (res) => {
          this.handlerFlag = true;
          this.handlerObj.orgId = res.orgId;
          this.handlerIndex = res.t;
          this.campus = res.orgCampus;
          this.http.post('/dir/queryProductListRedu',{orgId:res.orgId,pageSize:9999,pageNum:1}).then(ret => {
            if (ret.code == 0) {
              this.pList = ret.data.list;
            }
          })
        })
      },
      //提交
      submitHandler() {
        this.handlerObj.productName = this.pList[this.pIndex].productName;
        this.handlerObj.productId = this.pList[this.pIndex].productId;
        this.handlerObj.type = this.handlerIndex;
        if (this.handlerObj.campusIndex !=  null) {
          var school = this.campus[this.handlerObj.campusIndex];
          this.handlerObj.campus = school.schoolname + '(' + school.schooladdress + ')'
        }
        if (!this.handlerObj.productName) {
          this.toast('请填写课程名称')
          return;
        }
        if (!this.checkPhone(this.handlerObj.phone)) {
          this.toast('请填写手机号码')
          return;
        }
        this.http.post('/dir/saveDirUserSubsrcibe', this.handlerObj).then(res => {
          if (res.code == 0) {
            this.stoast('已提交，请注意接听电话')
            this.handlerFlag = false;
            this.handlerObj = {
              productName: '',
              campus: '',
              campusIndex: null,
              phone: '',
              name: '',
              type: 0
            }
          }
        })
      },
      //选择操作
      handlerTab(t) {
        this.handlerIndex = t;
      },
      showForm(t, data) {
        this.handlerFlag = true;
        if (data.orgCampus) {
          this.campus = JSON.parse(data.orgCampus)
        }
        this.handlerTab(t)
      },
    },
    watch:{
      pflag(v) {
        if(v){
          document.getElementsByTagName('html')[0].style.overflow = 'hidden'
        }else{
          document.getElementsByTagName('html')[0].style.overflow = 'scroll'
        }
      }
    }
  }
  import '../assets/css/common.css';
  import '../assets/css/style.css'
  import cityData from "../api/city.data";
</script>
<style>
  .dialog-box > span{
    font-size: 28px;
    color:#b5b5b5;
    position: absolute;
    right: 34px;
    top:10px;
    padding: 10px;
    cursor: pointer;
  }
  .dialog-ps {
    width: 269px;
    float: right;
    text-align: center;
    font-size: 12px;
    color: #ec6941;
    margin-top: 25px;
  }

  .submit-btn {
    width: 254px;
    height: 44px;
    line-height: 44px;
    color: #fff;
    background: #ec6941;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    margin-top: 16px;

    float: right;
  }

  .dialog-form-item select {
    height: 36px;
    line-height: 36px;
    border: 1px solid #bfbfbf;
    padding: 0 17px;
    margin-left: 15px;
    border-radius: 5px;
    width: 252px;
  }

  .dialog-form-item input {
    height: 36px;
    line-height: 36px;
    border: 1px solid #bfbfbf;
    padding: 0 17px;
    margin-left: 15px;
    border-radius: 5px;
    width: 218px;
  }

  .dialog-form-item span {
    color: #212121;
    font-size: 14px;
    line-height: 38px;
  }

  .dialog-form-item {
    margin-top: 15px;
  }

  .dialog-form {
    margin-top: 15px;
    padding: 0 10px;
    overflow: hidden;
  }

  .dialog-right-title div span {
    color: #ec6941;
  }

  .dialog-right-title div {
    text-align: center;
    margin-top: 5px;
    font-size: 12px;
    color: #9a9a9a;
  }

  .dialog-right-title p {
    color: #000;
    font-size: 24px;
    text-align: center;
  }

  .dialog-right-title {
    border-bottom: 1px solid #e5e5e5;
    margin-top: 30px;
  }

  .dialog-right {
    width: 350px;
    margin-right: 30px;
  }

  .dialog-left-active {
    background: #fff !important;
    color: #ec6941 !important;
  }

  .dialog-left div {
    cursor: pointer;
    text-align: center;
    width: 14px;
    padding: 53px 10px;
    height: 109px;
    background: #ec6941;
    color: #fff;
    font-size: 12px;
    word-wrap: break-word;
  }

  .dialog-left {
    width: 40px;
    border-left: 4px solid #ec6941;
  }

  .dialog-box {
    display: flex;
    justify-content: space-between;
    width: 455px;
    height: 430px;
    background: #fff;
    position: absolute;
    top: 150px;
    left: 50%;
    margin-left: -227px;
  }


</style>
