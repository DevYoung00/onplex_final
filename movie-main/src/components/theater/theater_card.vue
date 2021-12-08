<template>
<div id="theatercard">
   <v-app id="inspire">
    <v-tabs class="theater_card_tabs" color="indigo lighten-3"> 
      <v-tab>서울/경기/인천</v-tab>
      <v-tab>대전/충청/강원</v-tab>
      <v-tab>대구/부산/울산/경상</v-tab>
      <v-tab>광주/전라/제주</v-tab>
     <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <div v-for="theater_1 in theaters.slice(0,3)" :key="theater_1.branch_id" class="btn_list">
                          <v-btn
                          max-width="100px"
                           @click="isClicked(theater_1.branch_id)" plain>{{theater_1.branch_name}}</v-btn>
                     
                        </div>
                </v-card-text>
                </v-card>
            </v-tab-item>
                 <v-tab-item>
                <v-card flat>
                    <v-card-text>
                           <div v-for="theater_2 in theaters.slice(3,6)" :key="theater_2.branch_id" class="btn_list">
                          <v-btn  @click="isClicked(theater_2.branch_id)" plain>{{theater_2.branch_name}}</v-btn>
                        </div>
                </v-card-text>
                </v-card>
            </v-tab-item>
                 <v-tab-item>
                <v-card flat>
                    <v-card-text>
                           <div v-for="theater_3 in theaters.slice(6,10)" :key="theater_3.branch_id" class="btn_list">
                          <v-btn @click="isClicked(theater_3.branch_id)" plain>{{theater_3.branch_name}}</v-btn>
                        </div>
                </v-card-text>
                </v-card>
            </v-tab-item>
                 <v-tab-item>
                <v-card flat>
                    <v-card-text>
                           <div v-for="theater_4 in theaters.slice(10,13)" :key="theater_4.branch_id" class="btn_list">
                          <v-btn @click="isClicked(theater_4.branch_id)" plain>{{theater_4.branch_name}}</v-btn>
                        </div>
                </v-card-text>
                </v-card>
            </v-tab-item>
    </v-tabs>
       <v-card flat class="theater_info_card">
            <div v-for="theater in theaters" :key="theater.branch_id">
              <div v-if="now_Theater === theater.branch_id">
              <div class="card_text">
                <h2>{{theater.branch_name}}점의 정보</h2>
                  극장 이름: {{theater.branch_name}}점
                  <br><br>
                  극장 위치:  {{theater.branch_adr}}
                  <br><br>
                  극장 전화번호: {{theater.branch_num}}
                  <br><br>
               
              </div>
            </div>
            </div>
             </v-card>
            

                        <!-- <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr> 
                                        <th class="text-left"> 날짜 </th>
                                        <th class="text-left"> 영화 </th>
                                        <th class="text-left"> 지점 </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   
                                </tbody>
                            </template>
                        </v-simple-table> -->
 
    <!-- <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <template v-slot:default>
            <div v-for="theater1 in theaters" :key="theater1.branch_id">
              {{theater1.branch_name}}
            </div>
          </template>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->
  </v-app>
<!--    <div v-for="theater in theaters" :key="theater.branch_id" class="item">
      
        <v-dialog
          transition="dialog-bottom-transition"
          width="500px"
          heigth ="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <div class="th_btn">
            <v-btn
              plain
              v-bind="attrs"
              v-on="on"
            >{{theater.branch_name}}</v-btn>
             </div>
          </template>
          <template v-slot:default="dialog">
            
            <div class="theater-detail-card">
              <div class="theater-detail-toolbar">
                <v-toobar
                  icon
                  dark
                > {{theater.branch_name}} 의 정보
                </v-toobar>
              </div>
              <div class="card_text">
                  극장 이름: {{theater.branch_name}}
                  <br><br>
                  극장 위치:  {{theater.branch_adr}}
                  <br><br>
                  극장 전화번호: {{theater.branch_num}}
                  <br><br>
              </div>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  @click="dialog.value = false"
                >Close</v-btn>
              </v-card-actions>
          </div>
          </template>
        </v-dialog>
      </div> --> 
</div>

</template>

<script>
import axios from 'axios';
export default {
  name:'Theater_card',
  components:{

  },
    created() {
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
         axios.get('http://localhost:8004/branch/list')
        
            .then((res) => {
                this.theaters = res.data.branchList
                console.log(res.data)
         
                
            }).catch(console.log(err))
    },
  data(){
    return {
      theaters:[],
      now_Theater : "",
    }
  },
  computed:{
   
  },
  methods:{
    isClicked(item){
      this.now_Theater = item
    },
     NewArr(num1,num2){
      return this.theaters.slice(num1,num2)
    }
  }
  /*props:{
    theater:{
      type:Object,
      required:true,
    },*/
  /*data(){
      

  }*/

}
</script>

<style>

#theatercard{
  text-align: center;
  font-family: 'GmarketSansMedium';
  display: flex;
  justify-content: center;
}


.btn_list{
  float:left;
  margin:10px;

}
.theater_card_tabs{
 font-family: 'GmarketSansMedium';
 margin-top:10px;

}
.theater_info_card{
  position:absolute;
  top:-350px;
   font-family: 'GmarketSansMedium';
}

</style>