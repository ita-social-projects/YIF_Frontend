import React, { Fragment } from 'react';
import style from './univListOption.module.scss';
import { UniversityCard } from '../../../index';

const UnivListOption = () => {
  return (
    <Fragment>
      <section className={style.universityListSection}>
        <div className={style.container}>
          <UniversityCard liked={true} />
          <UniversityCard liked={true} />
          <UniversityCard liked={true} />
        </div>
      </section>
    </Fragment>
  );
};

export default UnivListOption;
