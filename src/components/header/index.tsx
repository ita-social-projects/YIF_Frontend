import React, { useState } from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/tokenValidator';

const Header: React.FC = () => {
  const { user, removeToken } = useAuth();
  const userEmail = user?.email.substr(0, user?.email.indexOf('@'));

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dropdownArrowDown = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14px'
      height='10px'
      viewBox='0 0 292.362 292.362'
    >
      <g>
        <path
          d='M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
   C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
   s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z'
        />
      </g>
    </svg>
  );

  const dropdownArrowUp = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14px'
      height='10px'
      viewBox='0 0 123.959 123.959'
    >
      <g>
        <path
          d='M66.18,29.742c-2.301-2.3-6.101-2.3-8.401,0l-56,56c-3.8,3.801-1.1,10.2,4.2,10.2h112c5.3,0,8-6.399,4.2-10.2L66.18,29.742
		z'
        />
      </g>
    </svg>
  );

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setDropdownOpen(() => !isDropdownOpen);
  };

  const logout = () => {
    setDropdownOpen(() => !isDropdownOpen);
    removeToken();
  };

  const dropdownContent = isDropdownOpen ? (
    <>
      <span
        className={`${styles.userName} ${styles.underlineAnimation}`}
        onClick={handleClick}
      >
        {userEmail} {dropdownArrowUp}
      </span>
      <div className={styles.dropdownContent}>
        <Link to='/cabinet'>Особистий кабінет</Link>
        <button onClick={logout}>Вийти</button>
      </div>
    </>
  ) : (
    <span
      className={`${styles.userName} ${styles.underlineAnimation}`}
      onClick={handleClick}
    >
      {userEmail} {dropdownArrowDown}
    </span>
  );

  const entryContent = user ? (
    <>
      <img
        src='assets/icons/avatar.jpg'
        alt='avatar'
        className={styles.avatar}
      />
      <div className={styles.dropdown}>{dropdownContent}</div>
    </>
  ) : (
    <>
      <Link to='/login' className={styles.animatedButtonTransparent}>
        Вхід
      </Link>
      <Link to='/register' className={styles.animatedButton}>
        Реєстрація
      </Link>
    </>
  );

  return (
    <header>
      <Link to='/' className={styles.logo} data-testid='logo'>
        YIF
      </Link>
      <nav>
        <div className={styles.pages}>
          <Link to='/directions' className={styles.underlineAnimation}>
            Напрями
          </Link>
          <Link to='/universities' className={styles.underlineAnimation}>
            Університети
          </Link>
        </div>
        <div className={styles.entry}>{entryContent}</div>
      </nav>
    </header>
  );
};

export default Header;
