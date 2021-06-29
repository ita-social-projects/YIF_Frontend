import React, { useEffect, useState } from 'react';
import styles from '../../common/formElements/formInputError/formInputError.module.scss'; // fix
import Unlock from '../../common/icons/Unlock';
import Delete from '../../common/icons/Delete';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import Spinner from '../../common/spinner';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';

interface props {
  adminId: string,
  adminEmail: string
}

interface IoEadmin {
  email: string
}

interface Message {
  message: string
}

const IoEadmin = (props: props) => {
  const { getToken } = useAuth();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<Message>(
    {
      message: ''
    });
  const [isAdminDeleted, setIsAdminDeleted] = useState(false);

  const deleteIoEadmin = async () => {
    try {
      const currentToken = await getToken();
      const { statusCode, data }: any = await requestSecureData(
        `${APIUrl}SuperAdmin/DeleteInstitutionOfEducationAdmin/${props.adminId}`,
        'DELETE',
        currentToken,
      );
      if (statusCode.toString().match(/^[23]\d{2}$/)) {
        setMessage(data);
        setIsAdminDeleted(true)
        setTimeout(
          function() {
            setIsAdminDeleted(false)
          }, 3000);
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

  return (
    <div className={styles.admin}>
      {isAdminDeleted? <FormInputSuccess successMessage={message.message}/> : <div/>}
      <h2 className={styles.admin__title}>Адмін</h2>
      <div className={styles.admin__line}>
        <p className={styles.admin__line__name}>{props.adminEmail}</p>
        <div className={styles.admin__line__icons}>
          <Unlock handleClick={() => {
          }} />
          <Delete handleClick={() => {deleteIoEadmin()}} />
        </div>
      </div>
    </div>
  );
};

export default IoEadmin;
