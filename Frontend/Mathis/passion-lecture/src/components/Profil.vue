<template>
  <div>
    <h1>Mon Profil</h1>
    <div v-if="user">
      <p>Nom d'utilisateur : {{ user.pseudo }}</p>
      <h2>Vos Livres</h2>
      <ul>
        <li v-for="book in userBooks" :key="book.id">
          {{ book.title }} <button @click="deleteBook(book.id)">Supprimer</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      user: null,
      userBooks: [],
    };
  },
  mounted() {
    if (!this.token) {
      alert("Vous n'êtes pas autorisé à accéder à cette page !");
      this.$router.push({ name: 'home' });
    } else {
      this.getUserProfile();
      this.loadUserBooks();
    }
  },
  methods: {
    async getUserProfile() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        this.user = response.data.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de l utilisateur :', error);
      }
    },
    async loadUserBooks() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/users/${userId}/books`);
        this.userBooks = response.data.data;

        console.log(this.userBooks);
      } catch (error) {
        console.error('Erreur lors du chargement des livres de l\'utilisateur:', error);
      }
    },
    async deleteBook(bookId) {
      try {
        await axios.delete(`http://localhost:3000/api/books/${bookId}`);
        this.userBooks = this.userBooks.filter(book => book.id !== bookId);
        alert("Le livres à bien été supprimer");
      } catch (error) {
        console.error('Erreur lors de la suppression du livre:', error);
      }
    },
  }
};
</script>
