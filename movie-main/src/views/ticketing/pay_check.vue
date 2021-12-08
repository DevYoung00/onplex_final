<template>
  <div calss="pay_check">
    <!-- <div class="pay_check_movie">
        영화 제목 : {{pay_list[0].mov_name}}

    </div>
    <div class="pay_check_theater">
        극장 이름 : {{pay_list[0].}}
    </div> -->
  </div>
</template>

<script>
export default {
    name:pay_check,
    data(){
        return{
            pay_list:[],

        }
    },
    created(){
        axios.get('http://localhost:8004/member/mypage',{withCredentials:true})
         .then((res) => {
                this.pay_list = res.data.ticket
                console.log(res.data)
                
            }).catch(console.log(err))
    }


}
</script>

<style>

</style>