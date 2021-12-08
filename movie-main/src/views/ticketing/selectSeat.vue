<!-- 남은거 ... -->
<!-- 좌석정보 데베에서 불러오고 데베에 저장하는 자바스크립트 작성해야함 -->
<!-- 인원수 설정 -> 설정한 인원수에 따른 좌석 선택권 부여
     선택한 좌석의 좌석번호와 결제금액 보여주는 컴포넌트 필요  --> 
<!-- 선택한 좌석, 예매완료된 좌석, 예매가능한 좌석을 사용자에게 보여주는 자바스크립트 작성 해야함 assets/js/selectScript.js 참고 -->

<template>
<div>
    <base-header/>
    <div class="selectContainer">
        <num-tikets/>
        <showcase/>
        <seatContainer @seatNum="set_name" @totalFee="set_fee"/>
    </div>
    <div class="ticket_info">
        <span class="moviname"> {{mov_name}} | </span> <span class="branchname"> {{theater_name}}</span><span> {{printNum()}} </span> <br>
        <span class="movidate"> {{src_date}} {{src_time}} </span>
        <div class="totalfee_block">
            <span class="totalfee"> 최종 결제 금액 : {{total_fee}}원 </span>
            <v-btn elevation="2" color="#242333" dark @click.native="gopay()" rounded> 결제하기 </v-btn>
        </div>
    </div>
</div>
</template>

<script>
import showcase from '@/components/selectSeat/showcase.vue'
import seatContainer from '@/components/selectSeat/seatContainer.vue'
import baseHeader from '@/Header_ty2.vue'
import numTikets from '@/components/selectSeat/numTikets.vue'
export default {
    name:'selectSeat',
    data () {
        return {
            mov_name : '',
            theater_name : '',
            src_date : '',
            src_time : '',
            seat_num : '',
            seat_id : '',
            total_fee : 0,
            selectNum: '',
        }
    },
    components: {
        baseHeader,
        numTikets,
        showcase,
        seatContainer,
    },
    created() {
        this.mov_name = localStorage.getItem('moviename').slice(1, length-1)
        this.theater_name = localStorage.getItem('theatername').slice(1, length-1)
        this.src_date = localStorage.getItem('date').slice(1, length-1)
        this.src_time = localStorage.getItem('time').slice(1, length-1)
    },
    methods: {
        set_name(value) {
            this.selectNum = value;
        },
        printNum(){
            const seatarr = this.selectNum
            let seatstr = ''
            for(let i=0; i<seatarr.length; i++){
                seatstr += seatarr[i]+'열'+' '
            }
            return seatstr
        },
        set_fee(value) {
            this.total_fee = value;
        },
        gopay(){
            if(this.selectNum === [] || this.selectNum === []){
                alert("좌석선택을 완료해주세요.")
            } else {
                this.$router.push({name: 'pay'})
            }
        }
    }
}
</script>

<style>
    .selectContainer { 
        background-color: #242333; color: white;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        width:1024px; margin: 0 auto; margin-top: 50px;
    }
    
    .seat_container {
        
        margin-top:30px; margin-bottom: 30px; padding-bottom: 30px; perspective:1000px;
    }

    .seat {
        background-color: white;
        height:26px; width: 30px !important; margin: 7px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }

    .seat.selected {
        background-color: rgb(189, 78, 78);
    }

    .seat.occupied {
        background-color: #444451;
    }

    .seat:nth-last-of-type(4),
    .seat:nth-of-type(3) {
        margin-right: 25px;
    }

    .seat:not(.occupied):hover {
        cursor: pointer; transform: scale(1.2);
    }

    .showcase .seat:not(.occupied):hover {
        cursor: default; transform: scale(1);
    }

    .showcase .seat {
        height: 22px; width: 26px;
    }
    .showcase {
        background: rgba(0,0,0,0.1); color: #777;
        padding: 5px 10px; margin-top: 10px;
        border-radius: 5px;
        list-style-type:none;
        display: flex; justify-content: space-between;
    }

    .showcase li  {
        display:flex; align-items:center; justify-content: center; margin:0 10px;
    }

    .showcase li small { margin-left: 2px; }

    .screen {
        background-color: #fff;
        height: 70px;
        width: 100%;
        margin: 5px 0;
        margin-bottom: 20px;
        transform: rotateX(-45deg);
        box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
    }
    .row { display: flex; }

    .count_tiket { 
        background-color:#ffffff; margin-top: 10px; padding:8px;
        border-radius: 5px;
    }
    .count_tiket > span {
        font-size: 20px; margin: 0 10px;
    }
    .ticket_info {
        width: 1024px; position: absolute; left: 50%; transform: translateX(-50%);
        background-color:beige;
    }

    .ticket_info .moviname {
        color:black; font-weight: bold; padding:5px;  font-size:20px ; margin-left: 10px;
    }
    .tiket_info .branchname {
        color:gray
    }
    .ticket_info .movidate {
        color: gray; padding:5px; margin-left: 10px;
    }
    .totalfee_block {
        position:absolute; right:50px; top:5px;
    }
    .totalfee_block .totalfee{
        color:black; font-weight: bold; font-size:28px; margin-top:10px; padding-right:5px;
    }
</style>