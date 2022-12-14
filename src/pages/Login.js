import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  btnValidation = (email, password) => {
    const passwordMinLength = 6;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const testEmail = email.match(emailRegex);
    const testPassword = password.length >= passwordMinLength;
    return !(testEmail && testPassword);
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      this.setState({ isBtnDisabled: this.btnValidation(email, password) });
    });
  };

  handleClick = () => {
    const { email } = this.state;
    const { history, emailSubmit } = this.props;
    emailSubmit(email);
    history.push('/carteira');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div className="login-container">
        <h1>TRYBEWALLET</h1>
        <div className="form-container">
          <form className="form login-form">
            <h3 className="login-title">Login</h3>
            <label htmlFor="email">
              <input
                className="text-input"
                name="email"
                type="email"
                placeholder="Digite seu email"
                onChange={ this.handleChange }
                data-testid="email-input"
              />
            </label>
            <label htmlFor="password">
              <input
                className="text-input"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                onChange={ this.handleChange }
                data-testid="password-input"
              />
            </label>
            <button
              className="login-btn btn"
              type="button"
              disabled={ isBtnDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  emailSubmit: (state) => dispatch(actLogin(state)),
});

export default connect(null, mapDispatchToProps)(Login);
