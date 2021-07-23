import React, { useState, useEffect } from 'react';
import styles from './editInstitutionOfEducationInfoPage.module.scss';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import Spinner from '../../../components/common/spinner';
import EditInstitutionOfEducationInfo from '../../../components/editIOEInfo';
import {useLocation} from "react-router-dom"; 

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

interface stateType {
  IoEid: string;
}

const EditInstitutionOfEducationInfoPage = () => {
  const { state } = useLocation<stateType>();
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

  const IoEid = '58611427-2d33-4e17-9cee-0cda0470d150';

   
  const sendNewDescription = async (formikValues: any) => {
    const url = `${APIUrl}SuperAdmin/ModifyIoE/${(state === undefined) ? IoEid :state.IoEid}`
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
            `${APIUrl}SuperAdmin/GetIoEInfoByIoEId/${(state === undefined) ? IoEid : state.IoEid}`,
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
          }, 5000);
        }
      };
      getInfo();
    }
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
