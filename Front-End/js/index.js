/* eslint-disable no-undef */
import { login, logout, register, checkCookie } from './login.js';

window.onload = () => {
  if (checkCookie()) {
    window.location.href = 'http://localhost:5500/html/home.html';
  }
};

const loginButton = document.getElementById('signin');

loginButton?.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;
  await login(email, password);
});

const registerButton = document.getElementById('signup');

registerButton?.addEventListener('click', async (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('senha').value;
  const telefone = document.getElementById('telefone').value;
  await register(nome, email, password, telefone);
});
