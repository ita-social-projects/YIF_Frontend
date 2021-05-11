import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './institutionOfEducationPage.module.scss';
import { Header, Footer, InstitutionOfEducationMap } from '../../components';
import ErrorBoundry from '../../errorBoundry';
import AccordionItem from '../../components/accordion';
import CampaingCard from '../../components/campaignCard';
import Spinner from '../../components/common/spinner';
import { requestData } from '../../services/requestDataFunction';
import { APIUrl } from '../../services/endpoints';
import Star from '../../components/common/icons/Star/star';

interface ParamTypes {
  id: string;
}

const InstitutionOfEducationPage = () => {
  const [isFetching, setFetching] = useState(true);
  const [institutionOfEducationInfo, setInstitutionOfEducationInfo] = useState(
    {}
  );
  const [directions, setDirections] = useState([]);
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    setFetching(true);

    //Fetch Institution Of Education
    const endpoint = `${APIUrl}InstitutionOfEducation/${id}`;
    requestData(endpoint, 'GET').then((res: any) => {
      setInstitutionOfEducationInfo(res.data);
    });

    //Fetch directions
    const endpointForDirections = `${APIUrl}Direction/All`;
    requestData(endpointForDirections, 'GET').then((res: any) => {
      setDirections(res.data);
    });

    setFetching(false);
  }, [id]);

  const {
    abbreviation,
    address,
    description,
    email,
    endOfCampaign,
    isFavorite,
    imagePath,
    lat,
    lon,
    name,
    phone,
    site,
    startOfCampaign,
  }: any = institutionOfEducationInfo;

  const renderDirectionsAccordion = () =>
    directions.map((item, key) => {
      const { code, name, specialties }: any = item;
      return (
        <AccordionItem
          key={key}
          headerContent={
            <>
              <span className={styles.acc_item__id}>{code}</span>
              <h3 className={styles.acc_item__name}>{name}</h3>
            </>
          }
          headerStyle={styles.acc_item__header}
          bodyStyle={styles.acc_item__body}
          bodyContent={specialties
            .sort((a: any, b: any) => a.code - b.code)
            .map((item: any) => (
              <li key={item.id} className={styles.acc_item__subitem}>
                <div className={styles.acc_item__subitem_info}>
                  <span>{item.code}</span> <h5>{item.name}</h5>
                </div>
                <Link to={`/specialty/${item.id}`}>Детальніше</Link>
              </li>
            ))}
        />
      );
    });

  return (
    <>
      <ErrorBoundry>
        <Header />

        <section className={styles.institutionOfEducationPage}>
          {isFetching ? (
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          ) : (
            <>
              <h1 className={styles.title}>{abbreviation}</h1>
              <div
                className={`container" ${styles.institutionOfEducationPage__container}`}
              >
                <Star
                  liked={isFavorite}
                  handleClick={() => console.log(`add logic for this!!!`)}
                />
                <div className={styles.institutionOfEducationPage__header}>
                  <h2 className={styles.institutionOfEducationPage__subtitle}>
                    {name}
                  </h2>
                  <img
                    src={
                      imagePath || '../assets/images/defaultUniversityImage.jpg'
                    }
                    alt='Institution Of Education Building'
                    className={styles.institutionOfEducationPage__img}
                  />
                </div>

                <div>
                  <div className={styles.institutionOfEducationPage__main_info}>
                    <ul>
                      <li>
                        <b>Сайт:</b>{' '}
                        <a
                          href={site}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {site}
                        </a>
                      </li>
                      <li>
                        <b>Адреса:</b> {address}
                      </li>
                      <li>
                        <b>Приймальна комісія:</b>
                      </li>
                      <li>
                        <b>Телефон:</b>{' '}
                        <a
                          href={`tel:${phone}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {phone}
                        </a>
                      </li>
                      <li>
                        <b>Ел. пошта:</b>{' '}
                        <a
                          href={`mailto:${email}`}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {email}
                        </a>
                      </li>
                    </ul>

                    <CampaingCard start={startOfCampaign} end={endOfCampaign} />
                  </div>
                </div>
                <p className={styles.institutionOfEducationPage__description}>
                  <b>Опис:</b> {description}
                </p>
                <h3 className={styles.institutionOfEducationPage__subtitle}>
                  Напрями:
                </h3>
                <ul>{renderDirectionsAccordion()}</ul>
              </div>
            </>
          )}
        </section>
        {isFetching ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.institutionOfEducationMap}>
            <InstitutionOfEducationMap
              data={[
                {
                  id,
                  name,
                  site,
                  lat,
                  lon,
                },
              ]}
            />
          </div>
        )}

        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default InstitutionOfEducationPage;
