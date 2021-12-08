<!-- v 0.8 수정내용 : 포스터 이미지 부분에 v-bind:src 사용하면 이미지 불러올 수 있다고 해서 수정함. -->
<!-- v 0.9 수정내용 : v-bind:src를 :src로 단축 사용 가능. data의 영화 포스터 링크를 require해주면 이미지 링크 불러오기 가능
                        포스터 이미지 안뜨는 문제 해결 -->

<template>
     <div id="movi_chart" >
            <div v-for="(movie, i) in movies.slice(0,4)"  :key={i} class="item">
                <div class="top_info">
                        <img :src=movie.pos_link /> <!-- src에 예매율 1등인 영화 포스터 링크를 불러와야함-->
                        <em class="rank rank_1"> {{ i+1 }}</em>
                        <span class="ic_grade" :class="grade_info(movie.mov_grade)"></span> 
                        <!-- 해당 영화의 상영등급을 불러와야함 
                        ic_grade 뒤에 gr_12, gr_15, gr_18, gr_all class를 상영등급에 따라 추가해야함 -->
     
                </div>
                <div class="btm_info">
                    <span class="rate_info">예매율&nbsp; <em>{{getPro(movie.movcnt)}}</em></span>
                    <span class="star_info">
                        <router-link :to="{name:'Reveiw'}"> <!-- 클릭하면 영화리뷰 창으로 이동하도록-->
                            <img src="@/assets/images/star.png" style="padding-top:1px; width:11px; height: 11px;">
                           {{ getRev(movie.mov_id) }}
                        </router-link> 
                    </span>
                </div>
            </div>

            <div class="mov_nav">
                <router-link class="btn_more" :to="{name:'MovieList'}">더 많은 영화보기</router-link>
                <router-link class="btn_tic" :to="{name:'Ticketing'}">예매하기</router-link>
            </div>
        </div>
</template>


<script>
import axios from 'axios';
export default {
    
    name: "Movi_chart",
    created() {
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
      axios.get('http://localhost:8004/movie/rank')
        
            .then((res) => {
                this.movies = res.data.movie
                this.stars = res.data.review
             
                 console.log(res.data)
             
                
            }).catch(console.log(err))
            
            
        
    },
    data(){
        return {
            movies:[],
            totalFic:0,
            stars : [],


        
            
        }
    },
    methods:{
        getPro(num){
            let total_fic = 0
            const mov_list = this.movies
            for(let j=0; j<mov_list.length; j++){
                total_fic += mov_list[j].movcnt
            }
        
            let result = (num/total_fic)*100;
            return result.toFixed(1);

        },
        grade_info(gr) {
            if(gr==0) {
                return 'gr_all'
            } else if (gr == 12) {
                return 'gr_12'
            } else if (gr == 15) {
                return 'gr_15'
            } else if (gr==19) {
                return 'gr_18'
            } else {
                return 'gr_non'
            }
        },
        getRev(value) {
            const rev_list = this.stars
            for(let j=0; j<rev_list.length; j++) {
                if(rev_list[j].mov_id === value){
                    return parseInt(rev_list[j].movstars)
                }
            }
        }
  
    },
    computed:{
        // getTotal(index){
        //      const mov_list = this.movies
        //      var total_fic = 0
        //      var ans = 0
        //     for(i=0; i<mov_list.length; i++){
        //     total_fic += mov_list[i].movcnt
            
        //     }
        //     ans = ((mov_list[index]/total_fic)*100).toFixed(1);

        //     return ans
         

        }
       
        
    
}
</script>

<style>
#movi_chart {position: relative; top:0px; height: 600px; border-bottom:3px dotted darkgray; width:100%; margin:0 auto; text-align: center; padding-top:40px; background-color:black;}
.item {display : inline-block; width:184px; position:relative; top:50px; margin-right:50px;}
.top_info {overflow:hidden; position:relative; height:262px; border-radius:4px;}
.top_info .poster {display:block; height:262px;}
.top_info  img {width:100%; height: 100%;}
.top_info .rank {display:block; position:absolute; left:0; right:0; bottom:0; height:25px; padding-left:80px; padding-bottom:5px; color:#fff; font-weight:bold; font-size:23px; font-style:italic; font-family:'Roboto', "Noto Sans KR"; text-align:left; background-color:rgba(0, 0, 0, 0.7)}
.top_info .rank_1 {color:#ffffb5;}
.top_info .ic_grade {position:absolute; top:10px; right:8px;}
.btm_info {display:block; margin-top:30px; margin-bottom:10px; font-size:11px; color:white;}
.btm_info > span:before {content:''; display:inline-block; position:absolute; top:2px; left:0; width:1px; height:8px;}
.btm_info > span {position:relative; margin-left:8px; font-family:'Roboto', "Noto Sans KR";}
.btm_info .rate_info em {font-weight:bold;}
.btm_info .star_info a {padding-left:10px; font-weight:bold; color:white;}

.mov_nav {display:block; position: relative; width:980px; margin:0 auto; top:135px;}
.mov_nav .btn_more {background:black; color:#d6cece; border-color:#d6cece; margin-right:20px;}
.mov_nav .btn_tic {background-color:#d6cece; color:black;}
.mov_nav > a {letter-spacing:0.05em; font-family: "a로케트"; line-height: 30px; width:150px; display:inline-block; box-sizing:border-box; border-radius:4px; border:1px solid; font-size:14px; text-align:center; vertical-align:middle;}

/* 상영 등급 아이콘 포스터위에 만들어 주는 거임 레전드 롯데시네마꺼 긁어옴 */
.ic_grade {display:inline-block; width:22px; height:22px; line-height:22px; border-radius:50%; font-size:0; text-align:center; vertical-align:middle;}
.ic_grade:before {margin-left:-1px; font-size:13px; font-weight:bold; color:#FFF; white-space:nowrap;}
.ic_grade.gr_non	 {background-color:#777777;}
.ic_grade.gr_all	 {background-color:#5BC77E;}
.ic_grade.gr_12		 {background-color:#4DD6FF;}
.ic_grade.gr_15		 {background-color:#FFC134;}
.ic_grade.gr_18		 {background-color:#ED4C6B;}
.ic_grade.gr_non:before	 {content:"미정"; font-size:11px;}
.ic_grade.gr_all:before	 {content:"전체"; font-size:11px;}
.ic_grade.gr_12:before	 {content:"12"; font-family:"Roboto";}
.ic_grade.gr_15:before	 {content:"15"; font-family:"Roboto";}
.ic_grade.gr_18:before	 {content:"청불"; font-size:11px;}
</style>