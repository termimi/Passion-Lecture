<template>
    <section class="bookItem">
        <div class="bookItemImg" :style="{backgroundImage:'url(./src/assets/book1.png)'}"></div>                  
        <div class="bookItemInfo">
        </div>
    </section>
    <section class="reviewsSection">
        <div class="review"></div>
        <div class="reviewsList"></div>
    </section>
</template>

<style scooped>
.bookItemImg{
    height: 400px;
    width: 300px;
    margin: 10px;
}
</style>