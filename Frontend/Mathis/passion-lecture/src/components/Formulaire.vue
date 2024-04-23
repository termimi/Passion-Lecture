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

            //Requete à l'api en envoyant nos données
            await axios.post('http://localhost:3000/api/login/', {
                pseudo: this.pseudo,
                password: this.password
                //Reponse de l'api
            }).then((response) => {
                console.log('Connexion réussite',response);
                //Erreur de l'api
            }).catch((error) => {
                console.error('Erreur lors de la connexion :', error);
            });
        }
    }
}

</script>