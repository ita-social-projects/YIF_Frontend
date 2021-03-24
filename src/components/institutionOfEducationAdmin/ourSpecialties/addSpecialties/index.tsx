import React, { useEffect, useState } from 'react';
import AccordionItem from '../../../accordion/index';
import DirectionsList from './staticDirections';
import cloneDeep from 'lodash.clonedeep';
import styles from './addSpecialties.module.scss';

const AddSpecialties = (props: any) => {
  const [directions, setDirections] = useState(DirectionsList);

  let clonedDirections = cloneDeep(directions);

  clonedDirections.forEach((item: any) => {
    item.specialties.forEach((item: any) => {
      item.checked = false;
    });
  });

  const onClickHandler = (elemId: any, itemId: any) => {
    clonedDirections.find((elem: any) => {
      if (elem.id === elemId) {
        elem.specialties.find((item: any) => {
          if (item.specialtyId === itemId) {
            item.checked = !item.checked;
            return item;
          }
        });
        return elem;
      }
    });
    setDirections(clonedDirections);
    console.log(clonedDirections);
  };

  const renderDirectionsAccordion = () =>
    directions.map((elem, key) => {
      const { code, name, specialties }: any = elem;
      return (
        <AccordionItem
          key={key}
          headerContent={
            <>
              <span className={styles.acc_item__id}>{code}</span>
              <h3 className={styles.acc_item__name}>{name}</h3>
            </>
          }
          headerStyle={styles.acc_item__header}
          bodyStyle={styles.acc_item__body}
          bodyContent={specialties
            .sort((a: any, b: any) => a.specialtyCode - b.specialtyCode)
            .map((item: any) => {
              return (
                <li key={item.specialtyId} className={styles.acc_item__subitem}>
                  <div className={styles.acc_item__subitem_info}>
                    <span>{item.specialtyCode}</span>{' '}
                    <h5>{item.specialtyName}</h5>
                  </div>
                  <button
                    className={`${styles.acc_item__subitem_btn} ${
                      item.checked ? styles.acc_item__subitem_btn_checked : ''
                    }`}
                    onClick={() => onClickHandler(elem.id, item.specialtyId)}
                  >
                    {!item.checked ? 'Додати' : 'Відміна'}
                  </button>
                </li>
              );
            })}
        />
      );
    });

  return (
    <div className={styles.AddSpecialties}>
      <div className={styles.AddSpecialties__inner}>
        <h2 className={styles.AddSpecialties__title}>
          Додайте спеціальності, які є у вашому університеті
        </h2>
        <ul className={styles.AddSpecialties__list}>
          {renderDirectionsAccordion()}
        </ul>
        <button
          className={`${styles.AddSpecialties__button} ${styles.animatedButton}`}
          onClick={props.onChangeBlock}
        >
          Готово
        </button>
      </div>
    </div>
  );
};

export default AddSpecialties;
