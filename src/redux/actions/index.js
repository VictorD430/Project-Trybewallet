// Coloque aqui suas actions
import currenciesAPI from '../../services/requestAPI';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const SUM_VALUES = 'SUM_VALUES';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: {
    currencies,
  },
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: {
    expenses,
  },
});

export const sumValues = (allValues) => ({
  type: SUM_VALUES,
  payload: {
    allValues,
  },
});

export const requestCurrencies = () => async (dispatch) => {
  const response = await currenciesAPI();
  delete response.USDT;
  dispatch(addCurrencies(response));
};
