import React, { Fragment, useState, useEffect } from 'react';
import style from './univListOption.module.scss';
import { UniversityCard } from '../../../index';
import { requestSecureData } from '../../../../services/requestDataFunction';
import Spinner from '../../../../components/common/spinner';
import { useAuth } from '../../../../services/tokenValidator';
import ResponsePlaceholder from '../../../common/responsePlaceholder';
import { APIUrl } from '../../../../services/endpoints';

const UnivListOption = () => {
  const [universitiesList, setList] = useState([
    {
      id: 'cdvdvdv',
      liked: false,
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
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  const { token, getToken } = useAuth();

  useEffect(() => {
    const endpoint = `${APIUrl}University/Favorites`;
    setFetching(true);
    getToken();
    requestSecureData(endpoint, 'GET', token!).then((res: any) => {
      const statusCode = res.statusCode.toString();
      if (statusCode.match(/^[23]\d{2}$/)) {
        const newList = res.data.map((item: any) => {
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
        console.log(statusCode);
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
      console.log(res);
    });
  }, []);

  const universitiesCardList = universitiesList.map((item: any) => {
    return (
      <UniversityCard
        liked={true}
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

  const result = isFetching ? (
    <div className={style.spinnerContainer}>
      {' '}
      <Spinner />
    </div>
  ) : (
    universitiesCardList
  );

  return (
    <Fragment>
      <section className={style.universityListSection}>
        <div className={style.container}>
          {error.hasError ? (
            <ResponsePlaceholder errorMessage={error.errorMessage} />
          ) : (
            result
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default UnivListOption;
