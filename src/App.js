import React from 'react';
import { Router } from 'react-router-dom';

import history from './redux/history';
import { mainRoutes } from './components/Routes/routes';
import MainRoutes from './components/Routes/MainRoutes';
import Navbar from './components/Navigation/Navbar';
import Bootstrap from './Bootstrap';
import { connect } from 'react-redux';

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

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(App);
