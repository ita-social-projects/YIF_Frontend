import React from 'react';
import styles from './adminPanel.module.scss';
import { Link } from 'react-router-dom';

const avatar = 'assets/icons/avatar.jpg';

const AdminPanel: React.FC = () => {
  return (
    <div className={styles.adminPanel}>
      <div className={styles.containerAvatar}>
        <img src={avatar} alt='avatar' />
      </div>
      <div className={styles.superAdminName}>Супер Адміністратор</div>
      <ul className={styles.navList}>
        <li>
          Адміністратори
          <ul>
            <li className={styles.hasLink}>
              <Link
                className={styles.underlineAnimation}
                to='/SuperAdminAccount'
              >
                Закладів освіти
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.hasLink}>
          <Link className={styles.underlineAnimation} to='/univList'>
            Університети
          </Link>
        </li>
        <li className={styles.hasLink}>
          <Link className={styles.underlineAnimation} to='#'>
            Коледжі
          </Link>
        </li>
        <li className={styles.hasLink}>
          <Link className={styles.underlineAnimation} to='#'>
            Школи
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminPanel;
