import React from 'react';
import './app.scss';
import Home from '../../pages/home';
import ErrorPage from '../../pages/errorPage';
import GraduateCabinet from '../../pages/graduateCabinetPage/index';
import LoginPage from '../../pages/loginPage';
import UniversitiesListPage from '../../pages/universitiesListPage';
import SpecialityPage from '../../pages/specialityPage';
import DirectionsListPage from '../../pages/directionsListPage';
import UniversityPage from '../../pages/universityPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from '../../pages/registrationPage';
import { useAuth } from '../../services/tokenValidator';
import { ProtectedRoute, RedirectRoute } from '../../services/customRoutes';
import ErrorBoundry from '../../errorBoundry';
import ResetPasswordPage from '../../pages/resetPasswordPage/index';
import AddUniversity from '../../pages/superAdminPages/addUniversityPage';
import SuperAdminAccountPage from '../../pages/superAdminPages/superAdminAccountPage';
import NewPasswordPage from '../../pages/newPasswordPage';

const App = () => {
  const { token } = useAuth();

  return (
    <ErrorBoundry>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <RedirectRoute user={token} pathname='cabinet' path='/login'>
            <LoginPage />
          </RedirectRoute>
          <RedirectRoute user={token} pathname='cabinet' path='/resetPassword'>
            <ResetPasswordPage />
          </RedirectRoute>
          <RedirectRoute user={token} pathname='cabinet' path='/register'>
            <RegistrationForm />
          </RedirectRoute>
          <Route path='/directions'>
            <DirectionsListPage />
          </Route>
          <Route path='/universities'>
            <UniversitiesListPage />
          </Route>
          <Route path='/university/:id'>
            <UniversityPage />
          </Route>
          <Route path='/superAdminAccount'>
            <SuperAdminAccountPage />
          </Route>
          <Route path='/specialty/:id'>
            <SpecialityPage />
          </Route>
          <Route path='/adduniv'>
            <AddUniversity />
          </Route>
          <Route path='/newPassword'>
            <NewPasswordPage />
          </Route>
          <ProtectedRoute user={token} pathname='login' path='/cabinet'>
            <GraduateCabinet />
          </ProtectedRoute>
          <Route path='/404' component={ErrorPage} status={404} />
          <Route component={ErrorPage} status={404} />
        </Switch>
      </Router>
    </ErrorBoundry>

    // <Router>
    //   <Switch>
    //     <Route exact path='/'>
    //       <Home />
    //     </Route>
    //     <Route path='/login'>
    //       <LoginPage />
    //     </Route>
    //     <Route path='/register'>
    //       <RegistrationForm />
    //     </Route>
    //     <Route path='/universities'>
    //       <UniversitiesListPage />
    //     </Route>
    //     <Route path='/cabinet'>
    //       <GraduateCabinet />
    //     </Route>
    //     <Route path='/filterPage' component={FilterPage} />
    //     <Route path='/404' component={ErrorPage} status={404} />
    //     <Route component={ErrorPage} status={404} />
    //   </Switch>
    // </Router>
  );
};

export default App;
