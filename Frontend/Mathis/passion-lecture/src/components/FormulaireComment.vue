<template>
    <div>
        <!-- Formulaire de post pour un livre -->
        <h2>Poster un commentaire</h2>
        <form @submit.prevent="postComment">
            <label for="content">Contenu :</label><br>
            <textarea id="content" v-model="commentContent" required></textarea><br>
            <label for="rating">Note : </label>
            <select id="rating" v-model="commentRating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select><br>

            <button type="submit">Poster</button>
        </form>
    </div>
</template>

<script>
// Import de axios pour effectuer des requetes http
import axios from 'axios';

export default {
    data() {
        return {
            commentContent: '',
            commentRating: 1,
            numberRating: 0
        };
    },
    methods: {
        //Creation d'un commentaire
        async postComment() {
            try {
                const userId = localStorage.getItem('userId')
                const bookId = localStorage.getItem('bookId')
                const response = await axios.post('http://localhost:3000/api/comments/', {
                    content: this.commentContent,
                    customer_id: userId,
                    book_id: bookId,
                });
                console.log(response);
                this.commentContent = '';

                await this.postRating();
                await this.putAverageRating();

            } catch (error) {
                console.error('Erreur lors de la publication du commentaire :', error);
            }
        },
        //Creation d'une note
        async postRating() {
            try {
                const userId = localStorage.getItem('userId')
                const bookId = localStorage.getItem('bookId')
                const response = await axios.post('http://localhost:3000/api/assessments/', {
                    assessment: this.commentRating,
                    customer_id: userId,
                    book_id: bookId,
                });
                console.log(response);

            } catch (error) {
                console.error('Erreur lors de la publication de la note :', error);
            }
        },
        // Mise à jour de la moyenne des notes
        async putAverageRating() {
            try {
                const bookId = localStorage.getItem('bookId')
                // Récupérer les données actuelles du livre
                const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
                const bookData = response.data;

                //Met a jour
                bookData.average_ratings = this.calculateRatings();

                const updateResponse = await axios.put(`http://localhost:3000/api/books/${bookId}`, bookData);

                console.log(updateResponse.data);
            } catch (error) {
                console.error('Erreur lors de la mise à jour des notes :', error);
            }
        },
        //Fait la moyenne des notes du livres
        calculateRatings() {
            this.numberRating++;
            return this.commentRating / this.numberRating;
        },

    }
};
</script>
