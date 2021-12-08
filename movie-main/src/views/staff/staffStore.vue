<template>
    <div class="all_store_block">
        <staff_header/>
        <h2>{{stores[0].branch_name}}점의 시설물 관리</h2>
        <v-card class="store_block">
            <v-tabs vertical>
                <v-tab v-for="store in stores" :key="store.store_id"> {{store.store_name}} </v-tab>
                <v-tab-item v-for="store in stores" :key="store.store_id">
                    <v-card flat>
                        <v-card-text> 
                            <ul>
                                <li style="margin:5px; margin-bottom:10px;"><span class="store_title" style="color:black; font-size:20px;"> {{store.store_name}} </span> <span>| {{store.store_type}}</span></li>
                                <li style="margin:5px; margin-bottom:10px"><span class="store_title"> 영업시간 | </span> <span style="color:black; font-size:20px;">{{store.open_time}} ~ {{store.close_time}}</span></li>
                                <li style="margin:5px; margin-bottom:10px"><span class="store_title"> 대표자 | </span> <span style="color:black; font-size:20px;">{{store.store_represent}}</span></li>
                                <li style="margin:5px; margin-bottom:10px"><span class="store_title"> 위치 | </span> <span style="color:black; font-size:20px;"> {{store.branch_name}} {{store.store_floor}}</span></li>
                                <li style="margin:5px; margin-bottom:10px"><span class="store_title"> 임대정보 | </span> </li>
                            </ul>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr> 
                                            <th class="text-center"> 임대날짜 </th>
                                            <th class="text-center"> 임대료 </th>
                                            <th class="text-center"> 최근입금날짜 </th>
                                            <th class="text-center">면적</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-center"> {{ store.store_rentaldate }} </td>
                                            <td class="text-center"> {{ store.store_rentalfee }}원 </td>
                                            <td class="text-center"> {{ store.store_deposit }} </td>
                                            <td class="text-center"> {{ store.store_area }}㎡ </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <v-btn color="primary" style="float:right; margin-bottom:10px;" outlined width="100px" @click="salesdial = true"> 매출관리 </v-btn>
                            <v-dialog v-model="salesdial" max-width="800">
                                <v-card>
                                    <v-card-title> 
                                        <span> 매출관리 </span>
                                        <v-spacer></v-spacer>
                                        <v-btn icon @click="salesdial = false"> <v-icon>mdi-close</v-icon></v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-date-picker 
                                        v-model="datepick"
                                        :picker-date.sync="pickerDate" 
                                        color="blue-grey darken-1"></v-date-picker>
                                        <v-divider></v-divider>
                                        <span class="store_subtitle"> 당일매출 </span> <span style="color:black; font-size: 20px;">{{sales[getIdx(store.store_id, datepick)].date_sales}}원</span>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                            <!-- <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="modal_id">매출관리</button> -->
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
        <!-- <div class="modal fade" id="modal_id" tabindex="-1" aria-labelledby="modal_label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal_label" style="font-weight: bold;">매출관리</h5>
   
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="gosales"></button>
                    </div>
                    <div class="modal-body">
                        <v-date-picker v-model="datepick" color="blue-grey darken-1"></v-date-picker>
                        <v-divider></v-divider>
                        <span class="store_title"> 당일매출 </span> 
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
import staff_header from '@/staff_header.vue'
import axios from 'axios'
import Staff_header from '../../staff_header.vue'

export default {
    data() {
        return {
            salesdial:false,
            datepick: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            pickerDate: null,
            stores: [],
            sales: [],
  
        }
    },
    created() {
      axios.get('http://localhost:8004/staff/store',{withCredentials:true})
            .then((res) => {
                this.stores = res.data.storeList
                this.sales = res.data.storeDetail
                console.log(res.data)
                
            }).catch(console.log(err))
    },
    methods: {
        getIdx(id, val) {
            const today_sales = this.sales
            let idx = 0
            for (let i=0; i<today_sales.length; i++) {
                if(today_sales[i].store_id === id && today_sales[i].dates === val) { 
                    idx = i
                }
                // else {return 0;}
            }
            return idx
    }

    },
    components: {
        staff_header
    }
}
</script>
<style>
.all_store_block h2 {
    text-align: center;
    margin-top:10px; margin-bottom: 30px;
}
.store_block {
    position: absolute;
    width: 1024px;
    margin:10px auto;
    left:50%; transform: translateX(-50%);
}
.store_subtitle {
    font-size: 20px; text-align: center;
}
</style>