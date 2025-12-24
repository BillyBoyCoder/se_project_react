const baseUrl = 'https://api.wtwrguys.jumpingcrab.com';

// Check response status
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // Parse error message from response body
  return res.json()
    .then((errorData) => {
      const message = errorData.message || `${res.status}: ${res.statusText}`;
      return Promise.reject(new Error(message));
    })
    .catch(() => {
      // If parsing fails, reject with status text
      return Promise.reject(new Error(`${res.status}: ${res.statusText}`));
    });
}

// Get all clothing items
export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// Add a new clothing item
export function addItem(item) {
  const token = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
}

// Update a clothing item
export function updateItem(id, updates) {
  const token = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  }).then(checkResponse);
}

// Delete a clothing item
export function deleteItem(id) {
  const token = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// ===== Authentication API Functions =====

// Register a new user
export function signup({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

// Sign in a user
export function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

// Get current user data (verify token)
export function getCurrentUser() {
  const token = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Update current user profile
export function updateUser({ name, avatar }) {
  const token = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkResponse);
}

// Like a clothing item
export function likeItem(itemId) {
  const token = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(checkResponse);
}

// Unlike a clothing item
export function unlikeItem(itemId) {
  const token = localStorage.getItem('jwt');
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }).then(checkResponse);
}
