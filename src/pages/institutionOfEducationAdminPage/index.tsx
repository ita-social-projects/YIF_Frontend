import React from 'react';
import { Footer, Header } from '../../components';
import Aside from '../../components/institutionOfEducationAdmin/aside';
import InstitutionOfEducationInfo from './institutionOfEducationInfo';
import styles from './institutionOfEducationAdminPage.module.scss';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';
import Moderators from './moderators';
import EditInstitutionOfEducationInfoPage from './editInstitutionOfEducationInfo';
import OurSpecialties from './ourSpecialties';
import EditSpecialty from './editSpecialtyPage';
import AddSpecialties from './addSpecialties';
function InstitutionOfEducationAdminPage() {
  const { path } = useRouteMatch();
  return (
    <>
      <Header />
      <section className={styles.institutionOfEducationAdminContent}>
        <Aside />
        <Switch>
          <Route exact path={`/institutionOfEducationAccount`}>
            <Redirect to={`${path}/ourSpecialties`} />
          </Route>

          <Route exact path={`${path}/institutionOfEducationInfo`}>
            <InstitutionOfEducationInfo />
          </Route>

          <Route path={`${path}/institutionOfEducationInfo/edit`}>
            <EditInstitutionOfEducationInfoPage />
          </Route>

          <Route exact path={`${path}/ourSpecialties`}>
            <OurSpecialties />
          </Route>
          <Route path={`${path}/addSpecialties`}>
            <AddSpecialties />
          </Route>
          <Route path={`${path}/ourSpecialties/edit`}>
            <EditSpecialty />
          </Route>
          <Route path={`${path}/moderators`}>
            <Moderators />
          </Route>
        </Switch>
      </section>
      <Footer />
    </>
  );
}

export default InstitutionOfEducationAdminPage;
