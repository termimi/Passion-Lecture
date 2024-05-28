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
        console.error('Error al recuperar información del usuario:', error);
      }
    },
    async fetchUserBooks(userId) {
      try {
        const response = await axios.get('http://localhost:3000/api/books/');
        const booksR = response.data.data;
        //this.books = responseBook.data.data.filter(book => book.customer_id === userId); 
        console.log(booksR[0].customer_id)
        this.books = booksR.filter(book => book.customer_id == userId)
        console.log('Libros filtrados:', this.books);

      } catch (error) {
        console.error('Error al recuperar libros del usuario:', error);
      }
    },
    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:3000/api/books/${bookId}`);
        console.log('Libro eliminado exitosamente');
        // Vuelve a cargar los libros después de eliminar el libro
        await this.fetchUserBooks(localStorage.getItem('userId'));
        alert("Le livre à bien été supprimer!");
      } catch (error) {
        console.error('Error al eliminar el libro:', error);
      }
    },
    editBookInfo(bookId) {
      // Redirige a la página de edición de información del libro
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

<template>
    <section class="profile">
        <section class="title">
        <h1>
            Mon profil
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
    <router-link class="newBook" to="/NewBook">Ajouter un ouvrage</router-link>
    <router-link  class="usersList" to="/UsersList">Liste d'utilisateurs</router-link>
    </section>
    
</template>

<style scoped>
.title{
    height: 200px;
    background-color: #504c64;
    color: #fff ;
    text-align: center; 
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white; 
    width: 100%;

}

.bodyProfil{
    color: white;
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 1000px;
    justify-self: center;
    margin-left: 300px;
    margin-top: 50px;

}
.deleteButton{
    background-color: red
}
.newBook, .editButton, .usersList, .logoutButton{
    background-color:#504c64
}
.deleteButton:hover, .newBook:hover , .editButton:hover, .usersList:hover, .logoutButton:hover{
    background-color: black
}
.deleteButton, .editButton, .newBook, .usersList, .logoutButton{
    color: white;
    height: 50px;
    padding: 8px 16px;
    border: 2px solid white;
  border-radius: 20px;
    cursor: pointer;
    margin-bottom: 20px;
}
.profile{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.newBook{
    position: relative;
    display: flex;
    justify-content: right;
    align-items: right;
}
</style>