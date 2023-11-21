/* eslint-disable no-undef */

const listOcurrencies = document.querySelector('.lista-ocorrencias');

import { logout } from './login.js';
import {
  GeoLocalizationToAdress,
  GetUserOcurrencies,
  formatDate,
  isTokenValid
} from './scripts.js';

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

// Pop Up

const logoutButton = document.querySelector('.button-logoff');
const popup = document.querySelector('.popup');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');

logoutButton.addEventListener('click', () => {
  popup.style.display = 'flex';
});

confirmButton.addEventListener('click', () => {
  logout();
});

cancelButton.addEventListener('click', () => {
  popup.style.display = 'none';
});

const addOcurrencyToList = async (ocurrency) => {
  const newOcurrency = document.createElement('li');
  newOcurrency.classList.add('ocorrencia');
  let adress = await GeoLocalizationToAdress({
    lat: ocurrency.location.coordinates[0],
    lng: ocurrency.location.coordinates[1]
  });
  const texto = `<strong>Titulo</strong>: ${ocurrency.title}<br>
  <strong>Tipo</strong>: ${ocurrency.type}<br>
  <strong>Rua</strong>: ${adress.road}<br>
  <strong>Bairro</strong>: ${adress.neighbourhood}<br>
  <strong>Cidade</strong>: ${adress.city_district} - ${adress.state}<br>
  <strong>Data</strong>: ${formatDate(ocurrency.date)}<br>
  <strong>Hora</strong>: ${ocurrency.time}`;
  newOcurrency.innerHTML = texto;
  listOcurrencies.appendChild(newOcurrency);
};

window.onload = async () => {
  if (!(await isTokenValid())) {
    window.location.href = '../index.html';
  }
  const allOcurrencies = await GetUserOcurrencies();
  allOcurrencies?.map(async (ocurrency) => {
    L.marker([
      ocurrency?.location.coordinates[0],
      ocurrency?.location.coordinates[1]
    ]).addTo(map);
    await addOcurrencyToList(ocurrency);
  });
};

googleStreets.addTo(map);
