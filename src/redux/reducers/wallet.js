// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_CURRENCIES,
  ADD_EXPENSES,
  SUM_VALUES,
  REM_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  allValues: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.payload.currencies),
    };

  case ADD_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.concat(action.payload.expenses),
    };

  case SUM_VALUES:
    return {
      ...state,
      allValues: action.payload.allValues,
    };

  case REM_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.id),
    };

  default:
    return state;
  }
};

export default wallet;
