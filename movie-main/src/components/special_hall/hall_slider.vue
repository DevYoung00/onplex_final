<!-- 슬라이드 변경 -->

<template>
    <v-carousel class="hall_slide" cycle width="900px" height="636.5px" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item><img src="@/assets/images/3D.jpg"></v-carousel-item>
        <v-carousel-item><img src="@/assets/images/4D.jpg"></v-carousel-item>
        <v-carousel-item><img src="@/assets/images/IMAX.jpg"></v-carousel-item>
        <v-carousel-item><img src="@/assets/images/VR.jpg"></v-carousel-item>
    </v-carousel>
</template>

<script>
   export default {
        name: 'Hall_slider',

    }
</script>
<style>
    .hall_slide {padding-top:80px;}
    .hall_slide img{width:100%;}
</style>