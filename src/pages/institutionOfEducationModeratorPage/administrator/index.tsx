import React, { useState, useEffect } from 'react';
import styles from './administrator.module.scss';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import Spinner from '../../../components/common/spinner';

interface Administrator {
  email: string;
  name: string;
}

function Administrator() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const { getToken } = useAuth();
  const [
    { email, name },
    setData,
  ] = useState<Administrator>({
    email: '',
    name: '',
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const currentToken = await getToken();
        const { statusCode, data }: any = await requestSecureData(
          `${APIUrl}InstitutionOfEducationModerator/GetIoEAdmin`,
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
        setError(true);
      } finally {
        setIsFetching(false);
      }
    };
    getInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;
  if (isFetching && !error) {
    content = (
      <div className={styles.noContentContainer}>
        <Spinner />
      </div>
    );
  } else if (error && !isFetching) {
    content = (
      <div className={styles.noContentContainer}>
        <h2>Щось пішло не так, спробуйте знову.</h2>
      </div>
    );
  } else {
    content = (
      <main data-testid="administrator" className={styles.administrator}>
        <div className={styles.container}>
          <p className={styles.heading}>Адміністратор:</p>
          <p className={styles.email}>{email}</p>
        </div>
      </main>
    );
  }

  return <>{content}</>;
}

export default Administrator;
