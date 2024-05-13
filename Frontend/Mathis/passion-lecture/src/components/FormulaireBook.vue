<template>
    <div>
        <h2>Ajouter un livre</h2>
        <form @submit.prevent="postBook()">
            <div>
                <label for="title">Titre:</label>
                <input type="text" id="title" v-model="title" required>
            </div>
            <div>
                <label for="category">Catégorie:</label>
                <input type="text" id="category" v-model="category" required>
            </div>
            <div>
                <label for="pages">Pages:</label>
                <input type="number" id="pages" v-model="pages" required>
            </div>
            <div>
                <label for="author">Auteur:</label>
                <input type="text" id="author" v-model="author" required>
            </div>
            <div>
                <label for="publisher">Editeur:</label>
                <input type="text" id="publisher" v-model="publisher" required>
            </div>
            <div>
                <label for="year">Année d'édition:</label>
                <input type="number" id="year" v-model="year" required>
            </div>
            <div>
                <label for="summary">Résumé:</label>
                <textarea id="summary" v-model="summary" required></textarea>
            </div>
            <div>
                <label for="pdf">Extrait PDF:</label>
                <input type="file" id="pdf" accept=".pdf" @change="takePdf" required>
            </div>
            <div>
                <label for="image">Image:</label>
                <textarea id="image" v-model="image" required></textarea>
            </div>
            <button type="submit">Ajouter</button>
        </form>
    </div>
</template>

<script>
// Import de axios pour effectuer des requetes http
import axios from 'axios';
export default {
    data() {
        return {
            formData: {
                title: '',
                category: '',
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
                //Vérifie si un auteur est créer
                const authorWasCreated = await this.checkCreatedAuthor(this.author);
                if (authorWasCreated) {
                    authorId = authorWasCreated.id
                    console.log("Auteur déja créer", authorId)
                }
                //Créer l'auteur
                else {
                    console.log("Auteur inconnu")
                    this.CreateAuthor(this.author);
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
                    this.CreatePublisher(this.publisher);
                }

                //Requete post afin de créer un nouveau livre
                const response = await axios.post('http://localhost:3000/api/books', {
                    title: this.title,
                    number_of_pages: this.pages,
                    author_id: authorId,
                    editor_id: editorId,
                    year_of_publication: this.year,
                    cover_image: this.image,
                    extract_pdf: this.pdf,
                    summary: this.summary
                });
                console.log(response);

                // Remet les valeurs par défaults
                this.title = '';
                this.category = '';
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
        //Créer l'auteur
        async CreateAuthor(name) {
            try {
                const response = await axios.post('http://localhost:3000/api/authors/', {
                    name: name,
                });
                console.log(response);
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
                console.log(response);
            } catch (error) {
                console.error(`Erreur lors de la création de l'éditeur}:`, error);
            }
        },
        //Charge les pdfs depuis le gestionnaire de fichier
        takePdf(event) {
            this.pdf = event.target.files[0];
        }
    }
};
</script>
