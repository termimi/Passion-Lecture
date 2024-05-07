<template>
    <section class="bookItem">
        <div class="bookItemImg" :style="{backgroundImage:'url(./src/assets/book1.png)'}"></div>                  
        <div class="bookItemInfo">
            <h1 class="bookItemTitle">Sherlock Holmes</h1>
            <h3 class="bookItemAuthor">Arthur Conan Doyle</h3>
            <h4 class="bookItemCategory">Categorie : Mistery</h4>
            <button @click="showMoreDetails" class="bookItemButton">Plus de détails</button>
            <div v-if="showDetails" class="more-details">
                <ul>
                    <li>Editeur : </li>
                    <li>Nombre de pages : </li>
                    <li>Année d'édition : </li>
                    <li>Extrait : </li>
                    <li>Nombre appreciation : </li>
                    <li>Moyenne appreciation : </li>
                    <li>Résumé : </li>
                </ul>
            </div>        
        </div>
    </section>
    <section class="reviewsSection">
        <div class="review"></div>
        <div class="reviewsList"></div>
    </section>
</template>

<script>
    export default{
    props: {
        book: Object
    },
    data(){
        return{
            showDetails:false
        };
    },
    methods:{
        showMoreDetails(){
            this.showDetails = !this.showDetails;
        }
    }
};
</script>

<style scooped>
.bookItemImg{
    height: 400px;
    width: 300px;
    margin-right: 50px;
    margin-left: -100px;
    
}
.bookItem{
    background-color: black;
    display: flex;
    justify-content: center;
    padding: 20px;
    align-items: start;
    width: 100%;
    
}
.bookItemInfo{
    color: white;
}
.bookItemTitle{
    font-size: 24px;
    margin-top: 5px;
    
}
.bookItemAuthor{
    font-size:18px;
    margin-bottom: 10px;
}
.bookItemCategory{
    font-size: 14px;
    margin-bottom: 35px;
}
.more-details {
  margin-top: 10px;
}

.more-details ul {
  list-style-type: none;
  padding: 0;
}

.more-details ul li {
  margin-bottom: 5px;
}
.bookItemButton{

    width: 100px;
    height: 40px;
    border: none;
    border-radius: 20px;
    background-color: white;
    color : black;}
</style>