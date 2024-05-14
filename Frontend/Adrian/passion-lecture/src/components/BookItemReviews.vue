

<script>
import axios from 'axios';


export default {
  props: {
    reviews: Array
  },
  data() {
    return {
      commentContent: '',
      commentRating: 1,
      numberRating: 0,
      newReview: {
        user: "",
        rating: 0,
        comment: ""
      },
      commentsBook:{},
      
    };
  },
  methods: {
    addReview() {
      this.$emit("add-review", this.newReview);
      this.newReview = {
        user: "",
        rating: 0,
        comment: ""
      };
    },
    async getComment(){
      try{
        const userId = localStorage.getItem('userId')
        const bookId = localStorage.getItem('bookId')
        const commentText = await axios.get(`http://localhost:3000/api/comments/${bookId}`)
      
                //Acabar en casa
                //for(cont contentText of commentText.data.data){
                  //const comment = awau  
                //}

            } catch (error) {
                console.error('Erreur lors de la publication du commentaire :', error);
            }
    },
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

<template>
    <div class="reviews">
        <div class="review-form">
        <h3>Ajouter un commentaire: </h3>
        <textarea v-model="newReview.comment" placeholder="Comentaire" class="commentPlaceholder"></textarea>

        
        <div class="reviewSubmit">
            <div class="reviewNoteChose">                
                <h3>Note :</h3>
                <select v-model="newReview.rating">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            
            <button @click="addReview" class="reviewButton">Ajouter</button>
        </div>

    </div>
    <h3 class="commentsTitle">Commentaires </h3>
      <div class="review-grid">
        
        <div class="review-container">        
            <div class="review">
                <div class="reviewUserData">
                    <p class="reviewUser">MyMiggi6661 : </p>
                    <p class="reviewNote">5/5</p>
                </div>
                
                <p class="reviewText">My favourite book !</p> 
            </div>
        </div>        
      </div>      
    </div>
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

<style scoped>
.reviews {
  display: flex;
  color: white;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}


.review {
  padding: 20px;
  border: 2px solid #ffffff;
  border-radius: 10px;
  color: #ffffff;
  background-color: transparent;
  width: 500PX;
  margin-left: 20px
}
.review-grid{
    flex: 1;

}
.review-container {
  margin-bottom: 20px;
}
.review-form {
  margin-left: 20px;
}
h3{
    margin-bottom:15px
}
.commentsTitle{
    margin-top : 50px;
    
}
.review-form textarea {
  margin-bottom: 10px;
}

.review-form select {
  height: 25px;
  margin-left: 25px;
}

.review-form button {
  background-color: #504c64;
  color: white;
  height: 50px;
  padding: 8px 16px;
  border: 2px solid white;
border-radius: 20px;
  cursor: pointer;
}

.review-form button:hover {
  background-color: black;
}

.commentPlaceholder{
    padding: 15px;
    border: 2px solid white;
    border-radius: 20px;
    outline: none;
    background-color: transparent;
    color: white;
    height:100px;
    width: 500px;
}
.reviewSubmit{

    display: flex;
    justify-content: space-between;
    
}

.reviewNoteChose{
    display: flex;
    flex-direction: row;
    align-items: baseline;
}
.reviewUser{
    font-weight: bold;
    margin-bottom: 5px
}
.reviewText{
    margin-top: 10px;
}
.reviewUserData{
    display: flex;
    justify-content: space-between;
}
</style>

