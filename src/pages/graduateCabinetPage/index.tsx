import React, { Fragment, useEffect, useState } from 'react';
//import styles from './graduateCabinetPage.module.scss';
import {
  Header,
  Footer,
  UserWorksSpace,
  UniversityMap,
} from '../../components';
import { requestData } from '../../services/requestDataFunction';
import { APIUrl } from '../../services/endpoints';

const UserCabinet = () => {
  const [universitiesList, setList] = useState([{}]);

  useEffect(() => {
    const endpoint: string = `${APIUrl}University`;

    requestData(endpoint, 'GET').then((res: any) => {
      const filteredList = res.data.responseList.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          site: item.site,
          lat: item.lat,
          lon: item.lon,
        };
      });
      setList(filteredList);
    });
  }, [APIUrl]);

  return (
    <Fragment>
      <Header />
      <UserWorksSpace>
        <UniversityMap data={universitiesList} />
      </UserWorksSpace>
      <Footer />
    </Fragment>
  );
};
export default UserCabinet;
