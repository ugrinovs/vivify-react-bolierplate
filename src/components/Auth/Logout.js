import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { requestLogOut } from '../../redux/actions/authActions';

const Logout = ({ logout }) => {
  const handleLogout = () => {
    logout();
  };
  return <button onClick={handleLogout}>Logout</button>;
};

Logout.propTypes = {
  logout: PropTypes.func,
};

const mapDispatchToProps = {
  logout: requestLogOut,
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
