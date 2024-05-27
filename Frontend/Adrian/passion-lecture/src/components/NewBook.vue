<template>
    <div class="sectionNewBook">
        <div class = "title"><h2>Ajouter un livre</h2></div>
        <form @submit.prevent="postBook()">
            <div class="question">
                <label for="title">Titre: </label>
                <input type="text" id="title" v-model="title" required>
            </div>
            <div class="question">
                <label for="category">Catégorie:</label>
                <input type="text" id="category" v-model="category" required>
            </div>
            <div class="question">
                <label for="pages">Pages:</label>
                <input type="number" id="pages" v-model="pages" required>
            </div>
            <div class="question">
                <label for="author">Auteur:</label>
                <input type="text" id="author" v-model="author" required>
            </div>
            <div class="question">
                <label for="publisher">Editeur:</label>
                <input type="text" id="publisher" v-model="publisher" required>
            </div>
            <div class="question">
                <label for="year">Année d'édition:</label>
                <input type="number" id="year" v-model="year" required>
            </div>
            <div class="question" >
                <label for="summary">Résumé:</label>
                <textarea id="summary" v-model="summary" required></textarea>
            </div>
            <div class="question">
                <label for="pdf">Extrait PDF:</label>
                <input type="file" id="pdf" accept=".pdf" @change="takePdf" required>
            </div>
            <div class="question">
                <label for="image">Image:</label>
                <input type="file" id="image" accept="image/*" @change="takeImage" required>
            </div >
            <button type="submit">Ajouter</button>
        </form>
    </div>
</template>

<style scoped>

.sectionNewBook{
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    align-items: center;
}

.question{
    display: flex;
    flex-direction: column;
    margin-top: 15px;
}
label{
    width: 100%;
    margin : 2px;
}
input, textarea{
    padding: 15px;
    border: 2px solid white;
    border-radius: 20px;
    outline: none;
    background-color: transparent;
    color: white;
}

button{
    background-color: #504c64;
  color: white;
  height: 50px;
  padding: 8px 16px;
  border: 2px solid white;
border-radius: 20px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 20px;

}
button:hover{
    background-color: black;
}

.title{
    width: 100%;
    text-align: center;
    background-color: #504c64;
    height: 200px;
    border-bottom: 1px solid white; 
    display: flex;
    justify-content: center;
    align-items: center;
    }
</style>

<script>
// Import de axios pour effectuer des requetes http
import axios from 'axios';
export default {
    data() {
        return {
            formData: {
                title: '',
                pages: 0,
                author: '',
                publisher: '',
                year: 0,
                summary: '',
                pdf: null,
                image: null,

            }
        };
    },
    methods: {
        //Permet de créer un livre
        async postBook() {
            try {
                let authorId = null;
                let publisherId = null;
                let categoryId = null;

                //Vérifie si une catégorie est créer
                const categoryWasCreated = await this.checkCreatedCategory(this.category);
                if (categoryWasCreated) {
                    categoryId = categoryWasCreated.id
                    console.log("Category déja créer", categoryId)
                }
                //Créer la catégorie
                else {
                    console.log("Catégorie inconnu")
                    const categoryInfo = await this.CreateCategory(this.category);
                    categoryId = categoryInfo.id;
                    console.log(categoryId)
                }

                //Vérifie si un auteur est créer
                const authorWasCreated = await this.checkCreatedAuthor(this.author);
                if (authorWasCreated) {
                    authorId = authorWasCreated.id
                    console.log("Auteur déja créer", authorId)
                }
                //Créer l'auteur
                else {
                    console.log("Auteur inconnu")
                    const authorInfo = await this.CreateAuthor(this.author);
                    authorId = authorInfo.id;

                }

                //Vérifie si un éditeur est créer
                const publisherWasCreated = await this.checkCreatedPublisher(this.publisher);
                if (publisherWasCreated) {

                    publisherId = publisherWasCreated.id
                    console.log("Editeur déja créer", publisherId)

                }
                //Créer l'éditeur
                else {
                    console.log("Editeur inconnu")
                    const publisherInfo = await this.CreatePublisher(this.publisher)
                    publisherId = publisherInfo.id;

                }

                const userId = localStorage.getItem('userId')

                //Requete post afin de créer un nouveau livre
                const response = await axios.post('http://localhost:3000/api/books/', {
                    title: this.title,
                    category_id: categoryId,
                    number_of_pages: this.pages,
                    author_id: authorId,
                    publisher_id: publisherId,
                    year_of_publication: this.year,
                    cover_image: this.image,
                    extract_pdf: this.pdf,
                    summary: this.summary,
                    comment_id: null,
                    average_ratings: null,
                    assessment_id: null,
                    customer_id: userId
                });
                console.log(response);
                alert("Le livre à bien été créer!");

                // Remet les valeurs par défaults
                this.title = '';
                this.pages = 0;
                this.author = '';
                this.publisher = '';
                this.year = 0;
                this.summary = '';
                this.pdf = null;
                this.image = null;

            } catch (error) {
                console.error(`Erreur lors de l'ajout du livre:`, error);
                return null;
            }

        },
        //Vérifie si la catégorie est déja créer
        async checkCreatedCategory(name) {
            try {
                const response = await axios.get(`http://localhost:3000/api/categorys?name=${name}`);
                //Si la categorie est trouvé on renvoie son id
                return response.data.data.length > 0 ? response.data.data[0] : null;

            } catch (error) {
                console.error(`Erreur lors de la vérification de l'existence de la catégorie:`, error);
                return null;
            }
        },
        //Vérifie si l'auteur est déja créer
        async checkCreatedAuthor(name) {
            try {
                const response = await axios.get(`http://localhost:3000/api/authors?name=${name}`);
                //Si l'auteur est trouvé on renvoie son id
                return response.data.data.length > 0 ? response.data.data[0] : null;

            } catch (error) {
                console.error(`Erreur lors de la vérification de l'existence de l'auteur:`, error);
                return null;
            }
        },
        //Vérifie si l'éditeur est déja créer
        async checkCreatedPublisher(name) {
            try {
                const response = await axios.get(`http://localhost:3000/api/publishers?name=${name}`);
                //Si l'éditeur est trouvé on renvoie son id
                return response.data.data.length > 0 ? response.data.data[0] : null;
            } catch (error) {
                console.error(`Erreur lors de la vérification de l'existence de l'éditeur}:`, error);
                return null;
            }
        },
        //Créer la catégorie
        async CreateCategory(name) {
            try {
                const response = await axios.post('http://localhost:3000/api/categorys/', {
                    name: name,
                });
                console.log(response);

                return response.data.data
            } catch (error) {
                console.error(`Erreur lors de la création de la categorie}:`, error);
            }
        },
        //Créer l'auteur
        async CreateAuthor(name) {
            try {
                const response = await axios.post('http://localhost:3000/api/authors/', {
                    name: name,
                    first_name: "Author"
                });
                console.log(response);

                return response.data.data
            } catch (error) {
                console.error(`Erreur lors de la création de l'auteur}:`, error);
            }
        },
        //Créer l'éditeur
        async CreatePublisher(name) {
            try {
                const response = await axios.post('http://localhost:3000/api/publishers/', {
                    name: name
                });

                return response.data.data

            } catch (error) {
                console.error(`Erreur lors de la création de l'éditeur}:`, error);
            }
        },
        //Charge les pdfs depuis le gestionnaire de fichier
        takePdf(event) {
            const selectedFile = event.target.files[0];
            const filePath = URL.createObjectURL(selectedFile);
            this.pdf = filePath;
        },
        //Charge les images depuis le gestionnaire de fichier
        takeImage(event) {
            const selectedFile = event.target.files[0];
            const filePath = URL.createObjectURL(selectedFile);
            this.image = filePath;
        }
    }
};
</script>
