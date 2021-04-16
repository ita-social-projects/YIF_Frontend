import React from 'react';
import './app.scss';
import Home from '../../pages/home';
import ErrorPage from '../../pages/errorPage';
import LoginPage from '../../pages/loginPage';
import InstitutionsOfEducationListPage from '../../pages/institutionsOfEducationListPage';
import SpecialityPage from '../../pages/specialityPage';
import DirectionsListPage from '../../pages/directionsListPage';
import InstitutionOfEducationPage from '../../pages/institutionOfEducationPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from '../../pages/registrationPage';
import { useAuth } from '../../services/tokenValidator';
import { ProtectedRoute, RedirectRoute } from '../../services/customRoutes';
import ErrorBoundry from '../../errorBoundry';
import ResetPasswordPage from '../../pages/resetPasswordPage/index';
import AddInstitutionOfEducation from '../../pages/superAdminPages/addInstitutionOfEducationPage';
import AddInstitutionOfEducationAdmin from '../../pages/superAdminPages/addInstitutionOfEducationAdminPage';
import SuperAdminAccountPage from '../../pages/superAdminPages/superAdminAccountPage';
import InstitutionOfEducationAdminPage from '../../pages/institutionOfEducationAdminPage';
import NewPasswordPage from '../../pages/newPasswordPage';
import ScrollToTop from '../common/scrollToTop/scrollToTop';
import SuperAdmin from '../../pages/superAdminPages/index';
import GraduateAccountPage from '../../pages/graduatePage';

const App = () => {
  const { token } = useAuth();

  return (
    <ErrorBoundry>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <RedirectRoute user={token} pathname='/' path='/login'>
            <LoginPage />
          </RedirectRoute>
          <RedirectRoute user={token} pathname='/' path='/resetPassword'>
            <ResetPasswordPage />
          </RedirectRoute>
          <RedirectRoute user={token} pathname='/' path='/register'>
            <RegistrationForm />
          </RedirectRoute>
          <Route path='/directions'>
            <DirectionsListPage />
          </Route>
          <Route path='/institutionsOfEducation'>
            <InstitutionsOfEducationListPage />
          </Route>
          <Route path='/institutionOfEducation/:id'>
            <InstitutionOfEducationPage />
          </Route>
          <ProtectedRoute
            user={token}
            path='/superAdminAccount'
            allowed={['SuperAdmin']}
          >
            <SuperAdmin />
          </ProtectedRoute>
          <Route path='/specialty/:id'>
            <SpecialityPage />
          </Route>

          <ProtectedRoute
            user={token}
            path='/institutionOfEducationAccount'
            allowed={['InstitutionOfEducationAdmin']}
          >
            <InstitutionOfEducationAdminPage />
          </ProtectedRoute>
          <ProtectedRoute
            user={token}
            path='/addInstitutionOfEducationAdmin'
            allowed={['SuperAdmin']}
          >
            <AddInstitutionOfEducationAdmin />
          </ProtectedRoute>
          <Route path='/newPassword'>
            <NewPasswordPage />
          </Route>
          <ProtectedRoute user={token} path='/cabinet' allowed={['Graduate']}>
            <GraduateAccountPage />
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
