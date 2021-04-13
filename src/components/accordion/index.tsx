import React, { useState } from 'react';
import styles from './accordion.module.scss';

interface Props {
  headerContent: object;
  headerStyle: string;
  bodyContent: object;
  bodyStyle: string;
}

const AccordionItem = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const handlerClick = () => setOpened(!opened);
  const { headerContent, headerStyle, bodyContent, bodyStyle } = props;

  return (
    <li className={`${styles.acc_item} ${opened && styles.acc_item__opened}`}>
      <div
        className={`${styles.acc_item__line} ${headerStyle}`}
        onClick={handlerClick}
      >
        <div className={styles.acc_item__info}>{headerContent}</div>

        <div className={styles.acc_item__icon}>
          {opened ? '\u2212' : '\u002B'}
        </div>
      </div>

      <div className={styles.acc_item__inner}>
        <ul className={`${styles.acc_item__content} ${bodyStyle}`}>
          {bodyContent}
        </ul>
      </div>
    </li>
  );
};

export default AccordionItem;
