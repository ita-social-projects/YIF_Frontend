import React, { useEffect, useState } from 'react';
import styles from './IoEadmin.module.scss';
import Unlock from '../../common/icons/Unlock';
import Delete from '../../common/icons/Delete';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import Spinner from '../../common/spinner';

interface props {
  adminId: string
}

interface IoEadmin {
  email: string
}

const IoEadmin = (props: props) => {

  const { path } = useRouteMatch();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const { getToken } = useAuth();
  const [
    { email },
    setData,
  ] = useState<IoEadmin>({
    email: ''
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const currentToken = await getToken();
        const { statusCode, data }: any = await requestSecureData(
          `${APIUrl}Users/${props.adminId}`,
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
      <div className={styles.admin}>
        <h2 className={styles.admin__title}>Адмін</h2>
        <div className={styles.admin__line}>
          <p className={styles.admin__line__name}>{email}</p>
          <div className={styles.admin__line__icons}>
            <Unlock handleClick={() => {}} />
            <Delete handleClick={() => {}} />
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default IoEadmin;
