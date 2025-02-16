import { isLoggedIn } from '../components/authStore.js';

export function storeTokens(accessToken, refreshToken, expiresIn) {
  const expirationTime = Date.now() + expiresIn; // Set the expiration time for the access token

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('accessTokenExpiration', expirationTime.toString());
  isLoggedIn.set(true); // Update the login state
}

export function getAccessToken() {
  const accessToken = localStorage.getItem('accessToken');
  const expirationTime = localStorage.getItem('accessTokenExpiration');

  // Check if the access token exists and is not expired
  if (accessToken && Number(expirationTime) > Date.now()) {
    return accessToken;
  } else if (accessToken) {
    let newAccessToken = refreshAccessToken(); // Try to refresh the access token if it's expired
    return newAccessToken;
  }
  return null; // Access token is either missing or expired
}

export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessTokenExpiration');
  isLoggedIn.set(false); // Update the login state
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    clearTokens(); // If no refresh token, clear the state
    return null; // No refresh token available to refresh
  }

  try {
    const response = await fetch('/api/service/public/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`, // Send the refresh token to get a new access token
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    let expiresIn = 3600; // Default expiration time of 1 hour
    storeTokens(data.access_token, refreshToken, expiresIn); // Store the new access and refresh tokens
    return data.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    clearTokens(); // Clear the tokens if refresh fails

    return null;
  }
}