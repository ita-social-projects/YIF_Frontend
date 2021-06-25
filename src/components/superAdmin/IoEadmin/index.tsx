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
  adminId: string,
  adminEmail: string
}

interface IoEadmin {
  email: string
}

const IoEadmin = (props: props) => {

  return (
    <div className={styles.admin}>
      <h2 className={styles.admin__title}>Адмін</h2>
      <div className={styles.admin__line}>
        <p className={styles.admin__line__name}>{props.adminEmail}</p>
        <div className={styles.admin__line__icons}>
          <Unlock handleClick={() => {
          }} />
          <Delete handleClick={() => {
          }} />
        </div>
      </div>
    </div>
  );
};

export default IoEadmin;
