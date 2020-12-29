import React from 'react';
import styles from './formCloseButton.module.scss';
import { Link } from 'react-router-dom';

const FormCloseButton = () => {
  return (
    <Link role='link' to='/' className={styles.closeButton}>
      <img src='assets/icons/close.svg' alt='close icon' />
    </Link>
  );
};

export default FormCloseButton;
