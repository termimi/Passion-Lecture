
<script setup>
import BookItemReviews from '@/components/BookItemReviews.vue';
</script>

<script>
import axios  from 'axios';

    export default{
        component:{
  },
    data(){
        return{
            showDetails:false,
            book: null,
            author: null,
            publisher: null,
            category: null
        };
    },
    mounted() {
        this.getBookDetails();
    },
    methods:{
        showMoreDetails(){
            this.showDetails = !this.showDetails;
        },
                // Prend les informations générales pour le livre
                async getBookDetails() {
            const bookId = this.$route.params.id;
            localStorage.setItem('bookId', this.$route.params.id);

            try {
                const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
                this.book = response.data.data;

                await this.getAuthorsNames(this.book.author_id);
                await this.getPublisherNames(this.book.publisher_id);
                await this.getCategoryNames(this.book.category_id);

            } catch (error) {
                console.error('Erreur lors de la récupération des détails du livre :', error);
            }
        },
        // Prend les informations de l'auteur pour le livre
        async getAuthorsNames(authorId) {
            try {
                // Requête GET pour récupérer les informations de l'auteur
                const response = await axios.get(`http://localhost:3000/api/authors/${authorId}`);
                this.author = response.data.data;
            } catch (error) {
                console.error(`Erreur lors de la récupération de l'auteur :`, error);
            }
        },
        //Prend les informations de l'éditeur pour le livre
        async getPublisherNames(publisherId) {

            try {
                // Requete GET pour récupérer les informations de l'éditeur
                const response = await axios.get(`http://localhost:3000/api/publishers/${publisherId}`);
                this.publisher = response.data.data;
            } catch (error) {
                console.error(`Erreur lors de la récupération de l'éditeur du livre ${book.title} :`, error);
            }
        },
        //Prend les informations de la catégorie pour le livre
        async getCategoryNames(categoryId) {
            try {
                // Requete GET pour récupérer les informations de la category
                const response = await axios.get(`http://localhost:3000/api/categorys/${categoryId}`);
                this.category = response.data.data;
            } catch (error) {
                console.error(`Erreur lors de la récupération de la catégorie du livre ${book.title} :`, error);
            }
        },
        redirectToExtract() {
            window.location.href = this.book.extract_pdf;
        }
    }
};
</script>

<template>
    <section class="bookItem" v-if="book">
        <!--<div class="bookItemImg" :style="{backgroundImage:'url(./src/assets/book1.png)'}"></div> -->
        <img v-if="book.cover_image" :src="book.cover_image" alt="Image de couverture" class="bookItemImg">
        <div class="bookItemInfo">
            <h1 class="bookItemTitle">{{book.title}}</h1>
            <h3 class="bookItemAuthor">{{ author.name }}</h3>
            <h4 class="bookItemCategory">Catégorie : {{ category.name }}</h4>
            <button @click="showMoreDetails" class="bookItemButton">Plus de détails</button>
            <div v-if="showDetails" class="more-details">
                <ul>
                    <li>Editeur : {{ publisher.name }}</li>
                    <li>Année d'édition : </li>
                    <li>Nombre de pages : {{ book.number_of_pages }}</li>
                    <li>
                    <a @click="redirectToExtract">{{ book.extract_pdf }}</a>
                    </li>                    
                    <li>Nombre appreciation : </li>
                    <li>Moyenne appreciation : {{ book.average_ratings }}</li>
                    <li>Résumé : {{ book.summary }}</li>
                </ul>
            </div>        
        </div>
    </section>
    <BookItemReviews></BookItemReviews>

</template>


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