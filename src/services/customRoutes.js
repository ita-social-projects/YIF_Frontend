import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { store } from '../store/store';

export function ProtectedRoute({ user, children, allowed, ...rest }) {
  const history = useHistory();
  const { currentRole } = store.getState();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user && allowed.includes(currentRole.role)) return children;

        if (user && !allowed.includes(currentRole.role)) history.goBack();

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function RedirectRoute({ user, pathname, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) return children;

        if (user) {
          return (
            <Redirect
              to={{
                pathname,
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
