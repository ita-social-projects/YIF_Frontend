import React, { useState } from 'react';
import styles from './ourSpecialties.module.scss';
import { Link, useRouteMatch } from 'react-router-dom';
import Delete from '../../../components/common/icons/Delete';
import Edit from '../../../components/common/icons/Edit';
import Tabs from '../../../components/Tabs';
import Tab from '../../../components/Tabs/tab/Tab';
import ExamRequirementsCard from '../../../components/examRequirementsCard';
import More from '../../../components/common/icons/More';

interface Props {
  code: number;
  name: string;
  id: string;
  // paymentForm: string;
  paymentFormDetails: any;
  // educationForm: string;
  description: string;
  // educationalProgramLink: string;
}

const SpecialtyDetails: React.FC<Props> = ({
  code,
  name,
  id,
  paymentFormDetails,
  description,
}: any) => {
  const [opened, setOpened] = useState(false);
  const [openedDescription, setOpenedDescription] = useState(false);
  const handleClick = (e: any) => {
    setOpened(!opened);
  };
  const handleClickDescription = (e: any) => {
    setOpenedDescription(!openedDescription);
  };

  const { path } = useRouteMatch();

  return (
    <li
      className={`${styles.acc_item__subitem} ${styles.card__more} ${
        opened ? `${styles.card__more__opened}` : ''
      }`}
    >
      <div className={styles.acc_item__subitem_container}>
        <h3 className={styles.acc_item__subtitle}>
          {code} {name}
        </h3>
        <div className={styles.acc_item__actionItems}>
          <div
            data-testid='check-open'
            className={styles.animatedButton}
            onClick={handleClick}
          >
            Детальніше
          </div>
          <div className={styles.card__details__edit}>
            <Link id='edit-btn' to={`${path}/edit`}>
              <Edit />
            </Link>
          </div>
          <Delete />
        </div>
      </div>

      <div className={styles.card__details}>
        <Tabs tabsStyle={styles.tabs} tabsContainer={styles.tabs__container}>
          {paymentFormDetails.map((form: any, index: any) => (
            <Tab
              title={form.paymentForm}
              key={index}
              tabStyle={styles.tabs__tab}
              tabStyle_active={styles.tabs__tab_active}
            >
              <div>
                <Tabs
                  tabsStyle={`${styles.tabs} ${styles.tabs_inner} )
                   `}
                  tabsContainer={styles.tabs__container_inner}
                >
                  {form.educationFormDetails.map((item: any, index: any) => (
                    <Tab
                      title={item.educationForm}
                      key={index}
                      tabStyle={styles.tabs__tab}
                      tabStyle_active={styles.tabs__tab_active}
                    >
                      <ExamRequirementsCard
                        examRequirements={item.examRequirements}
                        card__content={styles.card__content}
                        card__content__line={styles.card__content__line}
                        card__content_title={styles.card__content_title}
                        card__content__line_title={
                          styles.card__content__line_title
                        }
                      />

                      <div className={styles.acc_item__block}>
                        <p className={styles.acc_item__subtitle_text}>
                          <strong className={styles.acc_item__subtitle}>
                            Оплата:
                          </strong>{' '}
                          {form.paymentForm.toLowerCase()}
                        </p>
                      </div>
                      <div className={styles.acc_item__block}>
                        <p className={styles.acc_item__subtitle_text}>
                          <strong className={styles.acc_item__subtitle}>
                            Форма навчання:
                          </strong>{' '}
                          {item.educationForm.toLowerCase()}
                        </p>
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </div>
            </Tab>
          ))}
        </Tabs>
        <div
          className={`${styles.acc_item__block} ${styles.read__more} ${
            openedDescription ? `${styles.read__more__opened}` : null
          }`}
        >
          <div>
            <strong className={styles.acc_item__subtitle}>Опис: </strong>
            <span
              className={`${styles.acc_item__underline}`}
              data-testid='check-open-description'
              key={id}
              onClick={(e) => handleClickDescription(e)}
            >
              {' '}
              <span
                className={`${styles.read__more__show} ${styles.acc_item__subtitle_text}`}
              >
                {' '}
                детальніше
              </span>
              <span
                className={`${styles.read__more__hide} ${styles.acc_item__subtitle_text}`}
              >
                згорнути
              </span>{' '}
            </span>
          </div>
          <div className={styles.read__more__details}>
            <p className={`${styles.read__more__details__description}`}>
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.card__more__btn} onClick={handleClick}>
        <More />
      </div>
    </li>
  );
};

export default SpecialtyDetails;
