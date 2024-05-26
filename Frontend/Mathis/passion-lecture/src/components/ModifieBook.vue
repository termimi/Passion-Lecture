<template>
  <div>
    <h2>Modifier un livre</h2>
    <form @submit.prevent="updateBook()">
      <div>
        <label for="title">Titre:</label>
        <input type="text" id="title" v-model="title" required>
      </div>
      <div>
        <label for="category">Catégorie:</label>
        <input type="text" id="category" v-model="categoryName" required>
      </div>
      <div>
        <label for="pages">Pages:</label>
        <input type="number" id="pages" v-model="pages" required>
      </div>
      <div>
        <label for="author">Auteur:</label>
        <input type="text" id="author" v-model="authorName" required>
      </div>
      <div>
        <label for="publisher">Editeur:</label>
        <input type="text" id="publisher" v-model="publisherName" required>
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
        <input type="file" id="pdf" accept=".pdf" @change="takePdf">
      </div>
      <div>
        <label for="image">Image:</label>
        <input type="file" id="image" accept="image/*" @change="takeImage">
      </div>
      <button type="submit">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      pages: 0,
      year: 0,
      summary: '',
      pdf: null,
      image: null,
      categoryName: '', 
      authorName: '', 
      publisherName: '' 
    };
  },
  async mounted() {
    await this.loadBookData();
  },
  methods: {
    async loadBookData() {
      try {
        const bookId = localStorage.getItem('bookId');
        this.authorName = localStorage.getItem('authorName');
        this.publisherName = localStorage.getItem('publisherName');
        this.categoryName = localStorage.getItem('categoryName');
        
        const response = await axios.get(`http://localhost:3000/api/books/${bookId}`);
        const book = response.data.data;
        this.title = book.title;
        this.pages = book.number_of_pages;
        this.year = book.year_of_publication;
        this.summary = book.summary;
      } catch (error) {
        console.error('Erreur lors de la récupération des données du livre:', error);
      }
    },
    async updateBook() {
      try {
        const bookId = localStorage.getItem('bookId');
        let authorId = null;
        let publisherId = null;
        let categoryId = null;

        const categoryWasCreated = await this.checkCreatedCategory(this.categoryName);
        if (categoryWasCreated) {
          categoryId = categoryWasCreated.id;
        } else {
          const categoryInfo = await this.CreateCategory(this.categoryName);
          categoryId = categoryInfo.id;
        }

        const authorWasCreated = await this.checkCreatedAuthor(this.authorName);
        if (authorWasCreated) {
          authorId = authorWasCreated.id;
        } else {
          const authorInfo = await this.CreateAuthor(this.authorName);
          authorId = authorInfo.id;
        }

        const publisherWasCreated = await this.checkCreatedPublisher(this.publisherName);
        if (publisherWasCreated) {
          publisherId = publisherWasCreated.id;
        } else {
          const publisherInfo = await this.CreatePublisher(this.publisherName);
          publisherId = publisherInfo.id;
        }

        const userId = localStorage.getItem('userId');

        const response = await axios.put(`http://localhost:3000/api/books/${bookId}`, {
          title: this.title,
          category_id: categoryId,
          number_of_pages: this.pages,
          author_id: authorId,
          publisher_id: publisherId,
          year_of_publication: this.year,
          cover_image: this.image,
          extract_pdf: this.pdf,
          summary: this.summary,
          customer_id: userId
        });
        console.log(response);
      } catch (error) {
        console.error(`Erreur lors de la mise à jour du livre:`, error);
      }
    },
    async checkCreatedCategory(name) {
      try {
        const response = await axios.get(`http://localhost:3000/api/categorys?name=${name}`);
        return response.data.data.length > 0 ? response.data.data[0] : null;
      } catch (error) {
        console.error(`Erreur lors de la vérification de l'existence de la catégorie:`, error);
        return null;
      }
    },
    async checkCreatedAuthor(name) {
      try {
        const response = await axios.get(`http://localhost:3000/api/authors?name=${name}`);
        return response.data.data.length > 0 ? response.data.data[0] : null;
      } catch (error) {
        console.error(`Erreur lors de la vérification de l'existence de l'auteur:`, error);
        return null;
      }
    },
    async checkCreatedPublisher(name) {
      try {
        const response = await axios.get(`http://localhost:3000/api/publishers?name=${name}`);
        return response.data.data.length > 0 ? response.data.data[0] : null;
      } catch (error) {
        console.error(`Erreur lors de la vérification de l'existence de l'éditeur:`, error);
        return null;
      }
    },
    async CreateCategory(name) {
      try {
        const response = await axios.post('http://localhost:3000/api/categorys/', {
          name: name,
        });
        return response.data.data;
      } catch (error) {
        console.error(`Erreur lors de la création de la catégorie:`, error);
      }
    },
    async CreateAuthor(name) {
      try {
        const response = await axios.post('http://localhost:3000/api/authors/', {
          name: name,
          first_name: "Author"
        });
        return response.data.data;
      } catch (error) {
        console.error(`Erreur lors de la création de l'auteur:`, error);
      }
    },
    async CreatePublisher(name) {
      try {
        const response = await axios.post('http://localhost:3000/api/publishers/', {
          name: name
        });
        return response.data.data;
      } catch (error) {
        console.error(`Erreur lors de la création de l'éditeur:`, error);
      }
    },
    takePdf(event) {
      const selectedFile = event.target.files[0];
      const filePath = URL.createObjectURL(selectedFile);
      this.pdf = filePath;
    },
    takeImage(event) {
      const selectedFile = event.target.files[0];
      const filePath = URL.createObjectURL(selectedFile);
      this.image = filePath;
    }
  }
};
</script>
