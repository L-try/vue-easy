import request from '@/utils/http'

/*
params: {
  orderState:0,
  page:1,
  pageSize:2
}
*/


// @/apis/order.js

export const getUserOrder = (params) => {
  return request({
    url: '/member/order',
    method: 'GET',
    params
  }).then(res => {
    console.log('原始响应:', res) // 这里能打印吗？
    return res
  }).catch(err => {
    console.error('请求出错:', err)
    throw err
  })
}