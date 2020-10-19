// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store';
import configUrl from './config'
import http from './server/axios'   //axios实例化后引入取名http
// import ElementUI  from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import common from './api/common'
import SIdentify from './components/identify' //注意引入路径
// import echarts from 'echarts'
import VideoPlayer from 'vue-video-player'
import BaiduMap from 'vue-baidu-map'
const hls = require('videojs-contrib-hls')
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
// Vue.prototype.$echarts = echarts

Vue.use(VideoPlayer)
Vue.use(SIdentify)
Vue.use(hls)
Vue.use(BaiduMap, {
  ak: 'uqc3ALuChCNSuRjYWrptLGYO34sQlhSw'
})

// import 'swiper/dist/css/swiper.min.css';
/* 样式的话，我这里有用到分页器，就在全局中引入了样式 */
// Vue.use(vueSwiper);
Vue.config.productionTip = false

Vue.prototype.http = http;   //放入全局
// Vue.use(ElementUI)
Vue.use(common)
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
