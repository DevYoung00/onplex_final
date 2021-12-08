<template>
    <ul class="showcase">
        <li>
            <div class="seat"></div>
            <small>예매 가능 좌석</small>
        </li>
        <li>
            <div class="seat selected"></div>
            <small>선택된 좌석</small>
        </li>
        <li>
            <div class="seat occupied"></div>
            <small>예매 완료 좌석</small>
        </li>
    </ul>
</template>

<script>
export default {
    name:'showcase'
}
</script>