import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrencies as ACTIONrequestCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;

    requestCurrencies();
  }

  handleChange(event) {
    const { id, value } = event.target;

    this.setState({
      [id]: value,
    });
  }

  render() {
    const { currencyType } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="form-container">
        <p>Adicionar valor da despesa</p>
        <div>
          <input
            className="value-input"
            data-testid="value-input"
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(ACTIONrequestCurrencies()),
});

const mapStateToProps = (state) => ({
  currencyType: state.wallet.currencies,
});

WalletForm.propTypes = {
  requestCurrencies: PropTypes.func,
  currencyType: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
