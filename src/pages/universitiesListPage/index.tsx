import React, { useEffect, useState } from 'react';
import { Header, Footer, UniversityCard } from '../../components';
import ErrorBoundry from '../../errorBoundry';
import styles from './universitiesListPage.module.scss';
import { requestData } from '../../services/requestDataFunction';
import Spinner from '../../components/common/spinner';
import { paginationPagesCreator } from './paginationPagesCreator';
import { APIUrl } from '../../services/endpoints';


const UniversitiesListPage = () => {
  const [universitiesList, setList] = useState([
    {
      data: 'qqq',
      id: 'cdvdvdv',
      //liked: false,
      abbreviation: 'НУВГП',
      site: 'nuwm.edu.ua',
      address: 'Україна, 33028, м. Рівне, вул. Соборна, 11',
      description:
        "Університет визнаний в Україні та за її межами єдиний в державі вищий навчальний заклад, який готує фахівців для галузі водного господарства, з потужною матеріально-технічною базою, висококваліфікованим кадровим потенціалом, багатотисячною студентською сім'єю.",
      startOfCampaign: '01.07.2021',
      endOfCampaign: '21.08.2021',
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

  //const urlLocalHost = 'http://localhost:5000/api/';

  useEffect(() => {
    const endpoint = `${APIUrl}University?page=${currentPage}&pageSize=${perPage}`;
    setFetching(true);
    requestData(endpoint, 'GET').then((res: any) => {
      setTotalPages(res.data.totalPages);
      const newList = res.data.responseList.map((item: any) => {
        return {
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
    });
  }, [currentPage]);


  //const endpointLikedUniversity = `${APIUrl}University/Favorites/${universityId}`;

    const sendLikedUnlikedUniversity = (endpoint:string, method:string) => {
      requestData(endpoint, method)
          .then((res: any) => {
            const statusCode = res.statusCode.toString();
            if (statusCode.match(/^[23]\d{2}$/)) {
              setError({ hasError: false, errorStatusCode: '', errorMessage: '' });
            } else {
              setError({
                hasError: true,
                errorStatusCode: res.statusCode,
                errorMessage:
                    res.data.message || 'Щось пішло не так, спробуйте знову.',
              });
            }
          })
    }

  const getIdUniversity =(id:string) => {
    let universityId = id;
    console.log(id);
  }
  const getClickElem =(event:any) => {
    console.log('fhfhfgf')
    console.log(event);

  }


  const universitiesCardList = universitiesList.map((item: any) => {

    return (
      <UniversityCard
          // onClick={ event => getClickElem (event)
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
  })

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

  return (
    <>
      <ErrorBoundry>
        <Header />
        <section className={styles.universitiesPage}>
          <h1 className={styles.title}>Список університетів</h1>
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
          {isFetching ? (
            <div className={styles.spinnerContainer}>
              {' '}
              <Spinner />
            </div>
          ) : (
            universitiesCardList
          )}
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default UniversitiesListPage;
