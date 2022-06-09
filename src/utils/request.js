// 引入axios
import axios from "axios"

const request = axios.create({
    // 后端接口地址
    baseURL: "http://localhost:8080"
})
export default request