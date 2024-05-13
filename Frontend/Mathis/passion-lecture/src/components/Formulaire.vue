<template>
    <div>
        <!-- Formulaire de login -->
        <form @submit.prevent="login">
            <input type="text" v-model="pseudo" placeholder="Pseudo">
            <input type="password" v-model="password" placeholder="Mot de passe">
            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script>
// Import de axios pour effectuer des requetes http
import axios from 'axios';

export default {
    data() {
        return {
            pseudo: '',
            password: '',
        };
    },
    // Connexion (requete à l'api)
    methods: {
        async login() {
            try {
                // Requete à l'api en envoyant nos données
                const response = await axios.post('http://localhost:3000/api/login/', {
                    pseudo: this.pseudo,
                    password: this.password
                });
                localStorage.setItem('userId', response.data.data.id)
                // Connexion réussie
                console.log('Connexion réussie', response);
            } catch (error) {
                // Erreur de connexion
                console.error('Erreur lors de la connexion :', error);
            }
        }
    }
}
</script>
