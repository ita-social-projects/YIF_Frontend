import React,{Fragment} from 'react'
import styles from './footer.module.scss';

const Footer =()=>{
    return(
        <Fragment>
            <div className={styles.footer}>
                <section className={styles.mainElements}>
                    <article>
                        <button>Вхід</button>
                        <button>Реєстрація</button>
                        <p>Рівне, вул. Словацького, 55</p>
                        <p><a href='mailto:#'>exampleYourITFuture@example.com</a></p>
                    </article>
                    <article>
                        <a href='/'>
                            <h2>YIF</h2>
                        </a>
                    </article>
                    <article>
                        <p><a href='#'>Напрями</a></p>
                        <p><a href='#'>Університети</a></p>
                    </article>
                </section>
                <div className={styles.copyright}>
                    <p>&#169; 2020-2021 SoftServe IT Academy</p>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer;
