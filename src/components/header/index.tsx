import React from 'react';
import styles from './header.module.scss';
import { NavLink, Link } from 'react-router-dom';

const Header: React.FC = () => {
  const handleClick = () => {};

  return (
    <header>
      <a href='https://www.softserveinc.com/en-us' target='_blank'>
        <img
          src='https://scontent.fdnk1-2.fna.fbcdn.net/v/t1.0-9/84388180_10163108035310038_42562361399181312_n.png?_nc_cat=111&ccb=2&_nc_sid=09cbfe&_nc_ohc=5AyeiaZU6ZoAX9ZGaza&_nc_ht=scontent.fdnk1-2.fna&oh=f4772a8be3d6e8a4c49c38c7cf1cbff1&oe=5FEF13CF'
          alt='logo'
          className={styles.logo}
          onClick={handleClick}
        />
      </a>
      <nav>
        <ul>
          <li>
            <NavLink to='/directions'>Directions</NavLink>
          </li>
          <li>
            <NavLink to='/universities'>Universities</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Link to='/login'>Log In</Link>
        <Link to='/register'>Register</Link>
      </div>
    </header>
  );
};

export default Header;
