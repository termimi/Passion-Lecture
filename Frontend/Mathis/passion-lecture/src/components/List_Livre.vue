<template>
    <div>
        <!-- Affichage des livres par catégorie -->
        <div v-for="(categoryBooks, categoryName) in booksByCategory" :key="categoryName">
            <!-- Affichage de la catégorie -->
            <h2>{{ categoryName }} :</h2>
            <ul class="book-list">
                <!-- Affichage des livres -->
                <li v-for="book in categoryBooks" :key="book.id" class="book-item">
                    <div>
                        <!-- Afficher l'image de couverture -->
                        <img v-if="book.cover_image" :src="book.cover_image" alt="Image de couverture"
                            style="max-width: 200px;">
                    </div>
                    <div>
                        <strong>Titre :</strong> {{ book.title }}
                    </div>
                    <div>
                        <strong>Auteur :</strong> {{ book.author.name }}
                    </div>
                    <div>
                        <strong>Utilisateur :</strong> {{ book.customer.pseudo }}
                    </div>
                </li>
            </ul>
            <hr>
        </div>
    </div>
</template>

<style scoped>
.book-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* Pour aligner les livres horizontalement avec un espacement équitable */
}

.book-item {
    width: calc(33.33% - 20px);
    /* Pour que chaque livre occupe environ un tiers de l'espace, en tenant compte de la marge */
    margin-bottom: 20px;
    /* Espacement entre les livres */
}
</style>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            //Objet qui stock les livres pour chaques catégorie
            booksByCategory: {}
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
    }
};
</script>
