/**
 * Created by 47822 on 2019/8/2.
 */
import axios from 'axios';
// import router from 'router';
import router from '../router';

import qs from 'qs';
import configUrl from '../config';
import { Loading } from 'element-ui';
Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
};

const Common = {};
//检测手机号
Common.checkPhone = function(phone) {
  var reg = /^1[3456789]{1}[0-9]{9}$/;
  if(!reg.test(phone)){
    return false;
  }
  return true;
}
//时间戳转换
Common.formatTimeToDay = function (time) {
  return new Date(time).format("yyyy.MM.dd hh:mm");
}
Common.formatTimeToDate = function (time) {
  return new Date(time).format("yyyy.MM.dd");
}
Common.formatTimeToHour = function (time) {
  return new Date(time).format("hh:mm");
}
Common.formatTimeToDateAndHour = function (time) {
  return new Date(time).format("MM.dd hh:mm");
}
//秒转时分秒
Common.getUseTime = function(t){
  var m = Math.floor(t/60);
  var s = t%60;
  m = m<10 ? '0'+m : m;
  s = s<10 ? '0'+s : s;
  return m+':'+s;
}
//剩余时间倒计时 获取天时分秒
Common.MillisecondToDate = function(mss) {
  mss = mss - new Date().getTime();
  if(mss<=0){
    var obj = {
      d:0,
      h:0,
      m:0,
      s:0
    }
    return obj
  }
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  days = days < 10 ? '0' + days : days
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  hours = hours < 10 ? '0' + hours : hours
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  minutes = minutes < 10 ? '0' + minutes : minutes
  var seconds = parseInt((mss % (1000 * 60)) / 1000);
  seconds = seconds < 10 ? '0' + seconds : seconds
  var obj = {
    d:days,
    h:hours,
    m:minutes,
    s:seconds
  }
  return obj
  // return days + "天" + hours + ":" + minutes + ":" + seconds;
}
//图片上传公用
Common.uploadImg = function (data) {
  let loadingInstance = Loading.service({text:'图片上传中...'});
  let config = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }
  return new Promise((resolve, reject) =>{
    var reader = new FileReader();
    reader.readAsDataURL(data.file || data);
    reader.onload = function(){
      axios.post(configUrl.baseUrl+'/file/upload', qs.stringify({base64:reader.result, fileName:'a.jpg'}), config).then(response => {
        if(response.data.code == 0){
          resolve(response.data)
          loadingInstance.close()
        }else{
          loadingInstance.close()
          reject(response)
        }
      })
    };
  });
}
Common.replaceVideoHtml = function(str){
  if(!str){
    return '';
  }
  str = str.replace('>Tip<','>温馨提示<')
  str = str.replace('>The web FLASH failed to load. You can try the following:<','>网页FLASH插件加载不成功，您可以尝试以下操作：<')
  str = str.replace('>Click<','>点击<')
  str = str.replace('>Download and install<','>下载安装<')
  str = str.replace('>Enable Flash<','>启用flash<')
  str = str.replace('>and select \'allow\' on the popup window<','>并在提示上选择“允许”<')
  str = str.replace('>Download Flash<','>下载flash<')
  str = str.replace('>then install it<','>并安装<')
  str = str.replace('>Video webcast<','>视频直播<')
  str = str.replace('>Chapter<','>章节<')
  str = str.replace('>Q&A Record<','>问答记录<')
  str = str.replace('>Chat Record<','>聊天记录<')
  str = str.replace('>Tips<','>提示<')
  str = str.replace('>OK<','>知道了<')
  str = str.replace('>Message<','>留言<')
  str = str.replace('Input your email address.','请输入您的邮箱')
  str = str.replace('Leave a message.','请输入您的留言内容')
  str = str.replace('value="Send"','value="发送"')
  localStorage.setItem('replayurl',str);
  if(navigator.userAgent.indexOf("Safari")>0 && navigator.userAgent.indexOf("Chrome")<0){
    window.location.replace(configUrl.videoUrl + "video.html");
  }else{
    window.open(configUrl.videoUrl + "video.html");
  }
}
//成功弹窗
Common.sMessage = function (string) {
  this.$message({
    message:string,
    type: 'success',
    center: true
  })
}
//警告弹窗
Common.wMessage = function (string) {
  this.$message({
    message:string,
    type: 'error',
    center: true
  })
}
//打开详情页 通用 列表用
Common.openProductDetailByType = function(data){
  let routeUrl;
  localStorage.setItem('ACTIVE_ORG_ID',data.orgId)
  if(data.imageType==2){
    routeUrl = this.$router.resolve({
      path: "/pages/product_detail",
      query: {id:data.productId}
    });
  }else if(data.imageType == 4){
    if(data.isCut == 1 && data.isGroup == 0){
      routeUrl = this.$router.resolve({
        path: "/pages/productcut_detail",
        query: {id:data.productId}
      });
    }else if(data.isGroup == 1 || (data.isGroup == 1 && data.isCut == 1)){
      routeUrl = this.$router.resolve({
        path: "/pages/productgroup_detail",
        query: {id:data.productId}
      });
    }
  }else if(data.imageType == 5){ //特价
    routeUrl = this.$router.resolve({
      path: "/pages/productspe_detail",
      query: {id:data.productId}
    });
  }else{
    if((data.isCut==1&&data.isGroup==1) || (data.isCut==0&&data.isGroup==1)){
      routeUrl = this.$router.resolve({
        path: "/pages/productgroup_detail",
        query: {id:data.productId}
      });
    }else if(data.isCut==1&&data.isGroup==0){
      routeUrl = this.$router.resolve({
        path: "/pages/productcut_detail",
        query: {id:data.productId}
      });
    }
  }
  setTimeout(function () {
    window.open(routeUrl .href, '_blank');
  },0)

}
Common.openNewPage = function(url,data){
  let routeUrl = this.$router.resolve({
    path: url,
    query:data
  });
  window.open(routeUrl .href, '_blank');
},
//公用 收藏产品
Common.collectThisProduct = function(productId,imageType){
  this.http.post('/dir/favoriteProduct',{productId:productId,imageType:imageType}).then(res=>{
    if(res.code == 0){
      this.$message({
        message:'收藏成功',
        type: 'success'
      })
    }
  })
},
Common.getUserInfo = function(){
  if(localStorage.getItem('diruserinfo')){
    return JSON.parse(localStorage.getItem('diruserinfo'))
  }
},
Common.install = function(Vue){
  Vue.prototype.stoast = Common.sMessage;
  Vue.prototype.toast = Common.wMessage;
  Vue.prototype.$uploadImg = Common.uploadImg;
  Vue.prototype.checkPhone = Common.checkPhone;
  Vue.prototype.formatTimeToDay = Common.formatTimeToDay;
  Vue.prototype.formatTimeToHour = Common.formatTimeToHour;
  Vue.prototype.formatTimeToDateAndHour = Common.formatTimeToDateAndHour;
  Vue.prototype.openNewPage = Common.openNewPage;
  Vue.prototype.formatTimeToDate = Common.formatTimeToDate;
  Vue.prototype.MillisecondToDate = Common.MillisecondToDate;
  Vue.prototype.openProductDetailByType = Common.openProductDetailByType;
  Vue.prototype.collectProduct = Common.collectThisProduct;
  Vue.prototype.getUserInfo = Common.getUserInfo;
  Vue.prototype.replaceVideoHtml = Common.replaceVideoHtml;
  Vue.prototype.getUseTime = Common.getUseTime;
};


export default Common;
