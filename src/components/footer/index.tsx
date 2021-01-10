import React from 'react';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../services/tokenValidator';

interface Props {
  background?: string;
}

const Footer: React.FC<Props> = (props) => {
  const { user } = useAuth();

  return (
    <footer>
      <div className={styles.footer} style={{ background: props.background }}>
        <section className={styles.mainElements}>
          <article>
            {!user && (
              <>
                <Link to='/login'>
                  <button className={styles.animatedButtonTransparent}>
                    Вхід
                  </button>
                </Link>
                <Link to='/register'>
                  <button className={styles.animatedButton}>Реєстрація</button>
                </Link>
              </>
            )}
            <p>Рівне, вул. Словацького, 55</p>
            <p>
              <Link to='mailto:#' className={styles.underlineAnimation}>
                exampleYourITFuture@example.com
              </Link>
            </p>
          </article>
          <article>
            <Link to='/' className={styles.logo} data-testid='logo'>
              YIF
            </Link>
          </article>
          <article>
            <p>
              <Link
                className={`${styles.linkstyle} ${styles.underlineAnimation}`}
                to='/directions'
              >
                Напрями
              </Link>
            </p>
            <p>
              <Link
                className={`${styles.linkstyle} ${styles.underlineAnimation}`}
                to='/universities'
              >
                Університети
              </Link>
            </p>
          </article>
        </section>
        <div className={styles.copyright}>
          <p>&#169; 2020-2021 SoftServe IT Academy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;