import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import AuthLink from '../Auth/AuthLink';
import Logout from '../Auth/Logout';
import VivifyLogo from '../../common/VivifyLogo';

const StyledNav = styled.div`
  height: 50px;
  background-color: #282c34;
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
  }
  & a,
  button {
    appearance: none;
    background: transparent;
    border: none;
    color: white;
    text-decoration: none;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 16px;

    &:hover {
      background-color: #474f5d;
    }

    &.active {
      background-color: #474f5d;
    }
  }
`;

const Navbar = ({ isAuthenticated, ...props }) => {
  const handleClick = () => {
    props.history.push('/home');
  };

  return (
    <StyledNav>
      <div>
        <VivifyLogo cursor="pointer" onClick={handleClick} />
      </div>
      <div>
        <NavLink to="/home">Home</NavLink>
        <AuthLink to="/test" isAuthenticated={isAuthenticated}>
          Test
        </AuthLink>
        <AuthLink to="/login" isAuthenticated={!isAuthenticated}>
          Login
        </AuthLink>
        <AuthLink to="/register" isAuthenticated={!isAuthenticated}>
          Register
        </AuthLink>
        {isAuthenticated && <Logout />}
      </div>
    </StyledNav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

export default withRouter(connect(mapStateToProps)(Navbar));
