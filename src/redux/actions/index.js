import currenciesAPI from '../../services/requestAPI';

export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const SUM_VALUES = 'SUM_VALUES';
export const REM_EXPENSES = 'REM_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_SAVED_EXPENSE = 'EDIT_SAVED_EXPENSE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: {
    email,
  },
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

export const editSavedExpense = (payload) => ({
  type: EDIT_SAVED_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const removeExpense = (idRemove) => ({
  type: REM_EXPENSES,
  idRemove,
});

export const requestCurrencies = () => async (dispatch) => {
  const response = await currenciesAPI();
  delete response.USDT;
  dispatch(addCurrencies(response));
};
