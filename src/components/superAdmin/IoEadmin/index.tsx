import React, { useEffect, useState } from 'react';
import styles from './IoEadmin.module.scss';
import Unlock from '../../common/icons/Unlock';
import Delete from '../../common/icons/Delete';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';

interface props {
  adminId: string,
  adminEmail: string,
  // const [isAdminChanged, setIsAdminChanged] = useState(false);

  setIsAdminChanged: any,
  isAdminChanged: boolean
}
interface IoEadmin {
  email: string
}
interface Message {
  message: string
}

let IoEadmin = (props: props) => {
  const { getToken } = useAuth();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<Message>(
    {
      message: ''
    });

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
        props.setIsAdminChanged(true)
        setTimeout(
          function() {
            props.setIsAdminChanged(false)
          }, 4000);
        setError(false);
      } else {
        setError(true);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };
  let content;
  if (error) {
    content = (
      <div  className={styles.noContent}>
        <h2>Щось пішло не так, спробуйте знову.</h2>
      </div>
    );  
  } else {
    content = (
      <div data-testid = 'contentBlock' className={styles.admin}>
       <div className = {styles.adminMessageBlock}> <h2 className={styles.admin__title}>Адмін</h2>
               <div data-testid='formInputSuccess' className = {styles.formInputSuccessDeleted}>
                 {props.isAdminChanged? <FormInputSuccess  successMessage={message.message}/> : <div/>}</div>
       </div>
        {
          props.adminEmail === null ?
            <div className={styles.adminMessageBlock}>Адміністратор не назначений</div>
            :
            <div  className={styles.admin__line}>
              <p className={styles.admin__line__name}>{props.adminEmail}</p>
              <div className={styles.admin__line__icons}>
                <Unlock handleClick={() => {
                }} />
                <div data-testid='deleteButton'><Delete   handleClick={() => {deleteIoEadmin()}} /></div>
              </div>
            </div>
        }
      </div>
    );
  }
  return <>{content}</>;
};

export default IoEadmin;