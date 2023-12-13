/* eslint-disable no-undef */
const OcurrenciesContainer = document.querySelector('.container-ocorrencias');
const listOcurrencies = document.querySelector('.lista-ocorrencias');

import { logout } from './login.js';
import {
  GeoLocalizationToAdress,
  GetUserOcurrencies,
  formatDate,
  isTokenValid,
  deleteOcurrency,
  updateOcurrency
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

const popup_update = document.querySelector('.modal');
const closeButton = document.getElementById('button-close');

closeButton.addEventListener('click', () => {
  popup_update.style.display = 'none';
});

const addOcurrencyToList = async (ocurrency) => {
  const newOcurrency = document.createElement('li');
  newOcurrency.classList.add('ocorrencia');
  const delButton = document.createElement('button');
  delButton.classList.add('button-delete');
  const img_del = document.createElement('img');
  img_del.src = '../assets/lixeira.jpg';
  img_del.style.width = '30px';
  img_del.style.height = '30px';
  delButton.appendChild(img_del);
  delButton.addEventListener('click', async () => {
    await deleteOcurrency(ocurrency._id);
    iziToast.success({
      title: 'Sucesso',
      message: 'Ocorrência excluída com sucesso!',
      position: 'bottomCenter'
    });
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  });
  const updateButton = document.createElement('button');
  updateButton.classList.add('button-update');
  const img_edit = document.createElement('img');
  img_edit.src = '../assets/lápis.jpg';
  img_edit.style.width = '30px';
  img_edit.style.height = '30px';
  updateButton.appendChild(img_edit);
  updateButton.addEventListener('click', () => {
    const titulo = document.getElementById('titulo');
    titulo.value = `${ocurrency.title}`;
    const tipo = document.getElementById('tipo');
    tipo.value = `${ocurrency.type}`;
    const data = document.getElementById('data');
    data.value = ocurrency.date.split('T')[0];
    const hora = document.getElementById('hora');
    hora.value = `${ocurrency.time}`;
    const status = document.getElementById('status');
    if (ocurrency.public) {
      status.value = 'publica';
    } else {
      status.value = 'privada';
    }
    popup_update.style.display = 'flex';
    const salvar = document.getElementById('button-save');
    salvar.addEventListener('click', async () => {
      popup_update.style.display = 'none';
      await updateOcurrency(ocurrency._id, {
        title: titulo.value,
        type: tipo.value,
        date: data.value,
        time: hora.value,
        public: status.value === 'publica'
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    });
  });
  let adress = await GeoLocalizationToAdress({
    lat: ocurrency.location.coordinates[1],
    lng: ocurrency.location.coordinates[0]
  });
  const container_buttons = document.createElement('div');
  container_buttons.classList.add('container_buttons');
  container_buttons.appendChild(updateButton);
  container_buttons.appendChild(delButton);
  const container_texto = document.createElement('div');
  const texto = `<strong>Titulo</strong>: ${ocurrency.title}<br>
  <strong>Tipo</strong>: ${ocurrency.type}<br>
  <strong>Rua</strong>: ${adress.road}<br>
  <strong>Bairro</strong>: ${adress.neighbourhood}<br>
  <strong>Cidade</strong>: ${adress.city_district} - ${adress.state}<br>
  <strong>Data</strong>: ${formatDate(ocurrency.date)}<br>
  <strong>Hora</strong>: ${ocurrency.time}`;
  container_texto.innerHTML = texto;
  newOcurrency.appendChild(container_texto);
  newOcurrency.appendChild(container_buttons);
  listOcurrencies.appendChild(newOcurrency);
};

window.onload = async () => {
  if (!(await isTokenValid())) {
    window.location.href = '../index.html';
  }
  const allOcurrencies = await GetUserOcurrencies();
  if (allOcurrencies.length === 0) {
    iziToast.info({
      title: 'Informação',
      message: 'Você ainda não possui nenhuma ocorrência cadastrada!',
      position: 'bottomCenter'
    });

    const noContent = document.createElement('span');
    noContent.classList.add('no-content');
    noContent.innerHTML = 'Você ainda não possui ocorrências cadastradas!';
    OcurrenciesContainer.appendChild(noContent);
  }
  allOcurrencies?.map(async (ocurrency) => {
    L.marker([
      ocurrency?.location.coordinates[1],
      ocurrency?.location.coordinates[0]
    ]).addTo(map);
    await addOcurrencyToList(ocurrency);
  });
};

googleStreets.addTo(map);
