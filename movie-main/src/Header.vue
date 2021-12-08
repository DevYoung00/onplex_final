<template>
    <!-- 헤더 영역 -->
    <header class="header">
        <div class="staff_only_block">
            <router-link class="staff_only" :to="{name: 'staffLogin'}" @click.native="goStaff">STAFFONLY>>></router-link>
        </div>

        <!-- 로고 -->
        <router-link class="logo" :to="{name:'Home'}"> <!-- 홈.vue 만들기 -->
            <img src="./assets/images/logo_black.png">
        </router-link>
        <!-- 로그인 회원가입 메뉴 -->
        <div class="gnb">
            <ul v-if="isCookie" class="g_menu"> <!-- 로그인 했을 경우. isLogin에 대한 코드 작성해야함 -->
               <li><a href='' v-on:click="logout" class="logout">LOGOUT</a></li>
                <!-- logout 메소드 만들기 -->
                <li><router-link :to="{name: 'MyPage'}" class="Mypage">MYPAGE</router-link></li>
                <!-- 마이페이지 만들기 -->
            </ul>
            <ul v-else class="g_menu"> <!-- 로그인 안했을 경우 -->
                <li><router-link :to="{name: 'Login'}" class="login">LOGIN</router-link></li>
                <li><router-link :to="{name: 'Signup'}" class="join">JOIN</router-link></li>
            </ul>
        </div>
        <!-- 메인 메뉴 -->
        <div id="nav">
            <ul>
                <li class="">
                    <router-link :to="{name: 'MovieList'}">영화</router-link>
                    <!-- 기본은 전체영화 페이지로 (Movie.vue) -->
                    <div>
                        <ul sytle="opacity: 0;">
                            <li><router-link :to="{name: 'MovieList'}" title="전체영화">전체영화</router-link></li>
                            <li><router-link :to="{name: 'MovieReview'}" title="영화리뷰">영화리뷰</router-link></li>
                        </ul> 
                    </div>
                </li>
                <li class="">
                    <router-link v-if="isCookie" :to="{name: 'Ticketing'}">예매</router-link>
                    <router-link v-else @click.native="goticket()" :to="{name: 'Login'}">예매</router-link>
                </li>
                <li class="">
                    <router-link :to="{name: 'Theater'}">극장</router-link>
                    <!-- 기본은 전체극장 페이지 -->
                    <div>
                        <ul id="opacity: 0;">
                            <li><router-link :to="{name: 'Theater'}" title="전체극장">전체극장</router-link></li>
                            <li><router-link :to="{name: 'SpecialHall'}" title="스페셜관">스페셜관</router-link></li>
                        </ul>
                    </div>
                </li>
                <li class="">
                    <router-link :to="{name: 'EventPage'}">이벤트</router-link>
                </li>
            </ul>
        </div>
    </header>
    <!-- //header -->

</template>

<script>
import {mapActions, mapState} from 'vuex'
// Add "scoped" attribute to limit CSS to this component only 
export default {
    name: "Main_Header",
     data(){
        return{
            isCookie : null,
        }
    },
        created(){
            this.isCookie = document.cookie;
            
        },

    methods: {
        goStaff(){
            this.$cookies.remove("Authorization");
        },

        logout(){
            this.$cookies.remove("Authorization");
        alert("로그아웃 되었습니다.");
        },
        goticket() {
                alert("로그인 후 이용 가능합니다.")
                router.push({name: 'Login'})
        }
        // loginCheck(){
        //   const cookies = getCookies("Authorization")
          
        //     if(cookies != null){
        //         this.isLogin = true
        //     }
        //     else{
        //         this.isLogin=false
        //     }
        // },
    

    
//         logout() {
//             this.$store.dispatch('logout')
//             // 로그아웃 메소드 (isLogin을 false로 바꿔주고 메인홈으로 이동시켜야함)
//             // 깃허브 코드 | this.$store.dispatch('logout')
//         },
//         getToken(){
//             const token = localStorage.getItem('jwt')
//             return token

//         },
//         setToken() {
//             const token = localStorage.getItem('jwt')
//             const config = {
//                 Authorization: `JWT ${token}`
//         }
//          return config
//     },
//       computed: {
//     ...mapActions([
//       'checkLogin'
//     ]),
//     ...mapState([
//       'isLogin'
//     ])
//     },
//     created() {
//     this.$store.dispatch('checkLogin', this.getToken())
//   }
//     }
}}
</script>

<style>
    @import './assets/styles/common.css';
</style>

