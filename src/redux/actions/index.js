import {
  FAILED_REQUEST,
  GET_CURRENCIES,
  LOGIN_ACTION,
  GET_EXCHANGE,
  REMOVE_EXPENSE,
} from './actionTypes';

// Coloque aqui suas actions
const actLogin = (payload) => ({ type: LOGIN_ACTION, payload });

const getCurrencies = (payload) => ({ type: GET_CURRENCIES, payload });
const failedRequest = (payload) => ({ type: FAILED_REQUEST, payload });

function fetchCurrencies() {
  return async (dispatch) => {
    try {
      const END_POINT = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(END_POINT);
      const data = await response.json();
      const currencies = Object.keys(data).filter(
        (currencie) => currencie !== 'USDT',
      );
      dispatch(getCurrencies(currencies));
    } catch (error) {
      dispatch(failedRequest(error));
    }
  };
}

const getExchangeRates = (payload) => ({ type: GET_EXCHANGE, payload });

function fetchExchangeRates(obj) {
  return async (dispatch) => {
    try {
      const END_POINT = 'https://economia.awesomeapi.com.br/json/all';
      const response = await fetch(END_POINT);
      const responseJson = await response.json();
      delete responseJson.USDT;
      const {
        expenseValue,
        expenseDescription,
        expenseCurrency,
        expenseMethod,
        expenseTag,
      } = obj[0];

      dispatch(
        getExchangeRates([
          ...obj[1],
          {
            id: obj[1].length,
            value: expenseValue,
            description: expenseDescription,
            currency: expenseCurrency,
            method: expenseMethod,
            tag: expenseTag,
            exchangeRates: responseJson,
          },
        ]),
      );
    } catch (error) {
      failedRequest(error);
    }
  };
}

const removeExpense = (payload) => ({ type: REMOVE_EXPENSE, payload });

const toEditExpense = (payload) => ({ type: 'TO_EDIT_EXPENSE', payload });

const editExpense = (payload) => ({ type: 'EDIT_EXPENSE', payload });

export {
  actLogin,
  removeExpense,
  toEditExpense,
  editExpense,
  fetchCurrencies,
  fetchExchangeRates,
};
