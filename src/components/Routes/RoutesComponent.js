import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import Login from '../Auth/Login';

const renderComponent = (Component, authRequired, isAuthenticated, props) =>
  authRequired && !isAuthenticated ? (
    <Login />
  ) : (
    <Component isAuthenticated={isAuthenticated} {...props} />
  );

const RoutesComponent = ({ isAuthenticated, routes, ...props }) => {
  return (
    <React.Fragment>
      {routes.map(route => {
        const { exact, path, component, authRequired, additionalProps } = route;
        return (
          <Route
            key={path}
            exact={exact}
            path={path}
            render={routerProps =>
              renderComponent(component, authRequired, isAuthenticated, {
                ...routerProps,
                ...additionalProps,
                ...props,
              })
            }
          />
        );
      })}
    </React.Fragment>
  );
};

RoutesComponent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default RoutesComponent;
