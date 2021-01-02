import React from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/tokenValidator';

const Header: React.FC = () => {
  const { token, isExpired } = useAuth();
  console.log(token);
  console.log(isExpired);

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
