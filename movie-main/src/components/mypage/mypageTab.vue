<template>
    <div class="mypage_tab">
        <v-tabs color="black" grow>
            <v-tab>
                예매내역
            </v-tab>
            <v-tab>
                MY리뷰
            </v-tab>
            <v-tab>
                선호 관람 정보
            </v-tab>

            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr> 
                                        <th class="text-left"> 날짜 </th>
                                        <th class="text-left"> 영화 </th>
                                        <th class="text-left"> 지점 </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="tic in my_ticket" :key="tic.mov_name">
                                        <td> {{ tic.scr_date }} </td>
                                        <td> {{ tic.mov_name }} </td>
                                        <td> {{ tic.branch_name }} </td>
                                        <td v-if="canCancel(tic.scr_date, tic.s_time)">
                                            <v-btn color="indigo lighten-3" text class="set_btn" max-width="20px" max-height="20px" 
                                                @click="cancelTicket(tic.memtkid)">예매취소  <v-icon right>mdi-close-circle-outline</v-icon></v-btn>
                                        </td>
                                        <td v-else> <writeReview :tkid="tic.memtkid" /> </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr> 
                                        <th class="text-left"> 영화 </th>
                                        <th class="text-left"> 평점 </th>
                                        <th class="text-left"> 한줄평 </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="rev in my_review" :key="rev.mov_id">
                                        <td> {{ rev.mov_name }} </td>
                                        <td> <v-rating :value="rev.mov_star" length="5" readonly color="yellow darken-2" background-color="grey lighten-1" small></v-rating> </td>
                                        <td> {{ rev.mov_review }} </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <span style="font-size:18px;"> 선호 장르 | {{my_review[0].mem_name}}님의 선호 장르는 <span style="font-size:20px; color:black;">{{ like_genre[likeGen()].mov_genre }}</span>입니다. </span>
                        <br>
                        <span style="font-size:18px;"> 선호 국가 | {{my_review[0].mem_name}}님의 선호 국가는 <span style="font-size:20px; color:black;">{{ like_count[likeCount()].mov_country }}</span>입니다. </span>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import writeReview from '@/components/mypage/writeReview.vue'
import axios from 'axios';
export default {
    name:"mypageTab",
    data() {
        return {
            my_review:[],
            my_ticket:[],
            like_genre:[],
            like_count: [],
        }
    },
    components: {
        writeReview
    },
    created() {
        axios.get('http://localhost:8004/member/mypage',{withCredentials:true})
            .then((res) => {
                this.my_review = res.data.review
                this.my_ticket = res.data.ticket
                this.like_genre = res.data.genre
                this.like_count = res.data.country
                console.log(res.data)
                
            }).catch(console.log('error'))
    },
    methods: {
        likeGen() {
            const genre_list = this.like_genre
            let max = genre_list[0].countGen
            let idx = 0
            for(let i=0; i<genre_list.length; i++){
                if(max < genre_list[i].countGen) {
                    max = genre_list[i].countGen
                    idx = i
                }
            }
            return idx
        },
        likeCount() {
            const count_list = this.like_count
            let max = count_list[0].countCont
            let idx = 0
            for(let i=0; i<count_list.length; i++) {
                if(max < count_list[i].countCont) {
                    max = count_list[i].countCont
                    idx = i
                }
            }
            return idx
        },
        canCancel(date,time) {
            var today = new Date()
            var datearr = date.split('-')
            var timearr = time.split(':')
            var tickday = new Date(parseInt(datearr[0]), parseInt(datearr[1])-1, parseInt(datearr[2]), parseInt(timearr[0]))
            return tickday>today
        },
        cancelTicket(id) {
            if(confirm("취소를 진행하시겠습니까?")) {
                console.log({memtkid:id})
                axios.post('http://localhost:8004/ticketing/cancel',{memtkid:id},{withCredentials:true})
                    .then(res => {
                        console.log(res.data)
                    }).catch(console.log('error'))
                alert("취소가 완료되었습니다.")
                location.reload()
            }
        }
    }
}
</script>

<style>
    .mypage_tab {position:relative; top:200px; width:1024px; margin:0 auto;}
</style>