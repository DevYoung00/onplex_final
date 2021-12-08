import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'

const SERVER_URL = 'http://localhost:8004/'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // accounts
    isLogin: false,
  
  },
 

  mutations: {
    // ACCOUNTS MUTATIONS
    LOGIN(state) {
      state.isLogin = true
    },
    LOGOUT(state) {
      state.isLogin = false
    },

  },
  actions: {
    // ACCOUNTS ACTIONS
    
    login({commit}){
      axios.post('http://localhost:8004/member/login',
        {...this.user},{withCredentials:true})
      .then(res=>{router.push({name: 'Home'})
      console.log(res.data)}
      )
      .catch(console.error)
    //   return axios
    //   .post('http://localhost:8004/member/login',credentials)
    //   // {...this.user},{withCredentials:true})
    // .then(({data})=>{
    //   commit('SET_USER_DATA',data)
    //   router.push({name: 'Home'})
    // console.log(res.data)}
    // )
    // .catch(console.error)
    },
    // login({commit}, headers) {
    //   axios({
    //     method: 'POST',
    //     url: `${SERVER_URL}member/login`,
    //     headers : {withCredentials:true}
      
    //   })
    //   .then(res => {
    //     localStorage.setItem('jwt', res.data.token)
    //     commit('LOGIN')
    //     router.push({name: 'Home'})
    //     if(res.data.success==true){
    //       alert(res.data.message)
    //     }
    //   })
    //   .catch(err => console.log(err))
    // },
    checkLogin({commit}, token) {
      if (token) {
        commit('LOGIN')
      }
    },
    logout({commit}) {
      localStorage.removeItem('jwt')
      commit('LOGOUT')
      router.push({ name: 'Login' })
    },


  
  }
})
/*state: 여러 컴포넌트에 공유되는 데이터 ==data
getter:연산된 state 값을 접근하는 속성 computed
mutations:state값을 변경하는 이벤트,로직,메서드 methods
actions : 비동기 처리 로직을 선언하는 메서드 aysnc methods
vue: {{message}} vuex: {{this.$store.state.message}}
예)
state:{
  num:10},
getter:{
  getNumber(state){
    return state.num;
  },
  doubleNumber(state){
    return state.num*2;
  }
}
{{this.$store.getters.getNumber}}
*/