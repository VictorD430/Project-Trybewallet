import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  sumTotal = () => {
    const { expenses } = this.props;
    const values = expenses.map((ex) => {
      const arrayy = Object.entries(ex.exchangeRates);
      const curr = arrayy.find((element) => element[0] === ex.currency);
      return Number(ex.value) * Number(curr[1].ask);
    });
    return values.reduce((sum, a) => sum + a, 0);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="header-container">
        <span className="email-field" data-testid="email-field">
          { user.email }
        </span>
        <div>
          <span className="total-field" data-testid="total-field">
            { this.sumTotal().toFixed(2) }
          </span>
          <span className="header-currency-field" data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.objectOf(String),
  // expenses: PropTypes.arrayOf(Object),
}.isRequired;

export default connect(mapStateToProps)(Header);
