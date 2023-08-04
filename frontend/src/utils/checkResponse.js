
function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Пердоньте Монсеньёр: есть Ошибка: ${res.status}`
  );
}

export default checkResponse;