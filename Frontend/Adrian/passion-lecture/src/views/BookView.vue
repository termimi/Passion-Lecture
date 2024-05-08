<script>
import BookItem from '../components/BookItem.vue';
import BookItemReviews from '@/components/BookItemReviews.vue';

export default {
  component:{
    BookItem,
    BookItemReviews
  },
  data(){
    return {
      bookId : null
    };
  },
  created(){
    this.bookId = this.$route.params.id;
  }
}
</script>

<template>
  <main>
    <BookItem></BookItem>
    <BookItemReviews></BookItemReviews>
  </main>
</template>
