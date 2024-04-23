<template>
    <!--Formulaire de login sans recharger la page-->
    <form @submit.prevent="login">
      <input type="text" v-model="pseudo" placeholder="Pseudo">
      <input type="password" v-model="password" placeholder="Mot de passe">
      <button type="submit">Se connecter</button>
    </form>
  </template>
  
  <script>
  //Import de axios pour effectuer des requetes http
  import axios from 'axios';
  
  // Stock les données
  export default {
    data() {
      return {
        pseudo: '',
        password: ''
      };
    },
    //Connexion (requete à l'api)
    methods: {
      async login() {
        try {
            //Requete à l'api en envant nos données
          const res = await axios.post('http://localhost:3000/api/login/', {
            pseudo: this.pseudo,
            password: this.password
          });
          // Renvoie d'une erreur de l'api
        } catch (error) {
          console.error('Erreur de connexion :', error);
        }
      }
    }
  }
  </script>
  