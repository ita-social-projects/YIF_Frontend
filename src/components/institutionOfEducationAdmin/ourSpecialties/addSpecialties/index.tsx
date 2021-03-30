import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundry from '../../../../errorBoundry';
import ResponsePlaceholder from '../../../../components/common/responsePlaceholder';
import Accordion from '../../../accordion/index';
import cloneDeep from 'lodash.clonedeep';
import Spinner from '../../../common/spinner';
import styles from './addSpecialties.module.scss';
import { requestData } from '../../../../services/requestDataFunction';
import { APIUrl } from '../../../../services/endpoints';

const AddSpecialties = () => {
  const [directions, setDirections] = useState([{}]);
  const [isFetching, setFetching] = useState(true);

  const [error, setError] = useState({
    hasError: false,
    errorStatusCode: '',
    errorMessage: '',
  });

  const fetchDirections = () => {
    const endpoint: string = `${APIUrl}Direction/All`;

    requestData(endpoint, 'GET').then((res: any) => {
      const statusCode = res.statusCode.toString();
      if (statusCode.match(/^[23]\d{2}$/)) {
        const directionsList = res.data;
        directionsList.forEach((item: any) => {
          item.specialties.forEach((item: any) => {
            item.checked = false;
          });
        });
        setDirections(directionsList);
        setFetching(false);
      } else {
        setError({
          hasError: true,
          errorStatusCode: res.statusCode,
          errorMessage:
            res.data.message || 'Щось пішло не так, спробуйте знову.',
        });
      }
    });
  };

  useEffect(() => {
    fetchDirections();
  }, []);

  const onClickHandler = (directionId: string, specialtyId: string) => {
    let clonedDirections = cloneDeep(directions);
    clonedDirections.find((direction: any) => {
      if (direction.id === directionId) {
        direction.specialties.find((specialty: any) => {
          if (specialty.id === specialtyId) {
            specialty.checked = !specialty.checked;
            return specialty;
          }
        });
        return direction;
      }
    });
    setDirections(clonedDirections);
  };

  const renderDirectionsAccordion = () =>
    directions.map((direction: any) => {
      const { id, code, name, specialties }: any = direction;
      return (
        <Accordion
          key={id}
          headerContent={
            <>
              <span className={styles.acc_item__id}>{code}</span>
              <h3 data-testid='direction' className={styles.acc_item__name}>
                {name}
              </h3>
            </>
          }
          headerStyle={styles.acc_item__header}
          bodyStyle={styles.acc_item__body}
          bodyContent={specialties
            .sort((a: any, b: any) => a.code - b.code)
            .map((specialty: any) => {
              return (
                <li key={specialty.id} className={styles.acc_item__subitem}>
                  <div className={styles.acc_item__subitem_info}>
                    <span>{specialty.code}</span> <h5>{specialty.name}</h5>
                  </div>
                  <button
                    data-testid='toggler'
                    className={`${styles.acc_item__subitem_btn} ${
                      specialty.checked
                        ? styles.acc_item__subitem_btn_checked
                        : ''
                    }`}
                    onClick={() => onClickHandler(direction.id, specialty.id)}
                  >
                    {!specialty.checked ? 'Додати' : 'Відміна'}
                  </button>
                </li>
              );
            })}
        />
      );
    });

  return (
    <>
      <ErrorBoundry>
        <div className={styles.AddSpecialties}>
          <div className={styles.AddSpecialties__inner}>
            <h2 data-testid='heading' className={styles.AddSpecialties__title}>
              Додайте спеціальності, які є у вашому університеті
            </h2>
            {error.hasError ? (
              <ResponsePlaceholder errorMessage={error.errorMessage} />
            ) : isFetching ? (
              <div className={styles.spinnerContainer}>
                <Spinner />
              </div>
            ) : (
              <>
                <ul className={styles.AddSpecialties__list}>
                  {renderDirectionsAccordion()}
                </ul>
                <Link
                  to='/ourSpecialties'
                  className={`${styles.AddSpecialties__button} ${styles.animatedButton}`}
                >
                  Готово
                </Link>
              </>
            )}
          </div>
        </div>
      </ErrorBoundry>
    </>
  );
};

export default AddSpecialties;
