import React from 'react';
import styles from './graduatePage.module.scss';
import { Route, Redirect, Switch, useRouteMatch, Link } from 'react-router-dom';
import { Footer, Header, SpecListOption } from '../../components';
import Aside from '../../components/institutionOfEducationAdmin/aside';
import MyInfo from './myInfoPage';
import LikedSpecialties from './likedSpecialtiesPage';
import InstitutionOfEducationList from './likedInstitutionOfEducationPage';

const GraduateAccountPage = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <Header />
      <section className={styles.graduateAccountPage}>
        <Aside>
          <nav className={styles.asideNav}>
            <Link className={styles.underlineAnimation} to={`${path}/myInfo`}>
              Мої дані
            </Link>
            <Link
              className={styles.underlineAnimation}
              to={`${path}/likedInstitutionOfEducation`}
            >
              Обрані заклади
            </Link>
            <Link
              className={styles.underlineAnimation}
              to={`${path}/likedSpecialties`}
            >
              Обрані спеціальності
            </Link>
          </nav>
        </Aside>
        <Switch>
          <Route exact path={`/cabinet`}>
            <Redirect to={`${path}/myInfo`} />
          </Route>

          <Route exact path={`${path}/myInfo`}>
            <MyInfo />
          </Route>

          <Route exact path={`${path}/likedInstitutionOfEducation`}>
            <InstitutionOfEducationList />
          </Route>

          <Route exact path={`${path}/likedSpecialties`}>
            <LikedSpecialties />
          </Route>
        </Switch>
      </section>
      <Footer />
    </>
  );
};

export default GraduateAccountPage;
