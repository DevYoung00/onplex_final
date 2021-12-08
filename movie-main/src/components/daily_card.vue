<template>
    <div class="daliy_card">
      <!-- <div v-for= "attendance in newArry" :key="attendance.dates" > -->

    <v-card
   
      class="mx-auto"
     width="90%"
    >
    <div class="daily_card_text">
         <v-card-text>
             <h2>{{attendances[0].staff_name}} 님의 출근부</h2>
            <!-- <li>{{attendance[idx].dates}}</li>
            
  -->       
            
            <br>
            <p> 출근 일자 : {{attendances[getIdx(value)].dates}} </p>
            <p> 출근 시간 : {{attendances[getIdx(value)].on_work}} </p>
            <p> 퇴근 시간 : {{attendances[getIdx(value)].off_work}} </p>
            <p> 결근 일수 :  {{attendances[getIdx(value)].absent_day}} </p>
            <p> 유급 휴가 일수 : {{attendances[getIdx(value)].paid_time_off}} </p>
            <hr>
            <p>오늘({{ new Date() | moment('YYYY-MM-DD') }}) 까지의 누적 근태기록 </p>
            <p> 누적 결근 일수 : {{this.absent_day}}일 </p>
            <p> 누적 유급 휴가 일수 : {{this.paid_time_off}}일</p>
            <p> 누적 월급 : {{this.salary}}원 </p>
           
        <!-- <p>근태 기록 : {{this.dates}}</p>
        <p>출근 시간 : </p>
        <p>퇴근 시간 : </p>
        <p>결근 일수 : {{this.absent}}일</p>
 
        <p>유급휴가 일수 : {{this.paid_time}}일</p>

        <p>현재 급여 :{{this.pay}}원</p>  -->
        
   </v-card-text>
   </diV>
       <!-- </div>
        </div> -->
          
    </v-card>
    </div>
    

            <!-- </div> -->
<!-- </div> -->
  <!-- <div class="daliy_card">
  <v-app id="inspire">
    <v-card
      class="mx-auto"
     width="100%"
    >
      <v-card-text>
          {{this.pvalue}}
          <v-text-field
             v-model="start"
              label="출근 시간 ex) 09:00"
              required
            ></v-text-field>
        
             <v-text-field
             v-model="end"
              label="퇴근 시간 ex) 09:00"
              required
            ></v-text-field>
      
        <p>결근 일수 : </p>
   
        <p>유급휴가 일수 : </p>

        <p>현재 급여 : </p>
             <v-btn>출퇴근확정 : {{this.end}}</v-btn>
          </v-card-text>
    </v-card>
  </v-app>
</div> -->
</template>

<script>
import axios from 'axios'
export default {
    name:'daily_card',
    props:{
      
      value:String,
    },


data(){
  return{
      idx :0,
      attendances:[],
      salary:'',
      absent_day:'',
      paid_time_off:'',
  }
},
methods:{
    getIdx(val) {
        const attendance = this.attendances
        for (var i=0; i<attendance.length; i++) {
            if(attendance[i].dates === val) { return this.idx = i;}
            // else {return 0;}
        }
    }


    },
  // attend(){
  //    axios({
  //       method: 'POST',
  //       url: 'http://localhost:8004/staff/attend',
  //       data: {
  //         staffId:'',
  //         onwork:this.start,
  //          offwork:this.end,
  //         dates:this.date
         
  //         },
  //     })
  //     .catch(
  //       err => console.log(err)
  //     )


created(){
    axios.get('http://localhost:8004/staff/salary',{withCredentials:true})
        
            .then((res) => {
                this.attendances = res.data.attend
                this.salary = res.data.salary[0]['count(on_work)*80000']
                this.absent_day = res.data.salary[0]['count(absent_day)']
                this.paid_time_off = res.data.salary[0]['count(paid_time_off)']
                // this.staff_name = res.data.salary[0].staff_name
                // this.absent = res.data.salary[0]['count(absent_day)']
                // this.absent = res.data.salary[0]['count(absent_day)']
                // this.paid_time = res.data.salary[0]['count(paid_time_off)']
                // this.pay = res.data.salary[0]['count(on_work)*80000']
     
            }).catch(console.log(err))
            this.$emit("date",this.prop_date)
        
        }



}




</script>

<style>
.daily_card{
  width:100px;
  margin-top:10px;
  font-family: 'GmarketSansMedium';
  margin-right: 30%;
  
  
}
.daily_card_text{
  font-size:25px;
  font-family: 'GmarketSansMedium';
  
  
  
}

</style>