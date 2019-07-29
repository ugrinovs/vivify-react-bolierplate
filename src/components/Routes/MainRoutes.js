import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Auth/Login';
import NoMatch from './NoMatch';

const renderComponent = (Component, authRequired, isAuthenticated, props) =>
  authRequired && !isAuthenticated ? (
    <Login />
  ) : (
    <Component isAuthenticated={isAuthenticated} {...props} />
  );

const MainRoutes = ({ isAuthenticated, routes, ...props }) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        const { exact, path, component, authRequired, additionalProps } = route;
        return (
          <Route
            key={index}
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
      <Route exact={false} component={NoMatch} />
    </Switch>
  );
};

export default MainRoutes;
