const baseUrl = 'https://norma.nomoreparties.space/api'

function resOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
}

export function getIngredientsApi() {
    return fetch(`${baseUrl}/ingredients`).then(res => resOk(res));
}

export function postOrderDetailsApi(ingredientsID) {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredientsID
    })
  }).then(res => resOk(res));
}