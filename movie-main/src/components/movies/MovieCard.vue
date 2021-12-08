<template>
  <div class="moviecard"> <!--세로로 6-->

  <div v-for="movie in movies" :key="movie.mov_id" class="item">
 
    <v-dialog 
    transition="dialog-bottom-transition"
          width="500px"
          heigth ="500px"

    >
      <template v-slot:activator="{ on, attrs }">
          <div class="moviebtn">
            <v-img class="movie_poster" transition
            :src="movie.pos_link" alt="포스터 없음"
            v-bind="attrs"
            v-on="on">
            </v-img>
 
      </div>
    
    </template>
    <!--포스터 클릭시-->
    <template v-slot:default="dialog">
    <v-card class="movie-detail-card">

 
        <div class="movie-detail-info">
          <!-- info header -->
          <div class="movie-detail-upper">
            <div class="movie-detail-info-header">
              <div class="movie-detail-info-header-left">
                <div class="movie-detail-title">
                  <br>
                  제목 : {{ movie.mov_name}}
                </div>
                <div
                class="movie-release-date">
                <hr>
                  개봉  :  {{ movie.release_time }}
                  
                </div>
                <div
                class="movie-grade">
                <hr>
                  상영 시간 : {{ movie.running_time}}분
                </div>
                <div
                 class="movie-genre">
                  <hr>
                  &nbsp;&nbsp;영화 장르 : {{movie.mov_genre}}
                </div>
                <div 
                class="movie-country">
                  <hr>
                  &nbsp;&nbsp;영화 국가 : {{movie.mov_country}}
                </div>
                <!-- <review/> -->
             
                 <!-- <div 
                class="movie-star">
                  <hr>
                  &nbsp;&nbsp;영화 별점 : {{movie.mov_star}}
                </div>
              <div 
                 class="movie-review">
                  <hr>
                  &nbsp;&nbsp;영화 리뷰 : {{movie.mov_review}} 
                </div>  -->
            <hr>
            
            <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value= false"
                >Close</v-btn>
              </v-card-actions>
          </div>
          
        </div>
      </div>
      </div>
    </v-card>
    </template>
    </v-dialog>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
// import review from '@/components/reviewText.vue'
import theater from '../../views/theater_info/theater.vue';


export default {
  components: { theater 
  // ,review
  },
  name:'TicketMovie',

    created() {
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
         axios.get('http://localhost:8004/movie/list')
        
            .then((res) => {
                this.movies = res.data.movieList
                console.log(res.data.movieList)
                
            }).catch(console.log(err))

    },
    data(){
        return {
            movies: [],
            reviews:[],
    
        }
    }
}
</script>

<style>
.moviecard{
  text-align:center;
  position: absolute;
  width:1200px;
  left:50%; transform: translateX(-50%);
}
.moviebtn{
    margin:0 10px;
    margin-bottom: 50px;
    width: 200px;
}
.moviecard .movie_poster {
  width: 100%; height: 100%;
  border-radius: 8px;
  box-shadow: 0 17px 20px -18px rgba(0, 0, 0, 1); 
}
.moviecard .movie_poster:hover {
  transform: scale(1.1);
}
.movie-detail-title{
    margin:10px;
}
.movie-release-date{
    margin:10px;
}
.movie-grade{
    margin:10px;
}
.movie-mov_star{
    margin:10px;
}

/* img{
  size:50px 50px;
} */
.movie-detail-poster > img{
  width:500px;
}
.movie-detail-poster > img {
    width: 299px;
    height: 400px;
}


</style>