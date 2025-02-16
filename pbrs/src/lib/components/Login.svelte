<script>
  import { storeTokens } from "../utils/tokenManager";
  import { isLoggedIn } from "./authStore";
  import { login, gLogin } from "../utils/urlManager";
  export let navigate;

  let email = '';
  let password = '';

  async function handleLogin() {
    const response = await fetch(login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    let expiresIn = 3600;

    if (response.ok) {
      // isLoggedIn.set(true); // Set logged in state
      storeTokens(data.access_token, data.refresh_token, expiresIn); // Store tokens in local storage
      localStorage.setItem('userId', data.user_id);
      alert("Login successful!");
      navigate('booklist');
    } else {
      alert(data.message || "Login failed");
    }
  }

  async function handleGoogleLogin() {
    // Redirect to your backend Google OAuth login URL
    window.location.href = gLogin; // Adjust this URL
  }
</script>

<h2>Login</h2>
<form on:submit|preventDefault={handleLogin}>
  <input type="text" bind:value={email} placeholder="email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Login</button>
</form>

<button on:click={handleGoogleLogin}>Login with Google</button>