import React from 'react';
import { Footer, Header } from '../../components';
import Aside from '../../components/institutionOfEducationAdmin/aside';
import InstitutionOfEducationInfo from '../../components/institutionOfEducationAdmin/institutionOfEducationInfo';
import styles from './institutionOfEducationAdminPage.module.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Moderators from '../../components/institutionOfEducationAdmin/moderators';
import OurSpecialties from '../../components/institutionOfEducationAdmin/ourSpecialties';

function InstitutionOfEducationAdminPage() {
  return (
    <>
      <Header />
      <Router>
        <section className={styles.institutionOfEducationAdminContent}>
          <Aside />
          <Route
            path='/institutionOfEducationInfo'
            component={InstitutionOfEducationInfo}
          />

          <Route path='/ourspecialties' component={OurSpecialties} />

          <Route path='/moderators' component={Moderators} />
        </section>
      </Router>
      <Footer />
    </>
  );
}

export default InstitutionOfEducationAdminPage;