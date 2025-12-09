// 引入axios
import axios from "axios"

const request = axios.create({
    // 后端接口地址 - 使用相对路径以便通过vite代理转发
    baseURL: "",
    headers: { 'Content-type': 'application/json' },
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 详细记录请求信息，包括完整URL和请求方法
    // console.log('发起请求:', { url: config.url, method: config.method });
    
    // 从localStorage获取用户信息，添加认证token
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo)
        if (user && user.token) {
          config.headers['Authorization'] = 'Bearer ' + user.token
        }
      } catch (e) {
        console.error('解析用户信息失败:', e)
      }
    }
    
    // 确保路径正确格式化，以/开头
    if (!config.url.startsWith('/') && !config.url.startsWith('http')) {
      const originalUrl = config.url;
      config.url = '/' + config.url;
      // console.log('调整请求路径格式:', originalUrl, '->', config.url);
    }
    
    // 特别处理代理路径，确保正确转发到后端
    if (config.url.startsWith('/wxapi')) {
      // console.log('检测到wxapi路径，将通过vite代理转发到后端服务');
    }
    
    return config;
  },
  error => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        // console.log('请求成功:', response.config.url, response.status);
        return response;
    },
    error => {
        console.error('请求失败:', error.config?.url);
        
        if (error.response) {
            // 服务器返回了错误响应
            console.error('响应状态:', error.response.status);
            console.error('响应数据:', error.response.data);
            
            if (error.response.status === 401) {
                // 未授权，可以重定向到登录页
                window.location.href = '/login';
            } else if (error.response.status === 404) {
                console.error('接口路径不存在');
            } else if (error.response.status >= 500) {
                console.error('服务器内部错误');
            }
        } else if (error.request) {
            // 请求发出但没有收到响应
            console.error('网络请求超时或失败，可能是后端服务未启动');
        } else {
            // 请求配置出错
            console.error('请求配置错误:', error.message);
        }
        
        return Promise.reject(error);
    }
)

export default request
