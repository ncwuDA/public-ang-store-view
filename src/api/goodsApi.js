// 6.封装接口
import api from '../apiUtil/request';

//  详细的写法
//   export const test = (params) => api({
//       url: '', // 请求地址
//        method: 'post', // 请求方式
//       // data: params, // (一般post请求，我们习惯使用 data属性来传参)
//       params: params //(一般get请求，我们习惯使用params属性来传参）
//       // 注意：data，和 params 两个属性传参使用，并不是固定的，也可以调换使用。
//  })

//  简写的形式
//  getXXX 自定义的接口名字
//  export const getXXX = (params) => api.get(`/***/***, { params});

//  获取商品分页列表
export const getGoodsPageList = (params) => api.post(`/goods/pageList`, params)
//  获取商品类别
export const getGoodsType = () => api.post(`/goods/goodsType`)
//  新增商品
export const addGoods = (params) => api.post('/goods/insert', params)
//  更新商品
export const updateGoods = (params) => api.post('/goods/updateById', params)
//  删除商品
export const deleteGoods = (params) => api.post('/goods/deleteById', params)


