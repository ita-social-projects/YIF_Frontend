import React from 'react';

import styles from './aside.module.scss';

const Aside = ({ children }: any) => {
  return (
    <aside className={styles.assideMenu}>
      <div className={styles.navContainer}>{children}</div>
    </aside>
  );
};

export default Aside;
