<template>
<div>
    <Base_Header/>
    <div class="event_page">

        <span>이벤트</span>
        
        <div class="event_table">
            <v-data-table :headers="headers" :items="events" :items-per-page="5" :expanded.sync="expanded" item-key="num" show-expand>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        {{ item.event_detail }}
                    </td>
                </template>
            </v-data-table>
        </div>

        <img src="@/assets/images/event_banner.jpg">
    </div>
</div>
</template>

<script>
import Base_Header from '@/Header_ty2.vue'
export default{
    name: "EventPage",
    components:{
         Base_Header
    },
    data() {
        return{
            expanded: [],
            headers: [
                {
                    text: 'No', align: 'start', sortable: false, value: 'num', 
                },
                { text: '제목', value:'event_title', sortable: false },
                { text: '이벤트 마감일', value: 'event_deadline'},
                { text: '', value:'data-table-expand'},
            ],
            events: [
                {
                    num: 1, event_title: '<강릉> 시사회 이벤트', event_deadline: '2021-11-30',
                    event_detail: '<강릉> 시사회 이벤트를 시작합니다! ONPLEX 회원이라면 지금 바로 응모하세요!'
                },
                {
                    num: 2, event_title: '<이터널스> 포스터 증정 이벤트', event_deadline: '2021-12-03',
                    event_detail: 'ONPLEX에서 <이터널스>를 관람한 관객분들에게 <이터널스> 포스터를 선착순 증정합니다!\n지금 바로 예매하세요!'
                },
                {
                    num: 3, event_title: '영화 한 줄 리뷰 이벤트', event_deadline: '2021-12-31',
                    event_detail: '영화별로 한 줄 리뷰 추천수 1위를 달성하신 분들께 ONPLEX 영화 관람권을 드립니다! (상영 종료 후의 추천수로 선정됩니다.)'
                },
            ]
        }
    }
}
</script>
<style>
    .event_page {position:relative; width:1000px; text-align: center; margin:0 auto}
    .event_page > span {position:absolute; left:0; font-family:'a옛날사진관3'; font-size:25px; padding-top:20px; border-bottom:2px solid #FF1744;}
    .event_table {display: block; padding-top:100px;}
    .event_table tr {font-weight: bold;}
    .event_page img{width:1024px; padding-top: 100px; padding-bottom: 0px;}
</style>