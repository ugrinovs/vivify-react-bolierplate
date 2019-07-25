import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthLink from '../Auth/AuthLink';
import Logout from '../Auth/Logout';
import { connect } from 'react-redux';

const Navbar = ({ isAuthenticated }) => {
	return <div>
		<NavLink to="/home">Home</NavLink>
		<AuthLink to="/test" isAuthenticated={isAuthenticated}>Test</AuthLink>
		<AuthLink to="/login" isAuthenticated={!isAuthenticated}>Login</AuthLink>
		<AuthLink to="/register" isAuthenticated={!isAuthenticated}>Register</AuthLink>
		{isAuthenticated &&  <Logout />}
	</div>;
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(Navbar);
