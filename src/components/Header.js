import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="header-container">
        <span className="email-field" data-testid="email-field">
          { user.email }
        </span>
        <div>
          <span className="total-field" data-testid="total-field">
            0
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
});

Header.propTypes = {
  user: PropTypes.objectOf(String),
}.isRequired;

export default connect(mapStateToProps)(Header);
