import React, { Component } from 'react';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;

    this.setState({
      [id]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className="form-container">
        <p>Adicionar valor da despesa</p>
        <div>
          <input
            className="value-input"
            data-testid="value-input"
            value={ value }
            placeholder="R$"
          />
        </div>
        <div>
          <input
            className="description-input"
            data-testid="description-input"
            value={ description }
            placeholder="Descrição"
          />
        </div>
        <div>
          <select
            className="currency-input"
            data-testid="currency-input"
            value={ currency }
          >
            <option>1</option>
          </select>
        </div>
        <div>
          <select
            className="method-input"
            data-testid="method-input"
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

export default WalletForm;
