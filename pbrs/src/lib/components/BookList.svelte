<script>
  import { onMount } from 'svelte';
  import { isLoggedIn } from "./authStore";
  import { Link } from "svelte-routing";
  import { bookServiceP, bookServiceU } from '../utils/urlManager';

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

  let books = [];
  let searchQuery = '';

  async function fetchBooks() {
    if (!searchQuery) {
      const res = await fetch(`${bookServiceU}/books`);
      books = await res.json();
      return;
    }
    const res = await fetch(`${bookServiceU}/books?search=${searchQuery}`);
    books = await res.json();
  }

  onMount(fetchBooks);
</script>

<input type="text" bind:value={searchQuery} placeholder="Search books..." />
<button on:click={fetchBooks}>Search</button>

<ul>
  {#each books as book}
    <li class="book-item">
      <Link to={`/book/${book.id}`}>{book.title}</Link>
      <span>{book.author}</span>
      <span>{book.genre}</span>
      <span>{book.year}</span>
      <span>{book.tags}</span>
    </li>
  {/each}
</ul>

{#if userRole === 'ADMIN'}
  <!-- <a href="/add-book">Add Book</a> -->
{/if}

<style>
  .book-item {
    margin: 10px 0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  span {
    margin-left: 10px;
    color: #666;
  }
</style>