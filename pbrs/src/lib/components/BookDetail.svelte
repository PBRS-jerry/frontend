<script>
  import { onMount } from 'svelte';
  import { isLoggedIn } from "./authStore";
  export let id;
  import { bookServiceP, bookServiceU } from '../utils/urlManager';
  import { Link } from "svelte-routing";

  let book = {};
  let reviews = [];
  let loading = true;
  let error = null;

  let loggedIn = false;

  isLoggedIn.subscribe(value => {
    loggedIn = value;
  });

  let token = localStorage.getItem('accessToken');
  let userRole = '';

  if (token) {
    let payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    userRole = payload.role;
  }

  async function fetchBook() {
    try{
      const res = await fetch(bookServiceU + `/${id}`);
      book = await res.json();
      // reviews = book.reviews;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(fetchBook);
</script>

{#if loading}
  <div>Loading...</div>
{:else if error}
  <div class="error">{error}</div>
{:else if book}
  <div class="book-detail">
    <h1>{book.title}</h1>
    <div class="info">
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <p><strong>Tags:</strong> {book.tags}</p>
    </div>
    <Link to="/books">Back to Books</Link>
  </div>
{/if}

{#if userRole === 'ADMIN'}
  <!-- <a href="/delete-book/{book.id}">Delete Book</a> -->
{/if}

<h3>Reviews:</h3>
<!-- <ul>
  {#each reviews as review}
      <li>{review.content} - {review.user}</li>
  {/each}
</ul> -->

<style>
  .book-detail {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .info {
    margin: 20px 0;
  }

  .error {
    color: red;
    padding: 20px;
  }
</style>