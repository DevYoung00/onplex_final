<template>
<div> 
<Base_Header/>
 <div class = "accounts_form">
    <div class="authForm">
    
            
      <h2>비회원 예매확인</h2>
      <div class="reserveInput">
        <div>
          <input class="form-control" id="signumber" v-model="credentials.signumber" type="text" placeholder="주민번호 7자리">
        </div>
        <div>
          <input class="form-control" id="tel" v-model="credentials.tel" type="tel" placeholder="휴대폰 번호">
        </div>
        <div>
          <input class="form-control" id="pwNonmember" v-model="credentials.pwNonmember" type="password" placeholder="비밀번호(4자리)">
        </div>
      </div>
    <button @click="reserveCheck" class="btn submitBtn">예매확인</button>
    </div>
 </div>
 </div>
</template>

<script>
import axios from 'axios'
import Base_Header from '@/Header_ty2.vue'
export default {
  name: 'Nonmembercheck',
  data() {
    return {
      credentials: {
        signumber: null,
        password: null,
        tel:null,
      }
    }
  },
  methods: {
    

    reserveCheck(){
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/accounts/NonmemberCheck/',
        data: this.credentials,
      })
      .then(
        this.$router.push({ name:'예매확인창' })
      )
      .catch(
        err => console.log(err)
      )

    }
  },
  components:{
     Base_Header 
  }
}
</script>

<style>
  @import '../../assets/styles/common.css';
</style>
