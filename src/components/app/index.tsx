import React from 'react';
import './app.scss';
import Home from '../../pages/home';
import ErrorPage from '../../pages/errorPage';
import FilterPage from '../../pages/filterPage/index';
import GraduateCabinet from '../../pages/graduateCabinetPage/index';
import LoginPage from '../../pages/loginPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from '../../components/registrationForm/index';
import { useAuth } from '../../services/tokenValidator';
import { ProtectedRoute, IsUserRedirect } from '../../services/customRoutes';

const App = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        {/* <Route path='/cabinet' component={GraduateCabinet}/> */}
        <ProtectedRoute user={user} pathname='login' path='/cabinet'>
          <GraduateCabinet />
        </ProtectedRoute>
        {/* <Route path='/login'>
          <LoginPage />
        </Route> */}
        <IsUserRedirect user={user} pathname='cabinet' path='/login'>
          <LoginPage />
        </IsUserRedirect>
        <Route path='/register'>
          <RegistrationForm />
        </Route>
        <Route path='/filterPage' component={FilterPage} />
        <Route path='/404' component={ErrorPage} status={404} />
        <Route component={ErrorPage} status={404} />
      </Switch>
    </Router>
  );
};

export default App;
