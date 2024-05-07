<script>
export default {
  props: {
    reviews: Array
  },
  data() {
    return {
      newReview: {
        user: "",
        rating: 0,
        comment: ""
      }
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
    }
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

