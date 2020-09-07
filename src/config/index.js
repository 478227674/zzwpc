const url = {};

url.wxUrl = ''; // 项目地址
url.baseUrl = ''; // 接口地址
url.ossUrl = ''; // oss cdn地址
url.videoUrl = '';//视频回放或者直播课跳转链接域名
url.app_version = '1.0.0'; // oss cdn地址

if(process.env.NODE_ENV == 'production'){  //生产环境
  url.wxUrl = 'https://www.zz1819.com/h5/html/';
  url.baseUrl = 'https://www.zz1819.com/tqshoop/pc';//正式
  url.videoUrl = 'https://www.zz1819.com/xhc/';
  // url.baseUrl = 'http://appx.tqmba.com.cn/tqshoop/app';//打包后地址
  // url.wxUrl = 'http://appx.tqmba.com.cn/h5/html/'
}else{ //测试环境
  url.baseUrl = 'http://192.168.1.209:8090/tqdir_war_exploded/pc';//测试地址
  // url.videoUrl = 'http://appx.tqmba.com.cn/mba/';
  // url.baseUrl = 'http://appx.tqmba.com.cn/tqshoop/app';//测试
  // url.baseUrl = 'http://wk.xhcedu.com/tqshoop/app';//正式
  url.wxUrl = 'http://appx.tqmba.com.cn/h5/html/';
  // url.baseUrl = 'http://wk.xhcedu.com/tqshoop/app'
}
url.install = (Vue) => {
  Vue.prototype.wxUrl = url.wxUrl;
  Vue.prototype.baseUrl = url.baseUrl;
  Vue.prototype.ossUrl = url.ossUrl;
  Vue.prototype.app_version = url.app_version;
};
export default url;
