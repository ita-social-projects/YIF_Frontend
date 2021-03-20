import React, { useState } from 'react';

// import { Link } from 'react-router-dom';
import styles from './accordion.module.scss';

// interface Props {
//   id: string;
//   code: string;
//   name: string;
//   specialties: Array<{
//     specialtyId: string;
//     specialtyName: string;
//     specialtyCode: string;
//   }>;
// }

const AccordionItem = (props: any) => {
  const [opened, setOpened] = useState(false);
  const handlerClick = () => setOpened(!opened);
  const { header, headerStyle, body, bodyStyle } = props;

  return (
    <li className={`${styles.acc_item} ${opened && styles.acc_item__opened}`}>
      <div
        className={`${styles.acc_item__line} ${headerStyle}`}
        onClick={handlerClick}
      >
        <div className={styles.acc_item__info}>{header}</div>

        <div className={styles.acc_item__icon}>{opened ? '-' : '+'}</div>
      </div>

      <div className={styles.acc_item__inner}>
        <ul className={`${styles.acc_item__content} ${bodyStyle}`}>{body}</ul>
      </div>
    </li>
  );
};

export default AccordionItem;
