<template>
    <div>
        <!-- Formulaire de post pour un livre -->
        <h2>Poster un commentaire</h2>
        <form @submit.prevent="postComment">
            <label for="content">Contenu :</label><br>
            <textarea id="content" v-model="commentContent" required></textarea><br>
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
            commentContent: ''
        };
    },
    methods: {
        //Creation d'un commentaire
        async postComment() {
            try {
                const userId = "1";
                const bookId = "3";
                const response = await axios.post('http://localhost:3000/api/comments/', {
                    content: this.commentContent,
                    customer_id: userId,
                    book_id: bookId,
                });
                console.log(response);
                this.commentContent = '';

            } catch (error) {
                console.error('Erreur lors de la publication du commentaire :', error);
            }
        }
    }
};
</script>
