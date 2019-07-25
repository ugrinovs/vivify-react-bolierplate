import React from 'react';
import { NavLink } from 'react-router-dom';

const AuthLink = ({isAuthenticated, children, ...props}) => {
	return !isAuthenticated ? null : (
		<NavLink {...props}>
			{children}
		</NavLink>
	);
};

export default AuthLink;
