<template>
<div>
  <staff_header/>
<div class="daliy_check">
  <!-- <h2> {{this.staff_name}} 님의 출근부</h2> -->
  <br>

<div id="app">
        
  <v-app id="inspire">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        class="my-2 px-1"
      >
        <v-date-picker
          ref="picker"
          v-model="dates"
          :picker-date.sync="pickerDate"
          full-width
          color="blue-grey lighten-3"
        ></v-date-picker>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        class="my-2 px-1"
      >

        <div class="daliy_card">
          
         
          

          
          <dailycard
          v-bind:value="this.dates"
          />
        


    <!-- <v-card
      class="mx-auto"
     width="100%"
    >
     -->
         <!-- <v-card-text>
         <h2> {{this.staff_name}} 님의 출근부</h2>
        <p>근태 기록 : {{this.dates}}</p>
        <p>출근 시간 : </p>
        <p>퇴근 시간 : </p>
        <p>결근 일수 : {{this.absent}}일 </p>
 
        <p>유급휴가 일수 : {{this.paid_time}}일</p>

        <p>현재 급여 :{{this.pay}}원</p> 
   </v-card-text> -->

          
    <!-- </v-card> -->
        

      </div>
      </v-col>
    </v-row>
    
  </v-app>
        </div>
 </div> 
</div>

</template>

<script>
import axios from 'axios'
import staff_header from '@/staff_header.vue'
import dailycard from '@/components/daily_card.vue'

export default {
  name:'daily_check',
  components:{
    staff_header,
    dailycard

    
  },
  data(){
    return{
      dates: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        pickerDate: null,
        attendances:[],
      

    }

  },
  created() {
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
      //  axios.get('http://localhost:8004/staff/salary',{withCredentials:true})
        
      //       .then((res) => {
      //           this.attendances = res.data.salary;
      //           this.salary = res.data.
      // //           // this.staff_name = res.data.salary[0].staff_name
      // //           // this.absent = res.data.salary[0]['count(absent_day)']
      // //           // this.absent = res.data.salary[0]['count(absent_day)']
      // //           // this.paid_time = res.data.salary[0]['count(paid_time_off)']
      // //           // this.pay = res.data.salary[0]['count(on_work)*80000']
                
    
                
      //       }).catch(console.log(err))
    },
    methods:{
      // attend(){
      //   axios.post('http://localhost:8004/staff/attend',
      //   {on_work:this.on_work,off_work:this.off_work, dates:this.dates},
      //   {withCredentials:true})
      //   .then(
      //     alert("success")
      //   )
      // .catch(
      //   err => console.log(err)
      // )
    }
}

</script>

<style scoped>
.daliy_check{
  width:1024px;
  margin:0 auto;
  overflow-x: hidden;
}
.daliy_check h2{
  text-align: center;
}
.daliy_check .row{
  position:absolute;

left:5%;
}
.daliy_check p{
  font-size:15px;
}
.now_date {

  font-size:25px;
}
.now_date >p {

  font-size:20px;
}

</style>

