import React from 'react';
import styles from './header.module.scss';
import {NavLink, Link} from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Link to='/' className={styles.logo} data-testid='logo'>
        YIF
      </Link>
      <nav>
        <div className={styles.pages}>
          <Link to='/directions'>Напрями</Link>
          <Link to='/universities'>Університети</Link>
        </div>
        <div className={styles.entry}>
          <Link to='/login' className={styles.animatedButtonTransparent}>
            Вхід
          </Link>
          <Link to='/register' className={styles.animatedButton}>
            Реєстрація
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
