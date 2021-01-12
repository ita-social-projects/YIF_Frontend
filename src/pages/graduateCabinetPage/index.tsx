import React, { Fragment } from 'react';
import styles from './graduateCabinetPage.module.scss';
import {
  Header,
  Footer,
  UserWorksSpace,
  UniversityMap,
} from '../../components';

const UserCabinet = () => {
  return (
    <Fragment>
      <Header></Header>
      <UserWorksSpace />
      <UniversityMap />
      <Footer></Footer>
    </Fragment>
  );
};
export default UserCabinet;
