<!-- 8x10 총 80좌석  -->

<template>
<div>
    <div class="seat_container">
        <div class="screen"></div>
        <div class="row">
            <div v-for="seat in seats.slice(0,10)" :key="seat.seat_id" class="seat"
                @click="$event.target.classList.contains('selected') ? removeSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee) : countSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee)" :class="{'occupied': seat.is_full =='y'}"></div>
        </div>
        <div class="row">
            <div v-for="seat in seats.slice(10,20)" :key="seat.id" class="seat"
                @click="$event.target.classList.contains('selected') ? removeSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee) : countSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee)" :class="{'occupied': seat.is_full =='y'}"></div>
        </div>
        <div class="row">
            <div v-for="seat in seats.slice(20,30)" :key="seat.id" class="seat"
               @click="$event.target.classList.contains('selected') ? removeSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee) : countSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee)" :class="{'occupied': seat.is_full =='y'}"></div>
        </div>
        <div class="row">
            <div v-for="seat in seats.slice(30,40)" :key="seat.id" class="seat"
               @click="$event.target.classList.contains('selected') ? removeSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee) : countSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee)" :class="{'occupied': seat.is_full =='y'}"></div>
        </div>
        <div class="row">
            <div v-for="seat in seats.slice(40,50)" :key="seat.id" class="seat"
                @click="$event.target.classList.contains('selected') ? removeSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee) : countSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee)" :class="{'occupied': seat.is_full =='y'}"></div>
        </div>
        <div class="row">
            <div v-for="seat in seats.slice(50,60)" :key="seat.id" class="seat"
                @click="$event.target.classList.contains('selected') ? removeSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee) : countSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee)" :class="{'occupied': seat.is_full =='y'}"></div>
        </div>
        <div class="row">
            <div v-for="seat in seats.slice(60,70)" :key="seat.id" class="seat"
                @click="$event.target.classList.contains('selected') ? removeSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee) : countSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee)" :class="{'occupied': seat.is_full =='y'}"></div>
        </div>
        <div class="row">
            <div v-for="seat in seats.slice(70,80)" :key="seat.id" class="seat"
                @click="$event.target.classList.contains('selected') ? removeSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee) : countSeat($event, seat.seat_id, seat.seat_num, seat.seat_fee)" :class="{'occupied': seat.is_full =='y'}"></div>
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import { eventBus } from '@/main'
export default {
    name:'seatContainer',
    data() {
        return {
            seats:[],
            total_fee: 0,
            isSelects:[],
            selectNum:[],
        }
    },
    methods: {
        countSeat (event, value, name, fee) {
            const counter = JSON.parse(localStorage.getItem('counter'))
            const select_seats = document.querySelectorAll('.selected')
            if(counter==0) {
                alert("인원수 선택을 해주세요.")
                return;
            } else if(select_seats.length < counter) {
                this.isSelects.push(value)
                this.selectNum.push(name)
                this.total_fee += fee
                event.target.classList.add('selected')
            }  else if(select_seats.length == counter) {
                event.target.classList.add('selected')
                this.isSelects.push(value)
                this.selectNum.push(name)
                this.total_fee += fee
                localStorage.setItem('seat', this.isSelects)
                this.$emit('seatId', this.isSelects)
                localStorage.setItem('seat_num', this.selectNum)
                this.$emit('seatNum', this.selectNum)
                localStorage.setItem('total_fee', JSON.stringify(this.total_fee))
                this.$emit('totalFee', this.total_fee)
                eventBus.numSelect(this.isSelects.length)
            } else {
                alert("좌석선택이 완료되었습니다.")
                return;
            }
        },
        removeSeat(event, value, name, fee) {
            event.target.classList.remove('selected')
            this.isSelects = this.isSelects.filter((element) => element !== value)
            this.selectNum = this.selectNum.filter((element) => element !== name)
            this.total_fee -= fee
            localStorage.setItem('seat', this.isSelects)
            this.$emit('seatId', this.isSelects)
            localStorage.setItem('seat_num', this.selectNum)
            this.$emit('seatNum', JSON.stringify(this.selectNum))
            localStorage.setItem('total_fee', JSON.stringify(this.total_fee))
            this.$emit('totalFee', this.total_fee)
            eventBus.numSelect(this.isSelects.length)
        },
    },
    created() {
        localStorage.removeItem('seat')
        localStorage.removeItem('seat_num')
        localStorage.removeItem('total_fee')
        axios.get('http://localhost:8004/seat/list',{withCredentials:true})
        
            .then((res) => {
                this.seats = res.data.seatList
                console.log(res.data)
                
            }).catch(console.log(err))
    }
}
</script>