import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import history from './redux/history';
import { mainRoutes } from './components/Routes/routes';
import MainRoutes from './components/Routes/MainRoutes';
import Navbar from './components/Navigation/Navbar';
import Bootstrap from './Bootstrap';

function App({ isAuthenticated }) {
  return (
    <Bootstrap>
      <Router history={history}>
        <div>
          <Navbar routes={mainRoutes} />
          <MainRoutes routes={mainRoutes} isAuthenticated={isAuthenticated} />
        </div>
      </Router>
    </Bootstrap>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(App);
