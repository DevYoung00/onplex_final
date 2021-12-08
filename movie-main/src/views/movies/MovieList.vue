<template>
  <div class="MovieList">

    <Base_Header/>
      <h2>전체 영화</h2>

    <MovieCard/>
    

  </div>
  
</template>

<script>

import { mapGetters } from 'vuex'
import Base_Header from '@/Header_ty2.vue'
import MovieCard from '@/components/movies/MovieCard.vue'


export default {
  name:'MovieList',
  components:{
    MovieCard,
    Base_Header
 
  },

}
</script>

<style>
 .MovieList h2{
      text-align: center;
   color:black; padding-top: 10px;
 }

</style>