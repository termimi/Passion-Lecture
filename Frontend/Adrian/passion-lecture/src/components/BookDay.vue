<template>
    <section class="book-section">
        <div class="book-cover-bg" :style="{backgroundImage:'url(./src/assets/book1.png)'}"></div>                  
        <div class="book-details">  
            <div class="book-cover-day" :style="{backgroundImage:'url(./src/assets/book1.png)'}"></div>                   
            <div class="book-day-info">
                <h1 style="color: white;">Book Title</h1>
                <div>
                    <p style="color: white;">5/5 étoils</p>
                </div>
                <p style="color: white;" >Book Description</p>
                <button class="buttonBookDay">Voir-plus</button> 
            </div>            
        </div>
    </section>
</template>

<style scooped>
.book-section{
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: #504c64;
    background-size: cover;
    padding: 50px;  
    overflow: hidden;  
    height: 350px;  
      
}

.book-details{
    color: black;
    display: flex;
    justify-content: center;
    z-index: 1;
    position: absolute;

}
.book-day-info{
    text-align: left;
    margin-left: 50px;
}
.book-cover-bg{
    width: 500px;
    height: 600px;
    background-size: cover;
    transform: rotate(25deg);
    filter: blur(5px);
    position: absolute;
    margin-left: -850px;
    }
.book-cover-day{
    width: 200px;
    height: 300px;
    background-size: cover;
    
}
.buttonBookDay{
    margin-left: 300px; 
    margin-top:100px;
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 20px;
    background-color: white;
    color : black;
}
</style>