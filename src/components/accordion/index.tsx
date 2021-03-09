import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import styles from './accordion.module.scss';

interface Props {
  id: string;
  code: string;
  name: string;
  specialties: Array<{
    specialtyId: string;
    specialtyName: string;
    specialtyCode: string;
  }>;
}

const AccordionItem = (props: Props) => {
  const { id, code, name, specialties } = props;

  const [opened, setOpened] = useState(false);
  const handlerClick = () => setOpened(!opened);

  // const filteredSpecialties = specialties.filter(specialty => specialty.directionName === name)

  return (
    <li
      className={`${styles.acc_item} ${
        opened ? `${styles.acc_item__opened}` : ''
      }`}
    >
      <div className={styles.acc_item__line} onClick={handlerClick}>
        <div className={styles.acc_item__info}>
          <span className={styles.acc_item__id}>{code}</span>
          <h3 className={styles.acc_item__name}>{name}</h3>
        </div>

        <div className={styles.acc_item__icon}>{opened ? '-' : '+'}</div>
      </div>
      <div className={styles.acc_item__inner}>
        <ul className={styles.acc_item__content}>
          {specialties
            .sort((a: any, b: any) => a.specialtyCode - b.specialtyCode)
            .map((item) => (
              <li key={item.specialtyId} className={styles.acc_item__subitem}>
                <div className={styles.acc_item__subitem_info}>
                  <span>{item.specialtyCode}</span>{' '}
                  <h5>{item.specialtyName}</h5>
                </div>
                <Link to={`/specialty/${item.specialtyId}`}>Детальніше</Link>
              </li>
            ))}
        </ul>
      </div>
    </li>
  );
};

export default AccordionItem;
