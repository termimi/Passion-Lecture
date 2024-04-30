<template>
    <section class="book-section">
        <div class="book-details">
            <h2>Book Title</h2>
            <p>Book Description</p>
            <button >Voir-plus</button> 
        </div>
        <div class="book-cover" :style="{backgroundImage:'url(./src/assets/book1.png)'}"></div>        
    </section>
</template>

<style scooped>
.book-section{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #333;
    background-size: cover;
    padding: 50px;
    
}

.book-details{
    flex:1;
    text-align: center;
    color: black;
}

.book-cover{
    width: 200px;
    height: 300px;
    background-size: cover;
    transform: rotate(45deg);
    filter: blur(5px);
    margin-left: 0;    
    }
</style>