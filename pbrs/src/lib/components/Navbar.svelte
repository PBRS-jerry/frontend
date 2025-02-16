<script>
  export let navigate;
  import { onMount } from "svelte";
  import { isLoggedIn } from "./authStore";
  import { clearTokens } from "../utils/tokenManager";

  let loggedIn = false;

  // Subscribe to the isLoggenIn store
  isLoggedIn.subscribe(value => {
    loggedIn = value;
  });

  function handleLogout() {
    //Clear the token and set loggedIn to false
    clearTokens();
    localStorage.removeItem('userId');
    isLoggedIn.set(false);
    alert("You have been logged out");
    navigate('booklist');
  }
</script>

<nav>
  <button on:click={() => navigate('booklist')}>Booklist</button>
  {#if loggedIn}
    <button on:click={() => navigate('profile')}>Profile</button>
    <button on:click={handleLogout}>Logout</button>
  {:else}
    <button on:click={() => navigate('login')}>Login</button>
    <button on:click={() => navigate('register')}>Register</button>
  {/if}
</nav>

<style>
  nav {
    padding: 1rem;
    background: #f8f9fa;
    border-bottom: 1px solid #ccc;
  }
  button {
    margin-right: 1rem;
  }
</style>