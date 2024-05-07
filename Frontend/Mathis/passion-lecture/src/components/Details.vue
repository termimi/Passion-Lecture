<template>
    <div>
        <h1>Détails du livre</h1>
        <div v-if="book">
            <div>
                <img v-if="book.cover_image" :src="book.cover_image" alt="Image de couverture">
            </div>
            <div>
                <p>Titre : {{ book.title }}</p>
            </div>
            <div>
                <p>Catégorie : {{ category.name }}</p>
            </div>
            <div>
                <p>Auteur : {{ author.name }}</p>
            </div>
            <div>
                <p>Editeur : {{ publisher.name }}</p>
            </div>
            <div>
                <p>Nombre de pages : {{ book.number_of_pages }}</p>
            </div>
            <div>
                <p>Moyenne d'appréciations : {{ book.average_ratings }}</p>
            </div>
            <div>
                <p>Extrait : {{ book.extract_pdf }}</p>
            </div>
            <div>
                <p>Résumé : {{ book.summary }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            book: null,
            author: null,
            publisher: null,
            category: null
        };
    },
    mounted() {
        this.getBookDetails();
    },
    methods: {
        // Prend les informations générales pour le livre
        async getBookDetails() {
            const bookId = this.$route.params.id;
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
        }
    }
};
</script>
