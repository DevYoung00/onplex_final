<template>
<div>
<staff_header/>
  <div class="facility">
    <h2>{{this.name}}점의 시설물 관리</h2>
     <v-container grid-list-md>
      <v-layout row wrap>
          <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="facilities"
          :items-per-page="5">
          <template v-slot:items="props">
            <td :class="headers[0].class">{{ props.item.facility_name}}</td>
            <td :class="headers[1].class">{{ props.item.check_cycle}}</td>
            <td :class="headers[2].class">{{ props.item.last_check}}</td>
            <td :class="headers[3].class">{{ props.item.status}}</td>
          </template>
        </v-data-table>
          </v-flex>
      </v-layout>
  </v-container>
  </div>
</div>
  
</template>

<script>
import axios from 'axios'
import staff_header from '@/staff_header.vue'
export default {
  name:'facility',
  data(){
    return{
      facilities:[],
      headers:[
        {text: '시설물 종류', value: 'facility_name' , sortable:true},
        { text: '시설물 점검 주기 (일)', value: 'check_cycle' ,sortable:true},
        { text: '최근 점검일', value: 'last_check' ,sortable:true},
        { text: '현상태', value: 'status',sortable:true },
       
      ],
      name:'',
    
    }
  },
  components:{
    staff_header
  },
  created() {
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
        axios.get('http://localhost:8004/staff/facility',{withCredentials:true})
            .then((res) => {
                this.facilities = res.data.facilityList;
                this.name = res.data.facilityList[0]['branch_name']
                console.log(res.data.facilityList)
            }).catch(err => {
                alert(err);
                console.log(err);
            })
    },

}
</script>

<style>
.facility {
  width: 1024px;
  margin: 10px auto;
}
.facility h2 {
  text-align: center;
  margin-bottom: 30px;
}
</style>