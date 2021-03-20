import React from 'react';
import styles from './addInstitutionOfEducationPage.module.scss';
import { Header, Footer, AdminPanel } from '../../../components';
import AddInstitutionOfEducationForm from '../../../components/superAdmin/addInstitutionOfEducationForm';

const AddInstitutionOfEducation = () => {
  return (
    <>
      <Header />
      <section className={styles.addInstitutionOfEducationPage}>
        <AdminPanel />
        <AddInstitutionOfEducationForm />
      </section>
      <Footer />
    </>
  );
};

export default AddInstitutionOfEducation;
