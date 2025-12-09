import request from "@/utils/request";
// 登录

// 封装用户登录请求模块
export const login = (data) => {
    return request({
        method: "POST",
        url: "/user/login",
        data,
    })
}
