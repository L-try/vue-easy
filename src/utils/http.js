// axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 10000
})

// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
// http.js 响应拦截器修改后
httpInstance.interceptors.response.use(
  res => res.data, // 成功时直接返回res.data
  e => {
    // 更健壮的错误处理
    const errorMessage = e.response?.data?.message ||
      e.message ||
      '请求失败'

    ElMessage({
      type: 'warning',
      message: errorMessage
    })
    return Promise.reject(e)
  }
)


export default httpInstance