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
          <UniversityCard
            shortTitle='НУВГП'
            link='nuwm.edu.ua'
            adress='Україна, 33028, м. Рівне, вул. Соборна, 11'
            description="Університет визнаний в Україні та за її межами єдиний в державі вищий навчальний заклад, який готує фахівців для галузі водного господарства, з потужною матеріально-технічною базою, висококваліфікованим кадровим потенціалом, багатотисячною студентською сім'єю."
            introStart='01.07.2021'
            introDeadline='21.08.2021'
          />
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default UniversitiesPage;
