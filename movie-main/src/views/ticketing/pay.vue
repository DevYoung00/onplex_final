<template>
<div>
  <Base_Header/>
<div class="pay">
    <h2>결제 페이지</h2>
    <br>
     영화 이름 : {{payItems.movie}}
     <br>
      <br>
      극장 이름 : {{payItems.theater}}
      <br>
      <br>
      상영 날짜 : {{payItems.date}}
      <br>
        <br>
      상영 시간 : {{payItems.time}}
      <br>
    <br>
     선택 좌석 : {{printNum()}}
     <br>

  <div class="pay-button">
      <br>
     
    <v-btn @click="pay">
      결제하기
    </v-btn>

  </div>
    </div>
</div>


</template>

<script>
import axios from 'axios'
import router from '@/router'
import Base_Header from '@/Header_ty2.vue'
export default {
  data(){
    return{
      payItems:{
          movie : JSON.parse(localStorage.getItem('moviename')),
          theater : JSON.parse(localStorage.getItem('theatername')),
          date : JSON.parse(localStorage.getItem('date')),
          time : JSON.parse(localStorage.getItem('time')),
          seat : localStorage.getItem('seat'),
          seat_num : localStorage.getItem('seat_num')
          // isMember: true/false
          //seat : localStorage.getItem('seat'),
      },
      totalPrice:0,
      isCookie : null,
      
      
    }
  },
  created(){
    this.isCookie = document.cookie;
  },
  components:{
    Base_Header
  },
  methods:{
     //   document.cookie = "Authorization" + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
      

    //  axios({
    //     method: 'POST',
    //     url: 'http://localhost:8004/ticketing/ticketing',
    //     data: {...this.payItems},
    //      withCredentials:true,
    //      mode: 'cors',  'http://localhost:8004/ticketing/ticketing?movie=?&theater=?',
    //     // headers: "Authorization",
    //   })
    pay(){
      const payItems=this.payItems
      console.log(payItems)
     axios.post('http://localhost:8004/ticketing/ticketing',
      payItems
      ,{withCredentials:true})
    .then(
      res=>{
        alert('결제가 완료되었습니다.')
      router.push({name: 'Home'})
     console.log(res.data)
     localStorage.removeItem('moviename')
    //  JSON.parse()
     localStorage.removeItem('theatername')
     localStorage.removeItem('date')
     localStorage.removeItem('time')
     localStorage.removeItem('seat')
     localStorage.removeItem('seat_num')
     localStorage.removeItem('counter')
     localStorage.removeItem('total_fee')
    }
    )
    .catch(console.error)
  
    },
    printNum() {
            const seatarr = this.payItems.seat_num.split(",")
            let seatstr = ''
            for(let i=0; i<seatarr.length; i++){
                seatstr += seatarr[i]+'열'+' '
            }
            return seatstr
      // const seatstr = this.payItems.seat_num
      // let seatarr= seatstr.split(",")
      // let printstr

      // for (let i; i<seatarr.length; i++) {
      //   printstr += seatarr[i] + '열' + ' '
      // }
      // return printstr
    }
  }

  }


</script>

<style>
.pay{
    text-align: center;
}

</style>