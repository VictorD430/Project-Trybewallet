// Coloque aqui suas actions

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const addCurrencies = (payload) => ({
  type: ADD_CURRENCIES,
  payload,
});

export const requestCurrencies = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => dispatch(addCurrencies(Object.keys(data)
    .filter((type) => type !== 'USDT'))));
