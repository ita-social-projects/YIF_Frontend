import React, { useState, useEffect } from 'react';
import styles from './superAdminAccountPage.module.scss';
import ErrorBoundry from '../../../errorBoundry';
import { SuperAdminAccount } from '../../../components';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import { Link } from 'react-router-dom';

const SuperAdminAccountPage: React.FC = () => {
  const [isFetching, setFetching] = useState(true);
  const [
    institutionOfEducationAdmins,
    setInstitutionOfEducationAdmins,
  ] = useState([]);
  const { getToken } = useAuth();

  const fetchInstitutionOfEducationAdmins = async () => {
    const endpoint = `${APIUrl}SuperAdmin/GetAllInstitutionOfEducationsAdmins`;
    const currentToken = await getToken();
    requestSecureData(endpoint, 'GET', currentToken)
      .then((res: any) => {
        setInstitutionOfEducationAdmins(res.data.responseList);
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
        <section className={styles.superAdminAccountPage}>
          {!isFetching && (
            <>
              <SuperAdminAccount
                institutionOfEducationAdmins={institutionOfEducationAdmins}
              />
              <Link to={`/superAdminAccount/addInstitutionOfEducation`}>
                <button
                  className={`${styles.addButton} ${styles.animatedButton}`}
                >
                  Додати заклад освіти
                </button>
              </Link>
            </>
          )}
        </section>
      </ErrorBoundry>
    </>
  );
};

export default SuperAdminAccountPage;
