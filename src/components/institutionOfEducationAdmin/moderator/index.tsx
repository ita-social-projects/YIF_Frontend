import React, { useState } from 'react';
import styles from './moderator.module.scss';
import Lock from '../../common/icons/Lock/index';
import Unlock from '../../common/icons/Unlock/index';
import Delete from '../../common/icons/Delete/index';

interface Props {
  email: string;
  isLocked: boolean;
  deleteHandler: () => void;
  lockHandler: () => void;
}

const Moderator: React.FC<Props> = ({
  email,
  isLocked,
  deleteHandler,
  lockHandler,
}) => {
  let blockIcon;
  if (isLocked) {
    blockIcon = <Lock handleClick={lockHandler} />;
  } else {
    blockIcon = <Unlock handleClick={lockHandler} />;
  }

  return (
    <div className={styles.container}>
      <span className={styles.email}>{email}</span>
      <div className={styles.actionItems}>
        {blockIcon}
        <Delete handleClick={deleteHandler} />
      </div>
    </div>
  );
};

export default Moderator;
