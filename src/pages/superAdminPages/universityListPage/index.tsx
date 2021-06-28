import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/superAdmin/pagination';
import SortingPanel from '../../../components/superAdmin/sortingPanel';
import UniversityItem from '../../../components/superAdmin/universityItem';
import styles from './universityListPage.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import { APIUrl } from '../../../services/endpoints';
import { requestSecureData } from '../../../services/requestDataFunction';
import { useAuth } from '../../../services/tokenValidator';

interface University {
  id: string,
  name: string,
  abbreviation: string,
  site: string,
  address: string,
  phone: string,
  email: string,
  description: string,
  imagePath: string,
}

interface Response {
  responseList: University[]
}

const UniversityListPage: React.FC = () => {

  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const { path } = useRouteMatch();
  const { getToken } = useAuth();
  const [ response, setData ] = useState<Response>({
    responseList: [{
      id: '',
      name: '',
      abbreviation: '',
      site: '',
      address: '',
      phone: '',
      email: '',
      description: '',
      imagePath: '',
    }]
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const currentToken = await getToken();
        const { statusCode, data }: any = await requestSecureData(
          `${APIUrl}InstitutionOfEducation/Anonymous?InstitutionOfEducationType=0&page=1&pageSize=10`,
          'GET',
          currentToken,
        );
        if (statusCode.toString().match(/^[23]\d{2}$/)) {
          setData(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setIsFetching(false);
      }
    };
    getInfo();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <main className={styles.universityListPage}>
          <h1>Університети</h1>
          <Pagination />
          <SortingPanel />
          {response.responseList.map((university) => {
            const { id, name, abbreviation } = university;
            return (
              <UniversityItem
                key={id}
                abbreviation={abbreviation}
                fullName={name}
                IoEid={id}
              />
            );
          })}
          <Link to={`/superAdminAccount/addInstitutionOfEducation`}>
            <button
              className={`${styles.addButton} ${styles.animatedButton}`}
            >
              Додати заклад освіти
            </button>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default UniversityListPage;
