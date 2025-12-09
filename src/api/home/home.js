import request from '@/utils/request.js'

// 查询电影信息基础列表
export function listMovie(query) {
    return request({
        url: '/wxapi/showInfo',
        method: 'get',
        params: query
    })
}


// 查询电影详情信息
export function selectMovieDetailVoById(id) {
    return request({
        url: `/wxapi/detail/` + id,
        method: 'get',
    })
}
