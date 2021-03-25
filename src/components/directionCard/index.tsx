import React from 'react';
import { Link } from 'react-router-dom';
import styles from './directionCard.module.scss';

interface Props {
  code: any;
  name: string;
  specialties: any;
}

const DirectionCard: React.FC<Props> = (props) => {
  let { code, name, specialties } = props;

  const specialtiesList = specialties
    .sort((a: any, b: any) => a.code - b.code)
    .map((item: any) => (
      <li key={item.id} className={styles.card__content__list__subitem}>
        <div className={styles.card__content__list__subitem_info}>
          <span>{item.code}</span>
          <h5>{item.name}</h5>
        </div>
        <Link to={`/specialty/${item.id}`}>Детальніше</Link>
      </li>
    ));

  return (
    <div data-testid='card' id={code} data-id={code} className={styles.card}>
      <h2 className={styles.card__title}>
        {props.code} {name}
      </h2>

      <div className={styles.card__content}>
        <div className={styles.card__content__wrapper}>
          <h3 className={styles.card__content__subtitle}>Спеціальності:</h3>
          <ul className={styles.card__content__list}>{specialtiesList}</ul>
        </div>
      </div>
    </div>
  );
};

export default DirectionCard;
