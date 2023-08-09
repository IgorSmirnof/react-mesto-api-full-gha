import checkResponse from './checkResponse';
export const BASE_URL = 'https://api.igo.nomoreparties.co';
// export const BASE_URL = 'http://localhost:4000';
// export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(password, email) {
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    // .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .then(checkResponse)
};

export function authorize(password,email ) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  // .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
.then(checkResponse)
};

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    credentials: 'include',
  })
  // .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
.then(checkResponse)
}


  
// export function sign(password, email, type) {
//   return fetch(`${BASE_URL}/``${type}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ password, email })
//   })
//     .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
// }