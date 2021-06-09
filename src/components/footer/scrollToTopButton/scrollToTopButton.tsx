import React, { useEffect, useCallback } from 'react';
import styles from './scrollToTopButton.module.scss';

const ScrollToTopButton = () => {
  const [visible, setVisible] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setVisible(currentScrollPos > 200);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible, handleScroll]);

  return (
    <button
      onClick={scrollToTop}
      onScroll={handleScroll}
      className={styles.button}
      style={{ bottom: visible ? '2rem' : '-4rem' }}
    >
      <span className={styles.arrow}></span>
    </button>
  );
};

export default ScrollToTopButton;
