import React, { useState, useEffect } from 'react';
import styles from './superAdminAccountPage.module.scss';
import ErrorBoundry from '../../../errorBoundry';
import {
  Header,
  Footer,
  AdminPanel,
  SuperAdminAccount,
} from '../../../components';
import Spinner from '../../../components/common/spinner';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';

const SuperAdminAccountPage: React.FC = () => {
  const [isFetching, setFetching] = useState(true);
  const [universityAdmins, setUniversityAdmins] = useState([]);
  const { token, getToken } = useAuth();

  const fetchUniversitiesAdmins = () => {
    const endpoint = `${APIUrl}SuperAdmin/GetAllUniversities`;
    getToken();
    requestSecureData(endpoint, 'GET', token!)
      .then((res: any) => {
        setUniversityAdmins(res.data);
        setFetching(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchUniversitiesAdmins();
  }, []);
  return (
    <>
      <ErrorBoundry>
        <Header />
        <section className={styles.superAdminAccountPage}>
          <AdminPanel />
          {isFetching ? (
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          ) : (
            <SuperAdminAccount universityAdmins={universityAdmins} />
          )}
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default SuperAdminAccountPage;
