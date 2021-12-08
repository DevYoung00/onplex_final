<template>
    <div class=count_tiket>
        <v-icon large style="padding-right:5px"> mdi-account </v-icon>
        <v-btn color="white darken-4" v-on:click='decrease' small :disabled="counter<=0 ? true:false"> <v-icon>mdi-minus-thick</v-icon></v-btn>
        <span style="color:black"> {{ counter }} </span>
        <v-btn color="white darken-4" v-on:click="increase" small :disabled="counter>=8 ? true:false"> <v-icon>mdi-plus-thick</v-icon></v-btn>
    </div>
</template>
<script>
import { eventBus } from '@/main'
export default {
    name:'numTikets',
    data() {
        return {
            counter: 0,
            sel_num: 0,
        }
    },
    methods: {
        decrease() {
            // const select_seats = localStorage.getItem('seat')
            if(this.sel_num== this.counter) {
                alert("좌석 선택을 다시 시작합니다.")
                location.reload();
            } else {
                this.counter -= 1
                localStorage.setItem('counter', JSON.stringify(this.counter))
            }
        },
        increase() {
            this.counter += 1
            localStorage.setItem('counter', JSON.stringify(this.counter))
        }
    },
    created() {
        localStorage.setItem('counter', JSON.stringify(0))
        eventBus.$on('numSelect', (value) => {
            this.sel_num = value
        })
    }
}
</script>