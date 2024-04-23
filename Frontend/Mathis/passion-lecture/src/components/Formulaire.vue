<template>
    <!--Formulaire de login sans recharger la page-->
    <form @submit.prevent="login">
        <input type="text" v-model="pseudo" placeholder="Pseudo">
        <input type="password" v-model="password" placeholder="Mot de passe">
        <button type="submit">Se connecter</button>
    </form>
    <!--Bouton affichage info-->
    <button v-if="logged" @click="getBooks">Voir les livres</button>

    <div>
    <!-- Affichage des livres -->
    <div v-if="books">
      <h2>Liste de livres:</h2>
      <ul>
        <li>Nom d'utilisateur:{{books}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
//Import de axios pour effectuer des requetes http
import axios from 'axios';

export default {
    data() {
        return {
            pseudo: '',
            password: '',
            logged: false,
            books: null
        };
    },
    //Connexion (requete à l'api)
    methods: {
        async login() {

            //Requete à l'api en envoyant nos données
            await axios.post('http://localhost:3000/api/login/', {
                pseudo: this.pseudo,
                password: this.password
                //Reponse de l'api
            }).then((response) => {
                console.log('Connexion réussite',response);
                this.logged = true;
                //Erreur de l'api
            }).catch((error) => {
                console.error('Erreur lors de la connexion :', error);
            });
        },
        async getBooks() {
            const response = await axios.get('http://localhost:3000/api/categorys/6/books');
            this.books = response.data;
        }
    }
}

</script>