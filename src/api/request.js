import axios from 'axios';
import { Message } from 'element-ui'
import {jsonToHump} from './dataFormatter';

axios.defaults.withCredentials=true;
const service = axios.create({
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.withCredentials = true;
    if (config.method === 'post') {
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
    }
  
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.data.code != 0) {
      if (response.data.message == 'no login, please login') {
        window.$router.push('/login');
      }
      Message({
        message: response.data.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      throw new Error(response.data.message);
    } else {
      jsonToHump(response.data);
      return response.data.data;
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service;