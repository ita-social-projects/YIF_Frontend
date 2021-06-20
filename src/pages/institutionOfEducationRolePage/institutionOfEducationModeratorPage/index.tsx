import React from 'react';
import { Footer, Header } from '../../../components';
import Aside from '../../../components/institutionOfEducationAdmin/aside';
import InstitutionOfEducationInfo from '../common/institutionOfEducationInfo/index';
import styles from './institutionOfEducationModeratorPage.module.scss';
import { Route, Redirect, Switch, useRouteMatch, Link } from 'react-router-dom';
import OurSpecialties from '../common/ourSpecialties/index';
import EditSpecialty from '../common/editSpecialtyPage/index';
import AddSpecialties from '../common/addSpecialties/index';
import ChangePassword from '../../../components/changePassword';

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
            <InstitutionOfEducationInfo role={'moderator'} roleAPI={'InstitutionOfEducationModerator/GetIoEInfoByUserId'}/>
          </Route>

          <Route exact path={`${path}/ourSpecialties`}>
            <OurSpecialties role={'moderator'} rolePath={'/IoEModeratorAccount/addSpecialties'}/>
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
