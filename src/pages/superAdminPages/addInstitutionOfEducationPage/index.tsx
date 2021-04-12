import React from 'react';
import styles from './addInstitutionOfEducationPage.module.scss';
import { Header, Footer, AdminPanel } from '../../../components';
import AddInstitutionOfEducationForm from '../../../components/superAdmin/addInstitutionOfEducationForm';

const AddInstitutionOfEducation = () => {
  return (
    <>
      <section className={styles.addInstitutionOfEducationPage}>
        <AddInstitutionOfEducationForm />
      </section>
    </>
  );
};

export default AddInstitutionOfEducation;
