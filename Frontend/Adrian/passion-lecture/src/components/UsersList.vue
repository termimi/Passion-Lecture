<template>
<section class = "UsersList">

    <h1>List des utilisateurs</h1>
    <div class = "listU">
        <ul>
            <li v-for="user in users" :key="user.id">
                <p>Utilisateur : {{ user.pseudo }}</p>
                <p>Date d'entre : {{ formatDate(user.date_enter) }}</p>
                <p>Livres : {{ user.bookCount }}</p>
            </li>
        </ul>
    </div>
</section>

</template>
<script>
import axios from 'axios';
export default {
  name: 'UserList',
  data() {
    return {
      users: [],
      book:[]
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/api/users/');
        this.users = response.data.data; 
        
        const booksResponse = await axios.get('http://localhost:3000/api/books/');
        this.books = booksResponse.data.data; 

        this.countBooksByUser();

      } catch (error) {
        console.error('Error al recuperar usuarios:', error);
      }
    },
    countBooksByUser() {
      this.users.forEach(user => {
        user.bookCount = 0;
      });

      this.books.forEach(book => {
        const user = this.users.find(user => user.id === book.customer_id);
        if (user) {
          user.bookCount++;
        }
      });
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>
<style scoped>
.UsersList{
    display: flex;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    margin-top: 25px;
    margin-bottom: 25px;
    color: white
}
h1{
    color:#504c64
}

</style>