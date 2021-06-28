import React from 'react';
import Edit from '../../common/icons/Edit';
import Unlock from '../../common/icons/Unlock';
import Lock from '../../common/icons/Lock';
import styles from './universityItem.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  abbreviation: string;
  fullName: string;
  IoEid: string
}

const UniversityItem: React.FC<Props> = ({
  fullName, abbreviation, IoEid
}) => {
  let blockIcon;
  // if (isBlocked) {
  //   blockIcon = <Lock handleClick={()=>{}} />;
  // } else {
  //   blockIcon = <Unlock handleClick={()=>{}} />;
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
      }}><Edit/></Link>
      </div>
    </div>
  );
};

export default UniversityItem;
