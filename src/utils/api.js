const baseUrl = 'https://api.wtwrguys.jumpingcrab.com';

// Check response status
async function checkResponse(res) {
  if (res.ok) {
    return await res.json();
  }

  try {
    const errorData = await res.json();
    const message = errorData.message || `${res.status}: ${res.statusText}`;
    throw new Error(message);
  } catch (err) {
    // If it's already our Error with the message, throw it
    if (err.message && err.message !== 'Unexpected token' && !err.message.includes('JSON')) {
      throw err;
    }
    // If JSON parsing failed, use status text
    throw new Error(`${res.status}: ${res.statusText}`);
  }
}

// Get all clothing items
export async function getItems() {
  const res = await fetch(`${baseUrl}/items`);
  return await checkResponse(res);
}

// Add a new clothing item
export async function addItem(item) {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  return await checkResponse(res);
}

// Update a clothing item
export async function updateItem(id, updates) {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  return await checkResponse(res);
}

// Delete a clothing item
export async function deleteItem(id) {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await checkResponse(res);
}

// ===== Authentication API Functions =====

// Register a new user
export async function signup({ name, avatar, email, password }) {
  const res = await fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return await checkResponse(res);
}

// Sign in a user
export async function signin({ email, password }) {
  const res = await fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return await checkResponse(res);
}

// Get current user data (verify token)
export async function getCurrentUser() {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await checkResponse(res);
}

// Update current user profile
export async function updateUser({ name, avatar }) {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
  return await checkResponse(res);
}

// Like a clothing item
export async function likeItem(itemId) {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await checkResponse(res);
}

// Unlike a clothing item
export async function unlikeItem(itemId) {
  const token = localStorage.getItem('jwt');
  const res = await fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return await checkResponse(res);
}
