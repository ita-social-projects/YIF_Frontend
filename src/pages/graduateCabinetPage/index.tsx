import React, { Fragment } from 'react';
import styles from './graduateCabinetPage.module.scss';
import {
  Header,
  Footer,
  UserWorksSpace,
  UniversityMaps,
} from '../../components';
import ImageUploader from '../../components/imageUploader';

const UserCabinet = () => {
  return (
    <Fragment>
      <Header></Header>
      <UserWorksSpace />
      <UniversityMaps />
      <ImageUploader />
      <Footer></Footer>
    </Fragment>
  );
};
export default UserCabinet;
