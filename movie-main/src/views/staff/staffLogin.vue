<template>
<div>
    <div @keyup.enter="staff_login" class="all_staff_login">
        <div class="staff_login_block">
        <a class="logo" href="">
            <img src="@/assets/images/stafflogo.png">
        </a>
        <div class="loginbox">
            <div class="staff_login">
                <v-text-field prepend-icon="mdi-account" v-model="staff.email" type="email" label="이메일"
                        :error-messages="emailErrors" @input="$v.staff.email.$touch()" @blur="$v.staff.email.$touch()"></v-text-field>
                <v-text-field prepend-icon="mdi-lock" v-model="staff.password" :type="show ? 'text' : 'password'" label="비밀번호"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show = !show"></v-text-field><br>
                <v-btn :loading="loading" rounded color="blue-grey darken-3" dark @click="staff_login">로그인</v-btn>
            </div>
            <div class="login_intro">
                <span class="intro_msg" style="font-size:20px;"> ONPLEX 직원 전용 페이지 입니다. </span><br><br><br><br><br>
                <span class="intro_sign"> 신규직원이세요? </span>&nbsp;
                <router-link :to="{name:'join'}"> 직원등록 하러가기 </router-link><br>
                <router-link :to="{name:'Home'}" style="color:gray">>> ONPLEX로 돌아가기</router-link>
            </div>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { email } from 'vuelidate/lib/validators' 
import axios from 'axios'
import router from '@/router' 


export default {
    name: 'staffLogin',
    mixins: [validationMixin],
    validations: {
        staff:{
            email: { email }
        },
    },
    data() {
        return {
            staff:{
            email:'',
            password:'',
     
            },
         show:false,
       
        }
    },
    computed: {
        emailErrors () {
            const errors = []
            if (!this.$v.staff.email.$dirty) return errors
            !this.$v.staff.email.email && errors.push('이메일 형식이 유효하지 않습니다.')
            return errors
        },
    },
    methods: {
        staff_login() {
      axios.post('http://localhost:8004/staff/login',
      {...this.staff},{withCredentials:true})
    .then(res=>{router.push({name: 'Dailycheck'})
    console.log(res.data)}
    )
    .catch(console.error)
    // },
    //         this.$v.$touch()
    //         if (this.email == '') {alert('아이디를 입력해주세요.');return;}
    //         if (this.password == '') {alert('비밀번호를 입력해주세요.');return;}

    //         this.$store.dispatch('login',{email: this.email, password: this.password})
    //         /* this.$http.post('/api/login', {user:this.user}).then((response) => {
            //     if (response.data.success == true) {
            //         alert(response.data.message);
            //         this.$router.push('/Home'); //로그인 성공시 list 페이지로 이동
            //     } else {
            //         alert(response.data.message);
            //     }
            // });
        }
    },
    components:{

    }
}

</script>
<style>
    .all_staff_login {
        background: linear-gradient(rgb(0, 0, 0) 35%, rgb(114, 125, 145));
        width:100%; height: 100%; overflow:hidden;
        position:fixed; top:0; text-align: center;
        align-items: center;
    }
    @keyframes blink-effect {
        0% {opacity: 1;}
        50% {opacity: 0.2;}
        100% {opacity: 1;}
    }
    .all_staff_login .logo img{
        width:600px; animation: blink-effect 0.9s both;
        /* animation-delay: 20s; animation-iteration-count: infinite; */
    }
    .staff_login_block{
        position: absolute; left:50%; top:50%; transform: translate(-50%,-50%);
    }
    .loginbox {
        width:800px; margin-top: 100px; padding:50px 0;
         background-color: rgba(255, 255, 255, 0.733); border-radius: 30px;
    }
    .loginbox .staff_login,
    .loginbox .login_intro { display: inline-block;}

    .staff_login {
        width:300px; 
        padding: 20px; margin-right:50px;
    }
</style>