import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import i18n from '../../i18n';
import { requestRegister } from '../../redux/actions/authActions';
import StyledForm from '../../common/styles/StyledForm';
import StyledInputWrapper from '../../common/styles/StyledInputWrapper';
import StyledButton from '../../common/styles/StyledButton';

const NAME = 'first_name';
const LAST_NAME = 'last_name';
const EMAIL = 'email';
const PASSWORD = 'password';
const REPEAT_PASSWORD = 'repeatPassword';

class Register extends Component {
  state = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    repeatPassword: '',
  };

  validate() {
    const { password, repeatPassword } = this.state;

    if (password !== repeatPassword) {
      this.setState(prevState => ({
        ...prevState,
        errors: 'passwordMustMatch',
      }));

      return false;
    }

    return true;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { first_name, last_name, email, password } = this.state;
    const { register } = this.props;

    const isValid = this.validate();
    if (!isValid) {
      return null;
    }

    return register({ first_name, last_name, email, password });
  };

  render() {
    return (
      <StyledForm>
        <form>
          <StyledInputWrapper>
            <label htmlFor={EMAIL}>{i18n.t('auth.enterEmail')}: </label>
            <input name={EMAIL} onChange={this.handleChange} />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label htmlFor={NAME}>{i18n.t('auth.enterName')}: </label>
            <input name={NAME} onChange={this.handleChange} />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label htmlFor={LAST_NAME}>{i18n.t('auth.enterLastName')}: </label>
            <input name={LAST_NAME} onChange={this.handleChange} />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label htmlFor={PASSWORD}>{i18n.t('auth.enterPass')}: </label>
            <input
              name={PASSWORD}
              onChange={this.handleChange}
              type="password"
            />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label htmlFor={REPEAT_PASSWORD}>
              {i18n.t('auth.confirmPass')}:{' '}
            </label>
            <input
              name={REPEAT_PASSWORD}
              onChange={this.handleChange}
              type="password"
            />
          </StyledInputWrapper>
          <StyledButton onClick={this.handleSubmit}>
            {i18n.t('auth.signUp')}
          </StyledButton>
        </form>
      </StyledForm>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func,
};

const mapDispatchToProps = {
  register: requestRegister,
};

export default connect(
  null,
  mapDispatchToProps
)(Register);
