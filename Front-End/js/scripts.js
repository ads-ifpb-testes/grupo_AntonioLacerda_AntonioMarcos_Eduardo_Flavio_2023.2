import { readCookie } from './login.js';

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

export { findUser, findUserId, parseJwt, GeoLocalizationToAdress };
