import React, { useState } from "react";

import { Link } from "react-router-dom";
import styles from "./accordion.module.scss";

interface Props {
  id: string,
  name: string,
  specialties: Array<{ id: string, name: string, directionName: string }>
}

const AccordionItem = (props: Props) => {
  const { id, name, specialties } = props;

  const [opened, setOpened] = useState(false);
  const handlerClick = () => setOpened(!opened);

  const filteredSpecialties = specialties.filter(specialty => specialty.directionName === name)

  return (
    <li
      className={`${styles.acc_item} ${
        opened ? `${styles.acc_item__opened}` : ""
      }`}
    >
      <div className={styles.acc_item__line} onClick={handlerClick}>
        <div className={styles.acc_item__info}>
          <span className={styles.acc_item__id}>{id.slice(0,2)}</span>
          <h3 className={styles.acc_item__name}>{name}</h3>
        </div>

        <div className={styles.acc_item__icon}>{opened ? "-" : "+"}</div>
      </div>
      <div className={styles.acc_item__inner}>
        <ul className={styles.acc_item__content}>
          {filteredSpecialties.map((item) => (
            <li key={item.id} className={styles.acc_item__subitem}>
              <div className={styles.acc_item__subitem_info}>
                <span>{item.id.slice(0,3)}</span> <h5>{item.name}</h5>
              </div>
              <Link to={`/specialty/${item.id}`}>Детальніше</Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};

export default AccordionItem;
