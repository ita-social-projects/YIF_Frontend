import React from 'react';
import styles from './home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.header}>Header</div>
      <div className={styles.banner}>Banner</div>
      <div className={styles.filter}>Filter</div>
      <div className={styles.about}>About</div>
      <div className={styles.cta}>Call to action</div>
      <div className={styles.partners}>Partners</div>
      <div className={styles.footer}>Footer</div>
    </>
  );
}
