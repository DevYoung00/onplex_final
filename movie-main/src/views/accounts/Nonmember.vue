<template>

<div>
  <Base_Header/>
  <div class ="accounts_form">
    
        
    
    <div class="authForm">
  
      <h2>비회원 예매</h2>
      <div class="reserveInput">
        <div>
          <input class="form-control" id="signumber" v-model="nonmember.signumber" type="text" placeholder="주민번호 7자리">
        </div>
        <div>
          <input class="form-control" id="tel" v-model="nonmember.tel" type="tel" placeholder="휴대폰 번호">
        </div>
        <div>
          <input class="form-control" id="password" v-model="nonmember.password" type="password" placeholder="비밀번호(4자리)">
        </div>
       </div>
      <button @click="reserve" class="btn submitBtn">예매하기</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import router from '@/router' 
import Base_Header from '@/Header_ty2.vue'
export default {
  name: 'Nonmember',
  data() {
    return {
      nonmember: {
        signumber: null,
        password: null,
        tel:null,
      }
    }
  },
  methods: {
   reserve(){
      axios.post('http://localhost:8004/nonmember/register',
      {...this.nonmember},{withCredentials:true})
    .then(res=>{router.push({name: 'Ticketing'})
    console.log(res.data)}
    )
    .catch(console.error)
    },

    
  },
  components:{
    Base_Header
  }
}
</script>

<style>
  @import '../../assets/styles/common.css';
</style>
