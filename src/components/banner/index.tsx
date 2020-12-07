import React from 'react';
import styles from './banner.module.scss';

const Banner: React.FC = () => {
  return (
    <div className={styles.banner}>
      <h1>Your IT Future</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <button className={styles.callToAction}>Call to action</button>
    </div>
  );
};

export default Banner;
