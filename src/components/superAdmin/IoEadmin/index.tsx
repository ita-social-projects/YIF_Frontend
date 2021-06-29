import React from 'react';
import styles from '../addInstitutionOfEducationAdmin/addInstitutionOfEducation.module.scss';
import Unlock from '../../common/icons/Unlock';
import Delete from '../../common/icons/Delete';

interface props {
  adminId: string,
  adminEmail: string
}

const IoEadmin = (props: props) => {

  return (
    <div className={styles.admin}>
      <h2 className={styles.admin__title}>Адмін</h2>
      {
        props.adminEmail === '' ?
          <div>Адміністратор не назначений</div>
          :
          <div className={styles.admin__line}>
            <p className={styles.admin__line__name}>{props.adminEmail}</p>
            <div className={styles.admin__line__icons}>
              <Unlock handleClick={() => {
              }} />
              <Delete handleClick={() => {}} />
            </div>
          </div>
      }
    </div>
  );
};

export default IoEadmin;
