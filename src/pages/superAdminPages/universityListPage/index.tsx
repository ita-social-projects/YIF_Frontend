import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/pagination';
import PaginationPagesCreator from '../../../components/pagination/paginationPagesCreator';
import SortingPanel from '../../../components/superAdmin/sortingPanel';
import UniversityItem from '../../../components/superAdmin/universityItem';
import styles from './universityListPage.module.scss';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';

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
          // Request parameters: IoE type = 0, page = 1, pageSize = 100
          `${APIUrl}InstitutionOfEducation/Anonymous?InstitutionOfEducationType=0&page=1&pageSize=100`,
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

  const perPage = 4;
  const totalPages = Math.ceil(response.responseList.length / perPage);
  const [currentPage, setCurrentPage] = useState(1);

  const pages = PaginationPagesCreator(totalPages, currentPage);

  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <main className={styles.universityListPage}>
          <h1>Університети</h1>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pages={pages}
          />
          <SortingPanel />
          {response.responseList
            .map((university) => {
              const { id, name, abbreviation } = university;
              return (
                <UniversityItem
                  key={id}
                  abbreviation={abbreviation}
                  fullName={name}
                  isBlocked={false} // mock data!
                  handleBlocking={() => {}}
                  handleEditing={() => {}}
                />
              );
            })
            .slice(indexOfFirstPost, indexOfLastPost)}
        </main>
      </div>
    </div>
  );
};

export default UniversityListPage;