import React from 'react';
import './app.scss';
import Home from '../../pages/home';
import ErrorPage from '../../pages/errorPage';
import FilterPage from '../../pages/filterPage/index';
import GraduateCabinet from '../../pages/graduateCabinetPage/index';
import LoginPage from '../../pages/loginPage';
import UniversitiesPage from '../../pages/universitiesPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from '../../components/registrationForm/index';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/cabinet' component={GraduateCabinet} />
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/universities'>
          <UniversitiesPage />
        </Route>
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
