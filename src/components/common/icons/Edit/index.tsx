import React from 'react';
import styles from './edit.module.scss';

interface Props {
  handleClick(): void;
}

const Edit: React.FC<Props> = ({ handleClick }) => {
  return (
    <div className={styles.container} onClick={handleClick}>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 22 22'>
        <path d='M19.527 6.168a3.32 3.32 0 10-4.696-4.695l-1.164 1.165 4.695 4.695 1.165-1.165zM17.188 8.507l-9.924 9.925a4.151 4.151 0 01-1.929 1.092l-3.803.951a.829.829 0 01-1.007-1.007l.951-3.803a4.15 4.15 0 011.092-1.929l9.924-9.924 4.696 4.696v-.001z' />
      </svg>
    </div>
  );
};

export default Edit;
