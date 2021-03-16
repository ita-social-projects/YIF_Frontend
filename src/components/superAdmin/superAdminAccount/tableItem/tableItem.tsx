import React from 'react';
import styles from '../superAdminAccount.module.scss';
import ReactParser from 'html-react-parser';
import { IUniversityAdmin } from '../superAdminAccount';

import { ReactComponent as Avatar } from '../icons/avatar.svg';
import { ReactComponent as IconLock } from '../icons/iconLock.svg';
import { ReactComponent as IconRemove } from '../icons/iconRemove.svg';

interface Props {
  admin: IUniversityAdmin;
  searchValue: string;
  setBanStatus: Function;
  removeAdminUniversiti: Function;
}

const TableItem: React.FC<Props> = (props) => {
  const { admin, searchValue, setBanStatus, removeAdminUniversiti } = props;

  return (
    <ul>
      <li className={styles.adminLogo}>
        {admin.user.photo ? (
          <img src={admin.user.photo} alt='admin avatar' />
        ) : (
          <Avatar />
        )}
      </li>
      <li className={styles.adminName}>
        {admin.user.userName ? admin.user.userName : 'NoName'}
      </li>
      <li className={styles.adminEmail}>
        {ReactParser(
          admin.user.email.replace(
            new RegExp(searchValue, 'gi'),
            (match) => `<mark>${match}</mark>`
          )
        )}
      </li>
      <li className={styles.adminUniversity}>
        <span className={styles.abbreviationUniversity}>
          {ReactParser(
            admin.university.abbreviation.replace(
              new RegExp(searchValue, 'gi'),
              (match) => `<mark>${match}</mark>`
            )
          )}
        </span>
        <div className={styles.fullNameUniversity}>{admin.university.name}</div>
      </li>
      <li
        data-testid='setBunStatus'
        className={`${styles.adminBan} ${admin.isBanned && styles.banned}`}
        onClick={() => setBanStatus(admin.id)}
      >
        <IconLock />
      </li>
      <li
        data-testid='removeAdmin'
        className={styles.adminRemove}
        onClick={() => removeAdminUniversiti(admin.id)}
      >
        <IconRemove />
      </li>
    </ul>
  );
};

export default TableItem;
