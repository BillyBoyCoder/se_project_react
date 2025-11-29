const baseUrl = 'http://localhost:3001';

// Check response status
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// Get all clothing items
export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// Add a new clothing item
export function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
}

// Update a clothing item
export function updateItem(id, updates) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  }).then(checkResponse);
}

// Delete a clothing item
export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
  }).then(checkResponse);
}
