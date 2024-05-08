<template>
    <!-- Formulario de agregar libro -->
    <form @submit.prevent="addBook" class="loginDiv">
        <div class="titleFormuler">
            <h1 style="color: white;">Ajouter un livre</h1>
        </div>
        <div class="bodyFormuler">
            <div class="textF">Titre : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="titre" placeholder="Titre">
            <div class="textF">Catégorie : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="categorie" placeholder="Catégorie">
            <div class="textF">Pages : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="pages" placeholder="Pages">
            <div class="textF">Auteur : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="auteur" placeholder="Auteur">
            <div class="textF">Editeur : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="editeur" placeholder="Editeur">
            <div class="textF">Année d'édition : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="anneeEdition" placeholder="Année d'édition">
            <div class="textF">Résumé : </div>
            <textarea class="itemF itemPlaceholder" v-model="resume" placeholder="Résumé"></textarea>
            <div class="textF">Extrait PDF : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="extraitPDF" placeholder="Extrait PDF">
            <div class="textF">Image : </div>
            <input type="text" class="itemF itemPlaceholder" v-model="image" placeholder="Image">
            <button type="submit" class="itemF buttonSubmit">Ajouter</button>
        </div>
    </form>
</template>
