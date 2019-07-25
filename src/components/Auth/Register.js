import React, { Component } from 'react';

import i18n from '../../i18n';
import { connect } from 'react-redux';
import { requestRegister } from '../../redux/actions/authActions';

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

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { first_name, last_name, email, password } = this.state;
		const { register } = this.props;

		const isValid = this.validate();
		if (!isValid) {
			return null;
		}

		console.log('registering');
		return register({ first_name, last_name, email, password });
	};

	render() {
		return (
			<div>
				<div>
					<label htmlFor={EMAIL}>{i18n.t('auth.enterEmail')}: </label>
					<input name={EMAIL} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor={NAME}>{i18n.t('auth.enterName')}: </label>
					<input name={NAME} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor={LAST_NAME}>{i18n.t('auth.enterLastName')}: </label>
					<input name={LAST_NAME} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor={PASSWORD}>{i18n.t('auth.enterPass')}: </label>
					<input name={PASSWORD} onChange={this.handleChange} />
				</div>
				<div>
					<label htmlFor={REPEAT_PASSWORD}>{i18n.t('auth.confirmPass')}: </label>
					<input name={REPEAT_PASSWORD} onChange={this.handleChange} />
				</div>
				<button onClick={this.handleSubmit}>Register</button>
			</div>
		);
	}
}

const mapDispatchToProps = {
	register: requestRegister,
};

export default connect(null, mapDispatchToProps)(Register);
