import React from 'react';
import styles from './formCloseButton.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  styles?: {
    [key: string]: string;
  };
}

const FormCloseButton: React.FC<Props> = (props) => {
  return (
    <Link
      role='link'
      to='/'
      className={styles.closeButton}
      style={props.styles}
    >
      <img src='assets/icons/close.svg' alt='close icon' />
    </Link>
  );
};

// const FormCloseButton = () => {
//   return (
//     <Link role='link' to='/' className={styles.closeButton}>
//       <img src='assets/icons/close.svg' alt='close icon' />
//     </Link>
//   );
// };

export default FormCloseButton;
