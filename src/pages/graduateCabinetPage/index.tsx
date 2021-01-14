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
      <Header />
      <UserWorksSpace />
      <UniversityMap />
      <Footer background='#BAD0E5' />
    </Fragment>
  );
};
export default UserCabinet;
