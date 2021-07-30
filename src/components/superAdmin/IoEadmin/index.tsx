import React, { useState } from 'react';
import styles from './IoEadmin.module.scss';
import Unlock from '../../common/icons/Unlock';
import Lock from '../../common/icons/Lock/index';
import Delete from '../../common/icons/Delete';
import { useAuth } from '../../../services/tokenValidator';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';
import { FormInputError } from '../../common/formElements';

interface props {
  adminId: string,
  adminEmail: string,
  setIsAdminDeleted: any,
  isAdminDeleted: boolean,
  isAdminBanned: boolean,
}

const IoEadmin: React.FC<props> = (props) => {
  const {
    adminId,
    adminEmail,
    isAdminDeleted,
    setIsAdminDeleted,
    isAdminBanned,
  } = props;
  const { getToken } = useAuth();
  const [resultMessage, setResultMessage] = useState({
    status: '',
    message: '',
  });
  const [isBanned, setBanned] = useState(isAdminBanned);

  const showMessage = (statusCode: any, msg: string) => {
    const result = (statusCode.match(/^[23]\d{2}$/)) ? 'success' : 'error';
    setResultMessage({
      status: result,
      message: msg,
    });
    setTimeout(() => {
      setResultMessage({
        status: '',
        message: '',
      });
    }, 2000);
  }

  const banIoEAdmin = async (id: string) => {
    const currentToken = await getToken();
    const banEndpoint = `${APIUrl}SuperAdmin/DisableInstitutionOfEducationAdmin/${adminId}`;

    requestSecureData(banEndpoint, 'PATCH', currentToken)
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        setBanned(res.data.isBanned);
        let msg = `Адміністратора навчального закладу ${isBanned ? 'розблоковано' : 'заблоковано'}`;
        showMessage(statusCode, msg);
      })
      .catch((error) => showMessage('error', 'Щось пішло не так, спробуйте знову'));
  };

  const deleteIoEadmin = async () => {
    const currentToken = await getToken();
    const deleteEndpoint = `${APIUrl}SuperAdmin/DeleteInstitutionOfEducationAdmin/${adminId}`
    requestSecureData(deleteEndpoint, 'DELETE', currentToken)
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setIsAdminDeleted(true);
          const msg = `Адміністратора навчального закладу видалено`;
          showMessage(statusCode, msg);
        } 
      }).catch((error) => showMessage('error', 'Щось пішло не так, спробуйте знову'));
  };

  return (
    <>
      <div className={styles.admin}>
        <h2 className={styles.admin__title}>Адмін</h2>
        {
          props.adminEmail === null ?
            <div className={styles.admin__line}>Адміністратор не призначений</div>
            :
            <div data-testid='content' className={styles.admin__line}>
              <p className={styles.admin__line__name}>{props.adminEmail}</p>
              <div className={styles.admin__line__icons}>
                <div>
                  {!isBanned ? <Unlock data-testid="unlockSign" handleClick={() => banIoEAdmin(adminId)} />
                    : <Lock data-testid="lockSign" handleClick={() => banIoEAdmin(adminId)} />}
                </div>
                <div data-testid='deleteButton'><Delete handleClick={() => { deleteIoEadmin() }} /></div>
              </div>
            </div>
        }
      </div>
      {(resultMessage.status === 'error') &&
        <div data-testid='errorMessage' className={styles.resultMessageContainer}>
          <FormInputError data-testid='errorMessage'
            errorFor='form'
            errorMessage={resultMessage.message}
          />
        </div>
      }
      {(resultMessage.status === 'success') &&
        <div data-testid='successMessage' className={styles.resultMessageContainer}>
          <FormInputSuccess data-testid='successMessage' successMessage={resultMessage.message} />
        </div>
      }
    </>
  );
};

export default IoEadmin;