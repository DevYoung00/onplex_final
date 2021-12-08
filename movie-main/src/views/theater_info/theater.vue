<template>
<div>
  <Base_Header/>
  <div class="theater">
      <h2>전체 극장</h2>

    <!--thater list-->
      
    
        <Theater_card/>
     
 
  </div>
</div>
</template>

<script>
//import { mapGetters } from 'vuex'

import Theater_card from '@/components/theater/theater_card.vue'
import Base_Header from '@/Header_ty2.vue'
export default {
  name:'Theater',
  components:{
    Theater_card,
    Base_Header
  }

}
</script>

<style>
  .theater{
    width:1024px;
    margin:0 auto;
    text-align: center;
  }
  .theater h2 {text-align: center; font-size:25px; margin-top: 20px; }
</style>