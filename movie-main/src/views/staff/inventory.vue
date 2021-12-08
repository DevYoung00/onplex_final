<template>
<div>
  <staff_header/>
  <div class="inventory">
    <h2>{{this.name}}점의 재고관리</h2>
      <!-- <div class="li" v-for="inventory in inventories" :key="inventory.item_id">
      <v-btn
           width= "240px"
           height="30px">
           {{inventory.item_quantity}}
            </v-btn>
        
     
      </div>
  </div> -->
  <v-container grid-list-md>
      <v-layout row wrap>
          <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="inventories"
          :items-per-page="5">
          <template v-slot:items="props">
            <td :class="headers[0].class">{{ props.item.item_name}} </td>
            <td :class="headers[1].class">{{ props.item.item_quantity}}</td>
            <td :class="headers[2].class">{{ props.item.item_price}}</td>
            <td :class="headers[3].class">{{ props.item.supply_shop}}</td>
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
  name:'inventory',
  data(){
    return{
      inventories:[],
      name:'',
      headers:[
        {text: '상품 이름', value: 'item_name' , sortable:true},
        { text: '상품 수량 (개)', value: 'item_quantity' ,sortable:true},
        { text: '상품 가격 (원)', value: 'item_price' ,sortable:true},
        { text: '납품 업체', value: 'supply_shop',sortable:true },
       
      ],
   
      

    }
  },
  created() {
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
        axios.get('http://localhost:8004/staff/inventory',{withCredentials:true})
            .then((res) => {
                this.inventories = res.data.inventoryList;
                this.name = res.data.inventoryList[0]['branch_name']
                console.log(res.data.inventoryList);

            }).catch(err => {
                alert(err);
                console.log(err);
            })
    },
      components: {
    
        staff_header
    },
}
</script>
<style>
.inventory {
  width:1024px;
  margin: 10px auto;
}
.inventory h2{
  text-align: center;
  margin-bottom: 30px;
}
</style>