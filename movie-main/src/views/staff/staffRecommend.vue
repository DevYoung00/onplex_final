<template>
<div>
  <staff_header/>
  <div class="staff_reco">
    <div class="month_beststaff">
      <div> ONPLEX {{staff_info.branch_name}}점&nbsp;{{staff_info.depart_name}}부</div>
      <div>
        <v-select :items="months" prepend-icon="mdi-calendar-check" solo v-model="select_month" style="width:150px;"></v-select>
        <span> 의 우수 직원은 {{getBest(select_month)}} 입니다. </span>
        <!-- {{getBest(select_month)}} {{select_month}} {{getMonth(rank[1].dates) === select_month}} -->
      </div>
    </div>
    <div>
        <v-card>
              <v-card-title>
                  <span class="recom_title">{{staff_info.branch_name}}점&nbsp;{{staff_info.depart_name}}부 직원 추천</span>
                  <v-spacer></v-spacer>
                  <v-text-field v-model="search" append-icon="mdi-magnify" label="이름을 검색해주세요." single-line hide-details></v-text-field>
              </v-card-title>
              <v-data-table v-model="check_reco" :headers="headers" :items="staff_list" item-key="staff_name" :search="search" 
                checkbox-color="gray"  show-select single-select hide-default-footer></v-data-table>
              <v-btn class="submit_recom" color="red lighten-3" outlined large @click="staff_submit()">추천하기 <v-icon right>mdi-thumb-up-outline</v-icon> </v-btn>
          </v-card>
          <!-- <span>{{parseInt(getName(check_reco,'staff_id'))}}</span> -->
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import staff_header from '@/staff_header.vue'
export default {
    name: 'staffRecommend',
      data () {

      return {
        search: '',
        staff_list: [],
        staff_info: [],
        recom: [],
        rank:[],
        check_reco:null,
        select_month:'11월',
        months: [
          '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월','11월', '12월'
        ]

    }

  },
  computed: {
      headers() {
        return [
          {text: '이름', sortable: false, align: 'start', value: 'staff_name',},
          // { text: '부서', value: 'depart_name' },
          { text: '직급', value: 'position_name' },
        ]
      } 
  },
  components:{
    staff_header
  },
  created(){
    axios.get('http://localhost:8004/staff/rank', {withCredentials:true})
        
            .then((res) => {
                this.staff_list = res.data.coworker
                this.staff_info = res.data.staff
                this.recom = res.data.recommend
                this.rank = res.data.rank
                console.log(res.data)
            }).catch(console.log('error'))
  },
  methods:{
    staff_submit(){
        
        axios.post('http://localhost:8004/staff/recommend',{
          // staffId: this.staff_info.staff_id,
          branchId: this.staff_info.branch_id,
          dates: this.getToday(),
          recommendId: parseInt(this.getName(this.check_reco, 'staff_id')),
          departId : this.staff_info.depart_id,
        },{withCredentials:true})
            .then(res => {
                        console.log(res.data)
                        alert('추천이 완료되었습니다.')
                    }).catch(console.log('error'))
    },
    checkClick(event){
          for(let i=0; i<this.checkedValues.length;i++){
            if(this.checkedValues[i] !== event.target.value){
            console.log(this.checkedValues[i])
            this.checkedValues.splice(i,1);
            }
      }
    },
    getName(arr, val) {

      if (arr === null){
        return 0
      } else {
        var please = arr[0][val]
        return please
      }

    },
    getToday() {
      let date = new Date()
      let year = date.getFullYear()
      let month = ("0" + (1+date.getMonth())).slice(-2)
      let day = ("0" + date.getDate()).slice(-2)

      return year + "-" + month + "-" + day
    },
    getMonthstr(val){
        let valarr = val.split("-")
        return valarr[1] + "월"
    },
    whoBest(id) {
        const coworkarr = this.staff_list
        for(let i=0; i<coworkarr.length; i++) {
            if(coworkarr[i].staff_id === id) {
              return i
            }
        }
    },
    getBest(date) {
      const rankarr = this.rank
      const coworkarr = this.staff_list
      let max = 0
      let idx = 0
      let arr = []
      let rankstr = ''
      for (let i=0; i<rankarr.length; i++){
          if (this.getMonthstr(rankarr[i].dates) === date){
              if(max < rankarr[i].recnt) {
                max = rankarr[i].recnt
                idx = i
              } else if (max === rankarr[i].recent) {
                  arr.push(rankarr[i].recommend_id)
              }
          }
      }
      if(arr.length > 1) {
          for(let i=0; i<arr.length; i++){
             rankstr += coworkarr[this.whoBest(rankarr[arr[i]].recommend_id)].staff_name + coworkarr[this.whoBest(rankarr[arr[i]].recommend_id)].position_name+"님,"
          }
          return rankstr.slice(0, rankstr.length-1)
      } else {
          return coworkarr[this.whoBest(rankarr[idx].recommend_id)].staff_name + coworkarr[this.whoBest(rankarr[idx].recommend_id)].position_name + "님"
      }
    }
  }

}
</script>

<style>
.staff_reco {
  width: 1024px;
  margin: 30px auto;
}
.submit_recom{
  right:-890px; 
  margin-bottom:10px;
}

</style>