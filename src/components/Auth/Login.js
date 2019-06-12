import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import i18n from '../../i18n';
import { connect } from 'react-redux';
import { clearErrors, requestLogIn } from '../../redux/actions/authActions';

class LoginContainer extends Component {
	state = {
		email: '',
		password: '',
		error: '',
	};

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

		this.props.clearErrors();
		this.props.login({ email, password });
	};

	renderError = field => {
		const { errors } = this.props;
		if (!isEmpty(errors) && errors[field]) {
			return <span>{errors[field]}</span>;
		}

		return null;
	};

	renderSubmitButton() {
		const { isFetching } = this.props;

		return (
			<button onClick={this.handleSubmit}>
				{isFetching ? 'Loading' : i18n.t('auth.signIn')}
			</button>
		);
	}

	render() {
		const { email, password } = this.state;
		return (
			<div>
				<form>
					<h1>Log in</h1>
					<div>
						<label>Email</label>
						<div>
							<input
								name="email"
								type="email"
								onChange={this.handleChange}
								value={email}
							/>
						</div>
						<div>
							<p>
								{this.renderError('email')}
							</p>
						</div>
					</div>
					<div>
						<label>Password</label>
						<div>
							<input
								name="password"
								type="password"
								onChange={this.handleChange}
								value={password}
							/>
						</div>
						<div>
							<p>
								{this.renderError('password')}
							</p>
						</div>
					</div>
					<div>
						{this.renderSubmitButton()}
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	errors: state.auth.errors,
	isFetching: state.auth.isFetching,
});

const mapDispatchToProps = {
	login: requestLogIn,
	clearErrors,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LoginContainer);
