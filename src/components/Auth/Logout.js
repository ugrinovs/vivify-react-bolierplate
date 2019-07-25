import React from 'react';
import { connect } from 'react-redux';
import { requestLogOut } from '../../redux/actions/authActions';

const Logout = ({ logout }) => {
	const handleLogout = () => {
		logout();
	};
	return (
		<button onClick={handleLogout}>
			Logout
		</button>
	);
};

const mapDispatchToProps = {
	logout: requestLogOut,
};

export default connect(null, mapDispatchToProps)(Logout);
