const baseUrl = 'https://norma.nomoreparties.space/api'

function resOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
}

function getIngredientsApi() {
    return fetch(`${baseUrl}/ingredients`).then(res => resOk(res));
}

export default getIngredientsApi;