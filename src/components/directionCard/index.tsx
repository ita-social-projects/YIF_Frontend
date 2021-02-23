import React from 'react';
import { Link } from 'react-router-dom';
import styles from './directionCard.module.scss';

interface Props {
  id: any;
  name: string;
  description: string;
  specialties: any;
}

const DirectionCard: React.FC<Props> = (props) => {
  let { id, name, description, specialties } = props;

  const result = specialties.map((item: any, idx: number) => (
    <li key={idx} className={styles.card__content__list__subitem}>
      <div className={styles.card__content__list__subitem_info}>
        <span>{item.id}</span>
        <h5>{item.name}</h5>
      </div>
      <Link to={`/specialty/${item.id}`}>Детальніше</Link>
    </li>
  ));

  return (
    <div
      data-testid='card'
      id='directionCard'
      data-id={id}
      className={styles.card}
    >
      <h2 className={styles.card__title}>
        {id} {name}
      </h2>

      <div className={styles.card__content}>
        <div className={styles.card__content__wrapper}>
          <p className={styles.card__content__desc}>{description}</p>
          <h3 className={styles.card__content__subtitle}>Спеціальності:</h3>
          <ul className={styles.card__content__list}>{result}</ul>
        </div>
      </div>
    </div>
  );
};

export default DirectionCard;
