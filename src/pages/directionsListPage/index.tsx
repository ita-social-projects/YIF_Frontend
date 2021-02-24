import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../../components';
import DirectionCard from '../../components/directionCard';
import { requestData } from '../../services/requestDataFunction';
import ErrorBoundry from '../../errorBoundry';
import { APIUrl } from '../../services/endpoints';
import Spinner from '../../components/common/spinner';
import styles from './directionsListPage.module.scss';
import ResponsePlaceholder from '../../components/common/responsePlaceholder';

const DirectionsListPage = () => {
  const [directionsList, setList] = useState([
    {
      id: '',
      code: '',
      name: '',
      description: '',
      specialties: [],
    },
  ]);
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });
  const [isFetching, setFetching] = useState(false);

  function fetchData() {
    const endpoint: string = `${APIUrl}Direction/All?page=1&pageSize=10`;
    setFetching(true);
    requestData(endpoint, 'GET').then((res: any) => {
      const statusCode = res.statusCode.toString();
      if (statusCode.match(/^[23]\d{2}$/)) {
        const newList = res.data.map((item: any) => {
          return {
            id: item.id,
            code: item.code,
            name: item.name,
            description: item.description,
            specialties: item.specialties,
          };
        });
        setList(newList);
        setFetching(false);
      } else {
        setError({
          hasError: true,
          errorStatusCode: res.statusCode,
          errorMessage:
            res.data.message || 'Щось пішло не так, спробуйте знову.',
        });
      }
    });
  }

  const directionsCardList = directionsList.map((item: any) => {
    return (
      <DirectionCard
        key={item.id}
        code={item.code}
        name={item.name}
        description={item.description}
        specialties={item.specialties}
      />
    );
  });

  useEffect(() => {
    fetchData();
  }, []);

  const result = isFetching ? (
    <div className={styles.spinnerContainer}>
      {' '}
      <Spinner />
    </div>
  ) : (
    directionsCardList
  );

  return (
    <>
      <ErrorBoundry>
        <Header />
        <section className={styles.directionsPage}>
          <h1 data-testid='heading' className={styles.title}>
            Освітні напрямки
          </h1>
          {error.hasError ? (
            <ResponsePlaceholder errorMessage={error.errorMessage} />
          ) : (
            <>{result}</>
          )}
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default DirectionsListPage;
