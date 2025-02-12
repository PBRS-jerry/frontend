<script>
  let inputText = "";
  let alertMessage = "Too long";
  $: if (inputText.length > 80) {
    alertMessage = "Too long";
  } else {
    alertMessage = "";
  }
</script>

<div class="search-bar">
  <input type="text" bind:value={inputText} placeholder="Search for a book" />
  <button>Search</button>
</div>

<p class="text-center"></p>