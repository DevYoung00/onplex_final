<template>
<div>
      <Base_Header/>
  <div @keyup.enter="login">
    <div class="accounts_form">
    <div class="authForm">  
   
      <h2>로그인</h2>
      <div class="loginInput">
        <!-- <input class="form-control" id="email" v-model="user.email" type="email" placeholder="이메일">
        <input class="form-control" id="password" v-model="user.password" type="password" placeholder="비밀번호"> -->
        <v-text-field prepend-icon="mdi-account" v-model="user.email" type="email" label="이메일"
                        :error-messages="emailErrors" @input="$v.user.email.$touch()" @blur="$v.user.email.$touch()"></v-text-field>
        <v-text-field prepend-icon="mdi-lock" v-model="user.password" :type="show ? 'text' : 'password'" label="비밀번호"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show"></v-text-field><br>
      </div>
      <div class="loginAddOn">
        <span>ONPELX 회원이 아닌가요?</span> <a :href="signupLink">회원가입</a>
       </div>
      <v-btn @click="login" outlined color="error" width="400px" class="submitBtn">로그인</v-btn>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

import router from '@/router' 
import Base_Header from '@/Header_ty2.vue'
import { validationMixin } from 'vuelidate'
import { email } from 'vuelidate/lib/validators' 
export default {
  name: 'Login',
  mixins: [validationMixin],
  validations: {
    user:{
      email: { email },
    }
    },
  data() {
    return {
     user:{
        email:'',
       password:'',
     }
     ,
      show:false,
      
      // isActive: true,
      signupLink: '/accounts/signup/',
      nonmemLink :'/accounts/Nonmember/',
      nonmemLinkCheck : '/accounts/NonmemberCheck/',
    }
  },
   methods : {
     
    login(){
      
        //  this.$store.dispatch('login',{email:this.email, password:this.password})
      axios.post('http://localhost:8004/member/login',
      {...this.user},{withCredentials:true})
    .then(res=>{router.push({name: 'Home'})
    console.log(res.data)}
    )
    .catch(console.error())
    },
   
    },
    components:{
      Base_Header 
    },
    computed: {
        emailErrors () {
            const errors = []
            if (!this.$v.user.email.$dirty) return errors
            !this.$v.user.email.email && errors.push('이메일 형식이 유효하지 않습니다.')
            return errors
        },
    },
  
     
    //  login(){
    //    this.$store.dispatch('login')
    //  }
    // login : function () {
    //   if (!this.user.email) {alert('아이디를 입력해주세요.');return;}
    //     if (!this.user.password) {alert('비밀번호를 입력해주세요.');return;}
    //     console.log(this.user)
    //       this.$http.post('http://localhost:8004/member/login', {...this.user}).then((response) => {
    //         if (response.data.success == true) {
    //             alert(response.data.message);
    //                 this.$router.push('/Home'); //로그인 성공시 list 페이지로 이동
    //                 } else {
    //                     alert(response.data.message);
    //                 }
    //             });
    //         }
    //     },\
    

}

</script>

<style>
  @import '../../assets/styles/common.css';
</style>