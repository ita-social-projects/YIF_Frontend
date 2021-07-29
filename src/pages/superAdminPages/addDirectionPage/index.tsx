import React from 'react';
import styles from './addDirectionPage.module.scss';

import AddDirectionForm from '../../../components/superAdmin/addDirectionForm';

const AddDirectionPage = () => {
  return (
    <>
      <section className={styles.superAdminAccountPage}>
        <AddDirectionForm />
      </section>
    </>
  );
};

export default AddDirectionPage;

