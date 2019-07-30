import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthLink = ({ isAuthenticated, children, ...props }) => {
  return !isAuthenticated ? null : <NavLink {...props}>{children}</NavLink>;
};

AuthLink.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.node,
};

export default AuthLink;
