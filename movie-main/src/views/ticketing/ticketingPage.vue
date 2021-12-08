<template>
<div id="ticketing">
    <div> 
        <Base_Header/>
    </div>
   <div class="reserve-container">
        <div class="movie-part">
            <div class="reserve-title" >영화</div>
            <TicketMovie  @moviename="getMovie"/>
        </div>
        <div class="theater-part">
            <div class="reserve-title">극장</div>
              <TicketTheater @theatername="getThea"/>
        </div>
        <div class="day-part">
            <div class="reserve-title" >날짜</div>
            <TicketDate @date="getDate"/>
        </div>
              <div class="time-part">
                  <div class="time-part">
                 <div class="reserve-title">시간</div>
              <TicketTime @time="getTime"/>
              </div>


            <br>
            <v-btn :disabled="isNull()" outlined class="moveSeatButton" color="indigo" @click.native="$router.push({name: 'selectSeat'})">좌석선택</v-btn>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios';
import Base_Header from '@/Header_ty2.vue'
import TicketTheater from '@/components/ticketing/ticketTheater'
import TicketMovie from '@/components/ticketing/ticketMovie'
import TicketDate from '@/components/ticketing/ticketDate'
import TicketTime from '@/components/ticketing/ticketTime'
export default {

   name: 'Ticketing',
   components:{
     TicketTheater,
     TicketMovie,
     TicketDate,
     TicketTime,
     Base_Header,
   },
         created() {
             localStorage.removeItem('moviename')
             localStorage.removeItem('theatername')
             localStorage.removeItem('date')
             localStorage.removeItem('time')
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
    
            //   axios.get('/api/schedules')
            // .then((response) => {
            //     this.schedules = response.data
            // }).catch(err => {
            //     alert(err);
            //     console.log(err);
            // })
         },
             
        

   data(){
       return{
          /* movie : JSON.parse(localStorage.getItem('moviename')),
          theater : JSON.parse(localStorage.getItem('theatername')),
          date : JSON.parse(localStorage.getItem('date')),
          time : JSON.parse(localStorage.getItem('time')), */
          movie : '',
          theater: '',
          date: '',
          time: ''
          
       }
   }
   ,
   methods:{
       isNull(){
           if(this.movie === '' || this.theater === '' || this.date === '' || this.time === ''){
           return true
           }
           else return false
       },
       getMovie(value){
           this.movie = value
       },
       getThea(value){
           this.theater = value
       },
       getDate(value){
           this.date = value
       },
       getTime(value){
           this.time = value
       },
       check(){
           router.push({name: 'selectSeat'})
       },

       }
     
   }

</script>

<style>

.theater_li {display : inline-block; width:184px; position:relative;  margin-right:50px;}

#ticketing{
  background-color:white;
}
#ticketing > header{
  text-align: center;
  font-size:40px;
}

.reserve-container{
  background-color:white;
}
/* content */
.reserve-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    height: 500px;
    /* border: 1px solid #dddddd; */
}

.reserve-container>div {
    border: 1px solid #dddddd;
}

.reserve-title {
    border-bottom: 1px solid #dddddd;
    background-color: #444444;
    text-align: center;
    color: #dddddd;
    padding: 5px;
    font-size: 13px;
    font-weight: bold;
}

.movie-part {
    width: 240px;
}

.theater-part {
    width: 240px;
}

.day-part {
    width: 240px;
}

.time-part {
    width: 240px;
}

.sort-wrapper {
    margin: 10px 6px 6px 10px;
    /* padding: 3px; */
    display: flex;
    border-bottom: 1px solid #dddddd;
    font-size: 12px;
}

.sort-wrapper>div {
    padding: 3px;
}

.sort-wrapper>div:hover {
    border-bottom: 1px solid #111111;
}

.sort-selected {
    font-weight: bold;
    border-bottom: 1px solid #111111;
}

.sort-korean {
    margin-left: 6px;
}

/*.reserve-date {
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 770px;
    overflow: scroll;
    overflow-x: hidden;
}*/

.movie-date-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 2px;
}

.movie-week-of-day {
    margin-left: 5px;
    font-size: 10px;
    width: 12px;
    height: 22px;
    line-height: 22px;
}

.movie-day {
    text-align: center;
    width: 34px;
    height: 22px;
    font-size: 17px;
    font-weight: bold;
}



.movie-date-wrapper-active {
    background-color: #333333;
}

.movie-date-wrapper-active>* {
    color: white;
}
.submit{
  color:black;
  
}
.submit button{
  color:black;
  
}
.moveSeatButton{
   font-size: 18px;
   font-weight: bold;
   padding: 5px;
   margin-top: 10px;
   margin-left: 70px;
   /* border: 1px solid #333333; */
}

</style>