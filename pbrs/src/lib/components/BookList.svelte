<script>
  import { onMount } from 'svelte';
  import { bookServiceP, bookServiceU } from '../utils/urlManager';

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
      const res = await fetch(bookServiceU + '/books');
      books = await res.json();
      return;
    }
    const res = await fetch(bookServiceU + '/books?search=${searchQuery}');
    books = await res.json();
  }

  onMount(fetchBooks);
</script>

<input type="text" bind:value={searchQuery} placeholder="Search books..." />
<button on:click={fetchBooks}>Search</button>

<ul>
  {#each books as book}
    <li>
      <a href={`/books/${book.id}`}>{book.title}</a>
      <span>{book.author}</span>
      <span>{book.genre}</span>
      <span>{book.year}</span>
      <span>{book.tags}</span>
    </li>
  {/each}
</ul>

{#if userRole === 'ADMIN'}
  <a href="/add-book">Add Book</a>
{/if}