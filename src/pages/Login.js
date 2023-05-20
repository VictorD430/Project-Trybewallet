import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEmail } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  btnDisabled() {
    const { email, password } = this.state;
    const regex = /\w+@\w+\.\w{2,8}(\.\w{0,2})?/g;
    const validateEmail = regex.test(email);
    const passSize = 6;
    const passTest = password.length >= passSize;
    let test;

    if (validateEmail && passTest) {
      test = false;
    } else {
      test = true;
    }
    return test;
  }

  render() {
    const { email, password } = this.state;
    const { loginAction, history } = this.props;
    return (
      <div className="login-container">
        <div className="login">
          <h1>
            <span>Trybe</span>
            Wallet
          </h1>
          <h3>Login</h3>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              data-testid="email-input"
              value={ email }
              placeholder="e-mail"
              onChange={ (element) => this.setState({ email: element.target.value }) }
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              data-testid="password-input"
              value={ password }
              placeholder="password"
              onChange={ (element) => this.setState({ password: element.target.value }) }
            />
          </label>
          <button
            type="button"
            disabled={ this.btnDisabled(email, password) }
            onClick={ () => loginAction(email) && history.push('/carteira') }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  loginAction: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
