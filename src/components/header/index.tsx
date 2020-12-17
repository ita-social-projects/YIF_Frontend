import React from 'react';
import styles from './header.module.scss';
import { NavLink, Link } from 'react-router-dom';

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
          <button className={styles.button}>
            <Link to='/login'>Вхід</Link>
          </button>

          <button className={styles.button}>
            <Link to='/register'>Реєстрація</Link>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
