<!-- v 0.8 수정내용 : 흰 배경 용 헤더(Base_Header) 추가. home.vue를 제외한 모든 파일에 추가해야함
  지역 선택 박스 v-select로 수정 더 예뻐짐  -->
<!-- v0.9 수정내용 : 체크박스 v-checkbox로 수정 credentials에 요소 추가 -->
<!-- version 19 수정내용 : 룰 적용 / axios 수정 해야할듯 -->

<template>
<div>
  <staff_header/>
  <div class = "accounts_form">
    <div class="authForm join">
      <h2>직원 등록</h2>

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
            
            <v-text-field class="form-control-join" id="staffname" v-model="staffname" type="staffname" 
              label="* 이름" maxlength="10" :error-messages="nameErrors" @input="$v.staffname.$touch()" @blur="$v.staffname.$touch()" clearable required></v-text-field><br><br><br>
            
            <v-text-field class="form-control-join" id="tel" v-model="tel" type="tel" label="* 휴대폰 번호" 
              maxlength="13" :error-messages="pnumErrors" @input="$v.tel.$touch()" @blur="$v.tel.$touch()" clearable required></v-text-field><br><br><br>
             
             <v-text-field class="form-control-join" id="account" v-model="account" type="text" label="* 계좌 번호" 
              maxlength="13" :error-messages="pnumErrors" @input="$v.account.$touch()" @blur="$v.account.$touch()" clearable required></v-text-field><br><br><br>
            
            <v-text-field class="form-control-join" id="signumber" v-model="signumber" type="text" 
              label="* 주민등록번호 앞 7자리" minlength="7" maxlength="7" :error-messages="signumErrors" @input="$v.signumber.$touch()" @blur="$v.signumber.$touch()" clearable required></v-text-field><br><br><br><br><br>
           
            <v-select v-model="branch" label="지점" :items="branch_list" item-text="branch" item-value="branch_value"></v-select>
            <v-select v-model="depart" label="부서" :items="depart_list" item-text="depart" item-value="depart_value"></v-select>
            <v-select v-model="position" label="직급" :items="posi_list" item-text="position" item-value="position_value"></v-select>
           
            <v-text-field class="form-control-join" id="adress" v-model="adress" type="text" label="상세 주소 (선택사항)" :counter="45" clearable></v-text-field>

          </v-row>
        </v-container>
      </v-form>
        <v-btn @click="signup" color="primary">회원가입</v-btn>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import staff_header from '@/staff_header.vue'
import { required, maxLength, minLength, email, sameAs, alphaNum, numeric } from 'vuelidate/lib/validators' 
export default {
  name: 'Join',
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8), maxLength: maxLength(16), alphaNum },
    passwordConfirmation: { required, sameAsPassword: sameAs('password')},
    staffname: { required, maxLength: maxLength(10)},
    tel: { required, maxLength: maxLength(13), numeric },
    signumber:{ required, minLength: minLength(7), maxLength: maxLength(7), numeric },
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      staffname: '',
      tel: '',
      signumber: '',
      branch:null,
      depart:null,
      adress:null,
      show: false,
      branch_list:[
          {branch:'강남',branch_value:'J00001' },{branch:'반월',branch_value:'J00002'},{branch:'기흥',branch_value:'J00003'},
          {branch:'원주중앙',branch_value:'J00004'},{branch:'유성',branch_value:'J00005'},{branch:'성안',branch_value:'J00006'},
          {branch:'황금',branch_value:'J00007'},{branch:'괴정',branch_value:'J00008'},{branch:'학성',branch_value:'J00009'},
          {branch:'이동',branch_value:'J00010'},{branch:'광주중앙',branch_value:'J00011'},{branch:'한옥마을',branch_value:'J00012'},
          {branch:'애월',branch_value:'J00013'},
      ],

      depart_list: [
        {depart:'기획경영', depart_value:'D00002'},{depart:'재무회계', depart_value:'D00003'},{depart:'매장관리', depart_value:'D00004'},
        {depart:'엔지니어', depart_value:'D00005'},{depart:'네트워크', depart_value:'D00006'},{depart:'인사', depart_value:'D00007'}
      ],
      posi_list: [
        {position:'사원', position_value:'G00001'},{position:'대리', position_value:'G00002'},{position:'과장', position_value:'G00003'},
        {position:'차장', position_value:'G00004'},{position:'부장', position_value:'G00005'},{position:'상무', position_value:'G00006'},
      ]

    }
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
      if(!this.$v.staffname.$dirty) return errors
      !this.$v.staffname.required && errors.push('이름은 필수 입력 사항입니다.')
      !this.$v.staffname.maxLength && errors.push('이름은 10자 이상 입력하실 수 없습니다.')
      !(/[가-힣|a-zA-z]/.test(this.staffname)) && errors.push('한글 또는 영문으로 올바르게 입력해주세요.')
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
      // 룰을 충족 못한채로 회원가입 버튼 누르면 submit안되고 룰을 강조하는? 뭐라하지 여튼 그런건데
      // axios 주석처리하면 잘 작동하는데 주석처리 안하면 작동이 안됨
      axios({
        method: 'POST',
        url: 'http://localhost:8004/staff/register',
        data: {
          email:this.email,
          password:this.password, 
          staffname:this.staffname, 
          account : this.account,
          tel:this.tel, 
          signumber:this.signumber, 
          snsagree:this.snsagree, 
          branch:this.branch,
          depart:this.depart,
          },
      })
      .then(
        this.$router.push({ name:'staffLogin' })
      )
      .catch(
        err => console.log(err)
      )
    }
  },
  components:{
    staff_header
  }
}
</script>

<style>
  @import '../../assets/styles/common.css';
</style>