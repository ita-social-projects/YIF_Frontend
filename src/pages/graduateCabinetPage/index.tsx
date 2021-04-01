import React, { Fragment, useEffect, useState } from 'react';
import {
  Header,
  Footer,
  UserWorksSpace,
  InstitutionOfEducationMap,
} from '../../components';
import { requestSecureData } from '../../services/requestDataFunction';
import { useAuth } from '../../services/tokenValidator';
import { APIUrl } from '../../services/endpoints';

const UserCabinet = () => {
  const [institutionsOfEducationList, setList] = useState([{}]);
  const { token, getToken } = useAuth();

  useEffect(() => {
    const endpoint: string = `${APIUrl}InstitutionOfEducation/Favorites`;

    getToken();

    requestSecureData(endpoint, 'GET', token!).then((res: any) => {
      if (!res.data.message) {
        const filteredList = res.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            site: item.site,
            lat: item.lat,
            lon: item.lon,
          };
        });
        setList(filteredList);
      } else {
        console.log(res.data.message);
      }
    });
  }, [APIUrl]);

  return (
    <Fragment>
      <Header />
      <UserWorksSpace>
        <InstitutionOfEducationMap data={institutionsOfEducationList} />
      </UserWorksSpace>
      <Footer />
    </Fragment>
  );
};
export default UserCabinet;
