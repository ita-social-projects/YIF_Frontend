import React from 'react';
import styles from './moderator.module.scss';
import Lock from '../../common/icons/Lock/index';
import Unlock from '../../common/icons/Unlock/index';
import Delete from '../../common/icons/Delete/index';

interface Props {
  email: string;
  isBlocked: boolean;
  deleteHandler: () => void;
  blockHandler: () => void;
}

const Moderator: React.FC<Props> = ({
  email,
  isBlocked,
  deleteHandler,
  blockHandler,
}) => {
  let blockIcon;
  if (isBlocked) {
    blockIcon = <Lock handleClick={blockHandler} />;
  } else {
    blockIcon = <Unlock handleClick={blockHandler} />;
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
