<template>
  <div id="home">
      <Main_Header/>
      <Movi_chart/>
      <Event_banner/>
  </div>
</template>

<script>
//import { mapActions } from 'vuex'
//import Header from '@/Header'
//import Navbar from '@/Navbar'
//import Footer from '@/Footer.vue'
import Movi_chart from '@/components/movi_chart'
import Event_banner from '@/components/event_banner'
import Main_Header from '@/Header'

export default {
  name: 'Home',

  data() {
    return {
      isTy2:true
    }
  },

  components: {
    Main_Header,
    //Navbar,
    Movi_chart,
    //Footer,
    Event_banner,
    
   
  },
  computed: {
  
  },
  methods: {

  },
  created() {

},
}


</script>

<style>
@import '../assets/styles/header.css';
  /*@import './assets/styles/common.css';
  @import './assets/styles/font.css';
  @import './assets/styles/navbar.css';
  @import './assets/styles/button.css';*/
  /*@import './assets/styles/tinder.css';
  @import './assets/styles/youtube.css';
  @import './assets/styles/moviecard.css';*/
  /*@import './assets/styles/header.css';*/
</style>
