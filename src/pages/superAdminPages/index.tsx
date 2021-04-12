import React, { useState } from 'react';
import styles from './superAdminPages.module.scss';
import { Footer, Header } from '../../components';
import Aside from '../../components/institutionOfEducationAdmin/aside';
import { Route, Redirect, Switch, useRouteMatch, Link } from 'react-router-dom';
import SuperAdminAccountPage from './superAdminAccountPage';
import AddInstitutionOfEducation from './addInstitutionOfEducationPage';

function SuperAdmin() {
  const [isLinksOpened, setIsLinksOpened] = useState(false);
  const { path } = useRouteMatch();

  const openAllLinks = () => {
    setIsLinksOpened(!isLinksOpened);
  };

  return (
    <>
      <Header />
      <section className={styles.superAdmin}>
        <Aside>
          <nav className={styles.navbar}>
            <div className={styles.adminLinkOptions}>
              <span onClick={openAllLinks}>Адміністратори</span>
              <div className={isLinksOpened ? styles.optional : ''}>
                <div className={styles.optionalItem}>
                  <Link
                    className={styles.underlineAnimation}
                    to='/SuperAdminAccount'
                  >
                    Закладів освіти
                  </Link>
                </div>
                <div className={styles.optionalItem}>
                  <Link
                    className={styles.underlineAnimation}
                    to='/SuperAdminAccount'
                  >
                    Закладів освіти
                  </Link>
                </div>
                <div className={styles.optionalItem}>
                  <Link
                    className={styles.underlineAnimation}
                    to='/SuperAdminAccount'
                  >
                    Закладів освіти
                  </Link>
                </div>
              </div>
            </div>
            <Link className={styles.underlineAnimation} to='#'>
              Університети
            </Link>
            <Link className={styles.underlineAnimation} to='#'>
              Коледжі
            </Link>
            <Link className={styles.underlineAnimation} to='#'>
              Школи
            </Link>
          </nav>
        </Aside>
        <Switch>
          <Route exact path={`/superAdminAccount`}>
            <Redirect to={`${path}/universityAdmins`} />
          </Route>
          <Route exact path={`${path}/universityAdmins`}>
            <SuperAdminAccountPage />
          </Route>
          <Route exact path={`${path}/addInstitutionOfEducation`}>
            <AddInstitutionOfEducation />
          </Route>
        </Switch>
      </section>
      <Footer />
    </>
  );
}

export default SuperAdmin;
