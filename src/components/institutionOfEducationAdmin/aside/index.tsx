import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import styles from './aside.module.scss';

function Aside() {
  const { path } = useRouteMatch();
  return (
    <aside className={styles.assideMenu}>
      <nav>
        <Link
          className={styles.underlineAnimation}
          to={`${path}/institutionofEducationInfo`}
        >
          Заклад освіти
        </Link>
        <Link
          className={styles.underlineAnimation}
          to={`${path}/ourSpecialties`}
        >
          Спеціальності
        </Link>
        <Link className={styles.underlineAnimation} to={`${path}/moderators`}>
          Модератори
        </Link>
      </nav>
    </aside>
  );
}

export default Aside;
