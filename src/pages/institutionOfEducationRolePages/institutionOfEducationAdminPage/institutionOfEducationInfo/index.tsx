import React, { useEffect, useState } from 'react';
import styles from './institutionOfEducationInfo.module.scss';
import InstitutionOfEducationBlock from '../../../../components/institutionOfEducationBlock';
import { Link, useRouteMatch } from 'react-router-dom';
import { requestSecureData } from '../../../../services/requestDataFunction';
import { useAuth } from '../../../../services/tokenValidator';
import { APIUrl } from '../../../../services/endpoints';
import Spinner from '../../../../components/common/spinner';

interface Info {
  name: string;
  abbreviation: string;
  site: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  imagePath: string;
}

const InstitutionOfEducationInfo = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const { path } = useRouteMatch();
  const { getToken } = useAuth();
  const [
    { name, abbreviation, site, address, phone, email, description, imagePath },
    setData,
  ] = useState<Info>({
    name: '',
    abbreviation: '',
    site: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    imagePath: '',
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const currentToken = await getToken();
        const { statusCode, data }: any = await requestSecureData(
          `${APIUrl}InstitutionOfEducationAdmin/GetIoEInfoByUserId`,
          'GET',
          currentToken
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
      <main className={styles.wrapper}>
        <div className={styles.infoContainer}>
          <InstitutionOfEducationBlock
            name={name}
            abbreviation={abbreviation}
            site={site}
            address={address}
            phone={phone}
            email={email}
            description={description}
            imagePath={`http://localhost:5000/images/${imagePath}`}
          />
          <Link
            className={`${styles.animatedButton} ${styles.buttonLink}`}
            to={`${path}/edit`}
          >
            Редагувати
          </Link>
        </div>
      </main>
    );
  }

  return <>{content}</>;
};

export default InstitutionOfEducationInfo;
