// secure-notes.js
// Simple in-browser note encryption using AES (crypto.subtle)

async function encrypt(text, password) {
  const enc = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    'raw', enc.encode(password), {name: 'AES-GCM'}, false, ['encrypt']
  );
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await window.crypto.subtle.encrypt(
    {name: 'AES-GCM', iv}, key, enc.encode(text)
  );
  return btoa(String.fromCharCode(...iv) + String.fromCharCode(...new Uint8Array(ciphertext)));
}

async function decrypt(data, password) {
  const bin = atob(data);
  const iv = new Uint8Array([...bin].slice(0, 12).map(c => c.charCodeAt(0)));
  const ciphertext = new Uint8Array([...bin].slice(12).map(c => c.charCodeAt(0)));
  const enc = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    'raw', enc.encode(password), {name: 'AES-GCM'}, false, ['decrypt']
  );
  const plaintext = await window.crypto.subtle.decrypt(
    {name: 'AES-GCM', iv}, key, ciphertext
  );
  return new TextDecoder().decode(plaintext);
}

document.addEventListener('DOMContentLoaded', () => {
  const noteInput = document.getElementById('note-input');
  const passwordInput = document.getElementById('note-password');
  const resultDiv = document.getElementById('note-result');
  document.getElementById('encrypt-btn').onclick = async () => {
    const text = noteInput.value;
    const password = passwordInput.value;
    if (!text || !password) {
      resultDiv.textContent = 'Enter note and password.';
      return;
    }
    try {
      const encrypted = await encrypt(text, password);
      localStorage.setItem('secure-note', encrypted);
      resultDiv.textContent = 'Note encrypted and saved.';
    } catch {
      resultDiv.textContent = 'Encryption failed.';
    }
  };
  document.getElementById('decrypt-btn').onclick = async () => {
    const password = passwordInput.value;
    const encrypted = localStorage.getItem('secure-note');
    if (!encrypted || !password) {
      resultDiv.textContent = 'No note or password.';
      return;
    }
    try {
      const decrypted = await decrypt(encrypted, password);
      noteInput.value = decrypted;
      resultDiv.textContent = 'Note decrypted.';
    } catch {
      resultDiv.textContent = 'Decryption failed.';
    }
  };
});
