import React from 'react';
import Edit from '../../common/icons/Edit';
import Unlock from '../../common/icons/Unlock';
import Lock from '../../common/icons/Lock';
import styles from './universityItem.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  abbreviation: string;
  fullName: string;
  isBlocked: boolean;
  handleBlocking(): void;
  handleEditing(): void;
  IoEid: string;
}

const UniversityItem: React.FC<Props> = ({
  handleEditing,
  handleBlocking,
  isBlocked,
  fullName,
  abbreviation,
  IoEid
}) => {
  let blockIcon;
  if (!isBlocked) {
    blockIcon = <Unlock handleClick={handleBlocking} />;
  }
  // Commented, untill 'isBlocked' parameter will be added to the InstitutionOfEducation/Anonymous endpoint
  // else {
  //   blockIcon = <Lock handleClick={handleBlocking} />;
  // }
  return (
    <div className={styles.container}>
      <div className={styles.abreviation}>{abbreviation}</div>
      <div className={styles.fullName}>{fullName}</div>
      <div className={styles.actionItems}>
        {blockIcon}
        <Link to={{
          pathname: '/superAdminAccount/addInstitutionOfEducationAdmin',
          state: {IoEid: IoEid}
        }}>
          <Edit/>
        </Link>
      </div>
    </div>
  );
};

export default UniversityItem;
