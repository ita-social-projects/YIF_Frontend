import React from 'react';
import styles from './addSpecialtyPage.module.scss';

import AddSpecialtyForm from '../../../components/superAdmin/addSpecialtyForm';

const AddSpecialtyPage = () => {
  return (
    <>
      <section className={styles.superAdminAccountPage}>
        <AddSpecialtyForm />
      </section>
    </>
  );
};

export default AddSpecialtyPage;

