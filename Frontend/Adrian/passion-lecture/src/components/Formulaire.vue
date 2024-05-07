<template>
    <!--Formulaire de login sans recharger la page-->
    <form @submit.prevent="login" class="loginDiv">
        <div class="titleFormuler">
            <h1 style="color: white;" >Bienvenue !</h1>
        </div>
        <div class="bodyFormuler">
            <div class="textF">Pseudo : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="pseudo" placeholder="Pseudo">
            <div class="textF">Mot de pass : </div>
            <input type="password" class="itemF itemPlaceholder" v-model="password" placeholder="Mot de passe">
            <button type="submit" class="itemF buttonSubmit">Se connecter</button>
        </div>
        
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


<style scoped>
.loginDiv{
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:70vh;
    width: 100%;
    
}
.bodyFormuler{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
    color: white;
    
}
.itemF{
    margin : 15px;
}
.itemPlaceholder{
    width: 400px;
    padding: 15px;
    border: 2px solid white;
    border-radius: 20px;
    outline: none;
    background-color: transparent;
}
.textF{
    align-self: flex-start;
    color: white;
    font-size: large;
    
}
.buttonSubmit{
    width: 200px;
    height: 40px;
    border: none;
    border-radius: 20px;
    background-color: #504c64;
    color : white;
    border: 2px solid white;
border-radius: 20px;
cursor: pointer;

}
.itemPlaceholder{
    color: white;
}
button:hover {
  background-color: black;
}

</style>