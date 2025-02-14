<script>
  import { onMount } from 'svelte';
  import { isLoggedIn } from "./authStore";
  import { fetchWithAuth } from '../utils/api';
  import { profile, modifyUser, signOut } from '../utils/urlManager';
  import { storeTokens, refreshAccessToken, clearTokens } from "../utils/tokenManager";

  let loggedIn = false;
  let userProfile = {};
  let userId = localStorage.getItem('userId');

  let newUsername = '';
  let newPassword = '';
  let message = '';

  isLoggedIn.subscribe(value => {
    loggedIn = value;
  });

  onMount(async () => {
    try {
      const response = await fetchWithAuth(profile + '/' + userId);
      if (response.ok){
        userProfile = await response.json();
      }else{
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error(error);
    }
  });

  function saveProfile() {
    // Save user profile
    async() => {
      try {
        const response = await fetchWithAuth(modifyUser + '/' + userId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              username: newUsername,
              password: newPassword,
            }
          ),
        });
        const data = await response.json();

        if (response.ok){
          refreshAccessToken();
          message = "Profile updated successfully!";
        }else{
          message = data.message || "Failed to update profile";
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function deleteProfile() {
    // Delete user profile
    async() => {
      try {
        const response = await fetchWithAuth(signOut + '/' + userId, {
          method: 'DELETE',
        });
        const data = await response.json();

        if (response.ok){
          clearTokens();
          localStorage.removeItem('userId');
          isLoggedIn.set(false);
          userProfile = {};
          alert("Profile deleted successfully!");
        }else{
          alert(data.message || "Failed to delete profile");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
</script>

<h2>Profile</h2>
{#if userProfile}
  <p>Welcome, {userProfile.username}!</p>
  <p>Email: {userProfile.email}</p>

  <h3>Update Profile</h3>
  <form on:submit|preventDefault={saveProfile}>
    <input type="text" bind:value={newUsername} placeholder="Username" required />
    <input type="text" bind:value={newPassword} placeholder="Password" required />
    <button type="submit">Save</button>
  </form>

  <button on:click={deleteProfile}>Delete Profile</button>

  {#if message}
    <p>{message}</p>
  {/if}
{/if}