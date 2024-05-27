<template>
  <div>
    <h2>Modifier un livre</h2>
    <form @submit.prevent="updateBook()">
      <div>
        <label for="title">Titre:</label>
        <input type="text" id="title" v-model="title">
      </div>
      <div>
        <label for="category">Catégorie:</label>
        <input type="text" id="category" v-model="categoryName">
      </div>
      <div>
        <label for="pages">Pages:</label>
        <input type="number" id="pages" v-model="pages">
      </div>
      <div>
        <label for="author">Auteur:</label>
        <input type="text" id="author" v-model="authorName">
      </div>
      <div>
        <label for="publisher">Editeur:</label>
        <input type="text" id="publisher" v-model="publisherName">
      </div>
      <div>
        <label for="year">Année d'édition:</label>
        <input type="number" id="year" v-model="year">
      </div>
      <div>
        <label for="summary">Résumé:</label>
        <textarea id="summary" v-model="summary"></textarea>
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
      publisherName: '',
      initialData: {}
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


        this.initialData = {
          title: book.title,
          pages: book.number_of_pages,
          year: book.year_of_publication,
          summary: book.summary,
          categoryName: this.categoryName,
          authorName: this.authorName,
          publisherName: this.publisherName,
        };
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

        const updatedFields = {};

        if (this.title !== this.initialData.title) {
          updatedFields.title = this.title;
        }
        if (this.pages !== this.initialData.pages) {
          updatedFields.number_of_pages = this.pages;
        }
        if (this.year !== this.initialData.year) {
          updatedFields.year_of_publication = this.year;
        }
        if (this.summary !== this.initialData.summary) {
          updatedFields.summary = this.summary;
        }

        if (this.categoryName !== this.initialData.categoryName) {
          const categoryWasCreated = await this.checkCreatedCategory(this.categoryName);
          if (categoryWasCreated) {
            categoryId = categoryWasCreated.id;
          } else {
            const categoryInfo = await this.CreateCategory(this.categoryName);
            categoryId = categoryInfo.id;
          }
          updatedFields.category_id = categoryId;
        }

        if (this.authorName !== this.initialData.authorName) {
          const authorWasCreated = await this.checkCreatedAuthor(this.authorName);
          if (authorWasCreated) {
            authorId = authorWasCreated.id;
          } else {
            const authorInfo = await this.CreateAuthor(this.authorName);
            authorId = authorInfo.id;
          }
          updatedFields.author_id = authorId;
        }

        if (this.publisherName !== this.initialData.publisherName) {
          const publisherWasCreated = await this.checkCreatedPublisher(this.publisherName);
          if (publisherWasCreated) {
            publisherId = publisherWasCreated.id;
          } else {
            const publisherInfo = await this.CreatePublisher(this.publisherName);
            publisherId = publisherInfo.id;
          }
          updatedFields.publisher_id = publisherId;
        }

        if (this.image) {
          updatedFields.cover_image = this.image;
        }

        if (this.pdf) {
          updatedFields.extract_pdf = this.pdf;
        }

        const userId = localStorage.getItem('userId');
        updatedFields.customer_id = userId;

        const response = await axios.put(`http://localhost:3000/api/books/${bookId}`, updatedFields);
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
