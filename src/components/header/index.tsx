import React, { useState, useEffect, useRef } from 'react';
import styles from './header.module.scss';
import { Link } from 'react-router-dom';
import { store } from '../../store/store';
import { removeUserReducer } from '../../store/reducers/setUserReducer';
import { useAuth } from '../../services/tokenValidator';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/reducers/setUserReducer';
import useRole from '../../services/useRole';
const { pathToRedirect } = useRole();

const Header: React.FC = () => {
  const { token, removeToken } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { email, photo } = useSelector(userSelector);

  const userName = email.substr(0, email.indexOf('@'));
  const avatar = photo ? photo : '/assets/icons/avatar.jpg';

  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsDropdownOpen(() => !isDropdownOpen);
  };

  const logout = () => {
    setIsDropdownOpen(() => !isDropdownOpen);
    removeToken();
    store.dispatch(removeUserReducer());
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

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

  const dropdownContent = isDropdownOpen ? (
    <>
      <div className={`${styles.user} ${styles.border}`}>
        <span className={`${styles.userName}`}>{userName}</span>
        <img
          src={avatar}
          alt='avatar'
          className={styles.avatar}
          onClick={handleClick}
        />
        <span className={styles.arrow} onClick={handleClick}>
          {dropdownArrowUp}
        </span>
      </div>
      <div className={styles.dropdownContent}>
        <Link id='loginButtonHeaderUnauth' to={pathToRedirect()}>
          Особистий&nbsp;кабінет
        </Link>
        <button id='logoutButtonHeaderUnauth' onClick={logout}>
          Вийти
        </button>
      </div>
    </>
  ) : (
    <div className={styles.user}>
      <span className={`${styles.userName}`}>{userName}</span>
      <img
        src={avatar}
        alt='avatar'
        className={styles.avatar}
        onClick={handleClick}
      />
      <span className={styles.arrow} onClick={handleClick}>
        {dropdownArrowDown}
      </span>
    </div>
  );

  const entryContent = token ? (
    <>
      <div className={styles.dropdown}>{dropdownContent}</div>
    </>
  ) : (
    <>
      <Link
        id='loginButtonHeaderAuth'
        to='/login'
        className={styles.animatedButtonTransparent}
      >
        Вхід
      </Link>
      <Link
        id='logoutButtonHeaderAuth'
        to='/register'
        className={styles.animatedButton}
      >
        Реєстрація
      </Link>
    </>
  );

  return (
    <header id='header'>
      <Link to='/' className={styles.logo} data-testid='logo'>
        <img src='/logo.svg' alt='YITF Logo' />
      </Link>
      <nav>
        <div className={styles.pages}>
          <Link
            id='directionsLink'
            to='/directions'
            className={styles.underlineAnimation}
          >
            Спеціальності
          </Link>
          <Link
            id='institutionsOfEducationLink'
            to='/institutionsOfEducation'
            className={styles.underlineAnimation}
          >
            Заклади освіти
          </Link>
        </div>
        <div className={styles.entry} ref={ref}>
          {entryContent}
        </div>
      </nav>
    </header>
  );
};

export default Header;
