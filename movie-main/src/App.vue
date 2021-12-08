<template>
  <div id="app">
    <!-- <Main_Header/> -->
    
    <!-- <Base_Header/> -->
    <v-app>
      <transition name="fade">
        <router-view/>
      </transition>
    </v-app>
    <Main_Footer/>
  </div>
 
</template>

<script>
import { mapActions } from 'vuex'
// import Main_Header from '@/Header'
import Main_Footer from '@/Footer'
import Base_Header from '@/Header_ty2.vue'

//import Navbar from '@/Navbar'
//import Main_Footer from '@/Footer.vue'
//import Movi_chart from '@/components/movi_chart'
//import Event_banner from '@/components/event_banner'

export default {
  name: 'App',
  data() {
    return {
      windowHeight: window.innerHeight,
      isLogin : false,
    }
  },
  components: {
   //Main_Header,
   Base_Header,
   Main_Footer
   // Navbar,
    //Movi_chart,
   // Main_Footer,
    //Event_banner
   
  },
  // computed: {
  //   ...mapActions([
  //     'checkMovies',
  //     'checkLogin'
  //   ]),
  // },
  methods: {
    
   
  }
  // created() {
  //   this.$store.dispatch('checkLogin', this.getToken())
  // },
}


</script>

<style>
  @import './assets/styles/common.css';
  @import './assets/styles/header.css';
  /* @import './assets/styles/button.css'; */
  /* @import './assets/styles/font.css'; */
  /*@import './assets/styles/tinder.css';
  @import './assets/styles/youtube.css';
  @import './assets/styles/moviecard.css';*/
  /*@import './assets/styles/header.css';*/
</style>
