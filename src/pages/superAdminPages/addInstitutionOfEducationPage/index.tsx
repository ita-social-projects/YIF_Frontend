import React from 'react';
import styles from './addInstitutionOfEducationPage.module.scss';
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
