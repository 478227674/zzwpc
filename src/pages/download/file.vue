<!--suppress JSUnresolvedFunction -->
<template>
  <div class="hello" style="background: #f5f5f5">
    <div class="page-box-top">
      <img src="../../assets/img/filebg.png" alt="">
      <div class=" page-top">
        <div class="pc-center">
          <span>资料下载</span>
          <div>
            <p>资料下载</p>
            <a href="javascript:;">在这里有你所需要的建工资料哦~</a>
          </div>
        </div>
      </div>
    </div>
    <div class="pc-center filelist-box">
      <div class="learn-box" style="margin-bottom: 20px">
          <div class="learn-subject-list">
            <ul>
              <li @click="getFileListByTypeId(item)" v-for="item in typeList" :class="{'subject-active':activeId == item.typeId}">{{item.typeName}}</li>
            </ul>
          </div>
          <div class="learn-history-list">
            <div class="mainclass-tab" style="margin:0px 0px 10px 0px;">
              <span v-for="item in sortList" @click="getTestListBySortId(item.id)" :class="{'tab-active':sortId==item.id}">{{item.name}}</span>
            </div>
            <span>{{activeName}}</span>
            <div class="learn-history-list-item">
              <ul>
                <li @click="downloadFile(item.datumUrl)"  v-for="item in fileList">
                  <span>{{item.datumName}}</span>
<!--                  <div class="know-tag">-->
<!--                    <a  href="javascript:;" @click="downloadFile(item.datumUrl)">立即下载</a>-->
<!--                    <a href="javascript:;">立即下载</a>-->
<!--                  </div>-->
                  <div class="new-download">
                    <span>格式：PDF</span>
                    <a target="_blank" :href="item.datumUrl">立即下载</a>
                  </div>
                </li>
              </ul>
              <el-pagination
                background
                @current-change="handleCurrentChange1"
                :current-page="pagenum"
                layout="total,prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </div>
      </div>
    </div>

  </div>

</template>
<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      words:'',
      typeList:[],
      typeId:null,
      activeName:'',
      activeId:null,

      fileList:[],
      pagenum:1,
      total:0,
      sortList:[],
      sortId:null
    }
  },
  mounted(){

  },
  components:{
  },
  created(){
    this.getFileTypeList();
    this.getSortList();
  },
  methods:{
    getTestListBySortId(id){
      this.pagenum = 1;
      this.fileList = [];
      this.sortId = id;
      this.getList();
    },
    getSortList(){
      this.http.post('/product/getProductSortListByLevel',{level:3}).then(res=>{
        if(res.code == 0){
          this.sortList = res.data;
        }
      })
    },
    downloadFile(url){
      if(!localStorage.getItem('diruserinfo')){
        this.$router.push('/pages/login')
        return;
      }
      window.open(url, '_blank');
    },
    searchFiles(){
      if(!this.words){
        this.toast('请输入需要下载的资料');
        return;
      }
      this.pagenum = 1;
      this.activeId = null;
      this.searchFilesFn();
    },
    searchFilesFn(){
      this.http.post('/org/queryDatumPageList',{pageNum:this.pagenum,pageSize:5,datumName:this.words}).then(res=>{
        if(res.code == 0){
          this.fileList = res.data.list;
          this.total = res.data.total;
        }
      })
    },
    // downloadFile(data){
    //   console.log(data)
    //   this.http.post('/org/downloadPDF',{filePath:data.datumUrl,fileName:'sad'}).then(res=>{
    //     if(res.code == 0){
    //       // this.typeList = res.data;
    //       // this.activeId = res.data[0].typeId;
    //       // this.getFileListByTypeId(res.data[0]);
    //     }
    //   })
    // },
    //获取分类
    getFileTypeList(){
      this.http.post('/org/queryDatumTypeList',{}).then(res=>{
        if(res.code == 0){
          this.typeList = res.data;
          this.activeId = res.data[0].typeId;
          this.getFileListByTypeId(res.data[0]);
        }
      })
    },
    //根据分类获取文件类型
    getFileListByTypeId(data){
      this.activeName = data.typeName;
      this.activeId = data.typeId;
      this.words = '';
      this.getList();
    },
    getList(){
      this.http.post('/org/queryDatumPageList',{pageNum:this.pagenum,pageSize:10,typeId:this.activeId,sortId:this.sortId}).then(res=>{
        if(res.code == 0){
          this.fileList = res.data.list;
          this.total = res.data.total;
        }
      })
    },
    handleCurrentChange1(v){
      this.pagenum = v;
      this.getList();
    },
  },
}
import '../../assets/css/common.css';
import '../../assets/css/learn.css'
</script>
<style>
  .subject-active{
    background: -moz-linear-gradient(top, #fe7d5a 0%, e2390b# 100%) !important;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fe7d5a), color-stop(100%,#e2390b)) !important;
    background: -webkit-linear-gradient(top, #fe7d5a 0%,#e2390b 100%) !important;
    background: -o-linear-gradient(top, #fe7d5a 0%,#e2390b 100%) !important;
    background: -ms-linear-gradient(top, #fe7d5a 0%,#e2390b 100%) !important;
    background: linear-gradient(to bottom, #fe7d5a 0%,#e2390b 100%) !important;
  }
</style>
<style scoped>
  .new-download span{
    color:#898989;
    font-size: 12px;
  }
  .new-download a {
    padding-right: 10px;
    color:#f15d35;
    font-size: 12px;
    margin-left: 12px;
    text-decoration: underline;
  }
  .new-download{
    display: flex;
    justify-content: flex-start;
  }
  .learn-subject-list li{
    background: #f3f6f9;
    line-height: 60px;
    height: 60px;
    font-size: 17px;color:#d72f02;
  }
  .learn-history-list-item li:nth-child(odd){
    background: #f0f0f0;
  }
  .learn-history-list-item{
    width: 100%;
  }
  .learn-history-list-item li:nth-child(even){
    background: #e5e5e5;
  }

  .learn-history-list{
    width: 755px;
    padding: 10px 14px;
  }
  .learn-history-list-item li:hover{
    background: #fde1d9;
    color:#f4633c
  }
  .learn-history-list-item li:hover .learn-history-list-item li span{
    text-decoration: underline;
  }
  .learn-history-list-item li span{
    background: none;
  }

  .learn-history-list>span{
    margin: 0;
    width: auto;
    /*width: 100%;*/
    background: -moz-linear-gradient(top, #fadad1 0%, #ffe7e0 100%) !important;
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fadad1), color-stop(100%,#ffe7e0)) !important;
    background: -webkit-linear-gradient(top, #fadad1 0%,#ffe7e0 100%) !important;
    background: -o-linear-gradient(top, #fadad1 0%,#ffe7e0 100%) !important;
    background: -ms-linear-gradient(top, #fadad1 0%,#ffe7e0 100%) !important;
    background: linear-gradient(to bottom, #fadad1 0%,#ffe7e0 100%) !important;
  }
  .learn-subject-list{
    background: #fff;
    padding: 10px 8px;
  }
  .learn-subject-list li{
    margin-bottom: 7px ;
  }
  .filelist-box{
    position: relative;
    z-index: 10;
    margin-top: -80px !important;
  }

  .searchfile p{
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0px;
    top:0px;
    display: block;
    cursor: pointer;
  }
  .searchfile input{
    padding-left: 10px;
    height: 38px;
    width: 300px;
    position: absolute;
    left: 0px;top:0px;
    background: none;
    border:none;
  }
  .searchfile{
    position: relative;
    width: 320px;
    padding-right: 40px;
    background: url("../../assets/img/searchicon.png") no-repeat 320px 8px;
    height: 38px;
    border:1px solid #f73e3c;
    border-radius: 30px;
    margin-top: 10px;
  }
  .alreadytest{
    background: #2acb58 !important;
  }
  .know-tag a{
    color:#fff;
    font-size: 12px;
    height: 20px;
    width: 50px;
    display: block;
    border-radius: 5px;
    margin-top: 20px;
    background: #ffa800;
    text-align: center;
    padding: 2px 5px;
    line-height: 20px;
  }
  .know-tag{
    padding-right: 30px;
    background: url("../../assets/img/right.png") no-repeat right 20px;
    background-size: 12px 20px;
  }
</style>
