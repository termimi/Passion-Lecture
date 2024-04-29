<template>
    <header>
        <div class="logoLB">
            <router-link to="/" class ="logo-link">
                <img src="@/assets/logo.png" alt="Logo"/>
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
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
}

.logoLB{

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