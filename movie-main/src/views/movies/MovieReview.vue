<template>
<div>
    <baseHeader/>
    <v-card class="review_table">
        <v-card-title>
            <span class="review_title">영화 평점·리뷰</span>
            <v-divider inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="영화제목을 검색해주세요." single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="reivew_list" item-key="mov_name" :search="search"></v-data-table>
    </v-card>
</div>
</template>
<script>
import axios from 'axios';
import baseHeader from '@/Header_ty2.vue'
export default {
    name: 'MovieReview',
    data() {
        return {
            search:'',
            reivew_list: [],
        }
    },
    created() {
      axios.get('http://localhost:8004/movie/review')
        
            .then((res) => {
                this.reivew_list = res.data.movieReview;
                console.log(res.data)
                
            }).catch(console.log(err))
            
            
        
    },
    computed: {
        headers() {
            return [
                {text: '영화제목', align: 'start', sortable: false, value: 'mov_name'},
                {text: '평점', value: 'mov_star'},
                {text: '한줄평', value: 'mov_review', sortable: false},
                {text: '글쓴이', value: 'mem_name', sortable: false}
            ]
        }
    },
    components: {
        baseHeader,
    }
}
</script>

<style>
    .review_table {
        width:1024px; text-align: center; left:50%; transform:translateX(-50%);
        margin-top:30px;
    }
    .review_title {
        padding-right:15px;
        font-family:'a옛날사진관3'; font-size:25px; border-right:2px solid #FF1744;
    }
</style>