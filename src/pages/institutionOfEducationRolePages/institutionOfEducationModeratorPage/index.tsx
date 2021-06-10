import React from 'react';
import { Footer, Header } from '../../../components';
import Aside from '../../../components/institutionOfEducationAdmin/aside';
import InstitutionOfEducationInfo from './institutionOfEducationInfo';
import styles from './institutionOfEducationModeratorPage.module.scss';
import { Route, Redirect, Switch, useRouteMatch, Link } from 'react-router-dom';
import OurSpecialties from './ourSpecialties';
import EditSpecialty from '../editSpecialtyPage';
import AddSpecialties from '../addSpecialties';
import ChangePassword from '../../../components/changePassword';
import Administrators from './administrators'

function InstitutionOfEducationModeratorPage() {
  const { path } = useRouteMatch();
  return (
    <>
      <Header />
      <section className={styles.institutionOfEducationModeratorContent}>
        <Aside>
          <nav>
            <Link
              className={styles.underlineAnimation}
              to={`${path}/institutionOfEducationInfo`}
            >
              Заклад освіти
            </Link>
            <Link
              className={styles.underlineAnimation}
              to={`${path}/ourSpecialties`}
            >
              Спеціальності
            </Link>
            <Link
              className={styles.underlineAnimation}
              to={`${path}/administrators`}
            >
              Адміністратори
            </Link>
            <Link
              className={styles.underlineAnimation}
              to={`${path}/changePassword`}
            >
              Змінити пароль
            </Link>
          </nav>
        </Aside>
        <Switch>
          <Route exact path={`/IoEModeratorAccount`}>
            <Redirect to={`${path}/ourSpecialties`} />
          </Route>

          <Route exact path={`${path}/institutionOfEducationInfo`}>
            <InstitutionOfEducationInfo />
          </Route>

          <Route exact path={`${path}/ourSpecialties`}>
            <OurSpecialties />
          </Route>
          <Route path={`${path}/administrators`}>
            <Administrators />
          </Route>
          <Route path={`${path}/addSpecialties`}>
            <AddSpecialties />
          </Route>
          <Route path={`${path}/ourSpecialties/edit`}>
            <EditSpecialty />
          </Route>
          <Route exact path={`${path}/changePassword`}>
            <ChangePassword />
          </Route>
        </Switch>
      </section>
      <Footer />
    </>
  );
}

export default InstitutionOfEducationModeratorPage;
