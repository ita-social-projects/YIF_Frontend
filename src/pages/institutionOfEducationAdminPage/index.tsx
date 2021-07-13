import React from 'react';
import { Footer, Header } from '../../components';
import Aside from '../../components/institutionOfEducationAdmin/aside';
import InstitutionOfEducationInfo from './institutionOfEducationInfo/index';
import styles from './institutionOfEducationAdminPage.module.scss';
import { Route, Redirect, Switch, useRouteMatch, Link } from 'react-router-dom';
import Moderators from './moderators';
import EditInstitutionOfEducationInfoPage from './editInstitutionOfEducationInfoPage';
import OurSpecialties from './ourSpecialties/index';
import EditSpecialty from './editSpecialtyPage/index';
import AddSpecialties from './addSpecialties/index';
import ChangePassword from '../../components/changePassword';

function InstitutionOfEducationAdminPage() {
  const { path } = useRouteMatch();
  return (
    <>
      <Header />
      <section className={styles.institutionOfEducationAdminContent}>
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
              to={`${path}/moderators`}
            >
              Модератори
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
          <Route exact path={`/institutionOfEducationAccount`}>
            <Redirect to={`${path}/ourSpecialties`} />
          </Route>

          <Route exact path={`${path}/institutionOfEducationInfo`}>
            <InstitutionOfEducationInfo role={'administrator'} roleAPI={'InstitutionOfEducationAdmin/GetIoEInfoByUserId'}/>
          </Route>

          <Route path={`${path}/institutionOfEducationInfo/edit`}>
            <EditInstitutionOfEducationInfoPage />
          </Route>

          <Route exact path={`${path}/ourSpecialties`}>
            <OurSpecialties role={'moderator'} rolePath={'/institutionOfEducationAccount/addSpecialties'}/>
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
          <Route exact path={`${path}/changePassword`}>
            <ChangePassword />
          </Route>
        </Switch>
      </section>
      <Footer />
    </>
  );
}

export default InstitutionOfEducationAdminPage;
