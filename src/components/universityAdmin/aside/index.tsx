import React from 'react';
import { Link } from 'react-router-dom';
import styles from './aside.module.scss';

function Aside() {
  return (
    <aside className={styles.assideMenu}>
      <nav>
        <Link className={styles.underlineAnimation} to='/universityInfo'>
          Університет
        </Link>
        <Link className={styles.underlineAnimation} to='/ourSpecialties'>
          Наші спеціальності
        </Link>
        <Link className={styles.underlineAnimation} to='/moderators'>
          Модератори
        </Link>
      </nav>
    </aside>
  );
}

export default Aside;
