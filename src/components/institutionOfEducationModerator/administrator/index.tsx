import React from 'react';
import styles from './administrator.module.scss';

interface Props {
  email: string;
}

const Administrator: React.FC<Props> = ({ email }) => {

  return (
    <div className={styles.container}>
      <span className={styles.email}>{email}</span>
    </div>
  );
};

export default Administrator;
