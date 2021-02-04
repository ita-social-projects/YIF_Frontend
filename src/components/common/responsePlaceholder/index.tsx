import React from 'react';
import style from './responsePlaceholder.module.scss';

interface Props {
  errorMessage: string;
}

const ResponsePlaceholder: React.FC<Props> = (props) => {
  const { errorMessage } = props;
  return (
    <div className={style.placeholder} id='placeholder'>
      {' '}
      <h3 data-testid='placeholder'>{errorMessage}</h3>
      <div className={style.placeholder__imgContainer}>
        <img src='assets/images/userCabinetUniversities.svg' alt='student' />
      </div>
    </div>
  );
};

export default ResponsePlaceholder;
