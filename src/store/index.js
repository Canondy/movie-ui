import { createStore } from "vuex";
const TOKEN_KEY = "TOKEN_USER"
// 处理用户Token
const store = createStore({
    state: {
        user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    },
    // 修改容器中的数据
    mutations: {
        setUser(state, data){
            state.user = data;
            window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
        }
    }
})

export default store