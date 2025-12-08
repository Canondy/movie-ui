import request from './../../utils/request.js'

// 查询电影信息基础列表
export function listMovie(query) {
    return request({
        url: '/wxapi/showInfo',
        method: 'get',
        params: query
    })
}
