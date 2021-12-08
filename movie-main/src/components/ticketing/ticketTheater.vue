<template>
<div class="ticketTheater">
  <div class="theater_li" v-for="theater in theaters" :key="theater.branch_id">
               <v-btn-toggle v-model="activeButton_2" @change="select_2" tile color="indigo"
               >
                   <v-btn :value="theater.branch_name"
                   width="240px"
                   height="32px"
                   text
                  >
                   {{theater.branch_name}}
                   </v-btn>
               </v-btn-toggle>
        </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name:'TicketTheater',
  components:{

  },
  created() {
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
         axios.get('http://localhost:8004/branch/list')
        
            .then((res) => {
                this.theaters = res.data.branchList
                console.log(res.data)
                
            }).catch(console.log(err))

        localStorage.removeItem('theatername')
    },
  data(){
    return {
      theaters:[],
      activeButton_2:this.value,
    }
  },
  methods:{
    select_2(){
           
           console.log(this.activeButton_2)
           localStorage.setItem('theatername', JSON.stringify(this.activeButton_2));
           this.$emit('theatername', this.activeButton_2)
       },
  },
}

</script>

<style>

</style>