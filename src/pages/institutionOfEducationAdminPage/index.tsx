import React from 'react';
import { Footer, Header } from '../../components';
import Aside from '../../components/institutionOfEducationAdmin/aside';
import InstitutionOfEducationInfo from '../../components/institutionOfEducationAdmin/institutionOfEducationInfo';
import styles from './institutionOfEducationAdminPage.module.scss';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Moderators from '../../components/institutionOfEducationAdmin/moderators';
import OurSpecialties from '../../components/institutionOfEducationAdmin/ourSpecialties';
import AddSpecialties from '../../components/institutionOfEducationAdmin/ourSpecialties/addSpecialties';

function InstitutionOfEducationAdminPage() {
  return (
    <>
      <Header />
      <Router>
        <section className={styles.institutionOfEducationAdminContent}>
          <Aside />
          <Route exact path="/institutionOfEducationAdmin">
              <Redirect to="/ourSpecialties" />
          </Route>
          <Route
            path='/institutionOfEducationInfo'
            component={InstitutionOfEducationInfo}
          />
          
          <Route path='/addSpecialties'>
            <AddSpecialties />
          </Route>
          <Route path='/ourspecialties' component={OurSpecialties} />

          <Route path='/moderators' component={Moderators} />
        </section>
      </Router>
      <Footer />
    </>
  );
}

export default InstitutionOfEducationAdminPage;
