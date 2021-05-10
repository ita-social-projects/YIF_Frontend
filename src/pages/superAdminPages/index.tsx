import React, { useState } from 'react';
import styles from './superAdminPages.module.scss';
import { Footer, Header } from '../../components';
import Aside from '../../components/institutionOfEducationAdmin/aside';
import { Route, Redirect, Switch, useRouteMatch, Link } from 'react-router-dom';
import SuperAdminAccountPage from './superAdminAccountPage';
import AddInstitutionOfEducation from './addInstitutionOfEducationPage';
import ThinArrow from '../../components/common/icons/ThinArrow';
import AddInstitutionOfEducationAdmin from '../../components/superAdmin/addInstitutionOfEducationAdmin';
import UniversityListPage from './universityListPage';
import ChangePassword from '../../components/changePassword';
import AddSpecialtyPage from './addSpecialtyPage';

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
              <div onClick={openAllLinks} className={styles.admins}>
                <div>Адміністратори</div>
                <ThinArrow isUp={isLinksOpened} />
              </div>
              <div className={!isLinksOpened ? styles.optional : ''}>
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
            <Link
              className={styles.underlineAnimation}
              to={`${path}/universityList`}
            >
              Університети
            </Link>
            <Link className={styles.underlineAnimation} to='#'>
              Коледжі
            </Link>
            <Link className={styles.underlineAnimation} to='#'>
              Школи
            </Link>
            <Link
              className={styles.underlineAnimation}
              to={`${path}/changePassword`}
            >
              Змінити пароль
            </Link>
            <Link
              className={styles.underlineAnimation}
              to={`${path}/addSpecialty`}
            >
              Спеціальності
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
          <Route exact path={`${path}/addInstitutionOfEducationAdmin/:ioeId`}>
            <AddInstitutionOfEducationAdmin />
          </Route>
          <Route exact path={`${path}/universityList`}>
            <UniversityListPage />
          </Route>
          <Route exact path={`${path}/changePassword`}>
            <ChangePassword />
          </Route>
          <Route exact path={`${path}/addSpecialty`}>
            <AddSpecialtyPage />
          </Route>
        </Switch>
      </section>
      <Footer />
    </>
  );
}

export default SuperAdmin;
