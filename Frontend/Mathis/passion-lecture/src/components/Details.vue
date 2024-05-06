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
                <p>Catégorie : {{ book.category_id }}</p>
            </div>
            <div>
                <p>Autheur : {{ book.author_id }}</p>
            </div>
            <div>
                <p>Editeur : {{ book.publisher_id }}</p>
            </div>
            <div>
                <p>Nombre de pages : {{ book.number_of_pages }}</p>
            </div>
            <div>
                <p>Moyenne d'apréciations : {{ book.average_ratings }}</p>
            </div>
            <div>
                <p>Extrait : {{ book.extract_pdf }}</p>
            </div>
            <div>
                <p>Résumé : {{ book.summary }}</p>
            </div>
        </div>
        <div v-else>
            <p>Chargement en cours...</p>
            <button @click="getBookDetails">Cliquez</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            book: null
        };
    },
    mounted() {
    },
    methods: {
        async getBookDetails() {
            const bookId = this.$route.params.id;
            try {
                const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
                this.book = response.data.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du livre :', error);
            }
        },

    }
};
</script>