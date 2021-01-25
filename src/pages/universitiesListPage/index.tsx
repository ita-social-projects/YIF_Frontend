import React, { useEffect } from 'react';
import { Header, Footer, UniversityCard } from '../../components';
import ErrorBoundry from '../../errorBoundry';
import styles from './universitiesListPage.module.scss';
import { requestData } from '../../services/requestDataFunction';

const UniversitiesListPage = () => {
  const endpoint = 'http://localhost:5000/api/University?page=1&pageSize=1';

  useEffect(() => {
    requestData(endpoint, 'GET').then((res: any) => {
      const { id, abbreviation } = res.data.responseList[0];
      console.log(abbreviation);
    });
  });

  return (
    <>
      <ErrorBoundry>
        <Header />
        <section className={styles.universitiesPage}>
          <h1 className={styles.title}>Список університетів</h1>
          <UniversityCard
            abbreviation='НУВГП'
            site='nuwm.edu.ua'
            address='Україна, 33028, м. Рівне, вул. Соборна, 11'
            description="Університет визнаний в Україні та за її межами єдиний в державі вищий навчальний заклад, який готує фахівців для галузі водного господарства, з потужною матеріально-технічною базою, висококваліфікованим кадровим потенціалом, багатотисячною студентською сім'єю."
            startOfCampaign='01.07.2021'
            endOfCampaign='21.08.2021'
          />
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default UniversitiesListPage;
