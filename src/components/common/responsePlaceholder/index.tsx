import React from 'react';
import style from './responsePlaceholder.module.scss';

interface Props {
  errorMessage: string;
}

const ResponsePlaceholder: React.FC<Props> = (props) => {
  const { errorMessage } = props;
  return (
    <div className={style.placeholder}>
      {' '}
      <p>{errorMessage}</p>
      <div className={style.placeholder__imgContainer}>
        <img src='assets/images/userCabinetUniversities.svg' />
      </div>
    </div>
  );
};

export default ResponsePlaceholder;
