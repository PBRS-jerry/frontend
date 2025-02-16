<script>
  import { onMount } from "svelte";
  import { isLoggedIn } from "./authStore";
  import { clearTokens } from "../utils/tokenManager";
  import { Link } from "svelte-routing";
  import { navigate } from "svelte-routing";

  let loggedIn = false;

  // Subscribe to the isLoggedIn store
  isLoggedIn.subscribe(value => {
    loggedIn = value;
  });

  function handleLogout() {
    // Clear the token and set loggedIn to false
    clearTokens();
    localStorage.removeItem('userId');
    isLoggedIn.set(false);
    alert("You have been logged out");
    navigate('/');
  }
</script>

<nav>
  {#if loggedIn}
  <div class="link-wrapper">
    <button><Link class="link" to="/books">Books</Link></button>
    <button><Link class="link" to="/profile">Profile</Link></button>
    <button on:click={handleLogout}>Logout</button>
  </div>
  {:else}
    <button><Link class="link" to="/books">Books</Link></button>
    <button><Link class="link" to="/login">Login</Link></button>
    <button><Link class="link" to="/register">Register</Link></button>
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
  .link-wrapper > button > :global(a){
    text-decoration: none;
    color: #fff;
  }
</style>