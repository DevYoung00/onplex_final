<template>
    <div>
          <Base_Header/>
        <div  class="specialhall">
            <span> 스페셜관 </span>
            <Hall_slider/>
        </div>
    </div>
</template>

<script>
import Hall_slider from '@/components/special_hall/hall_slider.vue'
import Base_Header from '@/Header_ty2.vue'

export default {
    name:'SpecialHall',
    components: {
        Hall_slider,
        Base_Header
    }
}
</script>

<style>
    .specialhall {position:relative; width:1024px; margin:0 auto; padding-top:20px;}
    .specialhall > span {position:absolute; left:10px; font-family:'a옛날사진관3'; font-size:25px; border-bottom:2px solid #FF1744;}
</style>