import React from 'react';
import styles from './delete.module.scss';

interface Props {
  handleClick?: () => void;
}
const Delete: React.FC<Props> = ({ handleClick }) => {
  return (
    <div className={styles.container} onClick={handleClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 22 27'
        className={styles.delete}
      >
        <path d='M9 .469c-.836 0-1.656.164-2.25.75-.594.586-.781 1.418-.781 2.281H2c-.55 0-1 .45-1 1H0v2h22v-2h-1c0-.55-.45-1-1-1h-3.969c0-.863-.187-1.695-.781-2.281-.594-.586-1.414-.75-2.25-.75H9zM9 2.53h4c.547 0 .719.13.781.188.063.058.188.222.188.781H8.03c0-.559.125-.723.188-.781.062-.059.234-.188.781-.188zM2 7.5v16c0 1.652 1.348 3 3 3h12c1.652 0 3-1.348 3-3v-16H2zm4 3h2v12H6v-12zm4 0h2v12h-2v-12zm4 0h2v12h-2v-12z' />
      </svg>
    </div>
  );
};

export default Delete;
