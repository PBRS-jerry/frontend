<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { Router, Link, Route } from "svelte-routing";
  import Navbar from "./lib/components/Navbar.svelte";
  import Login from "./lib/components/Login.svelte";
  import Register from "./lib/components/Register.svelte";
  import Profile from "./lib/components/Profile.svelte";
  import BookList from "./lib/components/BookList.svelte";
  import BookDetail from "./lib/components/BookDetail.svelte";

  import { isLoggedIn } from "./lib/components/authStore";
  import { getAccessToken } from "./lib/utils/tokenManager";

  export let url = "";

  let currentPage = 'booklist'; // Default page

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
  <Login {navigate}/>
{:else if currentPage === 'register'}
  <Register />
{:else if currentPage === 'profile'}
  <Profile {navigate}/>
{:else if currentPage === 'booklist'}
  <BookList />
  <Router>
    <Route path="/books" component={BookList} />
    <Route path="/books/:id" component={BookDetail} />
  </Router>
{/if}

<!-- 
<style>

</style> -->
