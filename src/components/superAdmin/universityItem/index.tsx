import React from 'react';
import Edit from '../../common/icons/Edit';
import Unlock from '../../common/icons/Unlock';
import Lock from '../../common/icons/Lock';
import styles from './universityItem.module.scss';

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
  if (isBlocked) {
    blockIcon = <Lock handleClick={handleBlocking} />;
  } else {
    blockIcon = <Unlock handleClick={handleBlocking} />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.abreviation}>{abbreviation}</div>
      <div className={styles.fullName}>{fullName}</div>
      <div className={styles.actionItems}>
        {blockIcon}
        <Edit handleClick={handleEditing} />
      </div>
    </div>
  );
};

export default UniversityItem;
