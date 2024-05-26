<template>
    <div>
        <h1>Mon Profil</h1>
        <div v-if="user">
            <p>Nom d'utilisateur : {{ user.pseudo }}</p>
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
        };
    },
    mounted() {
    //Vérification connexion
        if (!this.token) {
            alert("Vous n'êtes pas autorisé à accéder à cette page !");
            this.$router.push({ name: 'home' });
        }
        else {
            this.getUserProfile();
        }
        
    },
    methods: {
        async getUserProfile() {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
                this.user = response.data.data;
            } catch (error) 
            {
                console.error('Erreur lors de la récupération de l utilisateur :', error);
            }
        },
    }
}
</script>
