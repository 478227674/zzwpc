<template>
  <div class="hello" style="background: #fff;overflow: hidden">
      <div style="display: flex;justify-content: flex-start;width:1160px;margin-top: 20px;">
        <div class="mapbox" id="allmap">

        <baidu-map :scroll-wheel-zoom="true" :center="center" :zoom="zoom" @ready="handler" style="height:375px;width:700px;" >
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT">
            <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT">
            </bm-map-type>
          </bm-navigation>
          <div v-for="(marker,index) of addresslist">
            <bm-marker  :position="{lng: marker.lng, lat: marker.lat}" :title="marker.schoolname" @click="infoWindowOpen(index)">
              <bm-info-window :show="marker.show"  title="校区信息" :position="{lng: marker.lng, lat: marker.lat}" @close="infoWindowClose(index)" @open="infoWindowOpen(index)">
                <div>校区：{{marker.schoolname}}</div>
                <div>地址：{{marker.schooladdress}}</div>
              </bm-info-window>
            </bm-marker>
          </div>
        </baidu-map>

        </div>
      </div>
  </div>
</template>

<script>
  export default {

    name:'mapbox',
    props: {
      addresslist: {
        type: Array,
        default: []
      }
    },
    data () {

      return {
        activeIndex:null,
        show:false,
        center: {
          lat: 0,
          lng: 0
        },
        zoom:13,
      }
    },

    created:function () {
    },

    methods: {
      infoWindowClose (mar) {
        this.addresslist[mar].show = false;
        this.$set(this.addresslist,mar,this.addresslist[mar])
      },
      infoWindowOpen (mar) {
        this.activeIndex = mar;
        for(var i=0;i<this.addresslist.length;i++){
            this.addresslist[i].show = false;
        }
        this.addresslist = this.addresslist;
        this.addresslist[mar].show = true;
        this.$set(this.addresslist,mar,this.addresslist[mar])
        this.center.lng = this.addresslist[mar].lng
        this.center.lat = this.addresslist[mar].lat
      },
      handler ({BMap, map}) {
        this.center.lng =this.addresslist[0].lng
        this.center.lat =this.addresslist[0].lat
      },
      getClickInfo (e) {
        this.center.lng = e.point.lng
        this.center.lat = e.point.lat
      }

    }

  }
import '../assets/css/common.css';
import '../assets/css/style.css'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #allmap{
    width:700px;
    float: right;
    height:375px;
  }
  .campusList ul{
    overflow: hidden;
  }
  .campusList{
    overflow-y: scroll;
  }
  .active-campustitle{
    background: #ffdbb8 !important;
  }
  .active-campustitle p{
    color:#ff5000 !important;
  }
  .active-campustitle .campuslistindex{
    background: url("../assets/img/campusicon1.png") 0px 0px;

  }
  .campustitle p{
    margin-top: 20px;
    font-size: 14px;
    margin-bottom: 5px;
    color:#333;

  }
  .campustitle span{
    font-size: 13px;
    color:#999;
  }

  .campuslistindex{
    width: 24px;
    height:30px;
    text-align: center;
    line-height: 30px;
    color:#fff;
    font-size: 16px;
    margin-right: 10px;
    margin-top: 22px;
    font-weight: bold;
    background: url("../assets/img/campusicon2.png") 0px 0px;
    background-size: 100% 100%;
  }
  .campusList li {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    height:74px;
    padding: 0 20px;
    background: #f7f7f7;
    border-bottom: 1px solid #fff;
  }
  .campusList{
    width:420px;
    height:375px;
    background: #fff;
  }
  .campusbox{
    float: left;
    width:420px;
    display: flex;
    justify-content: space-between;
  }

</style>
