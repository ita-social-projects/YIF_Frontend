import React from 'react';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/tokenValidator';
import ScrollToTopButton from './scrollToTopButton/scrollToTopButton';

const Footer: React.FC = () => {
  const { token } = useAuth();

  return (
    <footer id='footer'>
      <div className={styles.footer}>
        <section className={styles.mainElements}>
          <article>
            {!token && (
              <>
                <Link id='loginButtonFooter' to='/login'>
                  <button className={styles.animatedButtonTransparent}>
                    Вхід
                  </button>
                </Link>
                <Link id='registerButtonFooter' to='/register'>
                  <button className={styles.animatedButton}>Реєстрація</button>
                </Link>
              </>
            )}
            <p>Рівне, вул. Словацького, 4-6</p>
            <p>
              <Link to='mailto:#' className={styles.underlineAnimation}>
                support@youritfuture.com
              </Link>
            </p>
          </article>
          <article>
            <Link to='/' className={styles.logo} data-testid='logo'>
              <img src='/logo.svg' alt='YITF Logo' />
            </Link>
          </article>
          <article>
            <p>
              <Link
                className={`${styles.linkstyle} ${styles.underlineAnimation}`}
                to='/directions'
                id='directionsLinkFooter'
              >
                Спеціальності
              </Link>
            </p>
            <p>
              <Link
                className={`${styles.linkstyle} ${styles.underlineAnimation}`}
                to='/institutionsOfEducation'
                id='universitiesLinkFooter'
              >
                Заклади освіти
              </Link>
            </p>
          </article>
        </section>
        <div className={styles.copyright}>
          <p>&#169; 2020-2021 SoftServe IT Academy</p>
        </div>
      </div>
      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;

