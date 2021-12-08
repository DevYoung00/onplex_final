<template>
    <!-- 헤더 영역 -->
    <header class="header ty2">
        <!-- ty2는 검은배경 헤더랑 하얀배경 헤더 구분하려고 쓴건데 다 검은배경으로 해도 낫배드 일듯 -->
        <!-- 로고 -->
        <router-link class="logo" :to="{name:'Dailycheck'} "> <!-- 홈.vue 만들기 -->
            <img src="./assets/images/stafflogo.png" style="width: 250px">
        </router-link>
        <!-- 로그인 회원가입 메뉴 -->
        <div class="gnb">
             <ul v-if="isCookie" class="g_menu"> <!-- 로그인 했을 경우. isLogin에 대한 코드 작성해야함 -->
              <li><a href='' v-on:click="logout" class="logout">LOGOUT</a></li>

                <li><router-link :to="{name: 'staffMypage'}" class="Mypage">MYPAGE</router-link></li>
            </ul>
             <ul v-else class="g_menu"> <!-- 로그인 안했을 경우 -->
                <li><router-link :to="{name: 'staffLogin'}" class="login">LOGIN</router-link></li>
                <li><router-link :to="{name: 'join'}" class="join">SIGNUP</router-link></li>
            </ul>
        </div>
        <!-- 메인 메뉴 -->
        <div id="nav">
            <ul>
                <li class="">
                    <router-link :to="{name: 'Dailycheck'}">출근부</router-link>
                    <!-- 기본은 전체영화 페이지로 (Movie.vue) -->
                </li>
                <li class="">
                    <router-link :to="{name: 'inventory'}">지점</router-link>
                    <!-- 기본은 전체극장 페이지 -->
                    <div>
                        <ul id="opacity: 0;">
                            <li><router-link :to="{name: 'inventory'}" title="재고관리">재고관리</router-link></li>
                            <li><router-link :to="{name: 'facility'}" title="시설물관리">시설물관리</router-link></li>
                        </ul>
                    </div>
                </li>
                <li class="">
                    <router-link :to="{name: 'store'}">매장관리</router-link>
                </li>
                <li class="">
                    <router-link :to="{name: 'staffRecommend'}">직원평가</router-link>
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
    name: "staff_header",
      data(){
             return{
            isCookie : null,
        }
    },
        created(){
            this.isCookie = document.cookie;
            
        },

    methods: {
        logout(){
            this.$cookies.remove("Authorization");
            // document.cookie = "Authorization" + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
            // logout("Authorization")

            alert("로그아웃 되었습니다.");
            router.push({name: 'staffLogin'})
        },
  
    }
}
</script>

<style>
    @import './assets/styles/common.css';
</style>