import { TJson } from "../types/typesApi";

const baseUrl: string = 'https://norma.nomoreparties.space/api'

type TResponse = {
  readonly json: Function;
  readonly status: number;
  readonly ok: boolean;
}

const checkStatusRes = (response: TResponse): Promise<TJson> => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`)
    }
}

export async function getIngredientsApi() {
  return await fetch(`${baseUrl}/ingredients`).then(res => checkStatusRes(res));
}

export async function postOrderDetailsApi(ingredientsID: string[], token: string) {
  return await fetch(`${baseUrl}/orders`, {
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






export async function checkEmailApi(email: string) {
  return await fetch(`${baseUrl}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email
    })
  }).then(res => checkStatusRes(res));
}

export async function resetPasswordApi(password: string, codePassword: string) {
  return await fetch(`${baseUrl}/password-reset/reset`, {
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

export async function postRegisterApi(email: string, password: string, name: string) {
  return await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    })
  }).then(res => checkStatusRes(res));
}

export async function postAuthApi(email: string, password: string) {
  return await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(res => checkStatusRes(res));
}

export async function postTokenApi(token: string) {
  return await fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token
    })
  }).then(res => checkStatusRes(res));
}

export async function postLogoutApi(token: string) {
  return await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token
    })
  }).then(res => checkStatusRes(res));
}





//GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.
//PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.


export async function getInfoUserApi(token: string) {
  return await fetch(`${baseUrl}/auth/user`, {
    headers: { 
      authorization: token,
      "Content-Type": "application/json" 
    }
  }).then(res => checkStatusRes(res));
}


export async function patchInfoUserApi(token: string, email: string, password: string, name: string) {
  return await fetch(`${baseUrl}/auth/user`, {
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



//GET https://norma.nomoreparties.space/api/orders/{номер заказа} 

export async function getOrderApi(numberId: string) {
  return await fetch(`${baseUrl}/orders/${numberId}`).then(res => checkStatusRes(res));
}