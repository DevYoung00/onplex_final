<template>
    <div class="footer_section">
        <div class="footer">
            <a href="#" class="f_logo" :to="{name:'Home'}">
                <img src="@/assets/images/footlogo_white.png">
            </a>
            <span class="intro">
                <span>한양대학교 ERICA 소프트웨어학부</span>
                <span>난쏘공</span>
                <div>
                    <ul class="name">
                        <li>김채연</li> <li>유아영</li> <li>안세윤</li> <li>정유민</li> <li>정유진</li>
                    </ul>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name:"Main_Footer"
}
</script>

<style>
    .footer_section {position:relative; top:0; width:100%; height: 150px; background-color:white; margin:0 auto; 
                    text-align: center; background-color:white;}
    .footer {position:relative; display: block; width:1024px; margin:0 auto; padding-top:10px;}
    .f_logo {position:absolute; left:0; top:40px;}
    .f_logo img{width:200px;}

    .intro {position:absolute; right:0;  top:50px; padding-left:15px; color:rgb(119, 119, 119);background-color:rgba(163, 155, 155, 0.1);}
    .intro > span {margin-right:10px; font-weight: bold;}
    .intro .name > li {float:left; margin-right:15px; margin-top:10px;}
</style>
