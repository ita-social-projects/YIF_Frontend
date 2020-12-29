import React from 'react';
import styles from './header.module.scss';
import {NavLink, Link, BrowserRouter} from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <Link to='/' className={styles.logo} data-testid='logo'>
        YIF
      </Link>
      <nav>
        <div className={styles.pages}>
          <NavLink to='/directions'>Напрями</NavLink>
          <NavLink to='/universities'>Університети</NavLink>
        </div>
        <div className={styles.entry}>
          <Link to='/login' className={styles.button}>
            Вхід
          </Link>
          <NavLink to='/register' className={styles.button}>
            Реєстрація
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
