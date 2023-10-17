/* eslint-disable no-undef */
import { checkCookie, readCookie } from './login.js';

const findUser = async (email, token) => {
  let user = null;
  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  await fetch(`http://localhost:3000/user/${email}`, options)
    .then((response) => response.json())
    .then((data) => {
      user = data;
    })
    .catch((err) => console.log(err));
  return user;
};

const findUserId = async () => {
  const token = readCookie();
  const { email } = parseJwt(token);
  const { id } = await findUser(email, token);
  return { id, email, token };
};

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

const isTokenValid = async () => {
  console.log(checkCookie());
  if (!checkCookie()) {
    return false;
  }
  console.log(readCookie());
  const { email } = parseJwt(readCookie());
  if (!email) {
    return false;
  }
  const user = await findUser(email, readCookie());
  if (!user) {
    return false;
  }
  return true;
};

const GeoLocalizationToAdress = async (latlng) => {
  let address = null;
  await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`
  )
    .then((response) => response.json())
    .then((data) => {
      address = data.address;
    })
    .catch((err) => console.log(err));
  return address;
};

const GetPublicOcurrencies = async () => {
  let ocurrencies = null;
  const options = {
    headers: {
      Authorization: `Bearer ${readCookie()}`
    }
  };
  await fetch('http://localhost:3000/ocurrency/public', options)
    .then((response) => response.json())
    .then((data) => {
      ocurrencies = data;
    })
    .catch((err) => console.log(err));
  return ocurrencies;
};

const GetUserOcurrencies = async () => {
  let ocurrencies = null;
  const { id } = await findUserId();
  const options = {
    headers: {
      Authorization: `Bearer ${readCookie()}`
    }
  };
  await fetch(`http://localhost:3000/ocurrency/${id}`, options)
    .then((response) => response.json())
    .then((data) => {
      ocurrencies = data;
    })
    .catch((err) => console.log(err));
  return ocurrencies;
};

const formatDate = (date) => {
  const dateSplit = date.split('-');
  const splittedday = dateSplit[2].split('T');
  const year = dateSplit[0];
  const month = dateSplit[1];
  const day = splittedday[0];
  return `${day}/${month}/${year}`;
};

export {
  findUser,
  findUserId,
  parseJwt,
  isTokenValid,
  GeoLocalizationToAdress,
  GetPublicOcurrencies,
  GetUserOcurrencies,
  formatDate
};
