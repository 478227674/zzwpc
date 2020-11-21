import store from '../store';
import axios from 'axios'
import router from '../router';
import configUrl from '../config';
import { Message } from 'element-ui';  //element库的消息提示，可以不用
var token = localStorage.getItem('diruserinfo') ? JSON.parse(localStorage.getItem('diruserinfo')).token : '';
var service;
var requestFlag = true;
//创建axios实例
service = axios.create({
  baseURL: configUrl.baseUrl,
  timeout: 30000,
  withCredentials:false,

})
export default {
  //get请求，其他类型请求复制粘贴，修改method
  get(url, param) {
    return new Promise((cback, reject) => {
      service({
        method: 'get',
        url,
        params: param,
      }).then(res => {
        cback(res.response);
        if(res.data.code == 2){
          Message({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(err => {
        if (!err.response) {
          //Message是element库的组件，可以去掉
          Message({
            showClose: true,
            message: '请求错误',
            type: 'error'
          });
        } else {
          reject(err.response);
          console.log(err.response, '异常2')
        }
      })

    })
  },
  // 封装post方法
  post(url, params,isUser){
    let re = /select|update|delete|truncate|join|union|exec|insert|drop|count/i;
    if(re.test(JSON.stringify(params))){
      alert("请勿输入非法字符");
      return;
    }
    if(!isUser){
      if(localStorage.getItem('diruserinfo')){
        params.userId = JSON.parse(localStorage.getItem('diruserinfo')).userId;
      }
    }
    if(!params.orgId){
      params.orgId = localStorage.getItem('orgId') || null;
    }
    params.aid = null;
    params.pid = localStorage.getItem('PROVINCE_ID') || null;
    params.cid = localStorage.getItem('CITY_ID') || null;
    // params.orgId =  JSON.parse(localStorage.getItem('diruserinfo')).orgId;
    // params.token = store.state.user.user.token;
    return new Promise((resolve, reject) =>{
      service({
        method: 'post',
        url,
        data:params,
        headers: {
          'content-type': 'application/json',
          'token':store.state.user.user.token || ''
        }
      }).then(res => {
        if(res.data.code == 1){
          if(res.data.msg == 401){
            if(requestFlag){
              Message({
                showClose: true,
                message: '登录超时，请重新登录',
                type: 'error'
              });
              localStorage.clear('diruserinfo')
              setTimeout(function () {
                router.push('/pages/login')
                return;
                // location.reload();
                // console.log()
              },2000)
              requestFlag = true;
              return;
            }

          }else{
            Message({
              showClose: true,
              message: res.data.msg,
              type: 'error'
            });
            return;
          }
        }
        if(res.data.code == 2){
          Message({
            showClose: true,
            message: res.data.msg,
            type: 'error'
          });
          return;
        }

        resolve(res.data)
      }).catch(err => {
        console.log(err)
        if (!err.response) {
          //Message是element库的组件，可以去掉
          if(requestFlag){
            requestFlag = false;
            Message({
              showClose: true,
              message: '请求错误',
              type: 'error'
            });

            return;

          }

        } else {
          reject(err.response);
        }
      })

    });
  },
  uploadImg(file){
    let param = new FormData(); //创建form对象
    param.append('file',file,'img');//通过append向form对象添加数据
    let config = {
      headers:{'Content-Type':'application/application/x-www-form-urlencoded'}
    };  //添加请求头
    axios.post(configUrl.baseUrl+'/file/upload',param,config)
      .then(response=>{
        return response;
        // console.log(response.data);
      })
  },
}
