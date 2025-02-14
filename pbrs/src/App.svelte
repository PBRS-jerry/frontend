<script>
  import { onMount } from "svelte";
  import Navbar from "./lib/components/Navbar.svelte";
  import Login from "./lib/components/Login.svelte";
  import Register from "./lib/components/Register.svelte";
  import Profile from "./lib/components/Profile.svelte";
  import BookList from "./lib/components/BookList.svelte";
  import { writable } from "svelte/store";

  import { isLoggedIn } from "./lib/components/authStore";
  import { getAccessToken } from "./lib/utils/tokenManager";

  let currentPage = 'login'; // Default page

  onMount(() => {
    const token = getAccessToken();
    if(token) {
      isLoggedIn.set(true);
    }else{
      isLoggedIn.set(false);
    }
  });

  function navigate(page) {
    currentPage = page;
  }
</script>

<Navbar {navigate} />

{#if currentPage === 'login'}
  <Login />
{:else if currentPage === 'register'}
  <Register />
{:else if currentPage === 'profile'}
  <Profile />
{:else if currentPage === 'booklist'}
  <BookList />
{/if}

<style>

</style>
