import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currenciesAPI from '../services/requestAPI';
import {
  requestCurrencies as ACTIONrequestCurrencies,
  addExpenses as ACTIONaddExpenses,
  sumValues as ACTIONsumValues,
  editSavedExpense as ACTIONeditSavedExpense,
} from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: -1,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    sumAll: 0,
  };

  componentDidMount() {
    const { requestCurrencies } = this.props;

    requestCurrencies();
  }

  componentDidUpdate() {
    const { editExpense, edit } = this.props;
    const { id } = this.state;
    if (edit && id !== editExpense.id) {
      this.setState({
        value: editExpense.value,
        description: editExpense.description,
        currency: editExpense.currency,
        method: editExpense.method,
        tag: editExpense.tag,
        id: editExpense.id,
      });
    }
  }

  handleSubmitEdit = async () => {
    const { editSavedExpense } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    editSavedExpense({ id, value, description, currency, method, tag });
    this.setState({
      value: '',
      description: '',
    });
  };

  handleChange = (event) => {
    const { id, value } = event.target;

    this.setState({
      [id]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { submitExpenses, submitAllValues } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
      sumAll,
    } = this.state;
    const curr = await this.fetchCurrency();
    const payload = {
      id: id + 1,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: curr,
    };
    submitExpenses(payload);
    this.setState({
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
    const numValue = Number(value);
    const exchange = curr[currency].ask;
    const valuee = exchange * numValue;
    const allValue = sumAll + valuee;
    submitAllValues(allValue);
    this.setState({ sumAll: allValue });
  };

  fetchCurrency = async () => {
    const response = await currenciesAPI();
    delete response.USDT;
    return response;
  };

  render() {
    const { currencyType, edit } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div className="form-container">
        <p>Adicionar valor da despesa</p>
        <div>
          <input
            className="value-input"
            data-testid="value-input"
            type="number"
            id="value"
            onChange={ this.handleChange }
            placeholder="R$"
            value={ value }
          />
        </div>
        <div>
          <input
            className="description-input"
            data-testid="description-input"
            id="description"
            onChange={ this.handleChange }
            placeholder="Descrição"
            value={ description }
          />
        </div>
        <div>
          <select
            className="currency-input"
            data-testid="currency-input"
            id="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencyType.map((coin, index) => (
              <option
                key={ index }
                value={ coin }
              >
                {coin}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="method-input"
            data-testid="method-input"
            id="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </div>
        <div>
          <select
            className="tag-input"
            data-testid="tag-input"
            id="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </div>
        <button
          className="btn-add"
          onClick={ edit ? this.handleSubmitEdit : this.handleSubmit }
          type="submit"
        >
          { edit ? 'Editar despesa' : 'Adicionar Despesa' }
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(ACTIONrequestCurrencies()),
  submitExpenses: (payload) => dispatch(ACTIONaddExpenses(payload)),
  submitAllValues: (allValues) => dispatch(ACTIONsumValues(allValues)),
  editSavedExpense: (state) => dispatch(ACTIONeditSavedExpense(state)),
});

const mapStateToProps = (state) => ({
  currencyType: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editExpense: state.wallet.editExpense,
  edit: state.wallet.edit,
});

WalletForm.propTypes = {
  requestCurrencies: PropTypes.func,
  currencyType: PropTypes.array,
  dispatch: PropTypes.func,
  editExpense: PropTypes.arrayOf(PropTypes.string),
  editSavedExpense: PropTypes.func,
  edit: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
