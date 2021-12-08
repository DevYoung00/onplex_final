<template>
<div>
<staff_header/>
  <div class = "accounts_form">
    <div class="authForm join">
      <h2>MY PAGE</h2>

      <v-form class="signupInput">
        <v-container>
        <v-row justify="center">
            <v-text-field class="form-control-join" v-model="email" label="이메일" disabled></v-text-field><br><br><br>
            
            <v-text-field class="form-control-join" id="password" v-model="password" :type="show ? 'text' : 'password'" 
              label="비밀번호" minlength="8" maxlength="16" :error-messages="passErrors" 
              @input="$v.password.$touch()" @blur="$v.password.$touch()" 
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show" required></v-text-field><br><br><br>
            
            <v-text-field class="form-control-join" id="passwordConfirmation" v-model="passwordConfirmation" 
              type="password" label="비밀번호 확인" min-length="8" maxlength="16" 
              :error-messages="pcheckErrors" @input="$v.passwordConfirmation.$touch()" @blur="$v.passwordConfirmation.$touch()" required></v-text-field><br><br><br>
            
            <v-text-field class="form-control-join" v-model="staff_name" label="이름" disabled></v-text-field><br><br><br>
            
            <v-text-field class="form-control-join" id="tel" v-model="phone_num" type="tel" label="휴대폰 번호" 
              maxlength="13" :error-messages="pnumErrors" @input="$v.tel.$touch()" @blur="$v.tel.$touch()" clearable required></v-text-field><br><br><br>
             
             <v-text-field class="form-control-join" id="account" v-model="account_num" type="text" label="계좌 번호" 
              maxlength="13" :error-messages="accountErrors" @input="$v.account_num.$touch()" @blur="$v.account_num.$touch()" clearable required></v-text-field><br><br><br>
            
            <v-text-field class="form-control-join" id="signumber" v-model="signumber" type="text" label="주민등록번호 앞 7자리" disabled></v-text-field><br>
            <span> {{getBirth(staff_info.resident_num7)}} </span>
            <v-select v-model="staff_info.branch_name" :label="'지점 | '+staff_info.branch_name" item-text="branch_name" item-value="branch_value" disabled></v-select><br>
            <span> 지점 주소 | {{getCity(staff_info.branch_city)}} {{staff_info.branch_adr}}</span><br>
            <span> 지점 번호 | {{staff_info.branch_num}} </span>
            <v-select v-model="staff_info.depart_name" :label="'부서 | ' + staff_info.depart_name" item-text="depart" item-value="depart_value" disabled></v-select>
            <span> 부서 정보 | {{staff_info.work_info}} </span>
            <v-select v-model="local" label="지역 (시/도)" :items="localList" item-text="local_name" item-value="local_value"></v-select>
            <v-text-field class="form-control-join" id="adress" v-model="adress" type="text" label="상세 주소 (선택사항)" :counter="45" clearable></v-text-field><br><br><br><br><br>
          </v-row>
        </v-container>
      </v-form>
      <v-row align="center" justify="space-around">
          <v-btn @click="cancel()" color="gray" depressed style="" light>취소</v-btn>
          <v-btn @click="modify()" color="error" depressed style="" light>수정</v-btn>
      </v-row>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import staff_header from '@/staff_header.vue'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, sameAs, alphaNum, numeric } from 'vuelidate/lib/validators' 

export default {
    name: 'staffMypage',
    mixins: [validationMixin],
    validations: {
        password: { required, minLength: minLength(8), maxLength: maxLength(16), alphaNum },
        passwordConfirmation: { required, sameAsPassword: sameAs('password')},
        phone_num: { required, maxLength: maxLength(13), numeric },
        account_num:{ required, numeric },
    },
    created() {
        axios.get('http://localhost:8004/staff/mypage',{withCredentials:true})
            .then((res) => {
                    this.staff_info = res.data.staff
                    this.email = res.data.staff.email
                    this.staff_name = res.data.staff.staff_name
                    this.signumber = res.data.staff.resident_num7
                    this.phone_num= res.data.staff.phone_num
                    this.account_num = res.data.staff.account_num
                    this.local = res.data.staff.local
                    this.adress = res.data.staff.adress
                    console.log(res.data)
                    
                }).catch(console.log('error'))
        console.log(res.data.staff.password)
    },
    data() {
        return {
            staff_info:[],
            email: '',
            // password: staff_info.password,
            password:'',
            passwordConfirmation: '',
            phone_num: '',
            account_num: '',
            staff_name: '',
            // tel: staff_info.phone_num,
            // account: staff_info.account_num,
            signumber: '',
            // branch: staff_info.branch_name,
            // depart: staff_info.depart_name,
            local: '',
            adress: '',
            show:false,
            
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
            localList: [
                {local_name:'서울', local_value:'su'}, {local_name:'경기', local_value:'gg'}, {local_name:'인천', local_value:'ic'}, {local_name:'강원', local_value:'gw'},
                {local_name:'대전', local_value:'dj'}, {local_name:'충청', local_value:'cc'}, {local_name:'대구', local_value:'dg'}, {local_name:'부산', local_value:'bs'},
                {local_name:'울산', local_value:'us'}, {local_name:'경상', local_value:'gs'}, {local_name:'광주', local_value:'gj'}, {local_name:'전라', local_value:'jl'},
                {local_name:'제주', local_value:'jj'}
            ],

        }
    },
    computed: {
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
        pnumErrors () {
            const errors = []
            if(!this.$v.phone_num.$dirty) return errors
            !this.$v.phone_num.required && errors.push('휴대폰 번호는 필수 입력 사항입니다.')
            !this.$v.phone_num.numeric && errors.push('숫자만 입력해주세요.')
            return errors
        },
        accountErrors () {
            const errors = []
            if(!this.$v.account_num.$dirty) return errors
            !this.$v.account_num.required && errors.push('계좌번호는 필수 입력 사항입니다.')
            !this.$v.account_num.numeric && errors.push('숫자만 입력해주세요.')
            return errors
        },
    },
    methods: {
        defaultAdr(adr) {
            if(adr === null){
                return ''
            } else {
                return adr
            }
        },
        getCity(city) {
            const local_list = this.localList
            let idx = 0
            for (let i=0; i<local_list.length; i++){
                if(city == local_list[i].local_value) {
                    idx = i
                }
            }
            return local_list[idx].local_name
        },
        getBirth(num) {
            let year = num.substring(0,2)
            let month = num.substring(2,4)
            let day = num.substring(4,6)
            let gender_num = num.substring(6)
            let gender

            if (gender_num === "2" || gender_num === "4"){
                gender = "여"
            } else {
                gender = "남"
            }

            let str = year + "년 " + month + "월 " + day + "일 " + "성별 : " + gender
            return str
        },
        cancel() {
            history.back();
        },
        modify () {
            this.$v.$touch() 
            if(this.$v.$invalid) {
                // this.submitSttus = 'ERROR'
                window.scrollTo(0,0)
                alert("필수 입력사항을 확인해주세요.")
            } else {
            axios.post('http://localhost:8004/staff/change', {
                depart_id: this.staff_info.depart_id,
                branch_id: this.staff_info.branch_id,
                email:this.staff_info.email,
                password:this.password, 
                staff_name:this.staff_info.staff_name, 
                resident_num7: this.staff_info.resident_num7,
                phone_num:this.phone_num, 
                account_num: this.account_num,
                local: this.local,
                adress: this.adress,
                position_id: this.staff_info.position_id,
                branch_name: this.staff_info.branch_name,
                branch_adr: this.staff_info.branch_adr,
                branch_num: this.staff_info.branch_num,
                branch_city: this.staff_info.branch_city,
                depart_name: this.staff_info.depart_name,
                work_info: this.staff_info.work_info
                // 수정가능한 사항 : password, phone_num, account_num, local, adress
            },{withCredentials:true})
                    .then(res => {
                                console.log(res.data)
                                alert('수정이 완료되었습니다.')
                            }).catch(console.log('error'))
            }
        }
    },
    components: {
        staff_header
    }
}
</script>

<style>

</style>