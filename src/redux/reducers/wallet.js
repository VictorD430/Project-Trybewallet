import {
  ADD_CURRENCIES,
  ADD_EXPENSES,
  SUM_VALUES,
  REM_EXPENSES,
  EDIT_EXPENSE,
  EDIT_SAVED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
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
      edit: false,
    };

  case REM_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.idRemove),
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      edit: true,
      editExpense: action.payload,
    };

  case EDIT_SAVED_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      edit: false,
    };

  default:
    return state;
  }
};

export default wallet;
