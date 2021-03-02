import React from 'react';
import styles from './addUniversityPage.module.scss';
import { Header, Footer, AdminPanel } from '../../../components';
import AddUniversityForm from '../../../components/superAdmin/addUniversityForm';

const AddUniversity = () => {
  return (
    <>
      <Header />
      <section className={styles.addUniversityPage}>
        <AdminPanel />
        <AddUniversityForm />
      </section>
      <Footer />
    </>
  );
};

export default AddUniversity;
