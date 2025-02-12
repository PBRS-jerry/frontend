import { getAccessToken, refreshAccessToken } from './tokenManager.js';

export async function fetchWithAuth(url, options = {}) {
  let accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error('No valid access token found');
  }

  // Add the Authorization header
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);

  // Check if the response indicates that the access token is expired or invalid
  if (response.status === 401) {
    // Try to refresh the access token
    accessToken = await refreshAccessToken();

    if (accessToken) {
      // Retry the original request with the new access token
      options.headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    }
  }

  return response;
}