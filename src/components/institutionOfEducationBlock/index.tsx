import React from 'react';
import styles from './institutionOfEducationBlock.module.scss';

interface Props {
  name: string;
  abbreviation: string;
  site: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  imagePath: string;
}

const institutionOfEducationBlock: React.FC<Props> = ({
  name,
  abbreviation,
  site,
  address,
  phone,
  email,
  description,
  imagePath,
}: any) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.abbreviation}>{abbreviation}</h2>
      <div className={styles.mainInfo}>
        <div className={styles.textInfo}>
          <h1 className={styles.fullName}>{name}</h1>
          <p>
            <span>Сайт:</span>
            <a href={site} target='_blank' rel='noopener noreferrer'>
              {site}
            </a>
          </p>
          <p>
            <span>Email:</span>
            <a
              href={`mailto:${email}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {email}
            </a>
          </p>
          <p>
            <span>Телефон:</span>
            <a href={`tel:${phone}`}>{phone}</a>
          </p>
          <p>
            <span>Адреса:</span>
            {address}
          </p>
        </div>
        <img src={imagePath} alt={name} />
      </div>
      <p className={styles.description}>
        <span>Опис:</span>
        {description}
      </p>
    </div>
  );
};

export default institutionOfEducationBlock;
