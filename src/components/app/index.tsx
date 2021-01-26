import React from 'react';
import './app.scss';
import Home from '../../pages/home';
import ErrorPage from '../../pages/errorPage';
import FilterPage from '../../pages/filterPage/index';
import GraduateCabinet from '../../pages/graduateCabinetPage/index';
import LoginPage from '../../pages/loginPage';
import UniversitiesPage from '../../pages/universitiesPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from '../../pages/registrationPage';
import { useAuth } from '../../services/tokenValidator';
import { ProtectedRoute, RedirectRoute } from '../../services/customRoutes';

const App = () => {
  const { token } = useAuth();

  return (
  /*  <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <RedirectRoute user={token} pathname='cabinet' path='/login'>
          <LoginPage />
        </RedirectRoute>
        <RedirectRoute user={token} pathname='cabinet' path='/register'>
          <RegistrationForm />
        </RedirectRoute>
        <Route path='/universities'>
          <UniversitiesPage />
        </Route>
        <ProtectedRoute user={token} pathname='login' path='/cabinet'>
          <GraduateCabinet />
        </ProtectedRoute>
        <Route path='/filterPage' component={FilterPage} />
        <Route path='/404' component={ErrorPage} status={404} />
        <Route component={ErrorPage} status={404} />
      </Switch>
    </Router>*/

      <Router>
       <Switch>
         <Route exact path='/'>
           <Home />
         </Route>
        <Route path='/login'>
           <LoginPage />
         </Route>
         <Route path='/register'>
           <RegistrationForm />
        </Route>
        <Route path='/universities'>
          <UniversitiesPage />
        </Route>
         <Route path='/cabinet'>
           <GraduateCabinet />
         </Route>
         <Route path='/filterPage' component={FilterPage} />
        <Route path='/404' component={ErrorPage} status={404} />
        <Route component={ErrorPage} status={404} />
      </Switch>
     </Router>
  );
};

export default App;
