<template>
  <div id="app" style="height: 100%;">
    <app-header ref="header" v-if="header_show"></app-header>
    <router-view v-on:showDonwload="showDonwload" v-on:header="header" v-on:footer="footer" v-on:header_two="header_two" ></router-view>
    <app-footer v-if="footer_show"></app-footer>
  </div>
</template>

<script>
  import Header from './components/head'
  import Footer from './components/foot'
  export default {
    name: 'App',
    provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
      return {
        reload: this.reload
      }
    },
    data(){
      return {
        header_show:true,
        footer_show:true,
        header_two_show:true,
      }
    },
    components: {
      'app-header':Header,
      'app-footer':Footer,
    },
    methods:{
      reload () {
        this.isRouterAlive = false;            //先关闭，
        this.$nextTick(function () {
          this.isRouterAlive = true;         //再打开
        })
      },
      //是否显示头部
      header:function (bool) {
        this.header_show = bool;
      },
      //是否显示头部
      header_two:function (bool) {
        this.header_two_show = bool;
      },
      //是否显示底部
      footer:function (bool) {
        this.footer_show = bool;
      },
      //下载弹窗事件
      showDonwload:function () {
        this.$refs.header.showApp();
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          if(val.name == 'videolist'){
            this.header_show = false;
            this.footer_show = false;
          }else{
            this.header_show = true;
            this.footer_show = true;
          }
        },
        // 深度观察监听
        deep: true
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
</style>
