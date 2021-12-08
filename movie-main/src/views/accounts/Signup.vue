<!-- v 0.8 수정내용 : 흰 배경 용 헤더(Base_Header) 추가. home.vue를 제외한 모든 파일에 추가해야함
  지역 선택 박스 v-select로 수정 더 예뻐짐  -->
<!-- v0.9 수정내용 : 체크박스 v-checkbox로 수정 credentials에 요소 추가 -->
<!-- version 19 수정내용 : 룰 적용 / axios 수정 해야할듯 -->

<template>
<div>
  <Base_Header/>
  <div class = "accounts_form">
    
    <div class="authForm join">
   
      <h2>회원가입</h2>

      <v-form class="signupInput">
        <v-container>
        <v-row justify="center">
            <v-text-field class="form-control-join" id="email" v-model="email" type="email" 
              label="* 이메일" maxlength="20" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" clearable required></v-text-field><br><br><br>
            <v-text-field class="form-control-join" id="password" v-model="password" :type="show ? 'text' : 'password'" 
              label="* 비밀번호" minlength="8" maxlength="16" :error-messages="passErrors" 
              @input="$v.password.$touch()" @blur="$v.password.$touch()" 
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" required></v-text-field><br><br><br>
            <v-text-field class="form-control-join" id="passwordConfirmation" v-model="passwordConfirmation" 
              type="password" label="* 비밀번호 확인" min-length="8" maxlength="16" 
              :error-messages="pcheckErrors" @input="$v.passwordConfirmation.$touch()" @blur="$v.passwordConfirmation.$touch()" required></v-text-field><br><br><br>
            <v-text-field class="form-control-join" id="username" v-model="username" type="username" 
              label="* 이름" maxlength="10" :error-messages="nameErrors" @input="$v.username.$touch()" @blur="$v.username.$touch()" clearable required></v-text-field><br><br><br>
            <v-text-field class="form-control-join" id="tel" v-model="tel" type="tel" label="* 휴대폰 번호" 
              maxlength="13" :error-messages="pnumErrors" @input="$v.tel.$touch()" @blur="$v.tel.$touch()" clearable required></v-text-field><br><br><br>
            <v-checkbox v-model="snsagree" label="SMS 수신 동의"></v-checkbox>
            <v-text-field class="form-control-join" id="signumber" v-model="signumber" type="text" 
              label="* 주민등록번호 앞 7자리" minlength="7" maxlength="7" :error-messages="signumErrors" @input="$v.signumber.$touch()" @blur="$v.signumber.$touch()" clearable required></v-text-field><br><br><br><br><br>
            <v-select v-model="local" label="지역 (시/도)" :items="localList" item-text="local_name" item-value="local_value"></v-select>
            <v-text-field class="form-control-join" id="adress" v-model="adress" type="text" label="상세 주소 (선택사항)" :counter="45" clearable></v-text-field>
          </v-row>
        </v-container>
      </v-form>
        <v-btn @click="signup" class="submitBtn" outlined color="error" width="800px">회원가입</v-btn>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Base_Header from '@/Header_ty2.vue'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email, sameAs, alphaNum, numeric } from 'vuelidate/lib/validators' 
export default {
  name: 'Signup',
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(16), alphaNum },
    passwordConfirmation: { required, sameAsPassword: sameAs('password')},
    username: { required, maxLength: maxLength(10)},
    tel: { required, maxLength: maxLength(13), numeric },
    signumber:{ required, minLength: minLength(7), maxLength: maxLength(7), numeric },
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
      tel: '',
      signumber: '',
      snsagree: false,
      local: null,
      adress: '',
      show: false,
      localList: [
        {local_name:'서울', local_value:'su'}, {local_name:'경기', local_value:'gg'}, {local_name:'인천', local_value:'ic'}, {local_name:'강원', local_value:'gw'},
        {local_name:'대전', local_value:'dj'}, {local_name:'충청', local_value:'cc'}, {local_name:'대구', local_value:'dg'}, {local_name:'부산', local_value:'bs'},
        {local_name:'울산', local_value:'us'}, {local_name:'경상', local_value:'gs'}, {local_name:'광주', local_value:'gj'}, {local_name:'전라', local_value:'jl'},
        {local_name:'제주', local_value:'jj'}
      ],
    }
  },
  components:{
     Base_Header 
  },
  // 룰적용 
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('이메일 형식이 유효하지 않습니다.')
      !this.$v.email.required && errors.push('이메일은 필수 입력 사항입니다.')
      return errors
    },
    passErrors () {
      const errors = []
      if(!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('비밀번호는 필수 입력 사항입니다.')
      !this.$v.password.minLength && errors.push('8~16자, 영문과 숫자의 조합으로 입력해주세요.')
      !this.$v.password.maxLength && errors.push('8~16자, 영문과 숫자의 조합으로 입력해주세요.')
      !this.$v.password.alphaNum && errors.push('8~16자, 영문과 숫자의 조합으로 입력해주세요.')
      !(/^.*(?=.*[0-9])(?=.*[a-zA-Z]).*$/.test(this.password)) && errors.push ('영문과 숫자의 조합으로 입력해주세요.')
      return errors
    },
    pcheckErrors () {
      const errors = []
      if(!this.$v.passwordConfirmation.$dirty) return errors
      !this.$v.passwordConfirmation.required && errors.push('비밀번호를 확인해주세요.')
      !this.$v.passwordConfirmation.sameAsPassword && errors.push('비밀번호가 일치하지 않습니다.')
      return errors
    },
    nameErrors () {
      const errors = []
      if(!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('이름은 필수 입력 사항입니다.')
      !this.$v.username.maxLength && errors.push('이름은 10자 이상 입력하실 수 없습니다.')
      !(/[가-힣|a-zA-z]/.test(this.username)) && errors.push('한글 또는 영문으로 올바르게 입력해주세요.')
      return errors
    },
    pnumErrors () {
      const errors = []
      if(!this.$v.tel.$dirty) return errors
      !this.$v.tel.required && errors.push('휴대폰 번호는 필수 입력 사항입니다.')
      !this.$v.tel.numeric && errors.push('숫자만 입력해주세요.')
      return errors
    },
    signumErrors () {
      const errors = []
      if(!this.$v.signumber.$dirty) return errors
      !this.$v.signumber.required && errors.push('주민등록번호는 필수 입력 사항입니다.')
      !this.$v.signumber.numeric && errors.push('숫자만 입력해주세요.')
      !this.$v.signumber.maxLength && errors.push('주민등록번호 앞에서 7자리 숫자를 입력해주세요.')
      !this.$v.signumber.minLength && errors.push('주민등록번호 앞에서 7자리 숫자를 입력해주세요.')
      return errors
    }
  },
  methods: {
    signup() {
      this.$v.$touch() 
      if(this.$v.$invalid) {
                // this.submitSttus = 'ERROR'
                window.scrollTo(0,0)
                alert("필수 입력사항을 확인해주세요.")
            } else {
                axios({
                  method: 'POST',
                  url: 'http://localhost:8004/member/register',
                  data: {
                    email:this.email,
                    password:this.password, 
                    username:this.username, 
                    tel:this.tel, 
                    signumber:this.signumber, 
                    snsagree:this.snsagree, 
                    local:this.local, 
                    adresss:this.adress},
                })
                .then(
                  this.$router.push({ name:'Login' })
                )
                .catch(
                  err => console.log(err)
                )
            }
    }
  }
}
</script>

<style>
  @import '../../assets/styles/common.css';
</style>