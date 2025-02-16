<script>
  import { isLoggedIn } from "./authStore";
  import { storeTokens } from "../utils/tokenManager";
  import { register, gLogin } from "../utils/urlManager";
  import { navigate } from "svelte-routing";

  let username = '';
  let email = '';
  let password = '';

  async function handleRegister() {
    const response = await fetch(register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();

    if (response.ok) {
      storeTokens(data.accessToken, data.refreshToken, data.expiresIn); // Store tokens in local storage
      alert("Registration successful! You are now logged in.");
      navigate('/');
    } else {
      alert(data.message || "Registration failed");
    }
  }

  async function handleGoogleRegister() {
    // Redirect to your backend Google OAuth registration URL
    window.location.href = gLogin; // Adjust this URL

  }
</script>

<h2>Register</h2>
<form on:submit|preventDefault={handleRegister}>
  <input type="text" bind:value={username} placeholder="Username" required />
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Register</button>
</form>

<button on:click={handleGoogleRegister}>Register with Google</button>