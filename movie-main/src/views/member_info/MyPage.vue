<template>
    <div>
        <base-header/>
        <div class="my_info">
            <span> {{ my_review[0].mem_name }}님 </span>
            <div class="my_movi section_main">
                <img class="movi_poster" :src="my_movie[0].pos_link">
                <span class="recent_movie1"> {{my_movie[0].mov_name}}</span>
                <span class="recent_movie2"> {{my_movie[0].scr_date}}</span>
            </div>
            <div class="my_rev section_main">
                <span class="recent_review1"> {{my_review[0].mov_name}}</span>
                <v-rating color="warning" length="5" readonly small :value="my_review[0].mov_star" class="recent_star"></v-rating>
                <span class="recent_review2"> "{{my_review[0].mov_review}}"</span>
            </div>
        </div>
        <mypageTab/>
    </div>
</template>

<script>
import axios from 'axios'
import mypageTab from '@/components/mypage/mypageTab.vue'
import baseHeader from '@/Header_ty2.vue'

export default {
    name: "MyPage",
    data(){
        return{
            my_review: [],
            my_movie: [],
        }
    },
    components: {
        baseHeader,
        mypageTab,
    },
    created() {
        axios.get('http://localhost:8004/member/mypage',{withCredentials:true})
            .then((res) => {
                this.my_review = res.data.review
                this.my_movie = res.data.ticket
                console.log(res.data.review)
                
            }).catch(console.log('error'))
    }
}
</script>

<style>
    .my_info {position:relative; display:block; top:80px; background-repeat:no-repeat; height:357.5px; width: 885.625px; background-image: url("../../assets/images/my_page.png");
     background-size:cover; margin:0 auto;}
    .my_info > span {position:absolute; font-size:36px; padding-top:42px; padding-left:415px; font-family:'a옛날사진관3', sans-serif; font-weight: 600; letter-spacing: 0.1em;}

    /* .section_main > span {position:absolute; font-size:20px;} */

    .movi_title {padding-top:170px; padding-left:345px;letter-spacing: -2px;}

    /* .my_movi .movi_poster {
        position:absolute;
        height:120px; border-radius: 5px;
        top:200px; left:170px;
    }
    .recent_movie2 {padding-top:300px; padding-left:260px; color:rgb(97, 97, 97)} 
    .recent_movie1 {padding-top:280px; padding-left:260px; color:rgb(97, 97, 97)}  */
    .my_movi {
        position:absolute;
        height: 120px; width: 290px;
        /* border:1px solid cadetblue; */
        background-color: rgba(255, 255, 255, 0.658);
        border-radius: 20px;
        top:200px; left:130px;
    }
    .my_movi .movi_poster {
        height:120px;
    }
    .my_movi .recent_movie1 {
        position:absolute;
        font-style: italic; bottom:0; margin-left:10px; font-size: 24px;
    }
    .my_movi .recent_movie2 {
        position: absolute;
        color:rgb(97, 97, 97); font-size: 16px; right:15px;
    }
    .my_rev {
        position: absolute;
        height: 120px; width: 290px;
        background-color: rgba(255, 255, 255, 0.658);
        border-radius: 20px;
        top:200px; left:465px;
        text-align: center;
    }
    .my_rev .recent_review1 {
        font-style:italic; font-size:24px; padding-top: 10px;
    }
   
    /* .my_rev .recent_review1 {padding-top: 200px; padding-left:530px; color:rgb(97, 97, 97)}
    .my_rev .recent_star {padding-top:220px; padding-left:520px;}
    .my_rev .recent_review2 {padding-top:0px; padding-left:530px; color:rgb(97, 97, 97)} */
    /* .my_theater .theater_title {padding-top:170px; padding-left:605px; letter-spacing: -2px;} */

    /* .my_theater_info {} */
    /* .theat_dial {position:absolute; padding-top:280px; padding-left:630px; z-index:0}
    .user_theater {position:absolute; padding-top: 235px; padding-left:635px;} */

</style>