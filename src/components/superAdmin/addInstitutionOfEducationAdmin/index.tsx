import React, { useEffect, useState } from 'react';
import styles from './addInstitutionOfEducation.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import InstitutionOfEducationBlock from '../../institutionOfEducationBlock';
import Unlock from '../../common/icons/Unlock/index';
import Delete from '../../common/icons/Delete/index';
import TabContent from './TabContent';
import {useLocation} from "react-router-dom";
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import Spinner from '../../common/spinner';

interface IoEinfo {
  ioEId: string,
  name: string,
  abbreviation: string,
  site: string,
  address: string,
  phone: string,
  email: string,
  description: string,
  imagePath: string
}

interface stateType {
  IoEid: { pathname: string }
}


const AddInstitutionOfEducationAdmin = () => {

  const { state } = useLocation<stateType>();
  const { path } = useRouteMatch();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const { getToken } = useAuth();
  const [
    { ioEId, name, abbreviation, site, address, phone, email, description, imagePath },
    setData,
  ] = useState<IoEinfo>({
    ioEId: '',
    name: '',
    abbreviation: '',
    site: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    imagePath: ''
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const currentToken = await getToken();
        const { statusCode, data }: any = await requestSecureData(
          `${APIUrl}SuperAdmin/GetIoEInfoByIoEId/${state.IoEid}`,
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
      <div className={styles.wrapper}>
        <div className={styles.infoContainer}>
          <InstitutionOfEducationBlock
            name={name}
            abbreviation={abbreviation}
            site={site}
            address={address}
            phone={phone}
            email={email}
            description={description}
            imagePath={imagePath}
          />
          <Link
            className={`${styles.animatedButton} ${styles.buttonLink}`}
            to={`${path}/edit/${ioEId}`}
          >
            Редагувати
          </Link>
          <div className={styles.admin}>
            <h2 className={styles.admin__title}>Адмін</h2>
            <div className={styles.admin__line}>
              <p className={styles.admin__line__name}>Shanna@melissa.tv</p>
              <div className={styles.admin__line__icons}>
                <Unlock handleClick={() => {}} />
                <Delete handleClick={() => {}} />
              </div>
            </div>
            <div className={styles.admin__buttons}>
              <TabContent />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
}

export default AddInstitutionOfEducationAdmin;
