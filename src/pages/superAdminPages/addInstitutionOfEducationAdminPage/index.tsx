import React from 'react';
import styles from './addInstitutionOfEducationPage.module.scss';

import AddInstitutionOfEducationAdmin from '../../../components/superAdmin/addInstitutionOfEducationAdmin';

const AddInstitutionOfEducationAdminPage = () => {
  return (
    <>
      <section className={styles.superAdminAccountPage}>
        <AddInstitutionOfEducationAdmin />
      </section>
    </>
  );
};

export default AddInstitutionOfEducationAdminPage;
