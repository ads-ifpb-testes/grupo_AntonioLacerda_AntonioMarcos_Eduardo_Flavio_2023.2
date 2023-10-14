/* eslint-disable no-undef */
import { checkCookie, readCookie } from './login.js';
import {
  GetPublicOcurrencies,
  findUser,
  findUserId,
  formatDate,
  parseJwt
} from './scripts.js';
import { GeoLocalizationToAdress } from './scripts.js';

window.onload = () => {
  if (!checkCookie()) {
    window.location.href = '../index.html';
  }
};

const title = document.getElementById('titulo');
const data = document.getElementById('data');
const hora = document.getElementById('hora');
const local = document.getElementById('local');
const tipo = document.getElementById('tipo');
const status = document.getElementById('status');
const addOcorrencia = document.getElementById('adicionar__ocorrencia');

let location = {
  LNG: null,
  LTD: null
};

addOcorrencia?.addEventListener('click', async (e) => {
  e.preventDefault();
  const isPublic = status.value === 'publica';
  const { id, token } = await findUserId();
  const ocurrencyData = {
    userId: id,
    title: title.value,
    date: data.value,
    time: hora.value,
    location,
    type: tipo.value,
    public: isPublic
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(ocurrencyData)
  };
  await fetch('http://localhost:3000/ocurrency', options)
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      } else {
        alert('Ocorrência cadastrada com sucesso!');
        window.location.href = './home.html';
      }
    });
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

let marker;
async function AddMarker(e) {
  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker([e.latlng.lat, e.latlng.lng]);
  marker.addTo(map);
  map.setView([e.latlng.lat, e.latlng.lng]);
  location.LNG = e.latlng.lat;
  location.LTD = e.latlng.lng;
  let adress = await GeoLocalizationToAdress(e.latlng);
  local.value = `${adress.road}, ${adress.neighbourhood} - ${adress.city_district} - ${adress.state}`;
}

map.on('click', (e) => AddMarker(e));

const redIcon = new L.Icon({
  iconUrl: '../assets/red_marker.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

window.onload = async () => {
  const occurrencies = await GetPublicOcurrencies();
  if (!occurrencies) {
    alert('Não há ocorrências públicas cadastradas!');
  }
  occurrencies.map((ocurrency) => {
    const isPublic = ocurrency.public ? 'Pública' : 'Privada';
    L.marker(
      [ocurrency?.location.coordinates[0], ocurrency?.location.coordinates[1]],
      { icon: redIcon }
    )
      .bindPopup(
        `<b>${ocurrency.title}</b><br>${formatDate(ocurrency.date)} - ${
          ocurrency.time
        }<br>${isPublic}<br>${ocurrency.type}<br>`
      )
      .addTo(map);
  });
};

googleStreets.addTo(map);
