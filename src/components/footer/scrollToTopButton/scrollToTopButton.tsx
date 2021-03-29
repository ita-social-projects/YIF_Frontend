import React from 'react';
import styles from './scrollToTopButton.module.scss';

const ScrollToTopButton = () => {
  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  const y: number = window.scrollY;
  console.log(`yCenterOfWindow`, y);

  return (
    <>
      {/* {deviceWindow.clientHeight > 20 ? ( */}
      <button className={styles.button} onClick={scrollToTop}>
        {y}
      </button>
      {/* ) : null} */}
    </>
  );
};

export default ScrollToTopButton;
