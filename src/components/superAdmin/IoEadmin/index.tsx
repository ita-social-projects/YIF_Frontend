import React, { useState, useEffect } from 'react';
// import styles from '../addInstitutionOfEducationAdmin/addInstitutionOfEducation.module.scss';
import styles from './IoEadmin.module.scss'
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator'; import Unlock from '../../common/icons/Unlock';
import { requestSecureData } from '../../../services/requestDataFunction';
import Lock from '../../common/icons/Lock/index';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';
import { FormInputError } from '../../common/formElements';
import Delete from '../../common/icons/Delete';

interface props {
  adminId: string,
  adminEmail: string,
  isAdminBanned: boolean
}

const IoEadmin: React.FC<props> = (props) => {
  const {
    adminId,
    adminEmail,
    isAdminBanned
  } = props;
  const [resultMessage, setResultMessage] = useState({
    status: '',
    message: '',
  });
  const [isBanned, setBanned] = useState(isAdminBanned);
  const { getToken } = useAuth();

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
    }, 4000);
  }

  const banIoEAdmin = async (id: string) => {
    const banEndpoint = `${APIUrl}SuperAdmin/DisableInstitutionOfEducationAdmin/${adminId}`;
    const currentToken = await getToken();

    requestSecureData(banEndpoint, 'PATCH', currentToken)
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        setBanned(res.data.isBanned);
        let msg = `Адміністратора навчального закладу ${isBanned ? 'розблоковано' : 'заблоковано'}`;
        showMessage(statusCode, msg);
      })
      .catch((error) => {
        showMessage('error', 'Щось пішло не так, спробуйте знову');
      });
  };

  return (
    <>
      <div className={styles.admin}>
        <h2 className={styles.admin__title}>Адмін</h2>
        {
          props.adminEmail === null ?
            <div>Адміністратор не призначений</div>
            :
            <div data-testid='content' className={styles.admin__line}>
              <p className={styles.admin__line__name}>{props.adminEmail}</p>
              <div className={styles.admin__line__icons}>
                <div>
                  {!isBanned ? <Unlock data-testid="unlockSign" handleClick={() => banIoEAdmin(adminId)} />
                    : <Lock data-testid="lockSign" handleClick={() => banIoEAdmin(adminId)} />}
                </div>
                <Delete handleClick={() => { }} />
              </div>
            </div>
        }
      </div>
      {(resultMessage.status === 'error') &&
        <div data-testid='errorMessage' className={styles.resultMessageContainer}>
          <FormInputError data-testid='errorMessage'
            errorType='form'
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
