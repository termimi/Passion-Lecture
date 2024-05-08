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
                <li><router-link to="/login">Connexion</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default{
    name : 'Header'
}
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