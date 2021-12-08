<template>
    <div class="write_review">
        <div class="write_dial">
            <v-dialog persistent v-model="dialog" scrollable max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="red lighten-3" text v-bind="attrs" v-on="on" class="set_btn"
                            max-width="20px" max-height="20px" >
                        리뷰쓰기  <v-icon right>mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title><span>리뷰 쓰기</span></v-card-title>
                    <v-card-text>
                        <v-rating v-model="rating" length="5" color="yellow darken-2" background-color="grey lighten-1" size="40"></v-rating>
                        <v-textarea v-model="review" clearable clear-icon="mdi-close-circle" rows="2" no-resize counter="45"></v-textarea>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions> 
                        <v-spacer></v-spacer>
                        <v-btn color="darkgray" plain text @click="reset">취소</v-btn>
                        <v-btn :disabled="this.rating == '' || this.review == ''" color="success" text @click="save"> 등록 </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    props: {
        tkid:''
    },
    data() {
        return {
            dialog: false,
            rating: '',
            review: '',
        }
    },
    methods: {
        reset() {
            this.rating='';
            this.review='';
            this.dialog=false;
        },
        save() {
            console.log(this.tkid)
            console.log(this.rating)
            console.log(this.review)
            axios.post('http://localhost:8004/member/review',
            {ticketid : this.tkid,star : this.rating, review : this.review,},{withCredentials:true}
            )
            // axios({
            //     method: 'POST',
            //     url: 'http://localhost:8004/member/review',
            //     data: {
            //         ticketid : this.tkid,
            //         star : this.rating,
            //         review : this.review,
            //     },
                
            // })
            .then(
                this.dialog=false, location.reload()
            )
            .catch(
                err => console.log(err)
            )
        }
    }
}
</script>