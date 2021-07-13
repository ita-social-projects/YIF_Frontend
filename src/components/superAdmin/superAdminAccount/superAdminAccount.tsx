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
import PaginationPagesCreator from '../../../components/pagination/paginationPagesCreator/';
import Lock from '../../common/icons/Lock/index';
// import { Link, Router } from 'react-router-dom';
import { ReactComponent as IconArrow } from './icons/iconArrow.svg';
import Pagination from '../../pagination';

// const iconIllustrAdmin = '/assets/images/superAdminAccount.svg';

export interface IInstitutionOfEducationAdmin {
  id: string;
  user: {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    photo?: string;
  };
  institutionOfEducation: {
    id: string;
    name: string;
    abbreviation: string;
  };
  isBanned: boolean;
}

interface Props {
  institutionOfEducationAdmins: IInstitutionOfEducationAdmin[];
}

const SuperAdminAccount: React.FC<Props> = (props) => {
  const { getToken } = useAuth();
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

  const [institutionOfEducationAdmins, setInstitutionOfEducationAdmins] =
    useState<IInstitutionOfEducationAdmin[]>(
      props.institutionOfEducationAdmins
    );

  const [
    sortedInstitutionOfEducationAdmins,
    setSortedInstitutionOfEducationAdmins,
  ] = useState<IInstitutionOfEducationAdmin[]>(
    props.institutionOfEducationAdmins
  );

  const setNewInstitutionOfEducationAdminsState = (
    state: IInstitutionOfEducationAdmin[],
    id: string,
    action: string
  ): IInstitutionOfEducationAdmin[] => {
    if (action === 'setNewBanStatus') {
      return cloneDeep(state).map((admin) => {
        if (admin.id === id) {
          admin.isBanned = !admin.isBanned;
          return admin;
        }
        return admin;
      });
    } else if (action === 'removeAdmin') {
      return cloneDeep(state).filter((admin) => admin.user.id !== id);
    }
    return state;
  };

  // request to server
  const setBanStatus = async (id: string) => {
    const endpoint = `${APIUrl}SuperAdmin/DisableInstitutionOfEducationAdmin/${id}`;
    const currentToken = await getToken();
    requestSecureData(endpoint, 'PATCH', currentToken, {
      id,
    })
      .then((res: any) => {
        const statusCode = res.statusCode.toString();
        if (statusCode.match(/^[23]\d{2}$/)) {
          setSortedInstitutionOfEducationAdmins(
            setNewInstitutionOfEducationAdminsState(
              sortedInstitutionOfEducationAdmins,
              id,
              'setNewBanStatus'
            )
          );
          // sorted state
          setInstitutionOfEducationAdmins(
            setNewInstitutionOfEducationAdminsState(
              institutionOfEducationAdmins,
              id,
              'setNewBanStatus'
            )
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

  // const removeAdminInstitutionOfEducation = async (id: string) => {
  //   const endpoint = `${APIUrl}SuperAdmin/DeleteInstitutionOfEducationAdmin/${id}`;
  //   const currentToken = await getToken();

  //   requestSecureData(endpoint, 'DELETE', currentToken)
  //     .then((res: any) => {
  //       const statusCode = res.statusCode.toString();
  //       if (statusCode.match(/^[23]\d{2}$/)) {
  //         setSortedInstitutionOfEducationAdmins(
  //           setNewInstitutionOfEducationAdminsState(
  //             sortedInstitutionOfEducationAdmins,
  //             id,
  //             'removeAdmin'
  //           )
  //         ); // sorted state
  //         setInstitutionOfEducationAdmins(
  //           setNewInstitutionOfEducationAdminsState(
  //             institutionOfEducationAdmins,
  //             id,
  //             'removeAdmin'
  //           )
  //         ); // main state

  //         setSuccess(
  //           defineSuccessMessage(true, res.statusCode, res.data.message)
  //         );
  //         setTimeout(() => {
  //           setSuccess(defineSuccessMessage());
  //         }, 3000);
  //       } else {
  //         setError(defineErrorMessage(true, res.statusCode, res.data.message));
  //         setTimeout(() => {
  //           setError(defineErrorMessage());
  //         }, 3000);
  //       }
  //     })
  //     .catch((error) => {
  //       setError(
  //         defineErrorMessage(
  //           true,
  //           error.statusCode,
  //           'Щось пішло не так, спробуйте знову.'
  //         )
  //       );
  //       setTimeout(() => {
  //         setError(defineErrorMessage());
  //       }, 3000);
  //     });
  // };

  const clearInput = () => {
    setInstitutionOfEducationAdmins(institutionOfEducationAdmins);
    textInput.current.value = '';
    setSearchValue('');
    setCurrentKey('');
  };

  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);

    let sorted = cloneDeep(institutionOfEducationAdmins).filter(
      (admin): any => {
        if (value === '') {
          return admin;
        } else if (
          admin.institutionOfEducation.abbreviation
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          admin.user.email
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        ) {
          return admin;
        }
        return null;
      }
    );
    setSortedInstitutionOfEducationAdmins(sorted);
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

    const sortedArr = cloneDeep(sortedInstitutionOfEducationAdmins).sort(
      (a: any, b: any) => {
        let prevV = a[key];
        let nextV = b[key];

        if (key === 'abbreviation') {
          prevV = a.institutionOfEducation[key]
            ? a.institutionOfEducation[key].toUpperCase()
            : '';
          nextV = b.institutionOfEducation[key]
            ? b.institutionOfEducation[key].toUpperCase()
            : '';
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
    setSortedInstitutionOfEducationAdmins(sortedArr);
  };

  useEffect(() => {
    handleSort('isBanned');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const perPage = 2;
  const numberOfPages = Math.ceil(
    institutionOfEducationAdmins.length / perPage
  );
  const totalPages = numberOfPages;
  const [currentPage, setCurrentPage] = useState(1);

  const pages = PaginationPagesCreator(totalPages, currentPage);

  // Get current posts
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  return (
    <div className={styles.superAdminAccount}>
      <h1>Адміністратори закладів освіти</h1>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
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
              className={`${styles.institutionOfEducation} ${
                currentKey === 'abbreviation' && styles.filterActive
                }`}
              onClick={() => handleSort('abbreviation')}
            >
              Заклад освіти <IconArrow />
            </li>
            <li
              data-testid='sortByBanned'
              className={`${styles.ban} ${
                currentKey === 'isBanned' && styles.filterActive
                }`}
              onClick={() => handleSort('isBanned')}
            >
              <Lock containerCN={styles.banContainer} svgCN={styles.banIcon} />{' '}
              <IconArrow />
            </li>
          </ul>
        </div>
        <ul className={styles.adminList}>
          <li className={styles.adminItem}>
            {sortedInstitutionOfEducationAdmins.length ? (
              sortedInstitutionOfEducationAdmins
                .map((admin: IInstitutionOfEducationAdmin) => (
                  <TableItem
                    admin={admin}
                    searchValue={searchValue}
                    key={admin.user.id}
                    setBanStatus={setBanStatus}
                  // removeAdminInstitutionOfEducation={
                  //   removeAdminInstitutionOfEducation
                  // }
                  />
                ))
                .slice(indexOfFirstPost, indexOfLastPost)
            ) : (
              <div className={styles.noneInstitutionOfEducationAdmins}>
                Не знайдено жодного адміністратора
              </div>
            )}
          </li>
        </ul>
        {error.hasError && (
          <div className={styles.flashMessageRight}>
            <FormInputError
              errorType='form'
              errorMessage={error.errorMessage}
            />
          </div>
        )}
        {success.hasSuccess && (
          <div className={styles.flashMessageLeft}>
            <FormInputSuccess successMessage={success.successMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminAccount;
