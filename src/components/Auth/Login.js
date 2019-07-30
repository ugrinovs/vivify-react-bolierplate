import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import i18n from '../../i18n';
import {
  clearErrors as clearErrorsAction,
  requestLogIn,
} from '../../redux/actions/authActions';
import ErrorBox from '../../common/ErrorBox';
import StyledForm from '../../common/styles/StyledForm';
import StyledInputWrapper from '../../common/styles/StyledInputWrapper';
import StyledButton from '../../common/styles/StyledButton';

class LoginContainer extends Component {
  state = {
    email: '',
    password: '',
    error: '',
  };

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      history.replace('/home');
    }
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated, history } = this.props;
    if (prevProps.isAuthenticated !== isAuthenticated && isAuthenticated) {
      history.push('/home');
    }
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

    const { email, password } = this.state;
    const { clearErrors, login } = this.props;
    clearErrors();
    login({ email, password });
  };

  renderSubmitButton() {
    const { isFetching } = this.props;

    return (
      <StyledButton onClick={this.handleSubmit} disabled={isFetching}>
        {isFetching ? 'Loading' : i18n.t('auth.signIn')}
      </StyledButton>
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <StyledForm>
        <form>
          <h1>Log in</h1>
          <ErrorBox error={this.props.errors} field="" />
          <StyledInputWrapper>
            <label>{i18n.t('auth.enterEmail')}</label>
            <div>
              <input
                name="email"
                type="email"
                onChange={this.handleChange}
                value={email}
              />
            </div>
            <ErrorBox error={this.props.errors} field="email" />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <label>{i18n.t('auth.enterPass')}</label>
            <div>
              <input
                name="password"
                type="password"
                onChange={this.handleChange}
                value={password}
              />
            </div>
            <ErrorBox error={this.props.errors} field="password" />
          </StyledInputWrapper>
          {this.renderSubmitButton()}
        </form>
      </StyledForm>
    );
  }
}

LoginContainer.propTypes = {
  errors: PropTypes.any,
  isFetching: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  clearErrors: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  errors: state.auth.errors,
  isFetching: state.auth.isFetching,
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
  login: requestLogIn,
  clearErrors: clearErrorsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
