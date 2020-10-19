<template>
  <div class="hello" style="background: #f5f5f5">
    <orghead></orghead>
    <div class="pc-center">
      <div class="org-schools">
        <div class="org-schools-list">
          <ul>
            <li :class="{'schools-address-active':item.lat == center.lat}" v-for="(item,index) in schoolList" @click="lookDetail(item)">
              <span class="schools-index schools-address-icon-gray">{{index+1}}</span>
              <div class="schools-address">
                <p>{{item.schoolname}}</p>
                <span>{{item.schooladdress}}</span>
              </div>
            </li>

          </ul>
        </div>
        <div class="org-schools-address">
          <baidu-map :center="center" :zoom="zoom" @ready="handler" style="height:500px"
                     :scroll-wheel-zoom='true'>
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>

            <bm-marker-clusterer :averageCenter="true">
              <bm-marker v-for="marker of schoolList" :key="marker.lat" :position="{lng: marker.lng, lat: marker.lat}"
                         @click="lookDetail(marker,index)"></bm-marker>
            </bm-marker-clusterer>

            <bm-info-window :position="{lng:center.lng, lat: center.lat}" :title="center.schoolname"
                            :show="center.show">
              <p><span class="left">地址：</span><span class="right">{{center.schooladdress}}</span></p>
            </bm-info-window>
          </baidu-map>
          <!--            <mapa v-if="schoolList.length>0" :schoolList="schoolList"></mapa>-->
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import orghead from '../../components/orghead'
  import mapa from '../../components/map'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        orgId:null,
        addresslist:[],
        orgObj:{},
        schoolList:[],
        center: {},

      }
    },
    components:{
      mapa,
      orghead
    },
    created(){
      this.orgId = this.$store.state.user.activeOrgId;
      this.$emit('header', false)
      this.getOrgInfo();
    },
    methods:{
      //获取机构详情
      getOrgInfo() {
        this.http.post('/dir/queryOrgInfo', {orgId: this.orgId}).then(res => {
          if (res.code == 0) {
            this.orgObj = res.data;
            this.schoolList = JSON.parse(res.data.orgCampus)
            if(this.schoolList.length>0){
              for(var i=0;i<this.schoolList.length;i++){
                this.schoolList[i].show = false;
              }
            }
            //地图初始化
            if(this.schoolList.length > 0){
              this.setBaiduMapPoint(this.schoolList[0].lng,this.schoolList[0].lat)
            }

          }
        })
      },
      //百度地图
      handler({BMap, map}) {
        var _this = this;
        this.Bmap = map;
      },
      lookDetail(data) {
        this.center = data;
        this.center.show = true;
        this.setBaiduMapPoint(data.lng,data.lat)
      },
      //地图中心点显示
      setBaiduMapPoint(lng,lat){
        var point = new BMap.Point(lng,lat)
        this.Bmap.centerAndZoom(point, 13)
        var marker = new BMap.Marker(point) // 创建标注
        this.Bmap.addOverlay(marker) // 将标注添加到地图中
        var circle = new BMap.Circle(point, 6, {
          strokeColor: 'Red',
          strokeWeight: 6,
          strokeOpacity: 1,
          Color: 'Red',
          fillColor: '#f03'
        })
        this.Bmap.addOverlay(circle)
      },
    },
  }
  import '../../assets/css/common.css';
  import '../../assets/css/index.css'
  import '../../assets/css/organ.css'
</script>
<style scoped>

</style>
