<template>
    <section class="list">
        <div class="title">
                <h1>Livres</h1>
        </div>

        <div class="bookListComplet">
            
        <!-- Affichage des livres par catégorie -->
        <div v-for="(categoryBooks, categoryName) in booksByCategory" :key="categoryName">
            <h2>{{ categoryName }} :</h2>
            <ul class="book-list">
                <li v-for="book in categoryBooks" :key="book.id" class="book-item">
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
                    <button class="buttonBook" @click="navigateAndReload(book.id)" >
                    Voir les détails
                </button> 
                </li>
            </ul>
            <hr>
        </div>
    </div>
    </section>
    
</template>

<style scoped>
.list{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.bookListComplet{
    display: flex;
    flex-direction: column;
    width: 1000px;
    justify-self: center;
 
    
}
.title{
    width: 100%;
    text-align: center;
    background-color: #504c64;
    height: 200px;
    border-bottom: 1px solid white; 
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    }
hr{
    width: 1000px;
}
h1{
    color: white;
}
.book-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
}

img {
    max-height: 250px;
}
h2{
    color:white;
    
    
}
.book-item {
    margin-bottom: 20px;
    margin-right: 25px;
    color: white;
}
.buttonBook{
    background-color: #504c64;
    color: white;
    height: 30px;
    padding: 8px 16px;
    border: 2px solid white;
    border-radius: 20px;
    cursor: pointer;
    margin-top: 10px
}
.buttonBook:hover{
    background-color: black;
}
</style>


<script>
import axios from 'axios';
export default {
    data() {
        return {
            //Objet qui stock les livres pour chaques catégorie
            booksByCategory: {},
            //Stock les détails du livre
            selectedBook: null
        };
    },

    //Permet d'utiliser la methode quand le composant est monté
    mounted() {
        this.getBooksByCategory();
    },
    methods: {

        //Prend tout les livres pour chaque catégorie
        async getBooksByCategory() {
            try {
                //Get pour prendre toutes les catégories
                const categoriesResponse = await axios.get('http://localhost:3000/api/categorys');

                //Prend chaque livre individuellement pour chaque catégorie
                for (const category of categoriesResponse.data.data) {
                    const books = await this.getBooksForCategory(category.id);
                    this.booksByCategory[category.name] = books;
                }

                //Message d'erreur    
            } catch (error) {
                console.error('Erreur lors de la récupération des livres par catégorie :', error);
            }
        },
        //Prend tout les info des livres 
        async getBooksForCategory(categoryId) {
            try {
                //Get pour prendre les infos des livres de chaque catégorie
                const response = await axios.get(`http://localhost:3000/api/categorys/${categoryId}/books`);

                //Retourne les info des livres (titre, auteur, etc)
                const books = response.data.data;

                //Récupére les info de l'auteur 
                await this.getAuthorsNames(books);

                //Récupére les info de l'utilisateur 
                await this.getCustomerNames(books);

                return books;

                //Message d'erreur 
            } catch (error) {
                console.error('Erreur lors de la récupération des livres pour la catégorie :', categoryId, error);
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
        navigateAndReload(bookId) {
            this.$router.push({ name: 'bookItem', params: { id: bookId } }).then(() => {
            window.location.reload();})
        },

    }
};
</script>
