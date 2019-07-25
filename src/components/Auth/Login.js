import React, { Component } from 'react';
import { connect } from 'react-redux';

import i18n from '../../i18n';
import { clearErrors, requestLogIn } from '../../redux/actions/authActions';
import ErrorBox from '../../common/ErrorBox';

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

	componentDidUpdate(prevProps, prevState) {
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

		this.props.clearErrors();
		this.props.login({ email, password });
	};

	renderSubmitButton() {
		const { isFetching } = this.props;

		return (
			<button onClick={this.handleSubmit} disabled={isFetching}>
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
					<ErrorBox error={this.props.errors} field="" />
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
						<ErrorBox error={this.props.errors} field="email" />
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
						<ErrorBox error={this.props.errors} field="password" />
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
	isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = {
	login: requestLogIn,
	clearErrors,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LoginContainer);
