import React, { Fragment } from 'react';
import style from './userOption.module.scss';
import ImageUploader from '../../../imageUploader';

const UserOption = () => {
  return (
    <Fragment>
      <div className={style.mainstyle}>
        <ImageUploader />
        <p>Меню користувача</p>
      </div>
    </Fragment>
  );
};

export default UserOption;
