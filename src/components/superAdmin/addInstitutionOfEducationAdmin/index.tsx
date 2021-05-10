import React, { useState, useEffect } from 'react';
import styles from './addInstitutionOfEducation.module.scss';
import { Link, useRouteMatch, useParams } from 'react-router-dom';
import InstitutionOfEducationBlock from '../../institutionOfEducationBlock';
import Unlock from '../../common/icons/Unlock/index';
import Delete from '../../common/icons/Delete/index';
import TabContent from './TabContent';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import { requestData } from '../../../services/requestDataFunction';

interface ParamTypes {
  ioeId: any;
}

const AddInstitutionOfEducationAdmin = () => {
  const { getToken } = useAuth();
  const { ioeId } = useParams<ParamTypes>();
  const { path } = useRouteMatch();
  const pathWithoutParams = path.slice(0, path.lastIndexOf('/'));

  const [institutionOfEducation, setInstitutionOfEducation] = useState({
    name: '',
    abbreviation: '',
    site: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    imagePath: '',
  });

  const IOE = () => {
    const endpoint = `${APIUrl}InstitutionOfEducation/${ioeId}`;
    requestData(endpoint, 'GET').then((res: any) => {
      const statusCode = res.statusCode.toString();
      if (statusCode.match(/^[23]\d{2}$/)) {
        setInstitutionOfEducation(res.data);
      } else {
        console.log(`error`);
      }
    });
  };

  useEffect(() => {
    IOE();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoContainer}>
        <InstitutionOfEducationBlock
          name={institutionOfEducation.name}
          abbreviation={institutionOfEducation.abbreviation}
          site={institutionOfEducation.site}
          address={institutionOfEducation.address}
          phone={institutionOfEducation.phone}
          email={institutionOfEducation.email}
          description={institutionOfEducation.description}
          imagePath={institutionOfEducation.imagePath}
        />
        <Link
          className={`${styles.animatedButton} ${styles.buttonLink}`}
          to={`${pathWithoutParams}/edit/${ioeId}`}
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
            <TabContent id={ioeId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstitutionOfEducationAdmin;
