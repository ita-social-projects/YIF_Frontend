import React from 'react'
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

const Footer =()=>{
    return(
        <footer>
            <div className={styles.footer}>
                <section className={styles.mainElements}>
                    <article>
                        <Link to='/login'>
                            <button>Вхід</button>
                        </Link>
                        <Link to='/register'>
                            <button>Реєстрація</button>
                        </Link>
                        <p>Рівне, вул. Словацького, 55</p>
                        <p><Link to='mailto:#'>exampleYourITFuture@example.com</Link></p>
                    </article>
                    <article>
                        <Link to='/' className={styles.logo} data-testid='logo'>
                            YIF
                        </Link>
                    </article>
                    <article>
                        <p><Link className={styles.linkstyle} to='/directions'>Напрями</Link></p>
                        <p><Link className={styles.linkstyle} to='/universities'>Університети</Link></p>
                    </article>
                </section>
                <div className={styles.copyright}>
                    <p>&#169; 2020-2021 SoftServe IT Academy</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
