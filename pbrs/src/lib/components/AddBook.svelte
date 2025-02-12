<script>
  let title = '', description = '';

  let token = localStorage.getItem('accessToken');
  let userRole = '';

  if (token) {
    let payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    userRole = payload.role;
  }

  async function addBook() {
    await fetch('http://localhost:9005/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    window.location.href = '/';
  }
</script>

{#if userRole === 'ADMIN'}
  <input type="text" placeholder="Title" bind:value={title} />
  <textarea placeholder="Description" bind:value={description}></textarea>
  <button on:click={addBook}>Add Book</button>
{/if}