<template>
  <div>
      <li v-for="review in reviews" :key="review.review_id" class="item">
         {{review.mov_review}}
          </li>
  </div>
</template>

<script>
export default {
    name:reviewText,
      created() {
        // 컴포넌트가 생성될때, /api/movies에 요청을 보냄
         axios.get('http://localhost:8004/movie/review')
        
            .then((res) => {
                this.reviews = res.data.review
                console.log(res.data.review)
                
            }).catch(console.log(err))

    },
    data(){
        return {
            
            reviews:[],
    
        }
    }


}
</script>

<style>

</style>