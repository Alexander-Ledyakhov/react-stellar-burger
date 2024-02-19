const baseUrl = 'https://norma.nomoreparties.space/api'

function checkStatusRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
}

export function getIngredientsApi() {
    return fetch(`${baseUrl}/ingredients`).then(res => checkStatusRes(res));
}

export function postOrderDetailsApi(ingredientsID, token) {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: { 
      authorization: token,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      ingredients: ingredientsID
    })
  }).then(res => checkStatusRes(res));
}






export function checkEmailApi(email) {
  return fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email
    })
  }).then(res => checkStatusRes(res));
}

export function resetPasswordApi(password, codePassword) {
  return fetch(`${baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: password,
      token: codePassword
    })
  }).then(res => checkStatusRes(res));
}









//-----------------
//POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
//POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
//POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.
//POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.

export function postRegisterApi(email, password, name) {
  return fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  }).then(res => checkStatusRes(res));
}

export function postAuthApi(email, password) {
  return fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(res => checkStatusRes(res));
}

export function postTokenApi(token) {
  return fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token
    })
  }).then(res => checkStatusRes(res));
}

export function postLogoutApi(token) {
  return fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token
    })
  }).then(res => checkStatusRes(res));
}





//GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
//PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.


export function getInfoUserApi(token) {
  return fetch(`${baseUrl}/auth/user`, {
    headers: { 
      authorization: token,
      "Content-Type": "application/json" 
    }
  }).then(res => checkStatusRes(res));
}


export function patchInfoUserApi(token, email, password, name) {
  return fetch(`${baseUrl}/auth/user`, {
    method: "PATCH",
    headers: { 
      authorization: token,
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  }).then(res => checkStatusRes(res));
}