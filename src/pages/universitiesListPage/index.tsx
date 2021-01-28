import React, { useEffect, useState } from 'react';
import { Header, Footer, UniversityCard } from '../../components';
import ErrorBoundry from '../../errorBoundry';
import styles from './universitiesListPage.module.scss';
import { requestData } from '../../services/requestDataFunction';
import Spinner from '../../components/common/spinner';
import { paginationPagesCreator } from './paginationPagesCreator';
import ResponsePlaceholder from '../../components/common/responsePlaceholder';
import { APIUrl } from '../../services/endpoints';

const UniversitiesListPage = () => {
  const [universitiesList, setList] = useState([
    {
      id: '',
      liked: false,
      abbreviation: '',
      site: '',
      address: '',
      description: '',
      startOfCampaign: '',
      endOfCampaign: '',
    },
  ]);

  const [isFetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  const urlLocalHost = 'http://localhost:5000/api/';

  useEffect(() => {
    const endpoint = `${APIUrl}University?page=${currentPage}&pageSize=${perPage}`;
    setFetching(true);
    requestData(endpoint, 'GET').then((res: any) => {
      setTotalPages(res.data.totalPages);
      const statusCode = res.statusCode.toString();
      if (statusCode.match(/^[23]\d{2}$/)) {
        const newList = res.data.responseList.map((item: any) => {
          return {
            liked: item.liked,
            id: item.id,
            abbreviation: item.abbreviation,
            site: item.site,
            address: item.address,
            description: item.description,
            startOfCampaign: item.startOfCampaign,
            endOfCampaign: item.endOfCampaign,
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
        console.log('bad');
      }
    });
  }, [currentPage]);

  const universitiesCardList = universitiesList.map((item: any) => {
    return (
      <UniversityCard
        liked={item.liked}
        key={item.id}
        abbreviation={item.abbreviation}
        site={item.site}
        address={item.address}
        description={
          item.description.length > 265
            ? item.description.slice(0, 265).concat('...')
            : item.description
        }
        startOfCampaign={item.startOfCampaign.slice(0, 10)}
        endOfCampaign={item.endOfCampaign.slice(0, 10)}
      />
    );
  });

  const arrowIcon = (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0)'>
        <path
          d='M3 1.59034C3 0.853713 3.76941 0.36991 4.43329 0.689084L4.6 0.769231L19.0472 10.0652C19.6937 10.4812 19.6485 11.4408 18.9658 11.7942L4.6 19.2308L4.43329 19.3109C3.76941 19.6301 3 19.1463 3 18.4097V1.59034Z'
          fill='#12335E'
        />
      </g>
      <defs>
        <clipPath id='clip0'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );

  const pages = paginationPagesCreator(totalPages, currentPage);

  const pagination = (
    <div className={styles.pages}>
      <div
        className={
          currentPage === 1
            ? `${styles.arrow} ${styles.arrow__prev} ${styles.arrowUnable}`
            : `${styles.arrow} ${styles.arrow__prev}`
        }
        onClick={() => {
          if (currentPage === 1) {
            return;
          } else {
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        {' '}
        {arrowIcon}
      </div>
      {pages.map((page, index) => {
        return (
          <span
            className={
              currentPage === page
                ? `${styles.page} ${styles.page__current}`
                : `${styles.page}`
            }
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        );
      })}
      <div
        className={
          currentPage === totalPages
            ? `${styles.arrow} ${styles.arrow__next} ${styles.arrowUnable}`
            : `${styles.arrow} ${styles.arrow__next}`
        }
        onClick={() => {
          if (currentPage === totalPages) {
            return;
          } else {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        {' '}
        {arrowIcon}
      </div>
    </div>
  );

  const result = isFetching ? (
    <div className={styles.spinnerContainer}>
      {' '}
      <Spinner />
    </div>
  ) : (
    universitiesCardList
  );

  return (
    <>
      <ErrorBoundry>
        <Header />
        <section className={styles.universitiesPage}>
          <h1 className={styles.title}>Список університетів</h1>
          {error.hasError ? (
            <ResponsePlaceholder errorMessage={error.errorMessage} />
          ) : (
            <>
              {pagination}
              {result}
            </>
          )}
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default UniversitiesListPage;
