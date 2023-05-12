import React from 'react';

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

    if (validateEmail && password.length >= passSize) {
      return false;
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-container">
        <h1>Trybe Wallet</h1>
        <h3>Login</h3>
        <div className="input-container">
          <input
            type="email"
            name="email"
            data-testid="email-input"
            value={ email }
            placeholder="e-mail"
            onChange={ (element) => this.setState({ email: element.target.value }) }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            value={ password }
            placeholder="password"
            onChange={ (element) => this.setState({ password: element.target.value }) }
          />
        </div>
        <div className="btn-container">
          <button
            type="button"
            disabled={ this.btnDisabled(email, password) }
            onClick={ () => console.log('btnEntrar') }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
