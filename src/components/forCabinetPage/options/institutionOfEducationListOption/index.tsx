import React, { Fragment, useState, useEffect } from 'react';
import style from './institutionOfEducationListOption.module.scss';
import { InstitutionOfEducationCard } from '../../../index';
import { requestSecureData } from '../../../../services/requestDataFunction';
import Spinner from '../../../common/spinner';
import { useAuth } from '../../../../services/tokenValidator';
import ResponsePlaceholder from '../../../common/responsePlaceholder';
import { APIUrl } from '../../../../services/endpoints';

const InstitutionOfEducationListOption = () => {
  const [institutionOfEducationList, setList] = useState([
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
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  const { token, getToken } = useAuth();

  useEffect(() => {
    const endpoint = `${APIUrl}InstitutionOfEducation/Favorites`;
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
  }, []);

  const institutionOfEducationCardList = institutionOfEducationList.map(
    (item: any) => {
      return (
        <InstitutionOfEducationCard
          id={item.id}
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
    }
  );

  const result = isFetching ? (
    <div className={style.spinnerContainer}>
      {' '}
      <Spinner />
    </div>
  ) : (
    institutionOfEducationCardList
  );

  return (
    <Fragment>
      <section className={style.institutionOfEducationListSection}>
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

export default InstitutionOfEducationListOption;
