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
  const [
    institutionOfEducationAdmins,
    setInstitutionOfEducationAdmins,
  ] = useState([]);
  const { token, getToken } = useAuth();

  const fetchInstitutionOfEducationAdmins = () => {
    const endpoint = `${APIUrl}SuperAdmin/GetAllInstitutionOfEducations`;
    getToken();
    requestSecureData(endpoint, 'GET', token!)
      .then((res: any) => {
        setInstitutionOfEducationAdmins(res.data);
        setFetching(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchInstitutionOfEducationAdmins();
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
            <SuperAdminAccount
              institutionOfEducationAdmins={institutionOfEducationAdmins}
            />
          )}
        </section>
        <Footer />
      </ErrorBoundry>
    </>
  );
};

export default SuperAdminAccountPage;
