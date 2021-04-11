import React from 'react';
import styles from './sortingPanel.module.scss';
import ThinArrow from '../../../components/common/icons/ThinArrow';

const SortingPanel = () => {
  return (
    <div className={styles.sortingPanel}>
      <div>Сортувати: </div>
      <div className={styles.sortItem}>
        <span>Назва</span>
        <ThinArrow direction={'up'} />
      </div>
      <div className={styles.sortItem}>
        <span>Заблоковані</span>
        <ThinArrow direction={'up'} />
      </div>
    </div>
  );
};

export default SortingPanel;
