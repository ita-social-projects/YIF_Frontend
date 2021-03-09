import React from 'react';
import { Footer, Header } from '../../components';
import Aside from '../../components/universityAdmin/aside';
import UniversityInfo from '../../components/universityAdmin/universityInfo';
import styles from './universityAdminPage.module.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Moderators from '../../components/universityAdmin/moderators';
import OurSpecialties from '../../components/universityAdmin/ourSpecialties';

function UniversityAdminPage() {
  return (
    <>
      <Header />
      <Router>
        <section className={styles.universityAdminContent}>
          <Aside />
          <Route path='/universityInfo' component={UniversityInfo} />

          <Route path='/ourspecialties' component={OurSpecialties} />

          <Route path='/moderators' component={Moderators} />
        </section>
      </Router>
      <Footer />
    </>
  );
}

export default UniversityAdminPage;
