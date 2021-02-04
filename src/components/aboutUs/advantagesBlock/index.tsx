import React from 'react';
import styles from '../aboutUs.module.scss';

interface Props {
  url: string;
  title: string;
}

const AdvantagesBlock: React.FC<Props> = (props) => {
  const { url, title } = props;

  return (
    <div
      id='aboutUs__advantages__block'
      className={styles.aboutUs__advantages__block}
    >
      <h3 className={styles.aboutUs__advantages__title}>{title}</h3>
      <div className={styles.aboutUs__advantages__imgBlock}>
        <img
          className={styles.aboutUs__advantages__img}
          src={url}
          alt={title}
        />
      </div>
    </div>
  );
};

export default AdvantagesBlock;
