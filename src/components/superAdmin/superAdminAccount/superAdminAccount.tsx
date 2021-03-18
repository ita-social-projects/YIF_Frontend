import React, { useEffect, useRef, useState } from 'react';
import styles from './superAdminAccount.module.scss';
import cloneDeep from 'lodash.clonedeep';
import { requestSecureData } from '../../../services/requestDataFunction';
import { APIUrl } from '../../../services/endpoints';
import { useAuth } from '../../../services/tokenValidator';
import { FormInputSuccess } from '../../common/formElements/formInputSuccess/formInputSuccess';
import { FormInputError } from '../../common/formElements';
import TableItem from './tableItem/tableItem';
import Search from './search/search';

import { ReactComponent as IconLock } from './icons/iconLock.svg';
import { ReactComponent as IconArrow } from './icons/iconArrow.svg';

const iconIllustrAdmin = 'assets/images/superAdminAccount.svg';

export interface IUniversityAdmin {
  id: string;
  user: {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    photo?: string;
  };
  university: {
    id: string;
    name: string;
    abbreviation: string;
  };
  isBanned: boolean;
}

interface Props {
  universityAdmins: IUniversityAdmin[];
}

const SuperAdminAccount: React.FC<Props> = (props) => {
  const { token, getToken } = useAuth();
  const [currentKey, setCurrentKey] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [sortSwitch, setSortSwitch] = useState({ a: -1, b: 1 });
  const textInput: any = useRef(null);

  const defineErrorMessage = (
    hasError = false,
    errorStatusCode = '',
    errorMessage = 'Щось пішло не так, спробуйте знову.'
  ) => {
    return {
      hasError,
      errorStatusCode,
      errorMessage,
    };
  };
  const defineSuccessMessage = (
    hasSuccess = false,
    successStatusCode = '',
    successMessage = 'Дані збережені'
  ) => {
    return {
      hasSuccess,
      successStatusCode,
      successMessage,
    };
  };

  const [error, setError] = useState(defineErrorMessage());
  const [success, setSuccess] = useState(defineSuccessMessage());

  const [universityAdmins, setUniversityAdmins] = useState<IUniversityAdmin[]>(
    props.universityAdmins
  );
  const [sortedUniversityAdmins, setSortedUniversityAdmins] = useState<
    IUniversityAdmin[]
  >(props.universityAdmins);

  const setNewUniversityAdminsState = (
    state: IUniversityAdmin[],
    id: string,
    action: string
  ): IUniversityAdmin[] => {
    if (action === 'setNewBanStatus') {
      return cloneDeep(state).map((admin) => {
        if (admin.id === id) {
          admin.isBanned = !admin.isBanned;
          return admin;
        }
        return admin;
      });
    } else if (action === 'removeAdmin') {
      return cloneDeep(state).filter((admin) => admin.id !== id);
    }
    return state;
  };

  // request to server
  const setBanStatus = (id: string) => {
    const endpoint = `${APIUrl}SuperAdmin/DisableUniversityAdmin/${id}`;
    getToken();
    requestSecureData(endpoint, 'POST', token!, {
      id,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setSortedUniversityAdmins(
            setNewUniversityAdminsState(
              sortedUniversityAdmins,
              id,
              'setNewBanStatus'
            )
          );
          // sorted state
          setUniversityAdmins(
            setNewUniversityAdminsState(universityAdmins, id, 'setNewBanStatus')
          ); // main state

          setSuccess(
            defineSuccessMessage(true, res.statusCode, res.data.message)
          );
          setTimeout(() => {
            setSuccess(defineSuccessMessage());
          }, 3000);
        } else {
          setError(defineErrorMessage(true, res.statusCode, res.data.message));
          setTimeout(() => {
            setError(defineErrorMessage());
          }, 3000);
        }
      })
      .catch((error) => {
        setError(
          defineErrorMessage(
            true,
            error.statusCode,
            'Щось пішло не так, спробуйте знову.'
          )
        );
        setTimeout(() => {
          setError(defineErrorMessage());
        }, 3000);
      });
  };

  const removeAdminUniversiti = (id: string) => {
    const endpoint = `${APIUrl}SuperAdmin/DeleteUniversityAdmin/${id}`;
    getToken();
    requestSecureData(endpoint, 'DELETE', token!)
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setSortedUniversityAdmins(
            setNewUniversityAdminsState(
              sortedUniversityAdmins,
              id,
              'removeAdmin'
            )
          ); // sorted state
          setUniversityAdmins(
            setNewUniversityAdminsState(universityAdmins, id, 'removeAdmin')
          ); // main state

          setSuccess(
            defineSuccessMessage(true, res.statusCode, res.data.message)
          );
          setTimeout(() => {
            setSuccess(defineSuccessMessage());
          }, 3000);
        } else {
          setError(defineErrorMessage(true, res.statusCode, res.data.message));
          setTimeout(() => {
            setError(defineErrorMessage());
          }, 3000);
        }
      })
      .catch((error) => {
        setError(
          defineErrorMessage(
            true,
            error.statusCode,
            'Щось пішло не так, спробуйте знову.'
          )
        );
        setTimeout(() => {
          setError(defineErrorMessage());
        }, 3000);
      });
  };

  const clearInput = () => {
    setSortedUniversityAdmins(universityAdmins);
    textInput.current.value = '';
    setSearchValue('');
    setCurrentKey('');
  };

  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    let sorted = cloneDeep(universityAdmins).filter((admin): any => {
      if (value === '') {
        return admin;
      } else if (
        admin.university.abbreviation
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase()) ||
        admin.user.email.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      ) {
        return admin;
      }
      return null;
    });
    setSortedUniversityAdmins(sorted);
  };

  const handleSort = (key: string) => {
    let sortSwitchA = 0;
    let sortSwitchB = 0;

    if (key === currentKey) {
      setSortSwitch({ a: sortSwitch.b, b: sortSwitch.a });
      sortSwitchA = sortSwitch.b;
      sortSwitchB = sortSwitch.a;
    } else {
      setSortSwitch({ a: -1, b: 1 });
      sortSwitchA = -1;
      sortSwitchB = 1;
    }

    const sortedArr = cloneDeep(sortedUniversityAdmins).sort(
      (a: any, b: any) => {
        let prevV = a[key];
        let nextV = b[key];

        if (key === 'abbreviation') {
          prevV = a.university[key] ? a.university[key].toUpperCase() : '';
          nextV = b.university[key] ? b.university[key].toUpperCase() : '';
        } else if (key !== 'isBanned') {
          prevV = a.user[key] ? a.user[key].toUpperCase() : ''; // ignore upper and lowercase
          nextV = b.user[key] ? b.user[key].toUpperCase() : ''; // ignore upper and lowercase
        }

        if (prevV < nextV) {
          return sortSwitchA;
        }
        if (prevV > nextV) {
          return sortSwitchB;
        }
        // names must be equal
        return 0;
      }
    );

    setCurrentKey(key);
    setSortedUniversityAdmins(sortedArr);
  };

  useEffect(() => {
    handleSort('isBanned');
  }, []);

  return (
    <div className={styles.superAdminAccount}>
      <h1>Адміністратори університетів</h1>
      {error.hasError && (
        <div className={styles.flashMessageRight}>
          {' '}
          <FormInputError errorType='form' errorMessage={error.errorMessage} />
        </div>
      )}
      {success.hasSuccess && (
        <div className={styles.flashMessageLeft}>
          {' '}
          <FormInputSuccess successMessage={success.successMessage} />
        </div>
      )}
      <div className={styles.adminTableContainer}>
        <div className={styles.adminTableHeader}>
          <Search
            searchValue={searchValue}
            handlerSearch={handlerSearch}
            clearInput={clearInput}
            textInput={textInput}
          />
          <ul className={styles.adminTableTitle}>
            <li
              data-testid='sortByUserName'
              className={`${styles.name} ${
                currentKey === 'userName' && styles.filterActive
              }`}
              onClick={() => handleSort('userName')}
            >
              Ім'я <IconArrow />
            </li>
            <li
              data-testid='sortByUserEmail'
              className={`${styles.email} ${
                currentKey === 'email' && styles.filterActive
              }`}
              onClick={() => handleSort('email')}
            >
              Електронна адреса <IconArrow />
            </li>
            <li
              data-testid='sortByAbbreviation'
              className={`${styles.universiti} ${
                currentKey === 'abbreviation' && styles.filterActive
              }`}
              onClick={() => handleSort('abbreviation')}
            >
              Університет <IconArrow />
            </li>
            <li
              data-testid='sortByBanned'
              className={`${styles.ban} ${
                currentKey === 'isBanned' && styles.filterActive
              }`}
              onClick={() => handleSort('isBanned')}
            >
              <IconLock /> <IconArrow />
            </li>
          </ul>
        </div>
        <ul className={styles.adminList}>
          <li className={styles.adminItem}>
            {sortedUniversityAdmins.length ? (
              sortedUniversityAdmins.map((admin: IUniversityAdmin) => (
                <TableItem
                  admin={admin}
                  searchValue={searchValue}
                  key={admin.id}
                  setBanStatus={setBanStatus}
                  removeAdminUniversiti={removeAdminUniversiti}
                />
              ))
            ) : (
              <div className={styles.noUniversityAdmins}>
                {' '}
                Не знайдено жодного адміністратора
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className={styles.imgContainer}>
        <img src={iconIllustrAdmin} alt='search something' />
      </div>
    </div>
  );
};

export default SuperAdminAccount;
