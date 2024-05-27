<template>
    <header>
        <div class="logoLB">
            <router-link to="/" class ="logo-link">
                <img src="@/assets/logoLovbooks.png" alt="Logo" class="logoLBpng"/>
            </router-link>
        </div>
        <nav>
            <ul class="menu">
                <li><router-link to="/">Accueil</router-link></li>
                <li><router-link to="/books">Livres</router-link></li>
                <li><router-link :to="profileRoute">{{ profileLinkText }}</router-link></li>            </ul>
        </nav>
    </header>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Header',
  data() {
    return {
      profileRoute: '/login',
      profileLinkText: 'Connexion',
    };
  },
  async created() {
    if (localStorage.getItem('userId') != null) {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        const user = response.data.data;
        
        if (user.admin) {
          this.profileRoute = '/ProfileAdmin';
        } else {
          this.profileRoute = '/Profile';
        }
        
        this.profileLinkText = 'Mon Profil';
        
      } catch (error) {
        console.error('Error al recuperar la información del usuario:', error);
        
      }
    }
    else{
      this.profileRoute = '/login';

      this.profileLinkText = 'Connexion';

    }
    
  },

  
  
  
}
;
</script>

<style scoped>
header{
    display: flex;
    justify-content:center;
    align-items: center;
    padding: 10px 20px;
    background-color: #000000;
    color: #fff;
    width: 100%;
    height: 125px;
    z-index: 100;
    border-bottom: 1px solid white; 



}

.logoLBpng{
    height: 150px;
    margin-right: 350px;
}

.menu {
    list-style: none;
    display: flex;
    gap: 20px;
}
nav ul li a {
  color: #fff;
  text-decoration: none;
}
</style>