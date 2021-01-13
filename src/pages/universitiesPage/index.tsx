import React from 'react';
import { Header, Footer, UniversityCard } from '../../components';
import ErrorBoundry from '../../errorBoundry';
import styles from './universitiesPage.module.scss';

const UniversitiesPage = () => {
  return (
    <>
      <ErrorBoundry>
        <Header />
        <section className={styles.universitiesPage}>
          <h1 className={styles.title}>Список університетів</h1>
          <UniversityCard />
          <UniversityCard />
          <UniversityCard />
          <UniversityCard />
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default UniversitiesPage;
