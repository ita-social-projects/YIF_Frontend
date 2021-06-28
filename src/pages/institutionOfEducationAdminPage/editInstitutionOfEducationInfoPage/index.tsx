import React, { useState, useEffect } from 'react';
import styles from './editInstitutionOfEducationInfoPage.module.scss';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import Spinner from '../../../components/common/spinner';
import EditInstitutionOfEducationInfo from '../../../components/editIOEInfo';

interface Info {
  name: string;
  abbreviation: string;
  site: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  lat: number;
  lon: number;
  imagePath: string;
  institutionOfEducationType: string | number;
}

const EditInstitutionOfEducationInfoPage = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [error, setError] = useState(false);
  const { getToken } = useAuth();
  const [data, setData] = useState<Info>({
    name: '',
    abbreviation: '',
    site: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    lat: 0,
    lon: 0,
    imagePath: '',
    institutionOfEducationType: '',
  });

  const sendNewDescription = async (formikValues: any) => {
    const url = `${APIUrl}InstitutionOfEducationAdmin/ModifyInstitution`
    try {
      const currentToken = await getToken();
      const { statusCode }: any = await requestSecureData(
        url,
        'PATCH',
        currentToken,
        formikValues
      );
      if (statusCode.toString().match(/^[23]\d{2}$/)) {
        setError(false);
        setIsNew(true);
      } else {
        setError(true);
      }
    } catch (e) {
      console.log('Error when trying send new IOE info', e);
      setError(true);
    }
  };

  useEffect(() => {
    if (isNew || isFetching) {
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
          console.log('Error when trying get IOE info', e);
          setError(true);
        } finally {
          setIsFetching(false);
          setTimeout(() => {
            setIsNew(false);
          }, 4000);
        }
      };
      getInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew]);

  let content;
  if (isFetching) {
    content = (
      <div className={styles.noContent}>
        <Spinner />;
      </div>
    );
  } else if (error) {
    content = (
      <div className={styles.noContent}>
        <h2>Щось пішло не так, спробуйте знову.</h2>
      </div>
    );
  } else {
    content = (
      <>
        {isNew && <div className={styles.success}>Дані успішно змінено!</div>}
        <EditInstitutionOfEducationInfo
          data={data}
          submitHandler={sendNewDescription}
        />
      </>
    );
  }

  return <>{content}</>;
};

export default EditInstitutionOfEducationInfoPage;
