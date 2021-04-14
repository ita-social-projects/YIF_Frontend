import React, { Fragment, useState, useEffect } from 'react';
import style from './likedInstitutionOfEducationList.module.scss';
import InstitutionOfEducationCard from '../../../components/institutionOfEducationCard';
import { requestSecureData } from '../../../services/requestDataFunction';
import Spinner from '../../../components/common/spinner';
import { useAuth } from '../../../services/tokenValidator';
import ResponsePlaceholder from '../../../components/common/responsePlaceholder';
import { APIUrl } from '../../../services/endpoints';
import InstitutionsOfEducationMap from '../../../components/forCabinetPage/map';

const InstitutionOfEducationList = () => {
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

  interface List {
    id: any;
    name: any;
    site: any;
    lat: any;
    lon: any;
  }

  const [locationList, setLocationList] = useState([{}]);

  const [isChanged, setChanged] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });
  const { getToken } = useAuth();

  const handleClick = async (id: number, isFavorite: boolean) => {
    const endpoint = `${APIUrl}InstitutionOfEducation/Favorites/${id}`;
    const currentToken = await getToken();

    requestSecureData(endpoint, 'DELETE', currentToken)
      .then((res: any) => {
        setChanged(!isChanged);
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
      .catch((error) => {
        setError({
          hasError: true,
          errorStatusCode: error.statusCode,
          errorMessage: 'Щось пішло не так, спробуйте знову.',
        });
      });
  };
  let updatedList: Array<{}> = [];
  const getFavoritesIOE = async () => {
    const currentToken = await getToken();
    const endpoint = `${APIUrl}InstitutionOfEducation/Favorites`;
    requestSecureData(endpoint, 'GET', currentToken).then((res: any) => {
      const statusCode = res.statusCode.toString();
      if (statusCode.match(/^[23]\d{2}$/)) {
        const newList = res.data.map((item: any) => {
          updatedList.push({
            id: item.id,
            name: item.name,
            site: item.site,
            lat: item.lat,
            lon: item.lon,
          });
          return {
            id: item.id,
            abbreviation: item.abbreviation,
            liked: item.isFavorite,
            site: item.site,
            address: item.address,
            description: item.description,
            startOfCampaign: item.startOfCampaign,
            endOfCampaign: item.endOfCampaign,
          };
        });
        setLocationList(updatedList);
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
  };

  useEffect(() => {
    getFavoritesIOE();
  }, [isChanged]);

  const institutionOfEducationCardList = institutionOfEducationList.map(
    (item: any) => {
      return (
        <InstitutionOfEducationCard
          id={item.id}
          handleClick={() => handleClick(item.id, item.liked)}
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
    }
  );

  const result = isFetching ? (
    <div className={style.spinnerContainer}>
      <Spinner />
    </div>
  ) : (
    <>
      {institutionOfEducationCardList}

      <InstitutionsOfEducationMap data={locationList} />
    </>
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

export default InstitutionOfEducationList;
