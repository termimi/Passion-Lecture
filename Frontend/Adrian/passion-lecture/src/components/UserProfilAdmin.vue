<script>
</script>

<template>
    <section class="profile">
        <section class="title">
        <h1>
            Mon profil
        </h1>
    </section>
    <section class="bodyProfil">
        <h1 class="profilBooks">Mes ouvrages : </h1>
        <div class="booksList">
            <ul>
                <li>
                    
                </li>
            </ul>    
        </div>
    </section>
    <button class="newBook"><router-link to="/NewBook">Ajouter un ouvrage</router-link></button>
    <button class="usersList"><router-link to="/UsersList">Liste d'utilisateurs</router-link></button>
    </section>
    
</template>

<style scoped>
.title{
    height: 200px;
    background-color: #504c64;
    color: #fff ;
    text-align: center; 
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white; 
    width: 100%;

}

.bodyProfil{
    color: white;
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 1000px;
    justify-self: center;

}
.deleteButton{
    background-color: red
}
.deleteButton:hover{
    background-color: black
}
.profile{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.newBook{
    position: relative;
    display: flex;
    justify-content: right;
    align-items: right;
}
</style>