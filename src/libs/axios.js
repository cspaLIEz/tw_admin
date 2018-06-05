import axios from 'axios';
import env from '../../build/env';
import queryString from 'querystring'

const ajaxUrl = env === 'development'
? 'http://localhost:5002'
: env === 'production'
    ? 'http://adminapi.stmpai.com'
    : 'https://debug.url.com';
//http://localhost:5002
//http://adminapi.stmpai.com
let options = {
  baseURL:ajaxUrl,
  timeout: 30000,
  headers: {
      post: {
          'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization':'Bearer '+localStorage.getItem('token')
        },
      get:{
        'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization':'Bearer '+localStorage.getItem('token')
      }  
  },
  transformRequest: [function (data) {
    
    let res='';
    // for (let key in data) {
    //     if(JSON.stringify(data[key])=="{}"||JSON.stringify(data[key])=="[]"){
    //         data[key]=""
    //     }
    // }
    for (let key in data) {
        if(JSON.stringify(data[key])=="{}"||JSON.stringify(data[key])=="[]"){
            // data[key]=""
        }else{
             res += encodeURIComponent(key) +"=" +encodeURIComponent(data[key]) +"&" 
        }
        
        
    }
    res=res.substring(0,res.length-1)
    queryString.stringify(res)
    return res;
    
  }]
}

let ajax = axios.create(options);


export default ajax;