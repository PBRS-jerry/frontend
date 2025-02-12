<script>
  import { onMount } from 'svelte';
  export let params;
  let book = {};
  let reviews = [];

  let token = localStorage.getItem('accessToken');
  let userRole = '';

  if (token) {
    let payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    userRole = payload.role;
  }

  async function fetchBook() {
    const res = await fetch(`http://localhost:3000/books/${params.id}`);
    book = await res.json();
    reviews = book.reviews;
  }

  onMount(fetchBook);
</script>

<h2>{book.title}</h2>
<p>{book.description}</p>

{#if userRole === 'ADMIN'}
  <a href="/delete-book/{book.id}">Delete Book</a>
{/if}

<h3>Reviews:</h3>
<ul>
  {#each reviews as review}
      <li>{review.content} - {review.user}</li>
  {/each}
</ul>