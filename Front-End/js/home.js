import { checkCookie } from './login.js';

window.onload = () => {
  if (!checkCookie()) {
    window.location.href = '../index.html';
  }
};

const addocorrencia = document.getElementById('adicionar__ocorrencia');

addocorrencia?.addEventListener('click', (e) => {
  e.preventDefault();
  const hora = document.getElementById('hora').value;
  const data = document.getElementById('data').value;
  const tipo = document.getElementById('tipo').value;
  console.log(tipo, data, hora);
});

// mapa

var map = L.map('map').setView([-6.892101664756008, -38.55633394935698], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var googleStreets = L.tileLayer(
  'http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',
  {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  }
);

googleStreets.addTo(map);
