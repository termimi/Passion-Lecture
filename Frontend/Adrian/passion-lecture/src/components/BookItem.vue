
<script setup>
import BookItemReviews from '@/components/BookItemReviews.vue';
import Header from '@/components/Header.vue';
</script>

<script>
import axios  from 'axios';

export default{
    data(){
        return{
            token: localStorage.getItem('token'),
            showDetails:false,
            book: null,
            author: null,
            publisher: null,
            category: null,
            user: null,
            year:null,
            note:null,
            assessments: [],
            averageRating: 0,
        };
    },
    mounted() {
        if (!this.token) {
            alert("Vous n'êtes pas autorisé à accéder à cette page !");
            this.$router.push({ name: 'home' });
        }
        else {
            this.getBookDetails();
        }
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

                localStorage.setItem('authorName', this.author.name);
                localStorage.setItem('publisherName', this.publisher.name);
                localStorage.setItem('categoryName', this.category.name);
                await this.fetchAssessments(this.book.id);
                await this.getUserName(this.book.customer_id);

                this.calculateRatings();

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
        },
        async getUserName(userId) {
            try {
                // Requete GET pour récupérer les informations de l'utilisateur
                const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
                const userR = response.data.data;
                this.user = userR.pseudo;
                console.log(this.user)
            } catch (error) {
                console.error(`Erreur lors de la récupération de la catégorie du livre  :`, error);
            }
        },
        async fetchAssessments(bookId) {
      try {
        const response = await axios.get('http://localhost:3000/api/assessments/');
        this.assessments = response.data.data.filter(assessment => assessment.book_id == bookId);
        console.log(this.assessments);
      } catch (error) {
        console.error('Error al recuperar evaluaciones del libro:', error);
      }
    },
        calculateRatings() {
            if (this.assessments.length > 0) {
        const totalRating = this.assessments.reduce((total, assessment) => total + assessment.assessment, 0);
        this.averageRating = (totalRating / this.assessments.length).toFixed(2);
      } else {
        this.averageRating = '0 ';
      }

            //this.book.average_ratings= this.commentRating / this.numberRating;
        },
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
                    <li>Année d'édition : {{ book.year_of_publication }}</li>
                    <li>Nombre de pages : {{ book.number_of_pages }}</li>
                    <li>
                    <a @click="redirectToExtract">{{ book.extract_pdf }}</a>
                    </li>                    
                    <li>Moyenne appreciation : {{ averageRating }}</li>
                    <li>Résumé : {{ book.summary }}</li>
                    <li>Utilisateur: {{ user }}</li>
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
.bookItemButton  {
  background-color: #504c64;
  color: white;
  height: 50px;
  padding: 8px 16px;
  border: 2px solid white;
border-radius: 20px;
  cursor: pointer;
  margin-left: 210px;
}

.bookItemButton:hover {
  background-color: black;
}


</style>