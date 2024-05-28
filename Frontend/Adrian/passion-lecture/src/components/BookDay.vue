
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
    created(){
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
            const bookId = 2;
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
        navigateAndReload(bookId) {
            this.$router.push({ name: 'bookItem', params: { id: bookId } }).then(() => {
            window.location.reload();})
        },
    }
}
</script>


<template>
    <section class="book-section" v-if="book">
        <img v-if="book.cover_image" :src="book.cover_image" alt="Image de couverture" class="book-cover-bg">

              
        <div class="book-details">  
                    <img v-if="book.cover_image" :src="book.cover_image" alt="Image de couverture" class="book-cover-day">

            <div class="book-day-info">
                <h1 style="color: white;">{{ book.title }}</h1>
                <div>
                    <p style="color: white;">{{ author.name }}</p>
                </div>
                <p style="color: white;" >{{book.summary}}</p>
                <button class="buttonBookDay" @click="navigateAndReload(book.id)" >
                    Voir les détails
                </button> 
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
    border-bottom: 1px solid white; 

      
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
      background-color: #504c64;
    color: white;
    height: 50px;
    padding: 8px 16px;
    border: 2px solid white;
  border-radius: 20px;
    cursor: pointer;
    margin-top: 15px;
    margin-bottom: 20px;
    margin-left: 300px; 
    margin-top:100px;
  }
  .buttonBookDay:hover{
      background-color: black;
  }
</style>