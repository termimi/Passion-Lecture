<script>
</script>

<template>
    <section class="profile">
        <section class="title">
        <h1>
            Mon profil : {{ user.pseudo }}
        </h1>
    </section>
    <section class="bodyProfil">
        <h1 class="profilBooks">Mes ouvrages : </h1>
        <div class="booksList">
            <ul>        
                <li v-for="book in books" :key="book.id">
                    <p>Book Title: {{ book.title }}</p>
                    <div class="Options">
                        <button class="deleteButton" @click="deleteBook(book.id)" >Supprimer</button>
                        <button @click="editBookInfo(book.id)" class="editButton">Modifier</button>
                    </div>
                </li>
        
               
            </ul>    
        </div>
    </section>
    <button class="logoutButton" @click="logout" >Déconnexion</button> 
    <router-link to="/NewBook" class="newBook">Ajouter un ouvrage</router-link>
    </section>
    
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        pseudo: '',
        
      },
      books: []
    };
  },
  async created() {

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Vous n'êtes pas autorisé à accéder à cette page !");
            this.$router.push({ name: 'home' });
    }

    else
    {
      await this.fetchUserInfo(userId);
      await this.fetchUserBooks(userId);
    }
  },
  
  methods: {
    async fetchUserInfo(userId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        this.user = response.data.data; 
      } catch (error) {
        console.error('Erreur de récuperation des infos de l user:', error);
      }
    },
    async fetchUserBooks(userId) {
      try {
        const response = await axios.get('http://localhost:3000/api/books/');
        const booksR = response.data.data;
        //this.books = responseBook.data.data.filter(book => book.customer_id === userId); 
        console.log(booksR[0].customer_id)
        this.books = booksR.filter(book => book.customer_id == userId)

      } catch (error) {
        console.error('Error :', error);
      }
    },
    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:3000/api/books/${bookId}`);
        await this.fetchUserBooks(localStorage.getItem('userId'));
        alert("Le livre à bien été supprimer!");
      } catch (error) {
        console.error('Error ', error);
      }
    },
    editBookInfo(bookId) {
      this.$router.push({ name: 'EditBookInfo', params: { bookId: bookId }});
    },

    logout() {
      localStorage.removeItem('userId');
      this.$router.push({ name: 'login' }).then(() => {
      window.location.reload();
    });
    }
    
  }
};
</script>


<style scoped>
.title {
    height: 200px;
    background-color: #504c64;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;
    width: 100%;
}

.bodyProfil {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 1000px;
    justify-self: center;
    margin-left: 300px;
    margin-top: 50px;
}

.deleteButton {
    background-color: red;
}

.newBook, .editButton, .logoutButton {
    background-color: #504c64;
}

.deleteButton, .editButton, .newBook, .logoutButton {
    color: white;
    height: 50px;
    padding: 8px 16px;
    border: 2px solid white;
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 20px;
}

.deleteButton:hover, .newBook:hover, .editButton:hover, .logoutButton:hover {
    background-color: black;
}

.profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.newBook {
    position: relative;
    display: flex;
    justify-content: right;
    align-items: right;
}
</style>