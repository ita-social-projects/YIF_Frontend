import React from 'react';
import styles from '../superAdminAccount.module.scss';
import ReactParser from 'html-react-parser';
import { IInstitutionOfEducationAdmin } from '../superAdminAccount';
import { Link } from 'react-router-dom';
import Lock from '../../../common/icons/Lock/index';
import Unlock from '../../../common/icons/Unlock/index';
import Edit from '../../../common/icons/Edit/index';

interface Props {
  admin: IInstitutionOfEducationAdmin;
  searchValue: string;
  setBanStatus: Function;
  //  removeAdminInstitutionOfEducation: Function;
}

const TableItem: React.FC<Props> = (props) => {
  const {
    admin,
    searchValue,
    setBanStatus,
    //    removeAdminInstitutionOfEducation,
  } = props;
  // const { path } = useRouteMatch();
  return (
    <ul>
      <li className={styles.adminEmail}>
        {ReactParser(
          admin.user.email.replace(
            new RegExp(searchValue, 'gi'),
            (match) => `<mark>${match}</mark>`
          )
        )}
      </li>
      <li className={styles.adminInstitutionOfEducation}>
        <span className={styles.abbreviationInstitutionOfEducation}>
          {ReactParser(
            admin.institutionOfEducation.abbreviation.replace(
              new RegExp(searchValue, 'gi'),
              (match) => `<mark>${match}</mark>`
            )
          )}
        </span>
        <div className={styles.fullNameInstitutionOfEducation}>
          {admin.institutionOfEducation.name}
        </div>
      </li>
      <div className={styles.actionItem}>
        <li
          data-testid='setBunStatus'
          className={`${styles.adminBan} ${admin.isBanned && styles.banned}`}
          onClick={() => setBanStatus(admin.id)}
        >
          {admin.isBanned ? <Lock /> : <Unlock />}
        </li>
        <li data-testid='removeAdmin' className={styles.adminRemove}>
            <Edit />
        </li>
      </div>
    </ul>
  );
};

export default TableItem;
