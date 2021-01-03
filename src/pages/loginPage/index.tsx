import React from 'react';
import { Header, LoginForm } from '../../components';
import ErrorBoundry from '../../errorBoundry';

const LoginPage = () => {
  return (
    <>
      <ErrorBoundry>
        <Header />
        <LoginForm />
      </ErrorBoundry>
    </>
  );
};

export default LoginPage;
