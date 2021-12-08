<template>
<div class="ticketTime">
  <div class="theater_li" v-for="time in times" :key="time.id">
               <v-btn-toggle v-model="activeButton_4" @change="select_4" tile color="indigo"
               >
                   <v-btn :value="time.time"
                   width="240px"
                   height="32px"
                   text
                  >
                   {{time.time}}
                   </v-btn>
               </v-btn-toggle>
        </div>
    
</div>
</template>

<script>
export default {
  name:'TicketTime',
  components:{

  },
   
  data() {
    return {
      times:[
        {
          id:1,
          time:'09:00'

        },
        {
          id:2,
          time:'12:00'

        },
        {
          id:3,
          time:'15:00'

        },
        {
          id:4,
          time:'18:00'

        },
         {
          id:5,
          time:'21:00'

        }
      ],
      activeButton_4:this.value,

    }
  },
  methods:{
    select_4(){
           
           console.log(this.activeButton_4)
           localStorage.setItem('time', JSON.stringify(this.activeButton_4));
           this.$emit('time', this.activeButton_4)
       },
  },
  created() {
      localStorage.removeItem('time')
  }
}

</script>

<style>

</style>