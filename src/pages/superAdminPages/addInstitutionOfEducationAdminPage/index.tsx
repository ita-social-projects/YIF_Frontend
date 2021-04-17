import React from 'react';
import styles from './addInstitutionOfEducationPage.module.scss';
import { Header, Footer, AdminPanel } from '../../../components';
import AddInstitutionOfEducationAdmin from '../../../components/superAdmin/addInstitutionOfEducationAdmin';

const AddInstitutionOfEducationAdminPage = () => {
  return (
    <>
      <Header />
      <section className={styles.superAdminAccountPage}>
          <AdminPanel />
  
            <AddInstitutionOfEducationAdmin />
 
        </section>
      <Footer />
    </>
  );
};

export default AddInstitutionOfEducationAdminPage;
