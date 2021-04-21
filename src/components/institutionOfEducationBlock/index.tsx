import React from 'react';
import styles from './institutionOfEducationBlock.module.scss';

interface Props {
  id: string;
  name: string;
  abbreviation: string;
  site: string;
  address: string;
  phone: string;
  email: string;
  description: string;
}

const institutionOfEducationBlock: React.FC<Props> = ({
  id,
  name,
  abbreviation,
  site,
  address,
  phone,
  email,
  description,
}: any) => {
  return (
    <>
      <h2 className={styles.infoContainer__abbr}>{abbreviation}</h2>
      <div className={styles.infoContainer__mainInfo}>
        <div className={styles.infoContainer__textInfo}>
          <h1 className={styles.infoContainer__textInfo__fullName}>{name}</h1>
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
        <img
          src='https://nuwm.edu.ua/images/content/admin/nuwmvsh.jpg'
          alt='НУВГП'
        />
      </div>
      <p className={styles.description}>
        <span>Опис:</span>
        {description}
      </p>
    </>
  );
};

export default institutionOfEducationBlock;