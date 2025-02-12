<script>
  import { onMount } from 'svelte';

  let token = localStorage.getItem('accessToken');
  let userRole = '';

  if (token) {
    let payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    userRole = payload.role;
  }

  let books = [];
  let searchQuery = '';

  async function fetchBooks() {
    const res = await fetch(`http://localhost:9005/books?search=${searchQuery}`);
    books = await res.json();
  }

  onMount(fetchBooks);
</script>

<input type="text" bind:value={searchQuery} placeholder="Search books..." />
<button on:click={fetchBooks}>Search</button>

<ul>
  {#each books as book}
    <li><a href={`/books/${book.id}`}>{book.title}</a></li>
  {/each}
</ul>

{#if userRole === 'ADMIN'}
  <a href="/add-book">Add Book</a>
{/if}