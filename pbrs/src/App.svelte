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

  onMount(() => {
    const token = getAccessToken();
    if(token) {
      isLoggedIn.set(true);
    } else {
      isLoggedIn.set(false);
    }
  });
</script>

<Router {url}>
  <Navbar />
  <main>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/profile" component={Profile} />
    <Route path="/books" component={BookList} />
    <Route path="/book/:id" component={BookDetail} />
    <Route path="/" component={BookList} />
    <Route path="/*" component={BookList} /> <!-- Fallback route -->
  </main>
</Router>

<!-- 
<style>

</style> -->
