import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  removeExpense as ACTIONremoveExpense,
} from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, removeIt } = this.props;
    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((ex) => {
              const curr = Object
                .values(ex.exchangeRates !== undefined && ex.exchangeRates)
                .find((cType) => cType.code === ex.currency);
              return (
                <tr key={ ex.id }>
                  <td>{ex.description}</td>
                  <td>{ex.tag}</td>
                  <td>{ex.method}</td>
                  <td>{Number(ex.value).toFixed(2)}</td>
                  <td>{curr.name}</td>
                  <td>{Number(curr.ask).toFixed(2)}</td>
                  <td>{(Number(curr.ask) * ex.value).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      className="delete-btn"
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => removeIt(ex.id) }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
  removeIt: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeIt: (expenseId) => dispatch(ACTIONremoveExpense(expenseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
