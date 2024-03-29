import React, { useEffect, useState } from 'react';
import styles from './addInstitutionOfEducation.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import InstitutionOfEducationBlock from '../../institutionOfEducationBlock';
import TabContent from './TabContent/TabContent';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import Spinner from '../../common/spinner';
import IoEadmin from '../IoEadmin';
import ResponsePlaceholder from '../../../components/common/responsePlaceholder';

interface IoEinfo {
  ioEId: string,
  name: string,
  abbreviation: string,
  site: string,
  address: string,
  phone: string,
  email: string,
  description: string,
  imagePath: string,
  adminId: string,
  adminEmail: string,
  isAdminBanned: boolean
}

interface stateType {
  IoEid: { pathname: string }
}

const AddInstitutionOfEducationAdmin = () => {

  const { state } = useLocation<stateType>();
  const { path } = useRouteMatch();
  const [isFetching, setIsFetching] = useState(true);
  const [isAdminChanged, setIsAdminChanged] = useState(false);
  const [isAdminDeleted, setIsAdminDeleted] = useState(false);

  const [error, setError] = useState(false);
  const { getToken } = useAuth();
  const [
    { name, abbreviation, site, address, phone, email, description, imagePath, adminId, adminEmail, isAdminBanned },
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
    imagePath: '',
    adminId: '',
    adminEmail: '',
    isAdminBanned: true,
  });

  const IoEid = {
    pathname: '58611427-2d33-4e17-9cee-0cda0470d150',
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const currentToken = await getToken();
        const { statusCode, data }: any = await requestSecureData(
          // Check if (state === undefined) for testing
          `${APIUrl}SuperAdmin/GetIoEInfoByIoEId/${(state === undefined) ? IoEid : state.IoEid}`,
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
    getInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminDeleted, isAdminChanged]);

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
        <ResponsePlaceholder errorMessage='Не вдалося отримати інформацію про навчальний заклад'/>
      </div>
    );
  } else {
    content = (
      <div data-testid='renderedContent' className={styles.wrapper}>
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
            to={{
              pathname: `${path}/edit/`,
              state: { IoEid: (state === undefined) ? IoEid : state.IoEid }
            }}
          >
            Редагувати
          </Link>
          <IoEadmin 
            adminId={adminId} 
            adminEmail={adminEmail} 
            isAdminBanned={isAdminBanned} 
            isAdminDeleted={isAdminDeleted} 
            setIsAdminDeleted={setIsAdminDeleted} 
          />
          <div className={styles.admin__buttons}>
            {/* Check for (state === undefined) for testing*/}
            <TabContent isAdminChanged={isAdminChanged} setIsAdminChanged={setIsAdminChanged} IoEid={(state === undefined) ? IoEid : state.IoEid} />
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default AddInstitutionOfEducationAdmin;
