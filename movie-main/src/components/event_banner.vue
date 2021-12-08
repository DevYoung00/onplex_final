<template>
    <div class="event_banner">
        <div class="sec_tit">
            <span>이벤트</span>
            <router-link :to="{name: 'EventPage'}" class="btn_txt_more" style="color: gray">더보기 ></router-link>
        </div>
        <div class="banner_img">
                <img src="@/assets/images/event_banner.jpg">
        </div>
    </div>
</template>

<script>
export default {
    name: 'Event_banner'
}
</script>

<style>
@import '../assets/styles/common.css';
.event_banner {position:relative; top:0px; border-top:3px dotted darkgray; width:100%; height:400px; 
                margin:0 auto; text-align: center; padding-top:40px;}
.sec_tit {position:relative; width:1024px; margin:0 auto;}
.sec_tit > span {position:absolute; left:0; font-family:'a옛날사진관3'; font-size:25px; top:30px; border-bottom:2px solid #FF1744;}
.banner_img {position: relative; top:100px; margin:0 auto;}
.banner_img img{width:1024px;}
.btn_txt_more {border:0 none; width:auto; top:70px; font-size:16px;
                position: absolute; right:0; color: gray;}

</style>