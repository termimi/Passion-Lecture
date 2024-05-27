<template>
    <div class="booksMoment">
        <h2>Livres du moments </h2>
        <ul class="book-list">
            <li v-for="book in latestBooks" :key="book.id" class="book-item">
                <div>
                    <img v-if="book.cover_image" :src="book.cover_image" alt="Image de couverture">
                </div>
                <div>
                    <p>Titre : {{ book.title }}</p>
                </div>
                <div>
                    <p>Auteur : {{ book.author.name }}</p>
                </div>
                <div>
                    <p>Utilisateur : {{ book.customer.pseudo }}</p>
                </div>
                <!-- Voir détails -->
                <router-link :to="{ name: 'bookItem', params: { id: book.id } }">Voir les détails</router-link>
            </li>
        </ul>
    </div>
</template>


<style scoped>
.booksMoment{
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    flex-direction: column;
    align-items: center;
    
}
.book-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

img {
    max-width: 200px;
}
h2{
    color:white;
    margin-bottom: 20px;
    
    
}
.book-item {
    margin-bottom: 20px;
    margin-right: 25px;
    color: white;
}
</style>


<script>
import axios from 'axios';
export default {
    data() {
        return {
            latestBooks: []
        };
    },

    //Permet d'utiliser la methode quand le composant est monté
    mounted() {
        this.getBooksLatest();
    },
    methods: {

        //Prend les 6 dernier livres
        async getBooksLatest() {
            try {
                const response = await axios.get('http://localhost:3000/api/books/latest/latest');
                const books = response.data.data;

                // Récupère les auteurs et utilisateurs pour les livres
                await this.getAuthorsNames(books);
                await this.getCustomerNames(books);
                this.latestBooks = books;

            } catch (error) {
                console.error('Erreur lors de la récupération des derniers livres :', error);
            }
        },
        
        //Prend les informations de l'autheur pour le livre
        async getAuthorsNames(books) {
            for (let book of books) {
                try {

                    //GET pour récupérer les informations de l'auteur
                    const response = await axios.get(`http://localhost:3000/api/authors/${book.author_id}`);
                    book.author = response.data.data;

                }
                catch (error) {
                    console.error(`Erreur lors de la récupération de l'auteur du livre ${book.title} :`, error);
                }
            }
            return books;
        },
        //Prend les informations de l'utilisateur pour le livre
        async getCustomerNames(books) {
            for (let book of books) {
                try {

                    //GET pour récupérer les informations de l'utilisateur
                    const response = await axios.get(`http://localhost:3000/api/users/${book.customer_id}`);
                    book.customer = response.data.data;
                }
                catch (error) {
                    console.error(`Erreur lors de la récupération de l'utilisateur du livre ${book.title} :`, error);
                }
            }
            return books;
        },

    }
};
</script>
