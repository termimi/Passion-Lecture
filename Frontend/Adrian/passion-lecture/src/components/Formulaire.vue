<template>
    <form @submit.prevent="login" class="loginDiv">
        <div class="titleFormuler">
            <h1 style="color: white;" >Bienvenue !</h1>
        </div>
        <div class="bodyFormuler">
            <div class="textF">Pseudo : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="pseudo" placeholder="Pseudo">
            <div class="textF">Mot de passe : </div>
            <input type="password" class="itemF itemPlaceholder" v-model="password" placeholder="Mot de passe">
            <button type="submit" class="itemF buttonSubmit">Se connecter</button>
            
        </div>    
        <div v-if="errorMessage" class="popup">
            <div class="popup-content">
                <span class="close-btn" @click="errorMessage = ''">&times;</span>
                <p class="error-message">{{ errorMessage }}</p>
            </div>
        </div>
    </form>
    <div>    
  </div>
</template>

<script>
// Import de axios pour effectuer des requetes http
import axios from 'axios';
import router from '../router/index.js';

export default {
    data() {
        return {
            pseudo: '',
            password: '',
            logged: false,
            books: null,
            admin: false,
            errorMessage: '' 
        };
    },
    
    // Connexion (requete à l'api)
    methods: {
        async login() {

            // Requete à l'api en envoyant nos données
            await axios.post('http://localhost:3000/api/login/', {
                pseudo: this.pseudo,
                password: this.password,
                // Reponse de l'api
            }).then((response) => {
                console.log('Connexion réussie',response);
                const adminRes = response.data.data.admin;
                console.log(adminRes)
                this.logged = true;
                localStorage.setItem('userId', response.data.data.id)
                localStorage.setItem('token', response.data.token);

                if(!adminRes){
                    //window.location.reload();
                    router.push({ name: 'Profile' }).then(() => {
      window.location.reload();
    }); 
                    
                }
                else{
                    //window.location.reload();

                    router.push({ name: 'ProfileAdmin' }).then(() => {
      window.location.reload();
    }); 
                }

                // Erreur de l'api
            }).catch((error) => {
                console.error('Erreur lors de la connexion :', error);
                this.errorMessage = 'Pseudo ou mot de passe incorrect.'; // Définition du message d'erreur
            });
        },

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
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(248, 248, 248, 0.8);
    padding: 20px;
    border-radius: 10px;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.popup-content {
    text-align: center;
}
.close-btn {
    color: white;
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
}
.error-message {
    color: red;
    margin-top: 10px;
}
</style>
