<template>
<div class="ticketmovie">
   <div class="theater_li" v-for="movie in movies" :key="movie.mov_id">
            <v-btn-toggle v-model="activeButton_1" @change="select_1" tile color="indigo">
           <v-btn  :value="movie.mov_name"
           width= "240px"
           height="30px"
           text
            >
            {{movie.mov_name}}
            </v-btn>
              </v-btn-toggle>
            </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name:'TicketMovie',

    created() {
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
         axios.get('http://localhost:8004/movie/list')
        
            .then((res) => {
                this.movies = res.data.movieList
                console.log(res.data)
                
            }).catch(console.log(err))
        // this.$http.get('/api/movie')
        //     .then((response) => {
        //         this.movies = response.data
        //     }).catch(err => {
        //         alert(err);
        //         console.log(err);
        //     })
        localStorage.removeItem('moviename')
        
    },
    data(){
        return {
            movies: [],
            activeButton_1:this.value,
        }
    },
    methods:{
       select_1(){
           
           console.log(this.activeButton_1)
            localStorage.setItem('moviename', JSON.stringify(this.activeButton_1));
            this.$emit('moviename', this.activeButton_1)
       },
      },
    }
  
  

</script>

<style>
.theater_li {display : inline-block; width:184px; position:relative;  margin-right:50px;}
</style>